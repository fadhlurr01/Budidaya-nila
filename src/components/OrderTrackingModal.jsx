import React, { useState } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';

export default function OrderTrackingModal({ 
  isOpen, 
  onClose, 
  orders = [], 
  customerUser = null,
  onOpenCustomerAuth,
  onShowToast 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!isOpen) return null;

  // Filter orders related to this logged-in user OR matching the search query
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

    return true; // if no user and no search, show recent orders
  });

  const activeOrder = selectedOrder || userOrders[0] || null;

  // Timeline Step Tracker calculation
  const getTimelineSteps = (status) => {
    const isRejected = status === 'Ditolak';

    let currentStep = 1;
    if (status === 'Menunggu Konfirmasi') currentStep = 1;
    else if (status === 'Dikonfirmasi') currentStep = 2;
    else if (status === 'Sedang Dikirim') currentStep = 4;
    else if (status === 'Selesai') currentStep = 5;

    return [
      {
        step: 1,
        title: 'Pesanan Diterima',
        desc: 'Data pesanan dan bukti bayar masuk ke sistem NilaFarm',
        active: currentStep >= 1,
        current: currentStep === 1
      },
      {
        step: 2,
        title: 'Verifikasi Pembayaran',
        desc: 'Admin memverifikasi bukti transfer dan memastikan pesanan valid',
        active: currentStep >= 2,
        current: currentStep === 2
      },
      {
        step: 3,
        title: 'Panen & Pengemasan',
        desc: 'Ikan nila dipanen dari kolam bioflok, dibersihkan sisik & dikemas higienis',
        active: currentStep >= 3 || currentStep >= 4,
        current: currentStep === 3
      },
      {
        step: 4,
        title: 'Dalam Pengiriman',
        desc: 'Armada kurir NilaFarm sedang dalam perjalanan menuju alamat pengantaran',
        active: currentStep >= 4,
        current: currentStep === 4
      },
      {
        step: 5,
        title: 'Tiba di Tujuan & Selesai',
        desc: 'Ikan nila segar telah sampai di tangan pelanggan dengan kondisi prima',
        active: currentStep >= 5,
        current: currentStep === 5
      }
    ];
  };

  const handleContactDriver = (order) => {
    const msg = encodeURIComponent(
      `Halo Admin NilaFarm, saya ingin mengecek estimasi kedatangan pesanan #${order.id} a.n ${order.pelanggan}. Terima kasih!`
    );
    window.open(`https://wa.me/6281382570406?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '640px', width: '100%', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '12px', 
                background: 'rgba(33, 150, 243, 0.14)', 
                color: 'var(--b)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Package size={20} />
            </div>
            <div>
              <b style={{ fontSize: '16.5px', color: 'var(--txt)', display: 'block' }}>
                Status Pembelian & Lacak Pesanan
              </b>
              <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                {customerUser ? `Akun: ${customerUser.name} (${customerUser.phone})` : 'Pantau posisi dan status pesanan NilaFarm Anda'}
              </small>
            </div>
          </div>

          <button 
            onClick={onClose}
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

        {/* Not Logged In Banner */}
        {!customerUser && (
          <div 
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid rgba(33, 150, 243, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--txt)' }}>
              Ingin melihat seluruh riwayat belanja Anda otomatis?
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenCustomerAuth) onOpenCustomerAuth();
              }}
              style={{
                background: 'var(--b)',
                color: '#ffffff',
                border: 'none',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Masuk / Buat Akun
            </button>
          </div>
        )}

        {/* Search Invoice/Phone Input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input 
            type="text"
            placeholder="Cari berdasarkan No. Invoice (#NF-...) atau No. WhatsApp..."
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
              fontSize: '12.5px'
            }}
          />
        </div>

        {/* Modal Body with Scroll */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '2px' }}>
          {userOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', background: 'var(--card2)', borderRadius: '16px' }}>
              <Package size={42} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '10px' }} />
              <b style={{ display: 'block', fontSize: '14px', color: 'var(--txt)', marginBottom: '4px' }}>
                Pesanan Tidak Ditemukan
              </b>
              <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                Pastikan nomor invoice atau nomor WhatsApp Anda sudah sesuai, atau lakukan pemesanan di menu produk.
              </small>
            </div>
          ) : (
            <div>
              {/* Order Selection Tabs (if multiple orders) */}
              {userOrders.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '14px' }}>
                  {userOrders.map(ord => {
                    const isSel = (activeOrder?.id === ord.id);
                    return (
                      <button
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '9999px',
                          border: isSel ? '1.5px solid var(--b)' : '1px solid var(--border)',
                          background: isSel ? 'var(--b)' : 'var(--card2)',
                          color: isSel ? '#ffffff' : 'var(--txt)',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        #{ord.id} ({ord.status})
                      </button>
                    );
                  })}
                </div>
              )}

              {activeOrder && (
                <div>
                  {/* Order Overview Header Card */}
                  <div 
                    style={{ 
                      background: 'var(--card2)', 
                      borderRadius: '16px', 
                      padding: '16px', 
                      border: '1px solid var(--border)',
                      marginBottom: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 700, textTransform: 'uppercase' }}>
                          Nomor Pesanan
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--b)' }}>
                          #{activeOrder.id}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span 
                          style={{
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
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
                        <small style={{ display: 'block', color: 'var(--mut)', fontSize: '11px', marginTop: '4px' }}>
                          {activeOrder.tanggal}
                        </small>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '12px', color: 'var(--txt)', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                      <div>
                        <span style={{ color: 'var(--mut)' }}>Pemesan: </span>
                        <b>{activeOrder.pelanggan}</b>
                      </div>
                      <div>
                        <span style={{ color: 'var(--mut)' }}>Total: </span>
                        <b style={{ color: 'var(--p)' }}>Rp{Number(activeOrder.total).toLocaleString('id-ID')}</b>
                      </div>
                      <div>
                        <span style={{ color: 'var(--mut)' }}>Alamat: </span>
                        <span>{activeOrder.alamat}</span>
                      </div>
                    </div>

                    {activeOrder.midtransData && (
                      <div style={{ marginTop: '10px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '10px', padding: '8px 12px', fontSize: '11.5px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={14} />
                        <span>Pembayaran diverifikasi otomatis via Midtrans Sandbox ({activeOrder.metode}) • Ref: {activeOrder.midtransData.transactionId}</span>
                      </div>
                    )}
                  </div>

                  {/* VISUAL REAL-TIME TIMELINE TRACKER ("SUDAH DIMANA DAN GIMANA") */}
                  <div style={{ marginBottom: '22px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--txt)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={17} color="var(--b)" />
                      <span>Pelacakan Status Pengiriman Real-Time:</span>
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', paddingLeft: '8px' }}>
                      {getTimelineSteps(activeOrder.status).map((st, sIdx, arr) => {
                        const isLast = (sIdx === arr.length - 1);
                        return (
                          <div key={st.step} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                            {/* Step Indicator & Line */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div 
                                style={{
                                  width: '28px',
                                  height: '28px',
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
                                  boxShadow: st.current ? '0 0 10px rgba(33, 150, 243, 0.5)' : 'none',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                {st.active ? <Check size={14} strokeWidth={3} /> : st.step}
                              </div>

                              {!isLast && (
                                <div 
                                  style={{
                                    width: '2px',
                                    height: '36px',
                                    background: st.active ? 'var(--b)' : 'var(--border)',
                                    margin: '2px 0',
                                    transition: 'background 0.3s ease'
                                  }} 
                                />
                              )}
                            </div>

                            {/* Step Content */}
                            <div style={{ paddingBottom: isLast ? '0' : '20px', flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <b style={{ fontSize: '13px', color: st.active ? 'var(--txt)' : 'var(--mut)' }}>
                                  {st.title}
                                </b>
                                {st.current && (
                                  <span style={{ fontSize: '10.5px', background: 'rgba(33, 150, 243, 0.15)', color: 'var(--b)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                    Sedang di tahap ini
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

                  {/* Order Items & Action Contact */}
                  <div 
                    style={{ 
                      background: 'var(--card2)', 
                      borderRadius: '14px', 
                      padding: '14px', 
                      border: '1px solid var(--border)',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                      Rincian Produk yang Dibeli:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(activeOrder.items || []).map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--txt)' }}>
                          <span>{it.nama} × {it.qty}</span>
                          <b>Rp{Number(it.harga * it.qty).toLocaleString('id-ID')}</b>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Hubungi Admin / Driver Button */}
                  <button
                    onClick={() => handleContactDriver(activeOrder)}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '11px',
                      fontSize: '13px',
                      background: '#22c55e',
                      border: 'none',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
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
      </div>
    </div>
  );
}
