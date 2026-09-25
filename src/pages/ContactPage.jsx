import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  ChevronRight, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Truck,
  Fish
} from 'lucide-react';

export default function ContactPage({ onNavigate, onShowToast, lang = 'id' }) {
  const [formData, setFormData] = useState({
    adminTarget: 'admin1', // 'admin1' | 'admin2'
    name: '',
    phone: '',
    topic: 'Pesan Ikan Nila Segar Siap Masak',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      if (onShowToast) onShowToast('Harap lengkapi nama dan pesan Anda.', 'bad');
      return;
    }

    const adminName = formData.adminTarget === 'admin2' ? 'Admin 2 (CS Pemesanan)' : 'Admin 1 (Hamdan Russ)';
    const targetPhone = formData.adminTarget === 'admin2' ? '6282122319510' : '6281382570406';

    const text = encodeURIComponent(
      `*PESAN KONTAK DARI WEBSITE NILAFARM*\n` +
      `Tujuan: ${adminName}\n\n` +
      `*Nama Pengirim:* ${formData.name}\n` +
      `*Nomor WhatsApp:* ${formData.phone || '-'}\n` +
      `*Keperluan / Topik:* ${formData.topic}\n\n` +
      `*Pesan / Pertanyaan:*\n${formData.message}\n\n` +
      `Mohon info tindak lanjutnya. Terima kasih!`
    );

    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
    if (onShowToast) onShowToast(`Membuka WhatsApp ke ${adminName}...`, 'ok');

    setFormData({
      adminTarget: 'admin1',
      name: '',
      phone: '',
      topic: 'Pesan Ikan Nila Segar Siap Masak',
      message: ''
    });
  };

  return (
    <div style={{ paddingTop: '86px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Header Banner */}
      <section 
        style={{
          background: 'linear-gradient(180deg, var(--card2) 0%, var(--bg) 100%)',
          padding: '48px 20px 36px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--mut)', marginBottom: '16px' }}>
            <button 
              onClick={() => onNavigate('beranda')}
              style={{ background: 'none', border: 'none', color: 'var(--b)', cursor: 'pointer', fontWeight: 600 }}
            >
              Beranda
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--txt)', fontWeight: 600 }}>Kontak & Lokasi Farm</span>
          </div>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(33, 150, 243, 0.12)',
              color: 'var(--b)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}
          >
            <Phone size={14} />
            <span>Kontak Langsung Farm Sumedang</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: 'var(--txt)',
              letterSpacing: '-0.5px',
              marginBottom: '16px'
            }}
          >
            Hubungi Admin NilaFarm
          </h1>

          <p 
            style={{
              fontSize: '16px',
              color: 'var(--mut)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.65
            }}
          >
            Tersedia dua admin farm yang siap membantu Anda — untuk konsultasi teknis budidaya bioflok bersama <b>Hamdan Russ</b>, maupun pemesanan ikan segar & pakan harian bersama Customer Service.
          </p>
        </div>
      </section>

      {/* 2 DUAL ADMIN HIGHLIGHT CARDS */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px' }}>
          {/* Admin 1 Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '28px',
              borderRadius: '24px',
              border: '2px solid var(--b)',
              background: 'linear-gradient(180deg, var(--card2) 0%, var(--card) 45%)',
              boxShadow: '0 12px 30px rgba(33, 150, 243, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div 
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--grad)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                HR
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  ADMIN 1 • OWNER & OPERATOR FARM
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', margin: '2px 0 0' }}>
                  Hamdan Russ
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '18px' }}>
              Spesialis perencanaan konstruksi kolam bundar D4/D3, setting aerasi uniring, penanganan penyakit ikan nila, dan instalasi sensor telemetri IoT.
            </p>

            <div style={{ background: 'var(--card)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Nomor WhatsApp & Telepon:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--p)', marginTop: '2px' }}>
                +62 813-8257-0406
              </div>
              <small style={{ color: 'var(--ok)', fontSize: '11px', fontWeight: 600 }}>● Online & Siap Konsultasi</small>
            </div>

            <a 
              href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ,%20saya%20ingin%20konsultasi%20terkait%20budidaya%20bioflok%20NilaFarm"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
            >
              <MessageSquare size={16} />
              <span>Chat WhatsApp Hamdan Russ</span>
            </a>
          </div>

          {/* Admin 2 Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '28px',
              borderRadius: '24px',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, var(--card) 45%)',
              boxShadow: '0 12px 30px rgba(34, 197, 94, 0.12)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div 
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #15803d)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                CS
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  ADMIN 2 • PEMESANAN & PENGANTARAN
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', margin: '2px 0 0' }}>
                  Customer Service Farm
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '18px' }}>
              Layanan cepat untuk pemesanan ikan nila hidup, nila segar es, fillet vakum, benih unggul, pakan pelet apung, dan jadwal pengiriman area Sumedang & sekitarnya.
            </p>

            <div style={{ background: 'var(--card)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--mut)' }}>Nomor WhatsApp & Telepon:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>
                0821-2231-9510
              </div>
              <small style={{ color: 'var(--ok)', fontSize: '11px', fontWeight: 600 }}>● Siap Terima Order Panen Pagi</small>
            </div>

            <a 
              href="https://wa.me/6282122319510?text=Halo%20CS%20NilaFarm,%20saya%20ingin%20pesan%20ikan%20nila%20segar%20hari%20ini"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '14px', background: 'linear-gradient(135deg, #22c55e, #15803d)', boxSizing: 'border-box' }}
            >
              <Truck size={16} />
              <span>Chat WhatsApp CS Pemesanan</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Form & Location Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '28px' }}>
          {/* Location & Farm Info Card */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--txt)', marginBottom: '18px' }}>
              Informasi Operasional & Lokasi Tambak
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(33, 150, 243, 0.12)', color: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Alamat Fisik Kolam</b>
                  <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: '4px 0 0' }}>
                    Jl. Raya Sumedang - Cimalaka KM 4, Dusun Sukamaju, Sumedang, Jawa Barat 45353 (Dekat gerbang tol Cisumdawu Cimalaka).
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Jam Operasional & Kunjungan</b>
                  <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: '4px 0 0' }}>
                    <b>Senin – Sabtu:</b> 06:00 – 18:00 WIB<br />
                    <b>Panen Pagi Ikan Hidup:</b> 06:30 – 09:30 WIB<br />
                    <b>Kunjungan Edukasi:</b> Mohon konfirmasi H-1 via WA Admin
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Fish size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Layanan Kebersihan Sisik Gratis</b>
                  <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: '4px 0 0' }}>
                    Setiap pembelian ikan nila segar dapat meminta layanan buang sisik, insang, dan jeroan gratis tanpa biaya tambahan.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Map Button */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <a 
                href="https://maps.google.com/?q=Sumedang+Cimalaka+Jawa+Barat" 
                target="_blank" 
                rel="noreferrer"
                className="btn-ghost"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'center', gap: '8px' }}
              >
                <MapPin size={16} />
                <span>Buka Rute di Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Interactive Form Card */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Kirim Pesan / Konsultasi
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '22px' }}>
              Pesan akan otomatis dialihkan ke nomor WhatsApp admin pilihan Anda untuk respons tercepat.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Target Admin Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                  Pilih Tujuan WhatsApp Admin *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, adminTarget: 'admin1' })}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '9999px',
                      border: formData.adminTarget === 'admin1' ? '1.5px solid var(--b)' : '1px solid var(--border)',
                      background: formData.adminTarget === 'admin1' ? 'rgba(33, 150, 243, 0.12)' : 'var(--card2)',
                      color: formData.adminTarget === 'admin1' ? 'var(--p)' : 'var(--txt)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div>👤 Hamdan Russ</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--mut)' }}>Admin 1 (Teknis & Kolam)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, adminTarget: 'admin2' })}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '9999px',
                      border: formData.adminTarget === 'admin2' ? '1.5px solid #22c55e' : '1px solid var(--border)',
                      background: formData.adminTarget === 'admin2' ? 'rgba(34, 197, 94, 0.12)' : 'var(--card2)',
                      color: formData.adminTarget === 'admin2' ? '#15803d' : 'var(--txt)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div>📞 CS Pemesanan</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--mut)' }}>Admin 2 (Ikan & Pakan)</div>
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Nama Lengkap *
                </label>
                <input 
                  type="text"
                  placeholder="Contoh: Hendra Pratama"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Nomor WhatsApp Anda (Opsional)
                </label>
                <input 
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Topik Kebutuhan
                </label>
                <select
                  value={formData.topic}
                  onChange={e => setFormData({ ...formData, topic: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Pesan Ikan Nila Segar Siap Masak">Pesan Ikan Nila Segar Siap Masak</option>
                  <option value="Pesan Nila Fillet Premium Vakum">Pesan Nila Fillet Premium Vakum</option>
                  <option value="Pesan Benih Nila Ukuran 5-8 cm">Pesan Benih Nila Ukuran 5-8 cm</option>
                  <option value="Konsultasi Pembuatan Kolam Bioflok D4/D3">Konsultasi Pembuatan Kolam Bioflok D4/D3</option>
                  <option value="Pemesanan Smart IoT Gateway & Sensor">Pemesanan Smart IoT Gateway & Sensor</option>
                  <option value="Rencana Kunjungan Wisata Farm Sumedang">Rencana Kunjungan Wisata Farm Sumedang</option>
                  <option value="Kemitraan Restoran & Katering">Kemitraan Restoran & Katering</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                  Pesan / Catatan Khusus *
                </label>
                <textarea 
                  rows={3}
                  placeholder="Tuliskan jumlah pesanan atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button 
                type="submit"
                className="btn-primary"
                style={{ padding: '13px', fontSize: '14px', marginTop: '6px', width: '100%', boxSizing: 'border-box' }}
              >
                <Send size={15} />
                <span>Kirim via WhatsApp ke {formData.adminTarget === 'admin2' ? 'Admin 2 (CS)' : 'Admin 1 (Hamdan Russ)'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
