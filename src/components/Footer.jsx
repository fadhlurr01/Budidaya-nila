import React, { useState } from 'react';
import { 
  ArrowUp, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Mail, 
  Fish, 
  ShieldCheck, 
  Clock,
  ExternalLink
} from 'lucide-react';

export default function Footer({ 
  onNavigate,
  onOpenDashboard,
  lang = 'id'
}) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <footer 
      style={{
        background: '#0d1e34', // Deep Oceanic Marine Navy
        color: '#ffffff',
        padding: '70px 24px 35px',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(130, 215, 225, 0.25)',
        fontFamily: "'Outfit', 'Poppins', sans-serif"
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Column 1: Brand & Identity */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <img 
              src="/assets/logo/logoo.png" 
              alt="NilaFarm Logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/logo/logo.png';
              }}
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>Nila</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#2483B3' }}>Farm</span>
            </div>
          </div>

          <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
            Pusat budidaya ikan nila modern berbasis sistem bioflok berkelanjutan. Menghadirkan nila segar higienis bebas bau lumpur seharga Rp 35.000/kg dan paket kolam terintegrasi IoT.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#82D7E1' }}>
            <ShieldCheck size={16} />
            <span>Bibit Bersertifikat SKAI & HACCP Handling</span>
          </div>
        </div>

        {/* Column 2: Navigasi Tautan */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', letterSpacing: '0.3px' }}>
            {lang === 'en' ? 'Quick Navigation' : 'Navigasi Cepat'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94a3b8' }}>
            <li>
              <button 
                onClick={() => handleNavClick('beranda')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Beranda Utama
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Katalog Produk (Rp 35rb/kg)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('budidaya')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Sistem Bioflok & Monitoring IoT
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('artikel')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Artikel Edukasi Pembudidaya
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('kontak')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Kontak & Lokasi Farm
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('auth')}
                style={{ background: 'none', border: 'none', color: '#82D7E1', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#ffffff'}
                onMouseLeave={e => e.target.style.color = '#82D7E1'}
              >
                Masuk / Daftar Akun
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  if (onOpenDashboard) {
                    onOpenDashboard();
                  } else {
                    handleNavClick('dashboard');
                  }
                }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, textAlign: 'left', fontSize: '12px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                Portal Admin & IoT
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Kontak Resmi & WhatsApp */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', letterSpacing: '0.3px' }}>
            Kontak Peternak
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px', color: '#94a3b8' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={17} color="#82D7E1" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Kompleks Budidaya Nila Bioflok, Sumedang & Jawa Barat</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={17} color="#82D7E1" style={{ flexShrink: 0 }} />
              <span>Panen: 05:00 - 10:00 WIB (Setiap Hari)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={17} color="#82D7E1" style={{ flexShrink: 0 }} />
              <span>info@budidayanila.id</span>
            </li>
          </ul>

          {/* Prominent WhatsApp Action */}
          <div style={{ marginTop: '20px' }}>
            <a
              href="https://wa.me/6281382570406?text=Halo%20Admin%20NilaFarm,%20saya%20ingin%20tanya%20seputar%20budidaya%20dan%20pembelian%20ikan%20nila."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#10b981',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '13.5px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={18} />
              <span>Chat WhatsApp: 0813-8257-0406</span>
            </a>
          </div>
        </div>

        {/* Column 4: Info Panen & Buletin */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
            Informasi Panen Berkala
          </h4>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
            Dapatkan jadwal panen nila segar, potongan harga partai besar, dan info slot benih unggul.
          </p>

          <form 
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '9999px',
              padding: '4px',
              alignItems: 'center'
            }}
          >
            <input 
              type="email" 
              required
              placeholder="Masukkan email Anda..."
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                padding: '9px 14px',
                fontSize: '13px',
                color: '#163665',
                minWidth: 0
              }}
            />
            <button
              type="submit"
              style={{
                background: '#2483B3',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 18px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Daftar
            </button>
          </form>

          {subscribed && (
            <p style={{ fontSize: '12px', color: '#82D7E1', marginTop: '8px' }}>
              ✓ Terima kasih telah berlangganan jadwal panen NilaFarm!
            </p>
          )}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(130, 215, 225, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          color: '#82D7E1'
        }}
      >
        <div>
          © 2026 NilaFarm Indonesia. Hak Cipta Dilindungi Undang-Undang.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>v1.1.0 (Production Release)</span>
          <button
            onClick={scrollToTop}
            title="Kembali ke Atas"
            style={{
              background: 'rgba(130, 215, 225, 0.1)',
              border: '1px solid #82D7E1',
              color: '#82D7E1',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2483B3';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(130, 215, 225, 0.1)';
              e.currentTarget.style.color = '#82D7E1';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
