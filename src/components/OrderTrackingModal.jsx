import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink,
  Receipt,
  User,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
  Edit3
} from 'lucide-react';

export default function OrderTrackingModal({ 
  isOpen, 
  onClose, 
  orders = [], 
  customerUser = null,
  initialOrderId = null,
  onOpenCustomerAuth,
  onCustomerLogout,
  onShowToast 
}) {
  const [activeTab, setActiveTab] = useState('track'); // 'track' | 'orders' | 'account'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  useEffect(() => {
    if (customerUser?.address) {
      setAddressInput(customerUser.address);
    }
  }, [customerUser]);

  useEffect(() => {
    if (initialOrderId && orders.length > 0) {
      const match = orders.find(o => o.id === initialOrderId);
      if (match) setSelectedOrder(match);
      setActiveTab('track');
    }
  }, [initialOrderId, orders]);

  if (!isOpen) return null;

  // Filter orders for this user OR by search query
  const userOrders = orders.filter(o => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        o.id.toLowerCase().includes(q) ||
        (o.telepon || '').includes(q) ||
        (o.pelanggan || '').toLowerCase().includes(q)
      );
    }

    if (customerUser) {
      return (
        (o.telepon && customerUser.phone && o.telepon === customerUser.phone) ||
        (o.pelanggan && customerUser.name && o.pelanggan.toLowerCase().includes(customerUser.name.toLowerCase()))
      );
    }

    return true; // if no user and no search query, show all recent orders
  });

  const activeOrder = selectedOrder || userOrders[0] || null;

  // Timeline Step Tracker calculation ("Track Dimana")
  const getTimelineSteps = (status) => {
    let currentStep = 1;
    if (status === 'Menunggu Konfirmasi') currentStep = 1;
    else if (status === 'Dikonfirmasi') currentStep = 2;
    else if (status === 'Sedang Dikirim') currentStep = 4;
    else if (status === 'Selesai') currentStep = 5;

    return [
      {
        step: 1,
        title: 'Pesanan Diterima Sistem',
        desc: 'Rincian belanja & bukti pembayaran masuk ke antrean farm.',
        active: currentStep >= 1,
        current: currentStep === 1
      },
      {
        step: 2,
        title: 'Verifikasi Pembayaran',
        desc: 'Admin farm mengonfirmasi pembayaran dan menjadwalkan panen.',
        active: currentStep >= 2,
        current: currentStep === 2
      },
      {
        step: 3,
        title: 'Ikan Dipanen & Dikemas Higienis',
        desc: 'Ikan nila segar diserok dari kolam bioflok, dibersihkan sisik & dikemas coolbox.',
        active: currentStep >= 3 || currentStep >= 4,
        current: currentStep === 3
      },
      {
        step: 4,
        title: 'Dalam Pengiriman (Armada NilaFarm)',
        desc: 'Kurir sedang dalam perjalanan meluncur ke alamat tujuan Anda.',
        active: currentStep >= 4,
        current: currentStep === 4
      },
      {
        step: 5,
        title: 'Tiba di Lokasi & Selesai',
        desc: 'Ikan nila segar telah sampai dengan kualitas prima bebas bau lumpur.',
        active: currentStep >= 5,
        current: currentStep === 5
      }
    ];
  };

  const handleContactDriver = (order) => {
    if (!order) return;
    const msg = encodeURIComponent(
      `Halo Admin NilaFarm, saya ingin menanyakan posisi pengiriman pesanan #${order.id} atas nama ${order.pelanggan}. Terima kasih!`
    );
    window.open(`https://wa.me/6281382570406?text=${msg}`, '_blank');
  };

  const handleSaveAddress = () => {
    if (!customerUser) return;
    const updatedUser = { ...customerUser, address: addressInput.trim() };
    try {
      localStorage.setItem('nilafarm_customer_session', JSON.stringify(updatedUser));
      const savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
      const idx = savedUsers.findIndex(u => u.phone === customerUser.phone || u.email === customerUser.email);
      if (idx !== -1) {
        savedUsers[idx] = { ...savedUsers[idx], address: addressInput.trim() };
        localStorage.setItem('nilafarm_users', JSON.stringify(savedUsers));
      }
    } catch {}
    setEditingAddress(false);
    if (onShowToast) onShowToast('Alamat pengiriman berhasil diperbarui!', 'ok');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-dialog" 
        style={{ 
          maxWidth: '680px', 
          width: '95%', 
          maxHeight: '92vh', 
          display: 'flex', 
          flexDirection: 'column', 
          boxSizing: 'border-box',
          borderRadius: '24px',
          padding: 'clamp(16px, 3vw, 24px)',
          background: 'var(--card)',
          border: '1.5px solid var(--border)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: 'rgba(33, 150, 243, 0.14)', 
                color: 'var(--b)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Package size={22} />
            </div>
            <div>
              <b style={{ fontSize: '16.5px', color: 'var(--txt)', display: 'block', lineHeight: 1.2 }}>
                Status Pembelian & Lacak Pesanan
              </b>
              <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                {customerUser ? `Akun: ${customerUser.name} (${customerUser.phone})` : 'Pantau posisi armada kurir dan rincian belanja Anda'}
              </small>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            aria-label="Tutup Modal"
            style={{
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--txt)',
              flexShrink: 0
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* 3 Main Navigation Tabs: Lacak Pesanan, Rincian Belanja, Keterangan Akun */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--card2)',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
            marginBottom: '16px',
            border: '1px solid var(--border)'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            style={{
              padding: '8px 10px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'track' ? 'var(--b)' : 'transparent',
              color: activeTab === 'track' ? '#ffffff' : 'var(--txt)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Truck size={14} />
            <span>Track Posisi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '8px 10px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'orders' ? 'var(--b)' : 'transparent',
              color: activeTab === 'orders' ? '#ffffff' : 'var(--txt)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <ShoppingBag size={14} />
            <span>Belanjaan ({userOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('account')}
            style={{
              padding: '8px 10px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'account' ? 'var(--b)' : 'transparent',
              color: activeTab === 'account' ? '#ffffff' : 'var(--txt)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <User size={14} />
            <span>Akun Saya</span>
          </button>
        </div>

        {/* Not Logged In Banner (Prompt to Login / Register) */}
        {!customerUser && (
          <div 
            style={{
              padding: '10px 14px',
              borderRadius: '14px',
              background: 'rgba(33, 150, 243, 0.08)',
              border: '1px solid rgba(33, 150, 243, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--txt)' }}>
              Belum masuk? Buat akun untuk otomatis menyimpan riwayat belanja & alamat Anda.
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenCustomerAuth) onOpenCustomerAuth('login');
              }}
              className="btn-primary"
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                cursor: 'pointer'
              }}
            >
              Masuk / Buat Akun
            </button>
          </div>
        )}

        {/* Search Bar for Invoices or Phone Number */}
        {activeTab !== 'account' && (
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text"
              placeholder="Cari No. Invoice (#NF-...) atau No. WhatsApp pemesan..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 14px 10px 36px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--card2)',
                color: 'var(--txt)',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Modal Scrollable Content Body */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '2px', boxSizing: 'border-box' }}>
          
          {/* TAB 1: TRACK DIMANA (REAL-TIME LIVE TIMELINE & ARMADA KURIR) */}
          {activeTab === 'track' && (
            <div>
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--card2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <Package size={38} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '8px' }} />
                  <b style={{ display: 'block', fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>
                    Belum Ada Pesanan yang Dilacak
                  </b>
                  <p style={{ color: 'var(--mut)', fontSize: '12px', margin: '0 0 14px', lineHeight: 1.5 }}>
                    Silakan pilih produk panen ikan nila segar di katalog, lalu lakukan pemesanan untuk melacak posisi pengiriman.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Order Pills if user has multiple orders */}
                  {userOrders.length > 1 && (
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
                      {userOrders.map(ord => {
                        const isSel = (activeOrder?.id === ord.id);
                        return (
                          <button
                            key={ord.id}
                            type="button"
                            onClick={() => setSelectedOrder(ord)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '9999px',
                              border: isSel ? '1.5px solid var(--b)' : '1px solid var(--border)',
                              background: isSel ? 'var(--b)' : 'var(--card2)',
                              color: isSel ? '#ffffff' : 'var(--txt)',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            #{ord.id} • {ord.status}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeOrder && (
                    <div>
                      {/* Active Order Card */}
                      <div 
                        style={{ 
                          background: 'var(--card2)', 
                          borderRadius: '16px', 
                          padding: '16px', 
                          border: '1px solid var(--border)',
                          marginBottom: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 700, textTransform: 'uppercase' }}>
                              Nomor Pesanan
                            </span>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--b)' }}>
                              #{activeOrder.id}
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span 
                              style={{
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontSize: '11.5px',
                                fontWeight: 800,
                                background: activeOrder.status === 'Menunggu Konfirmasi' ? 'rgba(245, 158, 11, 0.15)' :
                                  activeOrder.status === 'Dikonfirmasi' ? 'rgba(2, 132, 199, 0.15)' :
                                  activeOrder.status === 'Sedang Dikirim' ? 'rgba(79, 70, 229, 0.15)' :
                                  activeOrder.status === 'Selesai' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: activeOrder.status === 'Menunggu Konfirmasi' ? '#d97706' :
                                  activeOrder.status === 'Dikonfirmasi' ? '#0284c7' :
                                  activeOrder.status === 'Sedang Dikirim' ? '#4f46e5' :
                                  activeOrder.status === 'Selesai' ? '#16a34a' : '#ef4444'
                              }}
                            >
                              {activeOrder.status}
                            </span>
                            <small style={{ display: 'block', color: 'var(--mut)', fontSize: '11px', marginTop: '3px' }}>
                              {activeOrder.tanggal}
                            </small>
                          </div>
                        </div>

                        {/* Live Delivery Info Box ("Track Dimana") */}
                        <div 
                          style={{ 
                            background: 'rgba(33, 150, 243, 0.08)', 
                            border: '1.5px solid rgba(33, 150, 243, 0.25)', 
                            borderRadius: '14px', 
                            padding: '12px 14px', 
                            marginTop: '10px' 
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--b)', fontWeight: 800, fontSize: '13px', marginBottom: '6px' }}>
                            <Truck size={17} />
                            <span>Posisi & Status Armada Terkini:</span>
                          </div>
                          <p style={{ fontSize: '12.5px', color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.45 }}>
                            {activeOrder.status === 'Sedang Dikirim'
                              ? `Armada Pickup NilaFarm Berpendingin sedang dalam perjalanan mengantarkan paket pesanan Anda ke ${activeOrder.alamat}.`
                              : activeOrder.status === 'Selesai'
                              ? `Ikan nila telah berhasil diterima di ${activeOrder.alamat}. Terima kasih telah berbelanja di NilaFarm!`
                              : activeOrder.status === 'Dikonfirmasi'
                              ? `Ikan nila sedang diserok & dipanen dari kolam bioflok terpal D4, dibersihkan sisik dan dikemas dalam coolbox oksigen.`
                              : `Pesanan sedang menunggu verifikasi pembayaran oleh admin NilaFarm.`}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11.5px', color: 'var(--mut)', borderTop: '1px dashed var(--border)', paddingTop: '8px' }}>
                            <span>Kurir: <b>Kang Asep (Pickup 01 NilaFarm)</b></span>
                            <span>Estimasi Waktu: <b style={{ color: 'var(--b)' }}>Same Day (25-45 Menit)</b></span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Stepper */}
                      <div style={{ marginBottom: '18px', padding: '0 6px' }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={16} color="var(--b)" />
                          <span>Tahapan Perjalanan Pesanan Anda:</span>
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '6px' }}>
                          {getTimelineSteps(activeOrder.status).map((st, sIdx, arr) => {
                            const isLast = (sIdx === arr.length - 1);
                            return (
                              <div key={st.step} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <div 
                                    style={{
                                      width: '26px',
                                      height: '26px',
                                      borderRadius: '50%',
                                      background: st.active ? 'var(--b)' : 'var(--card2)',
                                      color: st.active ? '#ffffff' : 'var(--mut)',
                                      border: st.current ? '3px solid #60a5fa' : '2px solid var(--border)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '11px',
                                      fontWeight: 800,
                                      zIndex: 2,
                                      boxShadow: st.current ? '0 0 10px rgba(33, 150, 243, 0.45)' : 'none'
                                    }}
                                  >
                                    {st.active ? <Check size={13} strokeWidth={3} /> : st.step}
                                  </div>

                                  {!isLast && (
                                    <div 
                                      style={{
                                        width: '2px',
                                        height: '32px',
                                        background: st.active ? 'var(--b)' : 'var(--border)',
                                        margin: '2px 0'
                                      }} 
                                    />
                                  )}
                                </div>

                                <div style={{ paddingBottom: isLast ? '0' : '16px', flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <b style={{ fontSize: '13px', color: st.active ? 'var(--txt)' : 'var(--mut)' }}>
                                      {st.title}
                                    </b>
                                    {st.current && (
                                      <span style={{ fontSize: '10px', background: 'rgba(33, 150, 243, 0.15)', color: 'var(--b)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 800 }}>
                                        Tahap Ini
                                      </span>
                                    )}
                                  </div>
                                  <small style={{ color: 'var(--mut)', fontSize: '11.5px', display: 'block', marginTop: '2px', lineHeight: 1.4 }}>
                                    {st.desc}
                                  </small>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* WhatsApp Contact Driver / Admin */}
                      <button
                        type="button"
                        onClick={() => handleContactDriver(activeOrder)}
                        style={{
                          width: '100%',
                          padding: '11px',
                          fontSize: '13px',
                          borderRadius: '9999px',
                          background: '#22c55e',
                          border: 'none',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        <ExternalLink size={15} />
                        <span>Tanyakan Posisi Pengiriman ke Admin via WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KETERANGAN BELANJAAN & PEMESANAN */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--card2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <ShoppingBag size={38} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '8px' }} />
                  <b style={{ display: 'block', fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>
                    Riwayat Belanja Kosong
                  </b>
                  <p style={{ color: 'var(--mut)', fontSize: '12px', margin: 0 }}>
                    Anda belum memiliki riwayat pembelian ikan nila atau peralatan bioflok.
                  </p>
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div 
                    key={ord.id}
                    style={{
                      background: 'var(--card2)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <div>
                        <b style={{ fontSize: '14.5px', color: 'var(--b)' }}>Invoice #{ord.id}</b>
                        <small style={{ display: 'block', color: 'var(--mut)', fontSize: '11px', marginTop: '2px' }}>
                          📅 {ord.tanggal} • {ord.metode || 'Transfer Bank'}
                        </small>
                      </div>
                      <span 
                        style={{
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: ord.status === 'Selesai' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(33, 150, 243, 0.15)',
                          color: ord.status === 'Selesai' ? '#16a34a' : 'var(--b)'
                        }}
                      >
                        {ord.status}
                      </span>
                    </div>

                    {/* Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(ord.items || []).map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', color: 'var(--txt)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--b)' }} />
                            <span>{it.nama} <span style={{ color: 'var(--mut)', fontSize: '11.5px' }}>× {it.qty}</span></span>
                          </div>
                          <b>Rp{Number((it.harga || 0) * (it.qty || 1)).toLocaleString('id-ID')}</b>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border)', paddingTop: '10px', fontSize: '13px' }}>
                      <span style={{ color: 'var(--mut)', fontSize: '12px' }}>Total Pembayaran:</span>
                      <b style={{ fontSize: '15px', color: 'var(--p)', fontWeight: 800 }}>
                        Rp{Number(ord.total || 0).toLocaleString('id-ID')}
                      </b>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
                      <div style={{ fontSize: '11.5px', color: 'var(--mut)' }}>
                        📍 Alamat: <span style={{ color: 'var(--txt)' }}>{ord.alamat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(ord);
                          setActiveTab('track');
                        }}
                        className="btn-ghost"
                        style={{ padding: '6px 14px', fontSize: '11.5px', borderRadius: '9999px' }}
                      >
                        <span>Lihat Live Tracking</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: KETERANGAN AKUN USER */}
          {activeTab === 'account' && (
            <div>
              {customerUser ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* User Profile Card */}
                  <div 
                    style={{
                      background: 'var(--card2)',
                      border: '1px solid var(--border)',
                      borderRadius: '18px',
                      padding: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2196f3 0%, #0d47a1 100%)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        fontWeight: 800,
                        boxShadow: '0 4px 14px rgba(33, 150, 243, 0.35)'
                      }}
                    >
                      {customerUser.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <b style={{ fontSize: '16.5px', color: 'var(--txt)' }}>{customerUser.name}</b>
                        <span style={{ fontSize: '10.5px', background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', padding: '2px 8px', borderRadius: '9999px', fontWeight: 800 }}>
                          ✓ Member Terverifikasi
                        </span>
                      </div>
                      <small style={{ color: 'var(--mut)', fontSize: '12px', display: 'block', marginTop: '3px' }}>
                        ID: {customerUser.id || 'NilaFarm Member'}
                      </small>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onCustomerLogout) onCustomerLogout();
                        onClose();
                      }}
                      className="btn-ghost"
                      style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '9999px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                    >
                      <LogOut size={13} />
                      <span>Keluar</span>
                    </button>
                  </div>

                  {/* Account Details Form / Cards */}
                  <div 
                    style={{
                      background: 'var(--card2)',
                      border: '1px solid var(--border)',
                      borderRadius: '18px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}
                  >
                    <b style={{ fontSize: '13.5px', color: 'var(--txt)' }}>Informasi Data Diri:</b>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      <div style={{ padding: '10px 12px', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <small style={{ color: 'var(--mut)', fontSize: '11px', display: 'block' }}>Nomor WhatsApp</small>
                        <b style={{ fontSize: '13px', color: 'var(--txt)', marginTop: '2px', display: 'block' }}>
                          {customerUser.phone}
                        </b>
                      </div>

                      <div style={{ padding: '10px 12px', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <small style={{ color: 'var(--mut)', fontSize: '11px', display: 'block' }}>Alamat Email</small>
                        <b style={{ fontSize: '13px', color: 'var(--txt)', marginTop: '2px', display: 'block' }}>
                          {customerUser.email || '-'}
                        </b>
                      </div>
                    </div>

                    {/* Delivery Address Editor */}
                    <div style={{ padding: '12px 14px', background: 'var(--card)', borderRadius: '14px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <small style={{ color: 'var(--mut)', fontSize: '11px', fontWeight: 700 }}>Alamat Pengiriman Utama</small>
                        {!editingAddress ? (
                          <button
                            type="button"
                            onClick={() => setEditingAddress(true)}
                            style={{ background: 'none', border: 'none', color: 'var(--b)', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Edit3 size={12} />
                            <span>Ubah Alamat</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSaveAddress}
                            style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '11.5px', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Simpan
                          </button>
                        )}
                      </div>

                      {!editingAddress ? (
                        <p style={{ fontSize: '12.5px', color: 'var(--txt)', margin: 0, lineHeight: 1.45 }}>
                          {customerUser.address || 'Belum ada alamat tersimpan.'}
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                          <textarea
                            value={addressInput}
                            onChange={e => setAddressInput(e.target.value)}
                            rows={2}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: '1px solid var(--border)',
                              background: 'var(--card2)',
                              color: 'var(--txt)',
                              fontSize: '12.5px',
                              boxSizing: 'border-box'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              onClick={() => setEditingAddress(false)}
                              className="btn-ghost"
                              style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '9999px' }}
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={handleSaveAddress}
                              className="btn-primary"
                              style={{ padding: '4px 12px', fontSize: '11.5px', borderRadius: '9999px' }}
                            >
                              Simpan Alamat
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '36px 16px', background: 'var(--card2)', borderRadius: '18px', border: '1px solid var(--border)' }}>
                  <User size={42} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '10px' }} />
                  <b style={{ display: 'block', fontSize: '15px', color: 'var(--txt)', marginBottom: '6px' }}>
                    Anda Belum Masuk ke Akun Pembeli
                  </b>
                  <p style={{ color: 'var(--mut)', fontSize: '12.5px', maxWidth: '420px', margin: '0 auto 18px', lineHeight: 1.5 }}>
                    Daftar akun gratis sekarang untuk melacak pesanan, menyimpan alamat pengiriman, dan mendapatkan promo panen ikan nila segar.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenCustomerAuth) onOpenCustomerAuth('register');
                    }}
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '9999px' }}
                  >
                    <span>+ Buat Akun Baru Sekarang</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
