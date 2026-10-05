import React, { memo } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Fish, 
  Waves, 
  Activity, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';

function HeroSection({ 
  onNavigate, 
  lang = 'id',
  isDark = false 
}) {
  const stats = React.useMemo(() => [
    { num: '98.2%', label: 'Survival Rate (SR)', sub: 'Strain Nirwana Super' },
    { num: '1.12', label: 'Rasio FCR Hemat', sub: 'Efisiensi Pakan Bioflok' },
    { num: '0%', label: 'Bebas Bau Lumpur', sub: 'Daging Manis Gurih Alami' },
    { num: 'Same-Day', label: 'Pengiriman Bergaransi', sub: 'Se-Jawa & Bali Aman' }
  ], []);

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <section 
      style={{ 
        position: 'relative', 
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '135px', 
        paddingBottom: '70px',
        overflow: 'hidden',
        color: '#ffffff'
      }}
    >
      {/* Background Image: assets/products/kolam-d4.jpg with fallback to kolam-d3.jpg */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/products/kolam-d4.jpg), url(/assets/products/kolam-d3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />

      {/* Dark & Gradient Overlay (50% - 65% opacity) for Maximum Readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(14, 36, 64, 0.72) 0%, rgba(22, 54, 101, 0.58) 50%, rgba(13, 30, 52, 0.90) 100%)',
          backdropFilter: 'blur(1.5px)',
          WebkitBackdropFilter: 'blur(1.5px)',
          zIndex: 1
        }}
      />

      {/* Bio-Luminescent Aquatic Light Accents */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130, 215, 225, 0.22) 0%, rgba(36, 131, 179, 0.12) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 24px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Top Centered Pill Badge: 🐟 100% Organik & Hasil Panen Berkualitas */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(14, 36, 64, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(130, 215, 225, 0.6)',
            borderRadius: '9999px',
            padding: '8px 22px',
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#82D7E1',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
            marginBottom: '26px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🐟</span>
          <span style={{ letterSpacing: '0.4px' }}>
            100% Organik & Hasil Panen Berkualitas
          </span>
          <span 
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981',
              display: 'inline-block'
            }}
          />
        </div>

        {/* Heading (H1): Panen Nila Lebih Sehat, Padat, dan Cepat dengan Sistem Bioflok */}
        <h1 
          style={{
            fontSize: 'clamp(32px, 5.2vw, 58px)',
            lineHeight: 1.18,
            fontWeight: 800,
            letterSpacing: '-1.2px',
            marginBottom: '20px',
            maxWidth: '960px',
            color: '#ffffff',
            textShadow: '0 3px 20px rgba(0,0,0,0.65)'
          }}
        >
          Panen Nila Lebih Sehat, Padat, dan Cepat dengan Sistem Bioflok.
        </h1>

        {/* Sub-heading: Penuhi kebutuhan protein harian dengan ikan nila premium langsung dari peternak. Harga spesial mulai Rp 35.000/kg. */}
        <p 
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            lineHeight: 1.6,
            color: '#e2e8f0',
            marginBottom: '36px',
            maxWidth: '780px',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Penuhi kebutuhan protein harian dengan ikan nila premium langsung dari peternak. Harga spesial mulai <strong style={{ color: '#82D7E1', fontWeight: 800, background: 'rgba(36, 131, 179, 0.3)', padding: '2px 8px', borderRadius: '6px' }}>Rp 35.000/kg</strong>.
        </p>

        {/* CTA Buttons: Primary "Beli Nila Sekarang" & Secondary "Pelajari Sistem" */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexWrap: 'wrap', 
            marginBottom: '48px' 
          }}
        >
          {/* Primary CTA: Beli Nila Sekarang */}
          <button
            onClick={() => handleScrollToSection('produk')}
            style={{
              background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
              color: '#ffffff',
              border: '2px solid #82D7E1',
              borderRadius: '9999px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 26px rgba(36, 131, 179, 0.45)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 34px rgba(130, 215, 225, 0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 26px rgba(36, 131, 179, 0.45)';
            }}
          >
            <span>Beli Nila Sekarang</span>
            <ArrowRight size={18} color="#82D7E1" />
          </button>

          {/* Secondary CTA: Pelajari Sistem */}
          <button
            onClick={() => handleScrollToSection('budidaya')}
            style={{
              background: 'rgba(14, 36, 64, 0.7)',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(8px)',
              borderRadius: '9999px',
              padding: '16px 32px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = '#82D7E1';
              e.currentTarget.style.color = '#82D7E1';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(14, 36, 64, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <BookOpen size={17} />
            <span>Pelajari Sistem</span>
          </button>
        </div>

        {/* Trust Badges Bar (Contech Release Checklist & High Conversion) */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
            fontSize: '13px',
            color: '#a6c5de'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={16} color="#82D7E1" />
            <span>Bebas Bau Tanah & Lumpur</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={16} color="#82D7E1" />
            <span>Panen Segar Setiap Pagi</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={16} color="#82D7E1" />
            <span>Garansi Ikan Hidup Sampai Tujuan</span>
          </div>
        </div>

        {/* Bottom Key Stats Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '1080px',
            background: 'rgba(14, 36, 64, 0.65)',
            border: '1px solid rgba(130, 215, 225, 0.25)',
            borderRadius: '20px',
            padding: '24px 20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
          }}
        >
          {stats.map((item, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '4px 10px'
              }}
            >
              <div 
                style={{ 
                  fontSize: 'clamp(24px, 3vw, 32px)', 
                  fontWeight: 800, 
                  color: '#82D7E1', 
                  lineHeight: 1.1,
                  letterSpacing: '-0.5px',
                  marginBottom: '6px'
                }}
              >
                {item.num}
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
