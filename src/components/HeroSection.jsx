import React, { useState } from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  Sun,
  ShieldCheck,
  Truck,
  Droplets,
  Activity,
  Wind
} from 'lucide-react';
import ShinyText from './ShinyText';
import OrbitImages from './OrbitImages';

export default function HeroSection({ 
  onNavigate, 
  onOpenDashboard, 
  lang = 'id',
  isDark = false 
}) {
  const stats = [
    { num: '4', label: lang === 'en' ? 'Active Ponds' : 'Kolam Aktif', sub: '3 Bundar + 1 Kotak' },
    { num: '9.500+', label: lang === 'en' ? 'Healthy Tilapia' : 'Ekor Nila Sehat', sub: 'Bioflok Terawat' },
    { num: '1.8 Ton', label: lang === 'en' ? 'Cycle Harvest' : 'Panen Tiap Siklus', sub: 'Rutin Tiap 90 Hari' },
    { num: '1.2', label: lang === 'en' ? 'Average FCR' : 'FCR Rata-rata', sub: 'Pakan Alami Terukur' }
  ];

  const trustItems = [
    { 
      id: 0,
      title: 'Panen Pagi Hari', 
      desc: 'Diserok langsung saat Anda memesan',
      icon: Sun
    },
    { 
      id: 1,
      title: '100% Bebas Formalin', 
      desc: 'Air termonitor probe IoT 24 jam',
      icon: ShieldCheck
    },
    { 
      id: 2,
      title: 'Dibersihkan Gratis', 
      desc: 'Minta sisik / fillet tanpa biaya',
      icon: Sparkles
    },
    { 
      id: 3,
      title: 'Antar Same-Day', 
      desc: 'Cepat & Dingin • Area Sumedang & sekitarnya',
      icon: Truck
    }
  ];

  // Farm orbit showcase images
  const orbitImages = [
    '/assets/products/nila-segar.jpg',
    '/assets/products/nila-fillet.jpg',
    '/assets/products/kolam-d4.jpg',
    '/assets/products/pakan-nila.jpg',
    '/assets/products/sensor-iot.jpg',
    '/assets/products/nila-bumbu.jpg'
  ];

  return (
    <section 
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '105px', 
        paddingBottom: '36px',
        overflow: 'hidden',
        background: isDark
          ? `linear-gradient(180deg, rgba(7, 21, 43, 0.94) 0%, rgba(14, 36, 71, 0.86) 45%, rgba(7, 21, 43, 0.98) 88%, var(--bg) 100%), url('/assets/ikan-nila-bioflok.png') center center / cover no-repeat`
          : `linear-gradient(180deg, rgba(238, 245, 254, 0.92) 0%, rgba(227, 242, 253, 0.82) 45%, rgba(247, 251, 255, 0.96) 85%, var(--bg) 100%), url('/assets/ikan-nila-bioflok.png') center center / cover no-repeat`
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 20px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '36px',
            alignItems: 'center',
            paddingTop: '10px',
            paddingBottom: '20px'
          }}
        >
          {/* Left Column: Headlines & CTA */}
          <div>
            {/* Live Status Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '30px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--p)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '18px'
              }}
            >
              <img 
                src="/assets/logo/logoo.png" 
                alt="NilaFarm Logo" 
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  objectFit: 'contain',
                  imageRendering: '-webkit-optimize-contrast',
                  filter: 'drop-shadow(0 2px 6px rgba(33, 150, 243, 0.35))' 
                }} 
              />
              <span className="pulse-dot" />
              <ShinyText
                text={lang === 'en' ? 'Biofloc Tilapia Aquaculture • Sumedang' : 'Usaha Budidaya Nila Keluarga • Sumedang'}
                speed={2.6}
                delay={0}
                color={isDark ? '#90caf9' : '#0d47a1'}
                shineColor="#ffffff"
                spread={100}
                direction="left"
              />
            </div>

            {/* Main Headline */}
            <h1 
              style={{
                fontSize: 'clamp(28px, 4.2vw, 50px)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.8px',
                marginBottom: '16px',
                color: 'var(--txt)'
              }}
            >
              {lang === 'en' ? 'Fresh Tilapia from Our Ponds, ' : 'Nila Segar dari Kolam Kami, '}
              <span style={{ display: 'inline-block' }}>
                <ShinyText
                  text={lang === 'en' ? 'Straight to Your Table' : 'Langsung ke Meja Anda'}
                  speed={2}
                  delay={0}
                  color="#2196f3"
                  shineColor={isDark ? '#ffffff' : '#64b5f6'}
                  spread={120}
                  direction="left"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              style={{
                fontSize: '15.5px',
                lineHeight: 1.6,
                color: 'var(--mut)',
                marginBottom: '26px',
                maxWidth: '540px'
              }}
            >
              {lang === 'en'
                ? 'A family tilapia farm in Sumedang — fresh harvest every morning from 4 active biofloc ponds, free scaling & cleaning, delivered same-day with IoT-monitored water quality.'
                : 'Usaha budidaya nila keluarga di Sumedang — panen segar tiap pagi dari 4 kolam sendiri (3 bundar + 1 kotak), dibersihkan gratis, diantar di hari yang sama.'}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <button
                onClick={() => onNavigate('produk')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14.5px' }}
              >
                <span>{lang === 'en' ? 'See Ready Products' : 'Lihat Produk Siap Jual'}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ%20(NilaFarm%20Sumedang),%20saya%20mau%20pesan%20ikan%20nila%20segar%20atau%20konsultasi%20bioflok"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ padding: '12px 20px', fontSize: '14.5px' }}
              >
                <MessageCircle size={16} color="#22c55e" />
                <span>{lang === 'en' ? 'Chat WhatsApp Admin' : 'Hubungi WhatsApp Farm'}</span>
              </a>
            </div>

            {/* Stats Counters */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
                gap: '14px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border)'
              }}
            >
              {stats.map((s, idx) => (
                <div key={idx}>
                  <div 
                    style={{ 
                      fontSize: '22px', 
                      fontWeight: 800, 
                      color: 'var(--txt)', 
                      lineHeight: 1.1 
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--b)', marginTop: '2px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--mut)' }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: OrbitImages Component Integration from React Bits */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%',
              maxWidth: '520px',
              margin: '0 auto',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <OrbitImages
              images={orbitImages}
              shape="ellipse"
              baseWidth={680}
              radiusX={300}
              radiusY={95}
              rotation={-8}
              duration={30}
              itemSize={78}
              responsive={true}
              showPath={true}
              pathColor={isDark ? 'rgba(33, 150, 243, 0.28)' : 'rgba(33, 150, 243, 0.22)'}
              pathWidth={1.5}
              centerContent={
                <div
                  onClick={onOpenDashboard}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '24px',
                    borderRadius: '50%',
                    background: isDark
                      ? 'radial-gradient(circle, rgba(14, 36, 71, 0.95) 0%, rgba(7, 21, 43, 0.88) 100%)'
                      : 'radial-gradient(circle, rgba(255, 255, 255, 0.96) 0%, rgba(227, 242, 253, 0.90) 100%)',
                    border: '2px solid rgba(33, 150, 243, 0.35)',
                    boxShadow: '0 16px 45px rgba(33, 150, 243, 0.22), inset 0 0 20px rgba(33, 150, 243, 0.1)',
                    width: '180px',
                    height: '180px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = '#2196f3';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(33, 150, 243, 0.35)';
                  }}
                >
                  <img 
                    src="/assets/logo/logoo.png" 
                    alt="NilaFarm HD" 
                    style={{ 
                      width: '54px', 
                      height: '54px', 
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'drop-shadow(0 4px 12px rgba(33, 150, 243, 0.45))',
                      marginBottom: '6px'
                    }} 
                  />
                  <b style={{ fontSize: '15px', color: 'var(--txt)', lineHeight: 1.1 }}>
                    NilaFarm IoT
                  </b>
                  <span style={{ fontSize: '10.5px', color: 'var(--b)', fontWeight: 700, letterSpacing: '0.8px', marginTop: '3px' }}>
                    4 KOLAM AKTIF
                  </span>
                  <div 
                    style={{ 
                      marginTop: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      color: 'var(--ok)',
                      fontWeight: 600,
                      background: 'rgba(16, 185, 129, 0.12)',
                      padding: '2px 8px',
                      borderRadius: '9999px'
                    }}
                  >
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    DO 6.4 mg/L
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* 
          CARDLESS, LINELESS, PREMIUM VALUE PROPOSITION
          Pure open typography with subtle icons:
          - Panen Pagi Hari: Diserok langsung saat Anda memesan
          - 100% Bebas Formalin: Air termonitor probe IoT 24 jam
          - Dibersihkan Gratis: Minta sisik / fillet tanpa biaya
          - Antar Same-Day: Cepat & Dingin • Area Sumedang & sekitarnya
        */}
        <div 
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            position: 'relative'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: '28px',
              alignItems: 'flex-start'
            }}
          >
            {trustItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    transition: 'transform 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(13, 71, 161, 0.05)',
                      color: 'var(--b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.25s ease'
                    }}
                  >
                    <IconComp size={20} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 
                      style={{ 
                        fontSize: '15px', 
                        fontWeight: 700, 
                        color: 'var(--txt)',
                        margin: '0 0 4px',
                        lineHeight: 1.25,
                        letterSpacing: '-0.2px'
                      }}
                    >
                      {item.title}
                    </h4>

                    <p 
                      style={{ 
                        fontSize: '13px', 
                        color: 'var(--mut)', 
                        margin: 0, 
                        lineHeight: 1.5 
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

