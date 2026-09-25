import React, { useState, useEffect, useRef } from 'react';
import { 
  Fish, 
  LayoutDashboard, 
  Waves, 
  Cpu, 
  LineChart, 
  ShoppingBag, 
  Bell, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  Save, 
  Clock, 
  Wind, 
  Droplets, 
  Thermometer, 
  Activity, 
  Wifi, 
  Battery, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  CheckCircle2,
  X,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Globe,
  Receipt,
  Image as ImageIcon,
  ExternalLink,
  Check,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { DEFAULT_THRESHOLDS } from '../data/budidayaData';

export default function DashboardView({
  session,
  onLogout,
  onBackToLanding,
  ponds,
  onUpdatePonds,
  devices,
  onUpdateDevices,
  products,
  onUpdateProducts,
  articles,
  onUpdateArticles,
  alerts,
  onAddAlert,
  onMarkAllAlertsRead,
  orders = [],
  onUpdateOrders,
  onShowToast,
  dashboardTab,
  onSelectDashboardTab,
  isDark = false,
  onToggleTheme
}) {
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [selectedPondIndex, setSelectedPondIndex] = useState(0);
  const [notifFilter, setNotifFilter] = useState('all');
  const [clockString, setClockString] = useState('');
  const [thresholds, setThresholds] = useState(DEFAULT_THRESHOLDS);
  const [pairModalOpen, setPairModalOpen] = useState(false);
  const [pairCode, setPairCode] = useState('');
  const [pairPond, setPairPond] = useState('Kolam A1');

  // Order Management State
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedProofOrder, setSelectedProofOrder] = useState(null);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    if (!onUpdateOrders) return;
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    onUpdateOrders(updated);
    if (onShowToast) onShowToast(`Status pesanan #${orderId} diubah menjadi "${newStatus}".`, 'ok');
  };

  const handleDeleteOrder = (orderId) => {
    if (!onUpdateOrders) return;
    if (window.confirm(`Hapus data pesanan #${orderId}?`)) {
      const updated = orders.filter(o => o.id !== orderId);
      onUpdateOrders(updated);
      if (onShowToast) onShowToast(`Pesanan #${orderId} telah dihapus.`, 'info');
    }
  };

  const handleContactCustomerWa = (order) => {
    const cleanPhone = (order.telepon || '').replace(/\D/g, '');
    const phone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const msg = encodeURIComponent(
      `Halo Bapak/Ibu ${order.pelanggan}, kami dari Admin NilaFarm Sumedang ingin mengonfirmasi pesanan #${order.id} Anda sebesar Rp${Number(order.total).toLocaleString('id-ID')}.\n\nStatus pesanan saat ini: *${order.status}*.\nTerima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Product Form State (CMS)
  const [prodFormOpen, setProdFormOpen] = useState(false);
  const [editingProdId, setEditingProdId] = useState(null);
  const [prodForm, setProdForm] = useState({
    nama: '',
    harga: '',
    satuan: '/kg',
    desk: '',
    feats: '',
    stok: 'ada',
    pop: false,
    kategori: 'Ikan Konsumsi'
  });

  // Article Form State (CMS)
  const [artFormOpen, setArtFormOpen] = useState(false);
  const [editingArtId, setEditingArtId] = useState(null);
  const [artForm, setArtForm] = useState({
    judul: '',
    img: '',
    ringkas: '',
    isi: ''
  });

  // Canvas Refs
  const mainChartRef = useRef(null);
  const pondDetailChartRef = useRef(null);
  const growthChartRef = useRef(null);

  // Live Clock updater
  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      const pad = n => (n < 10 ? '0' : '') + n;
      setClockString(
        `${days[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)} • ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const curPond = ponds[selectedPondIndex] || ponds[0];

  // Draw main monitoring chart
  useEffect(() => {
    if (dashboardTab === 'dashboard' && mainChartRef.current && curPond) {
      drawPondChart(mainChartRef.current, curPond);
    }
  }, [dashboardTab, selectedPondIndex, curPond]);

  // Draw pond detail chart
  useEffect(() => {
    if (dashboardTab === 'kolam' && pondDetailChartRef.current && curPond) {
      drawPondChart(pondDetailChartRef.current, curPond);
    }
  }, [dashboardTab, selectedPondIndex, curPond]);

  // Draw growth curve chart
  useEffect(() => {
    if (dashboardTab === 'analitik' && growthChartRef.current) {
      drawGrowthChart(growthChartRef.current);
    }
  }, [dashboardTab]);

  const drawPondChart = (canvas, pond) => {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight || 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(13, 71, 161, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = 10 + ((height - 20) * i) / 3;
      ctx.beginPath();
      ctx.moveTo(10, y);
      ctx.lineTo(width - 10, y);
      ctx.stroke();
    }

    const hist = pond.hist;
    if (!hist || !hist.temp || hist.temp.length < 2) return;

    const len = hist.temp.length;
    const norm = (v, min, max) => Math.max(0, Math.min(1, (v - min) / (max - min)));

    // Draw DO Line (Blue)
    drawLineSeries(ctx, hist.do.map(v => norm(v, 2, 10)), width, height, '#2196f3', true);
    // Draw Temp Line (Amber)
    drawLineSeries(ctx, hist.temp.map(v => norm(v, 24, 34)), width, height, '#f59e0b', false);
    // Draw pH Line (Green)
    drawLineSeries(ctx, hist.ph.map(v => norm(v, 6, 9)), width, height, '#22c55e', false);
  };

  const drawLineSeries = (ctx, data, width, height, color, isFilled) => {
    const n = data.length;
    const pl = 12, pr = 12, pt = 14, pb = 14;
    const getX = i => pl + ((width - pl - pr) * i) / (n - 1);
    const getY = v => pt + (height - pt - pb) * (1 - v);

    if (isFilled) {
      const grad = ctx.createLinearGradient(0, pt, 0, height - pb);
      grad.addColorStop(0, color + '44');
      grad.addColorStop(1, color + '00');

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(data[0]));
      for (let i = 1; i < n; i++) ctx.lineTo(getX(i), getY(data[i]));
      ctx.lineTo(getX(n - 1), height - pb);
      ctx.lineTo(getX(0), height - pb);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0]));
    for (let j = 1; j < n; j++) ctx.lineTo(getX(j), getY(data[j]));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Pulse dot at end
    const lastX = getX(n - 1);
    const lastY = getY(data[n - 1]);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawGrowthChart = (canvas) => {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight || 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    const weights = [15, 35, 70, 120, 190, 280, 390, 520, 680];
    const maxW = 800;
    const n = weights.length;
    const pl = 14, pr = 14, pt = 16, pb = 16;
    const getX = i => pl + ((width - pl - pr) * i) / (n - 1);
    const getY = v => pt + (height - pt - pb) * (1 - v / maxW);

    const grad = ctx.createLinearGradient(0, pt, 0, height - pb);
    grad.addColorStop(0, 'rgba(13, 71, 161, 0.35)');
    grad.addColorStop(1, 'rgba(13, 71, 161, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(weights[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(getX(i), getY(weights[i]));
    ctx.lineTo(getX(n - 1), height - pb);
    ctx.lineTo(getX(0), height - pb);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(weights[0]));
    for (let j = 1; j < n; j++) ctx.lineTo(getX(j), getY(weights[j]));
    ctx.strokeStyle = '#0d47a1';
    ctx.lineWidth = 2.8;
    ctx.stroke();
  };

  // Toggle Actuator Switch
  const handleToggleActuator = (pondId, actKey) => {
    const updated = ponds.map(p => {
      if (p.id === pondId) {
        const nextState = !p.act[actKey];
        const actName = actKey === 'aerator' ? 'Aerator' : actKey === 'pompa' ? 'Pompa Sirkulasi' : 'Auto-Feeder';
        onAddAlert(
          'info',
          `${p.name}: ${actName} ${nextState ? 'Dinyalakan' : 'Dimatikan'} Manual`,
          `Perintah kendali berhasil dikirim ke gateway node.`
        );
        return {
          ...p,
          act: { ...p.act, [actKey]: nextState }
        };
      }
      return p;
    });
    onUpdatePonds(updated);
  };

  // Pairing Device
  const handlePairSubmit = (e) => {
    e.preventDefault();
    if (pairCode.length < 5) {
      onShowToast('Kode pairing minimal 5 karakter.', 'bad');
      return;
    }
    const newDev = {
      id: `NODE-${pairCode.toUpperCase()}`,
      name: `Sensor Node ${pairCode.toUpperCase()}`,
      kind: 'sensor',
      pond: pairPond,
      batt: 100,
      sig: 88,
      online: true,
      fw: 'v1.9.0'
    };
    onUpdateDevices([...devices, newDev]);
    onAddAlert('info', `Perangkat Baru Terhubung`, `Node ${newDev.id} aktif dipasang di ${pairPond}.`);
    onShowToast(`Sensor Node ${newDev.id} berhasil dipasangkan.`, 'ok');
    setPairModalOpen(false);
    setPairCode('');
  };

  // Product CMS
  const handleOpenAddProd = () => {
    setEditingProdId(null);
    setProdForm({
      nama: '',
      harga: '',
      satuan: '/kg',
      desk: '',
      feats: '',
      stok: 'ada',
      pop: false,
      kategori: 'Ikan Konsumsi'
    });
    setProdFormOpen(true);
  };

  const handleEditProd = (prod) => {
    setEditingProdId(prod.id);
    setProdForm({
      nama: prod.nama,
      harga: prod.harga,
      satuan: prod.satuan,
      desk: prod.desk,
      feats: (prod.feats || []).join(' | '),
      stok: prod.stok,
      pop: !!prod.pop,
      kategori: prod.kategori || 'Ikan Konsumsi'
    });
    setProdFormOpen(true);
  };

  const handleDeleteProd = (id) => {
    onUpdateProducts(products.filter(p => p.id !== id));
    onShowToast('Produk berhasil dihapus dari website.', 'ok');
  };

  const handleSaveProd = (e) => {
    e.preventDefault();
    if (!prodForm.nama.trim() || !prodForm.harga) {
      onShowToast('Lengkapi nama dan harga produk.', 'bad');
      return;
    }

    const featsArr = prodForm.feats
      .split('|')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingProdId) {
      const updated = products.map(p => {
        if (p.id === editingProdId) {
          return {
            ...p,
            nama: prodForm.nama,
            harga: Number(prodForm.harga),
            satuan: prodForm.satuan,
            desk: prodForm.desk,
            feats: featsArr,
            stok: prodForm.stok,
            pop: prodForm.pop,
            kategori: prodForm.kategori
          };
        }
        return p;
      });
      onUpdateProducts(updated);
      onShowToast('Produk berhasil diperbarui.', 'ok');
    } else {
      const newP = {
        id: 'p' + Date.now(),
        nama: prodForm.nama,
        harga: Number(prodForm.harga),
        satuan: prodForm.satuan,
        desk: prodForm.desk,
        feats: featsArr,
        stok: prodForm.stok,
        pop: prodForm.pop,
        kategori: prodForm.kategori
      };
      onUpdateProducts([...products, newP]);
      onShowToast('Produk baru berhasil ditambahkan.', 'ok');
    }
    setProdFormOpen(false);
  };

  // Article CMS
  const handleOpenAddArt = () => {
    setEditingArtId(null);
    setArtForm({
      judul: '',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      ringkas: '',
      isi: ''
    });
    setArtFormOpen(true);
  };

  const handleEditArt = (art) => {
    setEditingArtId(art.id);
    setArtForm({
      judul: art.judul,
      img: art.img,
      ringkas: art.ringkas,
      isi: (art.isi || []).join('\n\n')
    });
    setArtFormOpen(true);
  };

  const handleDeleteArt = (id) => {
    onUpdateArticles(articles.filter(a => a.id !== id));
    onShowToast('Artikel berhasil dihapus.', 'ok');
  };

  const handleSaveArt = (e) => {
    e.preventDefault();
    if (!artForm.judul.trim()) {
      onShowToast('Isi judul artikel terlebih dahulu.', 'bad');
      return;
    }

    const paragraphs = artForm.isi
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    if (editingArtId) {
      const updated = articles.map(a => {
        if (a.id === editingArtId) {
          return {
            ...a,
            judul: artForm.judul,
            img: artForm.img,
            ringkas: artForm.ringkas,
            isi: paragraphs
          };
        }
        return a;
      });
      onUpdateArticles(updated);
      onShowToast('Artikel berhasil diperbarui.', 'ok');
    } else {
      const newA = {
        id: 'a' + Date.now(),
        tgl: dateStr,
        judul: artForm.judul,
        img: artForm.img,
        ringkas: artForm.ringkas,
        isi: paragraphs
      };
      onUpdateArticles([...articles, newA]);
      onShowToast('Artikel baru berhasil diterbitkan.', 'ok');
    }
    setArtFormOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = 'Waktu,' + ponds.map(p => `${p.id}_suhu,${p.id}_ph,${p.id}_do,${p.id}_nh3`).join(',') + '\n';
    for (let i = 0; i < 48; i++) {
      const row = [`-${48 - i}m`];
      ponds.forEach(p => {
        row.push(p.hist.temp[i], p.hist.ph[i], p.hist.do[i], p.hist.nh3[i]);
      });
      csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `nilafarm-telemetri-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('File telemetri CSV berhasil diunduh.', 'ok');
  };

  // Nav items configuration
  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pesanan', label: 'Pesanan Masuk', icon: Receipt },
    { id: 'kolam', label: 'Kolam Saya', icon: Waves },
    { id: 'perangkat', label: 'Perangkat IoT', icon: Cpu },
    { id: 'analitik', label: 'Analitik & FCR', icon: LineChart },
    { id: 'produk', label: 'Kelola Produk', icon: ShoppingBag },
    { id: 'notifikasi', label: 'Pusat Notifikasi', icon: Bell },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings }
  ];

  const unreadCount = alerts.filter(a => !a.read).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Menunggu Konfirmasi').length;

  const filteredNavItems = sidebarSearch.trim()
    ? navMenuItems.filter(i => i.label.toLowerCase().includes(sidebarSearch.toLowerCase()))
    : navMenuItems;

  return (
    <div className="dashboard-page-container">
      {/* ========================================================
          FRONTENDJOE CSS SIDEBARS PART 09
         ======================================================== */}
      <aside className="fj-sidebar">
        {/* Profile (Slide 3/8) */}
        <div className="fj-profile" onClick={onBackToLanding} title="Hamdan Russ - Admin & Farm Owner">
          <div 
            className="fj-avatar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #007aff, #0051ba)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '15px'
            }}
          >
            HR
          </div>
          <div className="fj-details">
            <p className="fj-name">{session?.name || 'Hamdan Russ'}</p>
            <p className="fj-role">Admin & Owner Farm</p>
          </div>
          <ChevronDown className="fj-icon fj-chevron" />
        </div>

        {/* Search Dashboard (Slide 5/8) */}
        <div className="fj-search">
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
          />
          <Search className="fj-icon" />
        </div>

        {/* Navigation & Items (Slide 6/8) */}
        <nav className="fj-nav">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDashboardTab(item.id)}
                className={`fj-item ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon className="fj-icon" />
                <p>{item.label}</p>
                {item.id === 'notifikasi' && unreadCount > 0 && (
                  <span className="fj-badge">{unreadCount}</span>
                )}
                {item.id === 'pesanan' && pendingOrdersCount > 0 && (
                  <span className="fj-badge" style={{ background: '#f59e0b', color: '#ffffff' }}>{pendingOrdersCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <hr className="fj-hr" />

        {/* Actions (Slide 7/8: Theme toggle, Web, CSV, Logout) */}
        <div className="fj-actions">
          <button 
            type="button" 
            className="fj-action" 
            onClick={onToggleTheme} 
            title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
          >
            {isDark ? <Sun className="fj-icon" /> : <Moon className="fj-icon" />}
          </button>

          <button 
            type="button" 
            className="fj-action" 
            onClick={onBackToLanding} 
            title="Kembali ke Web Publik"
          >
            <Globe className="fj-icon" />
          </button>

          <button 
            type="button" 
            className="fj-action" 
            onClick={handleExportCSV} 
            title="Unduh Data CSV Telemetri"
          >
            <Download className="fj-icon" />
          </button>

          <button 
            type="button" 
            className="fj-action" 
            onClick={onLogout} 
            title="Keluar dari Panel Admin"
            style={{ color: '#ef4444' }}
          >
            <LogOut className="fj-icon" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {/* Top Header Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '26px'
          }}
        >
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--txt)', letterSpacing: '-0.3px', margin: 0 }}>
              {navMenuItems.find(i => i.id === dashboardTab)?.label || 'Monitoring Farm'}
            </h1>
            <p style={{ color: 'var(--mut)', fontSize: '13px', marginTop: '2px', margin: 0 }}>
              {dashboardTab === 'dashboard' && 'Telemetri live kualitas air kolam bioflok Sumedang'}
              {dashboardTab === 'pesanan' && 'Daftar pesanan masuk dari website, verifikasi bukti bayar & update status pengiriman'}
              {dashboardTab === 'kolam' && 'Kondisi tiap kolam, parameter analitik & jadwal pakan harian'}
              {dashboardTab === 'perangkat' && 'Konektivitas sensor probe, aktuator aerator & gateway'}
              {dashboardTab === 'analitik' && 'Kurva pertumbuhan bobot, konversi pakan (FCR) & estimasi panen'}
              {dashboardTab === 'produk' && 'Kelola produk dan artikel yang tampil di website publik'}
              {dashboardTab === 'notifikasi' && 'Riwayat peringatan sensor kualitas air dan sistem'}
              {dashboardTab === 'pengaturan' && 'Ambang batas aman dan preferensi notifikasi alarm'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                fontSize: '12.5px',
                color: 'var(--mut)',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                padding: '8px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Clock size={14} />
              <span>{clockString}</span>
            </div>

            <button
              onClick={() => onSelectDashboardTab('notifikasi')}
              style={{
                position: 'relative',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--txt)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ef4444'
                  }}
                />
              )}
            </button>

            <button
              onClick={onBackToLanding}
              className="btn-ghost"
              style={{ padding: '8px 14px', fontSize: '12.5px' }}
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Beranda Web</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Tab Pill Bar (Visible only on mobile <= 860px) */}
        <div className="mobile-admin-tab-scroller">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDashboardTab(item.id)}
                className={`mobile-tab-pill ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
                {item.id === 'notifikasi' && unreadCount > 0 && (
                  <span className="mobile-pill-badge">{unreadCount}</span>
                )}
                {item.id === 'pesanan' && pendingOrdersCount > 0 && (
                  <span className="mobile-pill-badge" style={{ background: '#f59e0b' }}>{pendingOrdersCount}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            TAB 1: DASHBOARD RINGKASAN LIVE
           ======================================================== */}
        {dashboardTab === 'dashboard' && (
          <div>
            {/* 4 KPI Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              {/* Avg Temp */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Thermometer size={18} />
                  </div>
                  <span className="chip ok">Optimal</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Suhu Rata-rata Kolam</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--txt)' }}>
                  {(ponds.reduce((acc, p) => acc + p.s.temp, 0) / ponds.length).toFixed(1)} <small style={{ fontSize: '13px', color: 'var(--mut)' }}>°C</small>
                </div>
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Rentang aman 26°C - 30°C</small>
              </div>

              {/* Avg pH */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.14)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Droplets size={18} />
                  </div>
                  <span className="chip ok">Bagus</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>pH Rata-rata Air</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--txt)' }}>
                  {(ponds.reduce((acc, p) => acc + p.s.ph, 0) / ponds.length).toFixed(2)}
                </div>
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Rentang aman 6.5 - 8.5</small>
              </div>

              {/* Min DO */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(33, 150, 243, 0.14)', color: '#2196f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wind size={18} />
                  </div>
                  <span className="chip ok">Aman</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>DO Terendah (Oksigen)</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--txt)' }}>
                  {Math.min(...ponds.map(p => p.s.do)).toFixed(1)} <small style={{ fontSize: '13px', color: 'var(--mut)' }}>mg/L</small>
                </div>
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Batas kritis &lt; 4.0 mg/L</small>
              </div>

              {/* Max Ammonia */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(13, 71, 161, 0.14)', color: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={18} />
                  </div>
                  <span className="chip ok">Rendah</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Amonia Tertinggi (NH3)</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--txt)' }}>
                  {Math.max(...ponds.map(p => p.s.nh3)).toFixed(2)} <small style={{ fontSize: '13px', color: 'var(--mut)' }}>ppm</small>
                </div>
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Batas aman &lt; 0.5 ppm</small>
              </div>
            </div>

            {/* Main Interactive Live Canvas Chart */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                    Monitoring Kualitas Air Live
                  </h3>
                  <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                    Telemetri probe sensor: Suhu, pH, dan Oksigen Terlarut (48 titik log terakhir)
                  </small>
                </div>

                {/* Pond Pills */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {ponds.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPondIndex(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: selectedPondIndex === idx ? 'transparent' : 'var(--border-strong)',
                        background: selectedPondIndex === idx ? 'var(--grad)' : 'var(--card)',
                        color: selectedPondIndex === idx ? '#ffffff' : 'var(--txt)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Graph */}
              <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                <canvas 
                  ref={mainChartRef} 
                  style={{ width: '100%', height: '100%', display: 'block' }} 
                />
              </div>

              {/* Chart Legend */}
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '12.5px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2196f3', display: 'inline-block' }} />
                  DO (Oksigen): <b>{curPond.s.do} mg/L</b>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b', display: 'inline-block' }} />
                  Suhu: <b>{curPond.s.temp}°C</b>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#22c55e', display: 'inline-block' }} />
                  pH: <b>{curPond.s.ph}</b>
                </span>
                <span style={{ marginLeft: 'auto', color: 'var(--mut)', fontSize: '11.5px' }}>
                  Diperbarui: {clockString}
                </span>
              </div>
            </div>

            {/* Actuators Control & Recent Alerts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Actuator Panel */}
              <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--txt)', marginBottom: '4px' }}>
                  Kontrol Aktuator — {curPond.name}
                </h3>
                <p style={{ color: 'var(--mut)', fontSize: '12px', marginBottom: '16px' }}>
                  Otomatis menyala saat ambang batas bahaya terlampaui.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Aerator switch */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', background: 'var(--card2)' }}>
                    <div>
                      <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Aerator Kolam</b>
                      <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                        Suplai oksigen uniring • {curPond.act.aerator ? 'Menyala' : 'Mati'}
                      </small>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={curPond.act.aerator}
                        onChange={() => handleToggleActuator(curPond.id, 'aerator')}
                      />
                      <span className="sl" />
                    </label>
                  </div>

                  {/* Pompa Sirkulasi switch */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', background: 'var(--card2)' }}>
                    <div>
                      <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Pompa Sirkulasi & Central Drain</b>
                      <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                        Filter limbah dasar • {curPond.act.pompa ? 'Menyala' : 'Mati'}
                      </small>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={curPond.act.pompa}
                        onChange={() => handleToggleActuator(curPond.id, 'pompa')}
                      />
                      <span className="sl" />
                    </label>
                  </div>

                  {/* Auto-Feeder switch */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', background: 'var(--card2)' }}>
                    <div>
                      <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Smart Auto-Feeder 20kg</b>
                      <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                        Pemberian pakan terjadwal • {curPond.act.feeder ? 'Aktif' : 'Nonaktif'}
                      </small>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={curPond.act.feeder}
                        onChange={() => handleToggleActuator(curPond.id, 'feeder')}
                      />
                      <span className="sl" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Recent Alerts Feed */}
              <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                    Peringatan Terbaru
                  </h3>
                  <button 
                    onClick={() => onSelectDashboardTab('notifikasi')}
                    style={{ background: 'none', border: 'none', color: 'var(--b)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Lihat Semua →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                  {alerts.slice(0, 4).map((a, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px',
                        borderRadius: '12px',
                        background: 'var(--card2)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div style={{ color: a.type === 'crit' ? '#ef4444' : a.type === 'warn' ? '#f59e0b' : 'var(--b)', marginTop: '2px' }}>
                        {a.type === 'crit' ? <AlertCircle size={16} /> : a.type === 'warn' ? <AlertTriangle size={16} /> : <Info size={16} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block' }}>{a.title}</b>
                        <small style={{ color: 'var(--mut)', fontSize: '11px' }}>{a.desc}</small>
                      </div>
                      <span style={{ fontSize: '10.5px', color: 'var(--mut)' }}>{a.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: PESANAN MASUK & VERIFIKASI BUKTI BAYAR
           ======================================================== */}
        {dashboardTab === 'pesanan' && (
          <div>
            {/* KPI Cards Pesanan */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '22px'
              }}
            >
              {/* Total Pesanan */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(33, 150, 243, 0.14)', color: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Receipt size={18} />
                  </div>
                  <span className="chip ok">{orders.length} Total</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Total Pesanan Masuk</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--txt)' }}>
                  {orders.length} <small style={{ fontSize: '13px', color: 'var(--mut)' }}>transaksi</small>
                </div>
              </div>

              {/* Menunggu Konfirmasi */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} />
                  </div>
                  <span className="chip warn">Perlu Verifikasi</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Menunggu Konfirmasi</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>
                  {orders.filter(o => o.status === 'Menunggu Konfirmasi').length} <small style={{ fontSize: '13px', color: 'var(--mut)' }}>antrean</small>
                </div>
              </div>

              {/* Pesanan Dikonfirmasi / Selesai */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.14)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="chip ok">Aktif</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Dikonfirmasi / Selesai</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#16a34a' }}>
                  {orders.filter(o => o.status === 'Dikonfirmasi' || o.status === 'Sedang Dikirim' || o.status === 'Selesai').length}
                </div>
              </div>

              {/* Total Omset Nilai Pesanan */}
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(13, 71, 161, 0.14)', color: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingCart size={18} />
                  </div>
                  <span className="chip ok">Akumulasi</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Total Nilai Pesanan</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--txt)' }}>
                  Rp{orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
                {['all', 'Menunggu Konfirmasi', 'Dikonfirmasi', 'Sedang Dikirim', 'Selesai', 'Ditolak'].map(st => {
                  const isSel = orderFilter === st;
                  const label = st === 'all' ? 'Semua Pesanan' : st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setOrderFilter(st)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: isSel ? '1px solid var(--b)' : '1px solid var(--border)',
                        background: isSel ? 'var(--b)' : 'var(--card2)',
                        color: isSel ? '#ffffff' : 'var(--txt)',
                        fontSize: '12px',
                        fontWeight: isSel ? 700 : 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {label} {st === 'Menunggu Konfirmasi' && pendingOrdersCount > 0 && `(${pendingOrdersCount})`}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--mut)' }} />
                <input
                  type="text"
                  placeholder="Cari invoice/nama..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '12.5px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* List Pesanan Masuk */}
            {(() => {
              const filteredOrders = orders.filter(o => {
                const matchFilter = orderFilter === 'all' || o.status === orderFilter;
                const matchSearch = !orderSearch.trim() || 
                  o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                  (o.pelanggan || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
                  (o.telepon || '').includes(orderSearch);
                return matchFilter && matchSearch;
              });

              if (filteredOrders.length === 0) {
                return (
                  <div className="glass-panel" style={{ padding: '50px 20px', textAlign: 'center', borderRadius: '20px' }}>
                    <Receipt size={48} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '16px', color: 'var(--txt)', fontWeight: 700, marginBottom: '4px' }}>
                      Tidak Ada Pesanan Ditemukan
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--mut)' }}>
                      Belum ada pesanan pada filter ini atau kata kunci tidak sesuai.
                    </p>
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredOrders.map(order => {
                    const statusColor = 
                      order.status === 'Menunggu Konfirmasi' ? '#d97706' :
                      order.status === 'Dikonfirmasi' ? '#0284c7' :
                      order.status === 'Sedang Dikirim' ? '#4f46e5' :
                      order.status === 'Selesai' ? '#16a34a' : '#ef4444';

                    const statusBg = 
                      order.status === 'Menunggu Konfirmasi' ? 'rgba(245, 158, 11, 0.12)' :
                      order.status === 'Dikonfirmasi' ? 'rgba(2, 132, 199, 0.12)' :
                      order.status === 'Sedang Dikirim' ? 'rgba(79, 70, 229, 0.12)' :
                      order.status === 'Selesai' ? 'rgba(22, 163, 74, 0.12)' : 'rgba(239, 68, 68, 0.12)';

                    return (
                      <div 
                        key={order.id} 
                        className="glass-panel"
                        style={{
                          padding: '20px',
                          borderRadius: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          border: order.status === 'Menunggu Konfirmasi' ? '1.5px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border)'
                        }}
                      >
                        {/* Header Pesanan */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--b)' }}>
                              #{order.id}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--mut)' }}>
                              • {order.tanggal}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span 
                              style={{ 
                                padding: '4px 12px', 
                                borderRadius: '8px', 
                                fontSize: '12px', 
                                fontWeight: 700, 
                                color: statusColor, 
                                background: statusBg,
                                border: `1px solid ${statusColor}33`
                              }}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Grid Konten: Pelanggan, Item, Bukti Bayar */}
                        <div 
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                            gap: '18px' 
                          }}
                        >
                          {/* 1. Pelanggan Info */}
                          <div style={{ background: 'var(--card2)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
                              Data Pelanggan & Alamat
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--txt)', marginBottom: '4px' }}>
                              {order.pelanggan}
                            </div>
                            <div style={{ fontSize: '12.5px', color: 'var(--mut)', marginBottom: '8px' }}>
                              WhatsApp: <b>{order.telepon}</b>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--txt)', lineHeight: 1.5, marginBottom: '10px' }}>
                              📍 {order.alamat}
                            </div>
                            {order.catatan && order.catatan !== '-' && (
                              <div style={{ fontSize: '11.5px', color: '#b45309', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 8px', borderRadius: '6px', marginBottom: '10px' }}>
                                Catatan: {order.catatan}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => handleContactCustomerWa(order)}
                              style={{
                                background: '#22c55e',
                                border: 'none',
                                color: '#ffffff',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '11.5px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <ExternalLink size={13} />
                              <span>Hubungi via WhatsApp</span>
                            </button>
                          </div>

                          {/* 2. Rincian Item Belanja */}
                          <div style={{ background: 'var(--card2)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
                              Rincian Produk Belanja
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                              {(order.items || []).map((it, iIdx) => (
                                <div key={iIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--txt)' }}>
                                  <span>{it.nama} × {it.qty}</span>
                                  <b>Rp{Number(it.harga * it.qty).toLocaleString('id-ID')}</b>
                                </div>
                              ))}
                            </div>

                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: 'auto' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 800, color: 'var(--p)' }}>
                                <span>Total Bayar:</span>
                                <span>Rp{Number(order.total).toLocaleString('id-ID')}</span>
                              </div>
                              <small style={{ color: 'var(--mut)', fontSize: '11px', display: 'block', marginTop: '2px' }}>
                                Metode: {order.metode}
                              </small>
                            </div>
                          </div>

                          {/* 3. Bukti Pembayaran */}
                          <div style={{ background: 'var(--card2)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
                              Bukti Pembayaran (Transfer/Struk)
                            </div>

                            {order.buktiBayar ? (
                              <div>
                                <div 
                                  onClick={() => setSelectedProofOrder(order)}
                                  style={{
                                    height: '110px',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: '1px solid var(--border)',
                                    marginBottom: '8px'
                                  }}
                                  title="Klik untuk melihat bukti pembayaran ukuran penuh"
                                >
                                  <img 
                                    src={order.buktiBayar} 
                                    alt="Bukti Transfer" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                  />
                                  <div 
                                    style={{
                                      position: 'absolute',
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      background: 'rgba(0,0,0,0.65)',
                                      color: '#ffffff',
                                      padding: '4px',
                                      fontSize: '11px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '4px'
                                    }}
                                  >
                                    <ImageIcon size={13} />
                                    <span>Klik Perbesar Bukti</span>
                                  </div>
                                </div>
                                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                                  ✓ Bukti telah diunggah oleh pembeli
                                </span>
                              </div>
                            ) : (
                              <div style={{ padding: '24px 10px', textAlign: 'center', color: 'var(--mut)', fontSize: '12px' }}>
                                Bayar di Tempat (COD) / Tanpa unggahan bukti
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Bar (Update Status & Hapus) */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--txt)' }}>
                              Ubah Status Pesanan:
                            </span>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                                background: 'var(--card)',
                                color: 'var(--txt)',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                              <option value="Dikonfirmasi">Dikonfirmasi (Lunas)</option>
                              <option value="Sedang Dikirim">Sedang Dikirim</option>
                              <option value="Selesai">Selesai</option>
                              <option value="Ditolak">Ditolak / Dibatalkan</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              fontSize: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 8px'
                            }}
                          >
                            <Trash2 size={13} />
                            <span>Hapus Pesanan</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================
            TAB 2: KOLAM SAYA & DETAIL
           ======================================================== */}
        {dashboardTab === 'kolam' && (
          <div>
            {/* Ponds Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}
            >
              {ponds.map((p, idx) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPondIndex(idx)}
                  className="glass-panel"
                  style={{
                    padding: '18px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: selectedPondIndex === idx ? '2px solid var(--b)' : '1px solid var(--border)',
                    boxShadow: selectedPondIndex === idx ? '0 8px 24px rgba(33, 150, 243, 0.25)' : 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <b style={{ fontSize: '16px', color: 'var(--txt)' }}>{p.name}</b>
                    <span className="chip ok">Sehat</span>
                  </div>
                  <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                    {p.type} • {p.fish.toLocaleString('id-ID')} ekor • hari ke-{p.age}
                  </small>

                  <div style={{ marginTop: '14px' }}>
                    <div className="meter">
                      <div className="m-top">
                        <span>Oksigen (DO)</span>
                        <b>{p.s.do} mg/L</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${p.s.do * 10}%` }} />
                      </div>
                    </div>

                    <div className="meter">
                      <div className="m-top">
                        <span>Suhu Air</span>
                        <b>{p.s.temp}°C</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${((p.s.temp - 24) / 10) * 100}%` }} />
                      </div>
                    </div>

                    <div className="meter">
                      <div className="m-top">
                        <span>Level Air</span>
                        <b>{p.s.level}%</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${p.s.level}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Pond Detailed Inspection */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                    {curPond.name} — Detail Telemetri & Jadwal Pakan
                  </h3>
                  <small style={{ color: 'var(--mut)', fontSize: '12.5px' }}>
                    {curPond.type} • Estimasi panen: {90 - curPond.age} hari lagi
                  </small>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {ponds.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPondIndex(idx)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        background: selectedPondIndex === idx ? 'var(--grad)' : 'var(--card)',
                        color: selectedPondIndex === idx ? '#fff' : 'var(--txt)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* 6 Sensor readings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="meter">
                    <div className="m-top"><span>Suhu Air (°C)</span><b>{curPond.s.temp} °C</b></div>
                    <div className="bar"><i style={{ width: `${((curPond.s.temp - 24) / 10) * 100}%` }} /></div>
                  </div>
                  <div className="meter">
                    <div className="m-top"><span>Derajat Asam (pH)</span><b>{curPond.s.ph}</b></div>
                    <div className="bar"><i style={{ width: `${((curPond.s.ph - 5.5) / 3.5) * 100}%` }} /></div>
                  </div>
                  <div className="meter">
                    <div className="m-top"><span>Oksigen Terlarut (DO)</span><b>{curPond.s.do} mg/L</b></div>
                    <div className="bar"><i style={{ width: `${curPond.s.do * 10}%` }} /></div>
                  </div>
                  <div className="meter">
                    <div className="m-top"><span>Amonia Bebas (NH3)</span><b>{curPond.s.nh3} ppm</b></div>
                    <div className="bar"><i style={{ width: `${curPond.s.nh3 * 160}%` }} /></div>
                  </div>
                  <div className="meter">
                    <div className="m-top"><span>Kekeruhan (Turbidity)</span><b>{curPond.s.turb} NTU</b></div>
                    <div className="bar"><i style={{ width: `${curPond.s.turb * 1.5}%` }} /></div>
                  </div>
                  <div className="meter">
                    <div className="m-top"><span>Ketinggian Air</span><b>{curPond.s.level} %</b></div>
                    <div className="bar"><i style={{ width: `${curPond.s.level}%` }} /></div>
                  </div>
                </div>

                {/* Feeding Schedule & Chart */}
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '12px' }}>
                    Jadwal Pemberian Pakan Hari Ini
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '12px' }}>
                      <div>
                        <b>07:00 WIB — 2.5 kg</b>
                        <small style={{ display: 'block', color: 'var(--mut)' }}>Pelet protein 32% (Diberikan otomatis)</small>
                      </div>
                      <span className="chip ok">Selesai</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '12px' }}>
                      <div>
                        <b>12:00 WIB — 2.0 kg</b>
                        <small style={{ display: 'block', color: 'var(--mut)' }}>Pelet protein 32% (Diberikan otomatis)</small>
                      </div>
                      <span className="chip ok">Selesai</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '12px' }}>
                      <div>
                        <b>17:00 WIB — 2.5 kg</b>
                        <small style={{ display: 'block', color: 'var(--mut)' }}>Pelet protein 32% + Daun Azolla</small>
                      </div>
                      <span className="chip warn">Terjadwal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: PERANGKAT IOT & NODE
           ======================================================== */}
        {dashboardTab === 'perangkat' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                  Node Sensor, Gateway & Kontroler Aktuator
                </h3>
                <small style={{ color: 'var(--mut)' }}>
                  Total {devices.length} perangkat terdaftar dalam jaringan farm
                </small>
              </div>

              <button
                onClick={() => setPairModalOpen(true)}
                className="btn-primary"
                style={{ padding: '9px 16px', fontSize: '13px' }}
              >
                <Plus size={16} />
                <span>+ Tambah Perangkat Baru</span>
              </button>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '18px'
              }}
            >
              {devices.map((dev) => (
                <div 
                  key={dev.id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div 
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(33, 150, 243, 0.12)',
                        color: 'var(--b)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Cpu size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: '14.5px', color: 'var(--txt)', display: 'block' }}>{dev.name}</b>
                      <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>{dev.id} • {dev.pond}</small>
                    </div>
                    <span 
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: dev.online ? '#22c55e' : '#ef4444',
                        boxShadow: `0 0 8px ${dev.online ? '#22c55e' : '#ef4444'}`
                      }}
                    />
                  </div>

                  <div style={{ fontSize: '12.5px', color: 'var(--mut)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>Baterai Node</span>
                        <b style={{ color: 'var(--txt)' }}>{dev.batt}%</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${dev.batt}%`, background: dev.batt < 50 ? '#f59e0b' : '#22c55e' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                      <span>Kekuatan Sinyal</span>
                      <b style={{ color: 'var(--txt)' }}>{dev.sig}% (Stabil)</b>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Versi Firmware</span>
                      <b style={{ color: 'var(--txt)' }}>{dev.fw}</b>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Status Node</span>
                      <b style={{ color: dev.online ? '#22c55e' : '#ef4444' }}>
                        {dev.online ? 'Online Aktif' : 'Offline'}
                      </b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: ANALITIK & FCR
           ======================================================== */}
        {dashboardTab === 'analitik' && (
          <div>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}
            >
              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Rasio Konversi Pakan (FCR)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--b)' }}>1.2</div>
                <small style={{ color: 'var(--ok)' }}>Target efisiensi tercapai (&lt; 1.4)</small>
              </div>

              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Survival Rate (SR)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ok)' }}>94%</div>
                <small style={{ color: 'var(--mut)' }}>9.500 ekor hidup dari 10.000 tebar</small>
              </div>

              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Biomassa Ikan Total</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--p)' }}>1.8 Ton</div>
                <small style={{ color: 'var(--mut)' }}>Estimasi panen siap panen</small>
              </div>

              <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px' }}>
                <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Estimasi Panen Raya</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>32 Hari</div>
                <small style={{ color: 'var(--mut)' }}>± 450 kg per kolam D4</small>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)', marginBottom: '4px' }}>
                Kurva Pertumbuhan Bobot Ikan Nila (Minggu 1 - 9)
              </h3>
              <small style={{ color: 'var(--mut)', display: 'block', marginBottom: '16px' }}>
                Pertumbuhan rata-rata gram per ekor dari tebar benih hingga panen ukuran 700g
              </small>

              <div style={{ height: '230px', width: '100%' }}>
                <canvas ref={growthChartRef} style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: KELOLA PRODUK & ARTIKEL (CMS ADMIN)
           ======================================================== */}
        {dashboardTab === 'produk' && (
          <div>
            {/* Products CMS */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                    Katalog Produk di Website
                  </h3>
                  <small style={{ color: 'var(--mut)' }}>
                    Tambah, ubah harga, dan kelola ketersediaan stok
                  </small>
                </div>
                <button
                  onClick={handleOpenAddProd}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  <Plus size={15} />
                  <span>+ Tambah Produk</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {products.map((p) => (
                  <div 
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: 'var(--card2)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div>
                      <b style={{ fontSize: '14px', color: 'var(--txt)' }}>
                        {p.nama} <span className={`chip ${p.stok === 'habis' ? 'bad' : 'ok'}`}>{p.stok === 'habis' ? 'Habis' : 'Ada'}</span>
                        {p.pop && <span className="chip warn" style={{ marginLeft: '6px' }}>Unggulan</span>}
                      </b>
                      <small style={{ display: 'block', color: 'var(--mut)', marginTop: '2px' }}>
                        Rp{Number(p.harga).toLocaleString('id-ID')} {p.satuan} • {p.desk}
                      </small>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditProd(p)}
                        className="btn-ghost"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Edit2 size={13} />
                        <span>Ubah</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProd(p.id)}
                        className="btn-danger"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Trash2 size={13} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles CMS */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                    Artikel & Panduan Budidaya
                  </h3>
                  <small style={{ color: 'var(--mut)' }}>
                    Tulis tips budidaya bioflok untuk pembaca website
                  </small>
                </div>
                <button
                  onClick={handleOpenAddArt}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  <Plus size={15} />
                  <span>+ Tulis Artikel Baru</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {articles.map((a) => (
                  <div 
                    key={a.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: 'var(--card2)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div>
                      <b style={{ fontSize: '14px', color: 'var(--txt)' }}>{a.judul}</b>
                      <small style={{ display: 'block', color: 'var(--mut)', marginTop: '2px' }}>
                        {a.tgl} • {a.ringkas}
                      </small>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditArt(a)}
                        className="btn-ghost"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Edit2 size={13} />
                        <span>Ubah</span>
                      </button>
                      <button
                        onClick={() => handleDeleteArt(a.id)}
                        className="btn-danger"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Trash2 size={13} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: PUSAT NOTIFIKASI
           ======================================================== */}
        {dashboardTab === 'notifikasi' && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'crit', 'warn', 'info'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setNotifFilter(f)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: notifFilter === f ? 'transparent' : 'var(--border-strong)',
                      background: notifFilter === f ? 'var(--grad)' : 'var(--card)',
                      color: notifFilter === f ? '#fff' : 'var(--txt)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {f === 'all' ? 'Semua' : f === 'crit' ? 'Kritis' : f === 'warn' ? 'Waspada' : 'Info'}
                  </button>
                ))}
              </div>

              <button
                onClick={onMarkAllAlertsRead}
                className="btn-ghost"
                style={{ padding: '7px 14px', fontSize: '12px' }}
              >
                Tandai Semua Sudah Dibaca
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {alerts
                .filter(a => notifFilter === 'all' || a.type === notifFilter)
                .map((a, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--card2)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ color: a.type === 'crit' ? '#ef4444' : a.type === 'warn' ? '#f59e0b' : 'var(--b)', marginTop: '2px' }}>
                      {a.type === 'crit' ? <AlertCircle size={18} /> : a.type === 'warn' ? <AlertTriangle size={18} /> : <Info size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>{a.title}</b>
                      <small style={{ color: 'var(--mut)', fontSize: '12px', lineHeight: 1.5, display: 'block', marginTop: '2px' }}>
                        {a.desc}
                      </small>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', whiteSpace: 'nowrap' }}>{a.t}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: PENGATURAN & BATAS AMAN
           ======================================================== */}
        {dashboardTab === 'pengaturan' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)', marginBottom: '14px' }}>
                Batas Aman Kualitas Air (Ambang Alarm)
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', marginBottom: '18px' }}>
                Aktuator aerator dan pompa akan otomatis bereaksi saat pembacaan sensor melintasi batas nilai ini.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px' }}>Suhu Air (°C)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      type="number" 
                      value={thresholds.temp[0]} 
                      onChange={e => setThresholds({ ...thresholds, temp: [parseFloat(e.target.value), thresholds.temp[1]] })}
                      style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                    />
                    <span>s/d</span>
                    <input 
                      type="number" 
                      value={thresholds.temp[1]} 
                      onChange={e => setThresholds({ ...thresholds, temp: [thresholds.temp[0], parseFloat(e.target.value)] })}
                      style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px' }}>Derajat Asam (pH)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      type="number" 
                      step="0.1"
                      value={thresholds.ph[0]} 
                      onChange={e => setThresholds({ ...thresholds, ph: [parseFloat(e.target.value), thresholds.ph[1]] })}
                      style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                    />
                    <span>s/d</span>
                    <input 
                      type="number" 
                      step="0.1"
                      value={thresholds.ph[1]} 
                      onChange={e => setThresholds({ ...thresholds, ph: [thresholds.ph[0], parseFloat(e.target.value)] })}
                      style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px' }}>Oksigen Minimal (DO mg/L)</span>
                  <input 
                    type="number" 
                    step="0.1"
                    value={thresholds.do[0]} 
                    onChange={e => setThresholds({ ...thresholds, do: [parseFloat(e.target.value), thresholds.do[1]] })}
                    style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px' }}>Amonia Maksimal (NH3 ppm)</span>
                  <input 
                    type="number" 
                    step="0.05"
                    value={thresholds.nh3[1]} 
                    onChange={e => setThresholds({ ...thresholds, nh3: [thresholds.nh3[0], parseFloat(e.target.value)] })}
                    style={{ width: '65px', padding: '6px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                  />
                </div>
              </div>

              <button
                onClick={() => onShowToast('Batas aman telemetri diperbarui & disimpan.', 'ok')}
                className="btn-primary"
                style={{ width: '100%', marginTop: '20px', padding: '11px' }}
              >
                <Save size={16} />
                <span>Simpan Batas Aman</span>
              </button>
            </div>

            {/* Export & Data Management */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)', marginBottom: '14px' }}>
                Ekspor Telemetri & Integrasi
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', marginBottom: '20px' }}>
                Unduh seluruh rekaman log sensor kualitas air 48 titik dalam format spreadsheet CSV.
              </p>

              <button
                onClick={handleExportCSV}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', marginBottom: '14px' }}
              >
                <Download size={16} />
                <span>Unduh Log Telemetri (CSV)</span>
              </button>

              <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--card2)', fontSize: '12px', color: 'var(--mut)', lineHeight: 1.6 }}>
                ✅ <b>WhatsApp Alert Bot:</b> Aktif pada nomor +62 812-3456-7890<br />
                ✅ <b>Sinkronisasi Cloud:</b> Otomatis setiap 2 detik saat online
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: TAMBAH PERANGKAT (PAIRING)
         ======================================================== */}
      {pairModalOpen && (
        <div className="modal-backdrop" onClick={() => setPairModalOpen(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                Tambah Sensor Node Baru
              </h3>
              <button 
                onClick={() => setPairModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mut)' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '18px' }}>
              Masukkan 6 digit kode pairing yang tertera pada casing perangkat node sensor ESP32 Anda.
            </p>

            <form onSubmit={handlePairSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Kode Pairing Node
                </label>
                <input
                  type="text"
                  placeholder="Contoh: ESP-A3"
                  value={pairCode}
                  onChange={e => setPairCode(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Penempatan Kolam
                </label>
                <select
                  value={pairPond}
                  onChange={e => setPairPond(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '14px'
                  }}
                >
                  {ponds.map(p => (
                    <option key={p.id} value={p.name}>{p.name} ({p.type})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setPairModalOpen(false)} className="btn-ghost" style={{ flex: 1 }}>
                  Batal
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Pasangkan Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CMS PRODUK (ADD/EDIT)
         ======================================================== */}
      {prodFormOpen && (
        <div className="modal-backdrop" onClick={() => setProdFormOpen(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                {editingProdId ? 'Ubah Data Produk' : 'Tambah Produk Baru'}
              </h3>
              <button 
                onClick={() => setProdFormOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mut)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={prodForm.nama}
                  onChange={e => setProdForm({ ...prodForm, nama: e.target.value })}
                  required
                  placeholder="Contoh: Nila Segar Grade A"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div className="form-grid-2col">
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={prodForm.harga}
                    onChange={e => setProdForm({ ...prodForm, harga: e.target.value })}
                    required
                    placeholder="38000"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                    Satuan
                  </label>
                  <input
                    type="text"
                    value={prodForm.satuan}
                    onChange={e => setProdForm({ ...prodForm, satuan: e.target.value })}
                    placeholder="/kg atau /ekor"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Kategori
                </label>
                <select
                  value={prodForm.kategori}
                  onChange={e => setProdForm({ ...prodForm, kategori: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                >
                  <option value="Ikan Konsumsi">Ikan Konsumsi</option>
                  <option value="Olahan Siap Masak">Olahan Siap Masak</option>
                  <option value="Benih Unggul">Benih Unggul</option>
                  <option value="Peralatan Bioflok">Peralatan Bioflok</option>
                  <option value="Perangkat IoT">Perangkat IoT</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={prodForm.desk}
                  onChange={e => setProdForm({ ...prodForm, desk: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Fitur Unggulan (pisahkan dengan tanda |)
                </label>
                <input
                  type="text"
                  value={prodForm.feats}
                  onChange={e => setProdForm({ ...prodForm, feats: e.target.value })}
                  placeholder="Dipanen pagi | Bersihkan gratis | Bebas bau lumpur"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.pop}
                    onChange={e => setProdForm({ ...prodForm, pop: e.target.checked })}
                  />
                  <span>Tandai Produk Unggulan</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.stok === 'ada'}
                    onChange={e => setProdForm({ ...prodForm, stok: e.target.checked ? 'ada' : 'habis' })}
                  />
                  <span>Stok Tersedia</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setProdFormOpen(false)} className="btn-ghost" style={{ flex: 1 }}>
                  Batal
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CMS ARTIKEL (ADD/EDIT)
         ======================================================== */}
      {artFormOpen && (
        <div className="modal-backdrop" onClick={() => setArtFormOpen(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                {editingArtId ? 'Ubah Artikel' : 'Tulis Artikel Baru'}
              </h3>
              <button 
                onClick={() => setArtFormOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mut)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveArt} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Judul Artikel
                </label>
                <input
                  type="text"
                  value={artForm.judul}
                  onChange={e => setArtForm({ ...artForm, judul: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  URL Gambar Header
                </label>
                <input
                  type="text"
                  value={artForm.img}
                  onChange={e => setArtForm({ ...artForm, img: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Ringkasan Singkat
                </label>
                <input
                  type="text"
                  value={artForm.ringkas}
                  onChange={e => setArtForm({ ...artForm, ringkas: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Isi Artikel (Tekan Enter dua kali untuk paragraf baru)
                </label>
                <textarea
                  rows={6}
                  value={artForm.isi}
                  onChange={e => setArtForm({ ...artForm, isi: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--txt)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setArtFormOpen(false)} className="btn-ghost" style={{ flex: 1 }}>
                  Batal
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Terbitkan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FULL-SIZE PREVIEW BUKTI BAYAR */}
      {selectedProofOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedProofOrder(null)}>
          <div 
            className="modal-dialog" 
            style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <b style={{ fontSize: '15px', color: 'var(--txt)' }}>
                  Bukti Pembayaran #{selectedProofOrder.id}
                </b>
                <small style={{ display: 'block', color: 'var(--mut)', fontSize: '12px' }}>
                  {selectedProofOrder.pelanggan} • Rp{Number(selectedProofOrder.total).toLocaleString('id-ID')} ({selectedProofOrder.metode})
                </small>
              </div>
              <button 
                onClick={() => setSelectedProofOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--txt)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto', textAlign: 'center', borderRadius: '12px', background: '#07152b', padding: '12px' }}>
              <img 
                src={selectedProofOrder.buktiBayar} 
                alt="Bukti Transfer Penuh" 
                style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  handleUpdateOrderStatus(selectedProofOrder.id, 'Dikonfirmasi');
                  setSelectedProofOrder(null);
                }}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '12.5px', background: '#22c55e', border: 'none' }}
              >
                <Check size={14} />
                <span>Konfirmasi Pembayaran Lunas</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedProofOrder(null)}
                className="btn-ghost"
                style={{ padding: '8px 16px', fontSize: '12.5px' }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
