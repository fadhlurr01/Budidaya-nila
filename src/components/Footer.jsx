import React from 'react';
import { Fish, ShieldCheck, Heart, Lock, ArrowUp, LayoutDashboard } from 'lucide-react';

export default function Footer({ 
  onNavigate, 
  onOpenDashboard, 
  onOpenDevModal, 
  onOpenCorpModal 
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
        padding: '60px 20px 30px',
        color: 'var(--txt)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Brand Col */}
        <div style={{ maxWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <img 
              src="/assets/logo.png" 
              alt="NilaFarm Logo" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
            <div>
              <div style={{ fontSize: '19px', fontWeight: 800 }}>
                <span style={{ color: '#2196f3' }}>Nila</span>
                <span style={{ color: 'var(--p)' }}>Farm</span>
              </div>
              <small style={{ color: 'var(--mut)', fontSize: '11px', letterSpacing: '1px' }}>
                SUMEDANG BIOFLOK IOT
              </small>
            </div>
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.65, marginBottom: '20px' }}>
            Usaha budidaya ikan nila keluarga berbasis sistem bioflok modern di Sumedang. Dari kolam sendiri, dipanen pagi hari, diantar segar same-day.
          </p>

          <div style={{ marginTop: '16px' }}>
            <button
              onClick={onOpenDashboard}
              style={{
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(13, 71, 161, 0.15) 100%)',
                border: '1.5px solid var(--b)',
                color: 'var(--b)',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <LayoutDashboard size={15} />
              <span>Buka Panel Farm & Admin</span>
            </button>
            <div style={{ fontSize: '11px', color: 'var(--mut)', marginTop: '6px' }}>
              Monitoring Sensor IoT Realtime & Kelola Pesanan
            </div>
          </div>
        </div>

        {/* Col 1: Produk */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--txt)' }}>
            Katalog Produk
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--mut)' }}>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Nila Konsumsi Segar (500-800g)
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Nila Fillet Premium Vakum
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Benih Nila Unggul (5-8 cm)
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Paket Kolam Bioflok D4
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Smart Auto-Feeder 20kg
              </button>
            </li>
          </ul>
        </div>

        {/* Col 2: Teknologi & Dev */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--txt)' }}>
            Teknologi IoT & API
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--mut)' }}>
            <li>
              <button 
                onClick={onOpenDashboard}
                style={{ background: 'none', border: 'none', color: 'var(--b)', cursor: 'pointer', padding: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={13} />
                <span>Panel Farm (IoT Dashboard)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenDevModal('api')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Dokumentasi REST API Sensor
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenDevModal('mqtt')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                MQTT Broker Telemetri Air
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenDevModal('firmware')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Firmware ESP32 OTA
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenDevModal('status')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Status Server & Gateway (99.8%)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Perusahaan */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--txt)' }}>
            Tentang Usaha Farm
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--mut)' }}>
            <li>
              <button 
                onClick={() => onOpenCorpModal('tentang')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Profil Peternakan Sumedang
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('kontak')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Kontak & Lokasi Tambak
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenCorpModal('privasi')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Kebijakan Privasi Data
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenCorpModal('syarat')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
              >
                Syarat & Ketentuan Layanan
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12.5px',
          color: 'var(--mut)'
        }}
      >
        <div>
          © 2026 <b>NilaFarm</b> Sumedang. Dikelola oleh keluarga Hamdan Russ untuk akuakultur Indonesia.
        </div>

        <button
          onClick={scrollToTop}
          style={{
            background: 'var(--card2)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '6px 12px',
            color: 'var(--txt)',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ArrowUp size={14} />
          <span>Kembali ke Atas</span>
        </button>
      </div>
    </footer>
  );
}
