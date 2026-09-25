import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Wind, 
  Droplets, 
  Thermometer, 
  Activity, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';
import ShinyText from './ShinyText';

export default function HeroSection({ 
  onNavigate, 
  onOpenDashboard, 
  lang = 'id',
  isDark = false 
}) {
  const [telemetry, setTelemetry] = useState({
    do: 6.4,
    ph: 7.20,
    temp: 28.4,
    nh3: 0.12
  });

  // Simulated live sensor jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        do: +(prev.do + (Math.random() * 0.2 - 0.1)).toFixed(1),
        ph: +(prev.ph + (Math.random() * 0.04 - 0.02)).toFixed(2),
        temp: +(prev.temp + (Math.random() * 0.1 - 0.05)).toFixed(1),
        nh3: +(Math.max(0.08, prev.nh3 + (Math.random() * 0.02 - 0.01))).toFixed(2)
      }));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { num: '4', label: lang === 'en' ? 'Active Ponds' : 'Kolam Aktif', sub: '3 Bundar + 1 Kotak' },
    { num: '9.500+', label: lang === 'en' ? 'Healthy Tilapia' : 'Ekor Nila Sehat', sub: 'Bioflok Terawat' },
    { num: '1.8 Ton', label: lang === 'en' ? 'Cycle Harvest' : 'Panen Tiap Siklus', sub: 'Rutin Tiap 90 Hari' },
    { num: '1.2', label: lang === 'en' ? 'Average FCR' : 'FCR Rata-rata', sub: 'Pakan Alami Terukur' }
  ];

  const trustItems = [
    { title: 'Panen Pagi Hari', desc: 'Diserok langsung saat Anda memesan' },
    { title: '100% Bebas Formalin', desc: 'Air termonitor probe IoT 24 jam' },
    { title: 'Dibersihkan Gratis', desc: 'Minta sisik / fillet tanpa biaya' },
    { title: 'Antar Same-Day', desc: 'Area Sumedang & sekitarnya' }
  ];

  return (
    <section 
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px', 
        paddingBottom: '32px',
        overflow: 'hidden',
        // Background biofloc image with modern gradient overlay
        background: isDark
          ? `linear-gradient(180deg, rgba(7, 21, 43, 0.93) 0%, rgba(14, 36, 71, 0.84) 45%, rgba(7, 21, 43, 0.97) 88%, var(--bg) 100%), url('/assets/ikan-nila-bioflok.png') center center / cover no-repeat`
          : `linear-gradient(180deg, rgba(238, 245, 254, 0.90) 0%, rgba(227, 242, 253, 0.78) 45%, rgba(247, 251, 255, 0.95) 85%, var(--bg) 100%), url('/assets/ikan-nila-bioflok.png') center center / cover no-repeat`
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 20px',
          width: '100%'
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '36px',
            alignItems: 'center',
            paddingTop: '16px',
            paddingBottom: '24px'
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
                src="/assets/logo.png" 
                alt="Logo" 
                style={{ width: '18px', height: '18px', objectFit: 'contain' }} 
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

          {/* Right Column: Live Telemetry Glass Card */}
          <div style={{ position: 'relative' }}>
            {/* Floating Top Badge */}
            <div 
              style={{
                position: 'absolute',
                top: '-14px',
                right: '16px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '6px 12px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--txt)',
                zIndex: 10
              }}
            >
              <Wind size={14} color="#2196f3" />
              <span>Aerator Kolam A1: <b>Menyala (Auto)</b></span>
            </div>

            {/* Main Interactive Card */}
            <div 
              className="glass-panel"
              style={{
                padding: '22px',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-lg)',
                border: '1.5px solid var(--border)'
              }}
            >
              {/* Header */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--txt)' }}>
                      Kolam A1 — Bioflok D4
                    </h3>
                    <span className="chip ok" style={{ fontSize: '10px' }}>Live IoT</span>
                  </div>
                  <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                    Node ESP32 • 2.500 Ekor Nila
                  </small>
                </div>
                <button
                  onClick={onOpenDashboard}
                  style={{
                    background: 'var(--card2)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: 'var(--p)',
                    cursor: 'pointer'
                  }}
                >
                  Buka Panel →
                </button>
              </div>

              {/* 4 Sensor Gauges Grid */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  marginBottom: '16px'
                }}
              >
                {/* Dissolved Oxygen */}
                <div 
                  style={{
                    background: 'var(--card2)',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Wind size={12} color="#2196f3" /> Oksigen (DO)
                    </span>
                    <span className="chip ok" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Aman</span>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)' }}>
                    {telemetry.do} <small style={{ fontSize: '11px', fontWeight: 500, color: 'var(--mut)' }}>mg/L</small>
                  </div>
                  <div className="bar" style={{ marginTop: '6px' }}>
                    <i style={{ width: `${Math.min(100, telemetry.do * 10)}%` }} />
                  </div>
                </div>

                {/* pH Level */}
                <div 
                  style={{
                    background: 'var(--card2)',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Droplets size={12} color="#22c55e" /> Derajat Asam (pH)
                    </span>
                    <span className="chip ok" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Optimal</span>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)' }}>
                    {telemetry.ph}
                  </div>
                  <div className="bar" style={{ marginTop: '6px' }}>
                    <i style={{ width: `${((telemetry.ph - 5.5) / 3.5) * 100}%` }} />
                  </div>
                </div>

                {/* Water Temp */}
                <div 
                  style={{
                    background: 'var(--card2)',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Thermometer size={12} color="#f59e0b" /> Suhu Air
                    </span>
                    <span className="chip ok" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Normal</span>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)' }}>
                    {telemetry.temp} <small style={{ fontSize: '11px', fontWeight: 500, color: 'var(--mut)' }}>°C</small>
                  </div>
                  <div className="bar" style={{ marginTop: '6px' }}>
                    <i style={{ width: `${((telemetry.temp - 24) / 10) * 100}%` }} />
                  </div>
                </div>

                {/* Ammonia */}
                <div 
                  style={{
                    background: 'var(--card2)',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Activity size={12} color="#0d47a1" /> Amonia (NH3)
                    </span>
                    <span className="chip ok" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Rendah</span>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)' }}>
                    {telemetry.nh3} <small style={{ fontSize: '11px', fontWeight: 500, color: 'var(--mut)' }}>ppm</small>
                  </div>
                  <div className="bar" style={{ marginTop: '6px' }}>
                    <i style={{ width: `${Math.min(100, telemetry.nh3 * 160)}%` }} />
                  </div>
                </div>
              </div>

              {/* Sparkline status strip */}
              <div 
                style={{
                  background: 'var(--card2)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontSize: '11.5px', color: 'var(--mut)' }}>
                  Tren Oksigen 24 Jam: <b style={{ color: '#2196f3' }}>Stabil di 6.4 mg/L</b>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} color="var(--mut)" />
                  <span style={{ fontSize: '10.5px', color: 'var(--mut)' }}>Sinkron Otomatis</span>
                </div>
              </div>
            </div>

            {/* Floating Bottom Badge */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-14px',
                left: '16px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '6px 12px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--ok)',
                zIndex: 10
              }}
            >
              <CheckCircle2 size={14} />
              <span>Bioflok Matang • Daging Tidak Bau Lumpur</span>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div 
          className="glass-panel"
          style={{
            padding: '14px 20px',
            borderRadius: '18px',
            marginTop: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '16px',
            alignItems: 'center'
          }}
        >
          {trustItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9px',
                  background: 'rgba(33, 150, 243, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2196f3',
                  flexShrink: 0
                }}
              >
                <CheckCircle2 size={16} />
              </div>
              <div>
                <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block' }}>{item.title}</b>
                <small style={{ fontSize: '11px', color: 'var(--mut)' }}>{item.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
