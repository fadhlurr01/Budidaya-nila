import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function ContactSection({ lang = 'id', onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    topic: 'Pesan Ikan Nila Segar',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      if (onShowToast) onShowToast('Harap lengkapi nama dan pesan Anda.', 'bad');
      return;
    }

    const text = encodeURIComponent(
      `Halo NilaFarm Sumedang,\n\nNama: ${formData.name}\nKebutuhan: ${formData.topic}\nPesan: ${formData.message}`
    );

    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    if (onShowToast) onShowToast('Membuka WhatsApp untuk mengirim pesan...', 'ok');

    setFormData({
      name: '',
      topic: 'Pesan Ikan Nila Segar',
      message: ''
    });
  };

  return (
    <section 
      id="kontak" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 20px 80px' 
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
        <p 
          style={{ 
            fontSize: '12.5px', 
            fontWeight: 800, 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            color: 'var(--b)',
            marginBottom: '8px'
          }}
        >
          {lang === 'en' ? 'Get In Touch' : 'Hubungi Kami'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Pesan Nila atau Kunjungi Farm' : 'Pesan Nila atau Mampir ke Farm Kami'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'Mon–Sat 08:00–17:00 WIB • Sumedang, West Java'
            : 'Buka Senin–Sabtu 08:00–17:00 WIB • Sumedang, Jawa Barat'}
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '28px'
        }}
      >
        {/* Contact Info Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '32px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--txt)', marginBottom: '18px' }}>
              Informasi Operasional Farm
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(33, 150, 243, 0.12)',
                    color: 'var(--b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Lokasi Tambak Bioflok</b>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.5, display: 'block', marginTop: '2px' }}>
                    Jl. Raya Sumedang - Cimalaka KM 4, Dusun Sukamaju, Sumedang, Jawa Barat 45353
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.12)',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>WhatsApp Pemesanan Cepat</b>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', display: 'block', marginTop: '2px' }}>
                    +62 812-3456-7890 (Respon cepat panen pagi)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Jadwal Panen & Pengantaran</b>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', display: 'block', marginTop: '2px' }}>
                    Panen: Pukul 06:30 - 08:30 WIB | Pengantaran: Pukul 10:00 & 15:00 WIB
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(13, 71, 161, 0.12)',
                    color: 'var(--p)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>Kerja Sama Kemitraan Resto</b>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', display: 'block', marginTop: '2px' }}>
                    kontak@nilafarm.id / pasokan rutin mingguan
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div 
            style={{
              marginTop: '28px',
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--card2)',
              fontSize: '12.5px',
              color: 'var(--mut)',
              lineHeight: 1.5
            }}
          >
            💡 <b>Tips Pengambilan Langsung:</b> Konfirmasikan 1 hari sebelumnya jika ingin memilih ikan langsung di kolam agar kami dapat mengatur jadwal panen tanpa mengganggu jadwal puasa ikan.
          </div>
        </div>

        {/* Quick Message Form */}
        <div 
          className="glass-panel"
          style={{
            padding: '32px',
            borderRadius: '24px'
          }}
        >
          <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
            Kirim Pesan WhatsApp Cepat
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '22px' }}>
            Form ini akan otomatis menyusun teks dan membuka aplikasi WhatsApp Anda.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                placeholder="Contoh: Bpk. Budi Santoso"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--card2)',
                  color: 'var(--txt)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                Keperluan / Jenis Produk
              </label>
              <select
                value={formData.topic}
                onChange={e => setFormData({ ...formData, topic: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--card2)',
                  color: 'var(--txt)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="Pesan Ikan Nila Segar">Pesan Ikan Nila Segar (Konsumsi)</option>
                <option value="Pesan Nila Fillet Premium">Pesan Nila Fillet Premium Vakum</option>
                <option value="Beli Benih Nila Unggul">Beli Benih Nila Hitam & Merah (5-8 cm)</option>
                <option value="Tanya Paket Kolam D4">Tanya Paket Kolam Bioflok D4</option>
                <option value="Konsultasi Sensor IoT & Kemitraan">Konsultasi Sensor IoT & Kemitraan Resto</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
                Pesan / Jumlah Pesanan (kg / ekor)
              </label>
              <textarea
                rows={4}
                placeholder="Contoh: Mau pesan nila segar 5 kg untuk besok siang di Sumedang Selatan, tolong dibersihkan & disisik ya."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--card2)',
                  color: 'var(--txt)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '14.5px',
                marginTop: '8px'
              }}
            >
              <Send size={16} />
              <span>Kirim via WhatsApp →</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
