import React, { memo } from 'react';
import { 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Truck,
  Fish,
  Waves,
  Activity,
  Calculator
} from 'lucide-react';
import ShinyText from './ShinyText';
import OrbitImages from './OrbitImages';

const NILA_ORBIT_IMAGES = [
  'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80'
];

function HeroSection({ 
  onNavigate, 
  lang = 'id',
  isDark = false 
}) {
  const stats = React.useMemo(() => [
    { num: '98.2%', label: 'Survival Rate (SR)', sub: 'Strain Nirwana Super' },
    { num: '1.12', label: 'Rasio FCR Efisien', sub: 'Hemat Pakan Bioflok' },
    { num: '0%', label: 'Bebas Bau Lumpur', sub: 'Daging Manis Gurih' },
    { num: 'Same-Day', label: 'Pengiriman Hidup', sub: 'Garansi Sehat Tiba' }
  ], []);

  return (
    <section 
      style={{ 
        position: 'relative', 
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '125px', 
        paddingBottom: '60px',
        overflow: 'hidden',
        /* Latar Background Nila (Deep Ocean Blue & Biofloc Aquatic Caustics) */
        background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(36, 131, 179, 0.42) 0%, rgba(22, 54, 101, 0.95) 60%, #0d1e34 100%), linear-gradient(180deg, #163665 0%, #0d1e34 100%)',
        color: '#ffffff'
      }}
    >
      {/* Decorative Aquatic Glow & Water Ripples */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '720px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130, 215, 225, 0.22) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '0',
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
          pointerEvents: 'none'
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
        {/* Top Centered Pill Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(22, 54, 101, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(130, 215, 225, 0.45)',
            borderRadius: '30px',
            padding: '7px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#82D7E1',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
            marginBottom: '22px'
          }}
        >
          <Fish size={16} color="#82D7E1" />
          <span className="pulse-dot" style={{ background: '#82D7E1' }} />
          <ShinyText
            text={lang === 'en' ? 'Smart Biofloc Aquaculture • NilaFarm Indonesia' : 'Teknologi Bioflok Cerdas & Akuakultur Modern • NilaFarm'}
            speed={2.6}
            delay={0}
            color="#82D7E1"
            shineColor="#ffffff"
            spread={100}
            direction="left"
          />
        </div>

        {/* Main Headline (Centered) */}
        <h1 
          style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-1.5px',
            marginBottom: '18px',
            maxWidth: '920px',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)'
          }}
        >
          {lang === 'en' ? (
            <>
              Modern Tilapia Aquaculture & <br />
              <span style={{ color: '#82D7E1' }}>Sustainable Biofloc Farming</span>
            </>
          ) : (
            <>
              Budidaya Ikan Nila Modern & <br />
              <span style={{ color: '#82D7E1' }}>Bioflok Berkelanjutan</span>
            </>
          )}
        </h1>

        {/* Centered Subtitle */}
        <p 
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.6,
            color: '#cfe2ec',
            marginBottom: '32px',
            maxWidth: '740px',
            fontWeight: 400
          }}
        >
          {lang === 'en'
            ? 'Harvest premium freshwater tilapia free from muddy odor. Powered by zero-waste biofloc technology, SKAI-certified Nirwana fingerlings, and real-time smart IoT water monitoring.'
            : 'Panen ikan nila berkualitas tinggi tanpa bau lumpur. Didukung ekosistem bioflok ramah lingkungan tanpa limbah, bibit Nila Nirwana unggul bergaransi hidup, serta pakan berprotein seimbang.'}
        </p>

        {/* Centered CTA Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexWrap: 'wrap', 
            marginBottom: '36px' 
          }}
        >
          <button
            onClick={() => onNavigate('produk')}
            style={{
              background: '#2483B3',
              color: '#ffffff',
              border: '1.5px solid rgba(130, 215, 225, 0.5)',
              borderRadius: '9999px',
              padding: '14px 36px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 24px rgba(36, 131, 179, 0.4)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1a6b94';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(130, 215, 225, 0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#2483B3';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(36, 131, 179, 0.4)';
            }}
          >
            <span>{lang === 'en' ? 'Shop Fish & Fingerlings' : 'Lihat Produk & Bibit Unggul'}</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={() => onNavigate('budidaya')}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1.5px solid rgba(130, 215, 225, 0.35)',
              borderRadius: '9999px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#82D7E1';
              e.currentTarget.style.background = 'rgba(130, 215, 225, 0.18)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(130, 215, 225, 0.35)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Calculator size={16} color="#82D7E1" />
            <span>{lang === 'en' ? 'Biofloc Calculator' : 'Kalkulator Panen Bioflok'}</span>
          </button>
        </div>

        {/* Centered Stats Bar */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '20px',
            maxWidth: '820px',
            width: '100%',
            padding: '20px 24px',
            borderRadius: '20px',
            background: 'rgba(14, 36, 64, 0.65)',
            border: '1px solid rgba(130, 215, 225, 0.25)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
            marginBottom: '40px'
          }}
        >
          {stats.map((s, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div 
                style={{ 
                  fontSize: '26px', 
                  fontWeight: 800, 
                  color: '#82D7E1', 
                  lineHeight: 1.1 
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '11px', color: '#9bb8cc', marginTop: '2px' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Centered OrbitImages Interactive Showcase */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            aspectRatio: '16 / 10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <OrbitImages
            images={NILA_ORBIT_IMAGES}
            shape="ellipse"
            baseWidth={680}
            radiusX={300}
            radiusY={95}
            speed={0.4}
            centerBadge={
              <div
                onClick={() => onNavigate('produk')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  padding: '22px',
                  borderRadius: '50%',
                  background: '#163665',
                  border: '2.5px solid #82D7E1',
                  boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45)',
                  width: '190px',
                  height: '190px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#82D7E1';
                }}
              >
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(130, 215, 225, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px'
                  }}
                >
                  <Fish size={26} color="#82D7E1" />
                </div>
                <b style={{ fontSize: '15px', color: '#ffffff', lineHeight: 1.1 }}>
                  NilaFarm
                </b>
                <span style={{ fontSize: '10px', color: '#82D7E1', fontWeight: 700, letterSpacing: '1px', marginTop: '3px' }}>
                  BIOFLOK SUMEDANG
                </span>
                <div 
                  style={{ 
                    marginTop: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '9.5px',
                    color: '#82D7E1',
                    fontWeight: 700,
                    background: 'rgba(36, 131, 179, 0.3)',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(130, 215, 225, 0.3)'
                  }}
                >
                  <span className="pulse-dot" style={{ width: '6px', height: '6px', background: '#82D7E1' }} />
                  100% SEGAR & HIGIENIS
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
