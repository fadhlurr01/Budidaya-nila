import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Upload, 
  Image, 
  CheckCircle2, 
  CreditCard, 
  Building, 
  Smartphone,
  ExternalLink,
  Receipt,
  User,
  Package,
  Lock,
  UserPlus,
  ShieldCheck,
  Sparkles,
  LogIn,
  LogOut
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  onPlaceOrder,
  onShowToast,
  customerUser = null,
  onOpenCustomerAuth,
  onCustomerLogin,
  onCustomerLogout,
  onOpenOrderTracking
}) {
  // Order Mode: 'website' (Unggah bukti bayar & masuk admin) | 'whatsapp' (Chat WA langsung)
  const [orderMode, setOrderMode] = useState('website');

  const [customer, setCustomer] = useState({
    name: customerUser?.name || '',
    phone: customerUser?.phone || '',
    address: customerUser?.address || '',
    payment: 'Transfer Bank BCA (138-049-2810)',
    notes: ''
  });

  // Auto-sync customer profile data when customerUser changes or drawer opens
  React.useEffect(() => {
    if (customerUser) {
      setCustomer(prev => ({
        ...prev,
        name: prev.name || customerUser.name || '',
        phone: prev.phone || customerUser.phone || '',
        address: prev.address || customerUser.address || ''
      }));
    }
  }, [customerUser, isOpen]);

  const [selectedAdmin, setSelectedAdmin] = useState('admin1');
  const [proofImage, setProofImage] = useState(null); // base64 preview
  const [proofFileName, setProofFileName] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const formatRupiah = (val) => {
    return 'Rp' + Number(val || 0).toLocaleString('id-ID');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.harga || 0) * item.qty), 0);

  // Handle proof upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onShowToast) onShowToast('File harus berupa foto/gambar (JPG, PNG, atau WEBP).', 'bad');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      if (onShowToast) onShowToast('Ukuran file maksimal 5 MB.', 'bad');
      return;
    }

    setProofFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setProofImage(event.target.result);
      if (onShowToast) onShowToast('Bukti pembayaran berhasil diunggah.', 'ok');
    };
    reader.readAsDataURL(file);
  };

  // Handle Checkout
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      if (onShowToast) onShowToast('Keranjang belanja masih kosong.', 'bad');
      return;
    }

    // WAJIB LOGIN / BUAT AKUN SEPERTI DI MARKETPLACE (SHOPEE)
    if (!customerUser) {
      if (onShowToast) onShowToast('Wajib masuk atau buat akun terlebih dahulu untuk melanjutkan pemesanan!', 'bad');
      if (onOpenCustomerAuth) onOpenCustomerAuth('register');
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      if (onShowToast) onShowToast('Harap lengkapi nama lengkap, nomor WhatsApp, dan alamat pengiriman.', 'bad');
      return;
    }

    // MODE 1: PESAN LANGSUNG DI WEBSITE DENGAN BUKTI PEMBAYARAN
    if (orderMode === 'website') {
      const isTransfer = customer.payment.includes('Transfer') || customer.payment.includes('QRIS');
      if (isTransfer && !proofImage) {
        if (onShowToast) onShowToast('Wajib mengunggah foto / tangkapan layar bukti transfer pembayaran.', 'bad');
        return;
      }

      setIsSubmitting(true);

      const d = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const pad = n => (n < 10 ? '0' : '') + n;
      const dateStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())} WIB`;

      const invoiceId = 'NF-' + Date.now().toString().slice(-6);

      const newOrder = {
        id: invoiceId,
        tanggal: dateStr,
        userId: customerUser?.id || null,
        customerEmail: customerUser?.email || '',
        pelanggan: customer.name.trim(),
        telepon: customer.phone.trim(),
        alamat: customer.address.trim(),
        items: cartItems.map(item => ({
          id: item.id,
          nama: item.nama,
          qty: item.qty,
          harga: item.harga,
          satuan: item.satuan
        })),
        total: totalPrice,
        metode: customer.payment,
        catatan: customer.notes.trim() || '-',
        status: 'Menunggu Konfirmasi',
        buktiBayar: proofImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
      };

      if (onPlaceOrder) {
        onPlaceOrder(newOrder);
      }

      setCompletedOrder(newOrder);
      onClearCart();
      setIsSubmitting(false);

      if (onShowToast) {
        onShowToast(`Pesanan #${invoiceId} berhasil dibuat dan diteruskan ke Admin Farm!`, 'ok');
      }
      return;
    }

    // MODE 2: PESAN VIA WHATSAPP
    const itemsSummary = cartItems
      .map((item, idx) => `${idx + 1}. ${item.nama} × ${item.qty} = ${formatRupiah(item.harga * item.qty)}`)
      .join('\n');

    const adminName = selectedAdmin === 'admin2' ? 'Admin 2 (CS Pemesanan)' : 'Admin 1 (Hamdan Russ)';
    const targetPhone = selectedAdmin === 'admin2' ? '6282122319510' : '6281382570406';

    const msg = encodeURIComponent(
      `*PESANAN BARU NILAFARM SUMEDANG*\n` +
      `Tujuan: ${adminName}\n\n` +
      `*Data Pelanggan:*\n` +
      `Nama: ${customer.name}\n` +
      `WhatsApp: ${customer.phone}\n` +
      `Alamat: ${customer.address}\n` +
      `Metode Bayar: ${customer.payment}\n` +
      (customer.notes ? `Catatan: ${customer.notes}\n\n` : `\n`) +
      `*Rincian Pesanan:*\n` +
      `${itemsSummary}\n\n` +
      `*TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}*\n\n` +
      `Mohon info konfirmasi jadwal panen & pengantarannya. Terima kasih!`
    );

    window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
    if (onShowToast) onShowToast(`Membuka WhatsApp ke ${adminName}...`, 'ok');
    onClose();
  };

  const getItemImage = (item) => {
    if (item.img) return item.img;
    const map = {
      'p1': '/assets/products/nila-segar.jpg',
      'p2': '/assets/products/nila-fillet.jpg',
      'p3': '/assets/products/benih-nila.jpg',
      'p4': '/assets/products/kolam-d4.jpg',
      'p5': '/assets/products/sensor-iot.jpg',
      'p6': '/assets/products/auto-feeder.jpg',
      'p7': '/assets/products/nila-bumbu.jpg',
      'p8': '/assets/products/pakan-nila.jpg',
      'p9': '/assets/products/probiotik-bioflok.jpg',
      'p10': '/assets/products/kolam-d3.jpg'
    };
    return map[item.id] || '/assets/products/nila-segar.jpg';
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={() => {
        if (completedOrder) setCompletedOrder(null);
        onClose();
      }}
    >
      <div 
        className="modal-dialog cart-modal"
        style={{ 
          maxWidth: '540px', 
          width: '100%', 
          boxSizing: 'border-box',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--b)" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
              {completedOrder ? 'Pesanan Berhasil Dibuat' : `Keranjang Belanja (${cartItems.reduce((acc, i) => acc + i.qty, 0)} item)`}
            </h3>
          </div>
          <button 
            onClick={() => {
              if (completedOrder) setCompletedOrder(null);
              onClose();
            }}
            style={{
              background: 'var(--card2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--txt)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* SUKSES ORDER VIEW */}
        {completedOrder ? (
          <div style={{ padding: '16px 4px', textAlign: 'center', overflowY: 'auto' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'rgba(34, 197, 94, 0.12)', 
                color: '#16a34a',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px' 
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', marginBottom: '6px' }}>
              Pesanan Anda Telah Terkirim!
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--mut)', marginBottom: '20px', lineHeight: 1.5 }}>
              Data pesanan dan bukti pembayaran berhasil diunggah ke sistem NilaFarm. Admin kami akan segera memeriksa & memproses pengiriman Anda.
            </p>

            {/* Invoice Summary Box */}
            <div 
              style={{ 
                background: 'var(--card2)', 
                borderRadius: '16px', 
                padding: '18px', 
                border: '1px solid var(--border)', 
                textAlign: 'left',
                marginBottom: '22px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--mut)' }}>No. Invoice:</span>
                <b style={{ color: 'var(--b)' }}>#{completedOrder.id}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--mut)' }}>Nama Pemesan:</span>
                <b style={{ color: 'var(--txt)' }}>{completedOrder.pelanggan}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--mut)' }}>Total Pembayaran:</span>
                <b style={{ color: 'var(--p)', fontSize: '15px' }}>{formatRupiah(completedOrder.total)}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--mut)' }}>Metode Bayar:</span>
                <span style={{ color: 'var(--txt)', fontWeight: 600 }}>{completedOrder.metode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--mut)' }}>Status Pesanan:</span>
                <span style={{ color: '#d97706', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '11.5px' }}>
                  {completedOrder.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <button
                type="button"
                onClick={() => {
                  const savedId = completedOrder.id;
                  setCompletedOrder(null);
                  onClose();
                  if (onOpenOrderTracking) {
                    onOpenOrderTracking(savedId);
                  }
                }}
                className="btn-primary"
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--grad)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <Package size={17} />
                <span>Pantau & Lacak Status Pesanan #{completedOrder.id}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(
                    `Halo Admin NilaFarm, saya telah melakukan pemesanan #${completedOrder.id} a.n ${completedOrder.pelanggan} sebesar ${formatRupiah(completedOrder.total)}. Mohon konfirmasinya ya. Terima kasih!`
                  );
                  window.open(`https://wa.me/6281382570406?text=${text}`, '_blank');
                }}
                className="btn-primary"
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#22c55e',
                  border: 'none',
                  color: '#ffffff'
                }}
              >
                <Smartphone size={16} />
                <span>Konfirmasi via WhatsApp ke Admin</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                className="btn-ghost"
                style={{ padding: '11px', fontSize: '13px' }}
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <ShoppingBag size={48} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '12px' }} />
            <p style={{ color: 'var(--txt)', fontWeight: 600 }}>Keranjang belanja Anda masih kosong</p>
            <p style={{ color: 'var(--mut)', fontSize: '13px' }}>Pilih produk ikan segar atau paket tambak di atas.</p>
          </div>
        ) : (
          <div style={{ overflowY: 'auto', paddingRight: '2px' }}>
            {/* Cart Item List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', marginBottom: '14px', paddingRight: '2px' }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '14px',
                    background: 'var(--card2)',
                    border: '1px solid var(--border)',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 180px', minWidth: 0 }}>
                    <img 
                      src={getItemImage(item)} 
                      alt={item.nama}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid var(--border)'
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.nama}
                      </b>
                      <small style={{ color: 'var(--mut)', fontSize: '11px' }}>
                        {formatRupiah(item.harga)} {item.satuan}
                      </small>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
                    {/* Qty controls */}
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'var(--card)',
                        borderRadius: '6px',
                        padding: '2px 5px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--txt)', display: 'flex', padding: 0 }}
                        aria-label="Kurangi kuantitas"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--txt)', display: 'flex', padding: 0 }}
                        aria-label="Tambah kuantitas"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--p)', minWidth: '65px', textAlign: 'right' }}>
                      {formatRupiah(item.harga * item.qty)}
                    </span>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: '2px'
                      }}
                      aria-label="Hapus item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Clear Cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--border)', marginBottom: '14px' }}>
              <button
                onClick={onClearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--mut)',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Kosongkan Keranjang
              </button>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>Total Pembayaran: </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--p)' }}>
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            {/* CHECKOUT AUTHENTICATION GATE (MARKETPLACE SHOPEE / TOKOPEDIA STYLE) */}
            {!customerUser ? (
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.09) 0%, rgba(13, 71, 161, 0.04) 100%)', 
                  borderRadius: '18px', 
                  border: '1.5px dashed var(--b)', 
                  padding: '24px 18px',
                  textAlign: 'center',
                  marginTop: '6px',
                  marginBottom: '10px'
                }}
              >
                <div 
                  style={{ 
                    width: '54px', 
                    height: '54px', 
                    borderRadius: '50%', 
                    background: 'rgba(33, 150, 243, 0.15)', 
                    color: 'var(--b)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 12px' 
                  }}
                >
                  <Lock size={26} />
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>
                  Wajib Masuk / Buat Akun untuk Memesan
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: '0 0 16px', lineHeight: 1.5, maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Seperti di Shopee & marketplace resmi, Anda wajib masuk atau mendaftar akun terlebih dahulu agar pesanan terverifikasi, tersimpan di sistem, dan status pengiriman dapat dilacak secara realtime.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (onOpenCustomerAuth) onOpenCustomerAuth('login');
                    }}
                    className="btn-primary"
                    style={{
                      padding: '12px 16px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'var(--grad)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(33, 150, 243, 0.3)'
                    }}
                  >
                    <LogIn size={16} />
                    <span>Masuk ke Akun Saya</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => {
                      if (onOpenCustomerAuth) onOpenCustomerAuth('register');
                    }}
                    className="btn-ghost"
                    style={{
                      padding: '11px 16px',
                      fontSize: '13px',
                      fontWeight: 700,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '1.5px solid var(--b)',
                      color: 'var(--p)',
                      background: 'var(--card)'
                    }}
                  >
                    <UserPlus size={16} />
                    <span>Belum Punya Akun? Buat Akun Baru</span>
                  </button>

                  {/* 1-Click Quick Demo Account Login */}
                  <button 
                    type="button" 
                    onClick={() => {
                      const demoUser = {
                        id: 'usr_demo_101',
                        name: 'H. Ridwan Kosasih',
                        email: 'ridwan.sumedang@gmail.com',
                        phone: '081298452311',
                        address: 'Jl. Mayor Abdurahman No. 45, Kotakaler, Sumedang Utara'
                      };
                      if (onCustomerLogin) {
                        onCustomerLogin(demoUser);
                      }
                    }}
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px dashed #f59e0b',
                      borderRadius: '10px',
                      padding: '9px 12px',
                      fontSize: '12px',
                      color: '#b45309',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      marginTop: '4px'
                    }}
                  >
                    <Sparkles size={14} color="#f59e0b" />
                    <span>⚡ Quick Demo: Masuk 1-Klik sebagai Pelanggan Demo</span>
                  </button>
                </div>

                <div style={{ marginTop: '14px', fontSize: '11px', color: 'var(--mut)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} color="#16a34a" />
                  <span>Item dalam keranjang tetap tersimpan aman saat Anda masuk.</span>
                </div>
              </div>
            ) : (
              <div>
                {/* ACTIVE CUSTOMER ACCOUNT INFO */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '10px 12px', 
                    background: 'rgba(33, 150, 243, 0.08)', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(33, 150, 243, 0.25)', 
                    marginBottom: '12px',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: 0 }}>
                    <div 
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        background: 'var(--b)', 
                        color: '#fff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 800, 
                        fontSize: '13px',
                        flexShrink: 0
                      }}
                    >
                      {customerUser.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{customerUser.name}</span>
                        <CheckCircle2 size={13} color="#16a34a" />
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--mut)' }}>
                        {customerUser.phone || customerUser.email}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button 
                      type="button" 
                      onClick={() => {
                        onClose();
                        if (onOpenOrderTracking) onOpenOrderTracking();
                      }}
                      style={{ 
                        fontSize: '11px', 
                        color: 'var(--p)', 
                        fontWeight: 700, 
                        background: 'var(--card)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '8px', 
                        padding: '4px 8px', 
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Lacak Pesanan
                    </button>
                    {onCustomerLogout && (
                      <button 
                        type="button" 
                        onClick={onCustomerLogout}
                        title="Ganti Akun"
                        style={{ 
                          fontSize: '11px', 
                          color: 'var(--mut)', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px'
                        }}
                      >
                        <LogOut size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {/* ORDER METHOD TABS (Website vs WhatsApp) */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                    Pilih Cara Pemesanan:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setOrderMode('website')}
                      style={{
                        padding: '9px 10px',
                        borderRadius: '12px',
                        border: orderMode === 'website' ? '1.5px solid var(--b)' : '1px solid var(--border)',
                        background: orderMode === 'website' ? 'rgba(33, 150, 243, 0.12)' : 'var(--card2)',
                        color: orderMode === 'website' ? 'var(--p)' : 'var(--txt)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Receipt size={16} />
                      <span>Pesan di Web (Upload Bukti)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderMode('whatsapp')}
                      style={{
                        padding: '9px 10px',
                        borderRadius: '12px',
                        border: orderMode === 'whatsapp' ? '1.5px solid #22c55e' : '1px solid var(--border)',
                        background: orderMode === 'whatsapp' ? 'rgba(34, 197, 94, 0.12)' : 'var(--card2)',
                        color: orderMode === 'whatsapp' ? '#15803d' : 'var(--txt)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Send size={16} />
                      <span>Pesan Cepat via WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* FORM CHECKOUT */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="cart-form-row">
                    <input
                      type="text"
                      placeholder="Nama Lengkap *"
                      value={customer.name}
                      onChange={e => setCustomer({ ...customer, name: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        minWidth: 0,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card2)',
                        color: 'var(--txt)',
                        fontSize: '12.5px'
                      }}
                    />

                    <input
                      type="text"
                      placeholder="No. WhatsApp (08...)*"
                      value={customer.phone}
                      onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        minWidth: 0,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card2)',
                        color: 'var(--txt)',
                        fontSize: '12.5px'
                      }}
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Alamat Lengkap Pengiriman (Kota/Kecamatan/Patokan Rumah) *"
                    value={customer.address}
                    onChange={e => setCustomer({ ...customer, address: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      minWidth: 0,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '12.5px',
                      resize: 'none'
                    }}
                  />

                  <div className="cart-form-row">
                    <select
                      value={customer.payment}
                      onChange={e => setCustomer({ ...customer, payment: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        minWidth: 0,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card2)',
                        color: 'var(--txt)',
                        fontSize: '12.5px'
                      }}
                    >
                      <option value="Transfer Bank BCA (138-049-2810)">Transfer BCA (138-049-2810)</option>
                      <option value="Transfer Bank Mandiri (182-000-482-9102)">Transfer Mandiri (182-000-482-9102)</option>
                      <option value="QRIS NilaFarm (Semua E-Wallet/Bank)">QRIS (Gopay/OVO/Dana/BCA)</option>
                      <option value="Bayar di Tempat (COD Sumedang)">COD (Bayar di Tempat)</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Catatan (cth: bersihkan sisik)"
                      value={customer.notes}
                      onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        minWidth: 0,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card2)',
                        color: 'var(--txt)',
                        fontSize: '12.5px'
                      }}
                    />
                  </div>

                  {/* JIKA MEMILIH MODE 1: PESAN DI WEBSITE (Unggah Bukti Pembayaran) */}
                  {orderMode === 'website' && (
                    <div 
                      style={{ 
                        background: 'var(--card2)', 
                        borderRadius: '14px', 
                        padding: '14px', 
                        border: '1px solid var(--border)',
                        marginTop: '2px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <CreditCard size={16} color="var(--b)" />
                        <b style={{ fontSize: '12.5px', color: 'var(--txt)' }}>
                          Rekening Resmi NilaFarm (a.n. Hamdan Russ):
                        </b>
                      </div>
                      
                      <div style={{ fontSize: '12px', color: 'var(--txt)', lineHeight: 1.5, marginBottom: '12px', background: 'var(--card)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                        <div>• <b>BCA</b>: <code>138-049-2810</code></div>
                        <div>• <b>Mandiri</b>: <code>182-000-482-9102</code></div>
                        <div style={{ marginTop: '4px', color: 'var(--p)', fontWeight: 700 }}>
                          Total Transfer: {formatRupiah(totalPrice)}
                        </div>
                      </div>

                      {/* Upload Box */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '6px' }}>
                          Unggah Bukti Transfer / Struk Pembayaran *
                        </label>

                        {proofImage ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--card)', padding: '8px 12px', borderRadius: '10px', border: '1px solid #22c55e' }}>
                            <img 
                              src={proofImage} 
                              alt="Bukti Transfer" 
                              style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} 
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={13} />
                                <span>Bukti Siap Diunggah</span>
                              </div>
                              <small style={{ fontSize: '11px', color: 'var(--mut)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {proofFileName || 'bukti-transfer.jpg'}
                              </small>
                            </div>
                            <button
                              type="button"
                              onClick={() => { setProofImage(null); setProofFileName(''); }}
                              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                            >
                              Ganti
                            </button>
                          </div>
                        ) : (
                          <label 
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '16px 12px',
                              borderRadius: '10px',
                              border: '2px dashed var(--b)',
                              background: 'var(--card)',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            <Upload size={20} color="var(--b)" />
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--b)' }}>
                              Klik untuk Unggah Foto Bukti Transfer
                            </span>
                            <small style={{ fontSize: '11px', color: 'var(--mut)' }}>
                              Format JPG / PNG / WebP (Maks. 5MB)
                            </small>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                  {/* JIKA MEMILIH MODE 2: PESAN VIA WHATSAPP */}
                  {orderMode === 'whatsapp' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--txt)' }}>
                        Kirim Pesanan ke Admin Farm:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedAdmin('admin1')}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '10px',
                            border: selectedAdmin === 'admin1' ? '1.5px solid var(--b)' : '1px solid var(--border)',
                            background: selectedAdmin === 'admin1' ? 'rgba(33, 150, 243, 0.12)' : 'var(--card2)',
                            color: selectedAdmin === 'admin1' ? 'var(--p)' : 'var(--txt)',
                            fontSize: '11px',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                          }}
                        >
                          <div style={{ fontWeight: 700 }}>Admin 1: Hamdan Russ</div>
                          <div style={{ fontSize: '10px', color: 'var(--mut)', marginTop: '2px' }}>0813-8257-0406</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedAdmin('admin2')}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '10px',
                            border: selectedAdmin === 'admin2' ? '1.5px solid var(--b)' : '1px solid var(--border)',
                            background: selectedAdmin === 'admin2' ? 'rgba(33, 150, 243, 0.12)' : 'var(--card2)',
                            color: selectedAdmin === 'admin2' ? 'var(--p)' : 'var(--txt)',
                            fontSize: '11px',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                          }}
                        >
                          <div style={{ fontWeight: 700 }}>Admin 2: CS Pemesanan</div>
                          <div style={{ fontSize: '10px', color: 'var(--mut)', marginTop: '2px' }}>0821-2231-9510</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      padding: '12px 16px',
                      fontSize: '13.5px',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      boxSizing: 'border-box',
                      background: orderMode === 'website' ? 'var(--grad)' : '#22c55e',
                      border: 'none',
                      color: '#ffffff',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {orderMode === 'website' ? (
                      <>
                        <Receipt size={16} />
                        <span>Kirim Pesanan & Bukti Bayar ({formatRupiah(totalPrice)})</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Kirim Pesanan ke WhatsApp ({formatRupiah(totalPrice)})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
