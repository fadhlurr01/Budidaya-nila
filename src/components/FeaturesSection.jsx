import React, { useState } from 'react';
import { 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Truck, 
  MapPin, 
  Waves, 
  Cpu, 
  Activity,
  ArrowRight,
  CheckCircle2,
  Fish,
  Droplets,
  Wind
} from 'lucide-react';

export default function FeaturesSection({ lang = 'id', onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'panen',
      icon: Sun,
      stage: '01',
      tag: 'Segar Langsung',
      title: lang === 'en' ? 'Harvested Every Morning' : 'Panen Pagi Saat Dipesan',
      summary: lang === 'en'
        ? 'Never frozen storage. Caught fresh from live water right after your order.'
        : 'Ikan diserok langsung dari kolam hidup saat Anda memesan — kesegaran terjaga 100% tanpa simpanan beku lama.',
      metric: '0 Hari Beku',
      metricSub: 'Panen Pagi 06:30',
      badgeColor: '#f59e0b',
      ecoFeature: 'Ikan aktif dipanen selektif sesuai bobot konsumsi premium (500–800g)'
    },
    {
      id: 'bioflok',
      icon: ShieldCheck,
      stage: '02',
      tag: 'Bakteri Menguntungkan',
      title: lang === 'en' ? 'Live & 100% Formalin-Free' : 'Air Bioflok Tanpa Kimia Keras',
      summary: lang === 'en'
        ? 'Raised in probiotic Bacillus water continuously aerated. Zero chemical drugs or preservatives.'
        : 'Ekosistem air terawat oleh probiotik Bacillus subtilis yang mengurai kotoran amonia jadi protein mikro.',
      metric: 'DO > 5.5 mg/L',
      metricSub: 'Aerasi 24 Jam Nonstop',
      badgeColor: '#2196f3',
      ecoFeature: 'Kadar amonia ditekan < 0.12 ppm, ikan selalu lincah dan berdaya tahan tinggi'
    },
    {
      id: 'pakan',
      icon: Leaf,
      stage: '03',
      tag: 'Nutrisi Berkelanjutan',
      title: lang === 'en' ? 'Measured Diet & Natural Azolla' : 'Pakan FCR 1.2 & Suplemen Herbal',
      summary: lang === 'en'
        ? 'Controlled protein pellets supplemented with fresh azolla and papaya leaves for a sweet, clean taste.'
        : 'Kombinasi pelet apung terukur FCR 1.2 dengan selingan daun azolla segar membuat tekstur daging padat dan gurih manis.',
      metric: 'FCR 1.20',
      metricSub: 'Hemat Pakan & Padat Nutrisi',
      badgeColor: '#10b981',
      ecoFeature: 'Enzim papain dari daun pepaya melancarkan metabolisme pencernaan nila'
    },
    {
      id: 'pembersihan',
      icon: Sparkles,
      stage: '04',
      tag: 'Layanan Dapur',
      title: lang === 'en' ? 'Complimentary Cleaning' : 'Dibersihkan & Fillet Gratis',
      summary: lang === 'en'
        ? 'Request scaled, gutted, or filleted in vacuum packs without any additional surcharge.'
        : 'Bebas request dibersihkan sisik, isi perut, insang, atau dipotong fillet bersih siap masak tanpa biaya tambahan.',
      metric: 'Rp 0',
      metricSub: 'Gratis Sisik & Buang Isi Perut',
      badgeColor: '#8b5cf6',
      ecoFeature: 'Dibersihkan dengan air mengalir berstandar sanitasi higienis keluarga'
    },
    {
      id: 'pengantaran',
      icon: Truck,
      stage: '05',
      tag: 'Logistik Dingin',
      title: lang === 'en' ? 'Same-Day Cold Delivery' : 'Pengantaran Same-Day Cepat',
      summary: lang === 'en'
        ? 'Same-day cold chain delivery for Sumedang & adjacent regions. Ordered morning, at dinner table afternoon.'
        : 'Pengantaran ber-es atau wadah beroksigen khusus area Sumedang & sekitarnya agar kondisi ikan tetap prima.',
      metric: 'Same-Day',
      metricSub: 'Sumedang & Bandung Timur',
      badgeColor: '#0284c7',
      ecoFeature: 'Dikirim langsung dari tambak tanpa perantara pedagang kotor'
    },
    {
      id: 'farm',
      icon: MapPin,
      stage: '06',
      tag: 'Edukasi Terbuka',
      title: lang === 'en' ? 'Direct Farm Pick-Up' : 'Bisa Berkunjung & Pilih Sendiri',
      summary: lang === 'en'
        ? 'Visit our farm in Sumedang, handpick your fish in the round ponds, and witness the biofloc system.'
        : 'Datang langsung ke kolam kami di Sumedang, lihat sistem bioflok bekerja, dan serok ikan langsung dari kolam bundar D4.',
      metric: '4 Kolam Aktif',
      metricSub: 'Jl. Raya Sumedang - Cimalaka',
      badgeColor: '#ec4899',
      ecoFeature: 'Edukasi terbuka untuk petani pemula dan keluarga penggemar kuliner nila'
    }
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section 
      id="fitur" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 20px 40px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
        <span 
          style={{ 
            fontSize: '12.5px', 
            fontWeight: 800, 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            color: 'var(--b)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Waves size={15} />
          {lang === 'en' ? 'Aquaculture Ecosystem' : 'Alur Ekosistem Budidaya'}
        </span>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px',
            lineHeight: 1.25,
            marginTop: '8px'
          }}
        >
          {lang === 'en' 
            ? 'Visualizing the Journey: From Aerated Pond to Dining Table' 
            : 'Visualisasi Budidaya Bioflok: Dari Kolam ke Meja Makan'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px', lineHeight: 1.6 }}>
          {lang === 'en'
            ? 'Interact with each stage below to discover how modern biofloc technology guarantees zero muddy odor and superior fish texture.'
            : 'Jelajahi setiap tahapan budidaya di bawah ini untuk melihat bagaimana teknologi bioflok modern menghasilkan nila gurih, manis, dan 100% bebas bau lumpur.'}
        </p>
      </div>

      {/* 1. VISUAL INTERACTIVE FLOW PIPELINE (Replaces 6 Cards with a connected interactive roadmap) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          padding: '6px 4px 16px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          marginBottom: '28px'
        }}
      >
        {steps.map((st, i) => {
          const isActive = activeStep === i;
          const StepIcon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(i)}
              type="button"
              style={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: '9999px',
                border: isActive ? `1.5px solid ${st.badgeColor}` : '1px solid var(--border)',
                background: isActive 
                  ? (st.badgeColor === '#2196f3' ? 'rgba(33, 150, 243, 0.16)' : `${st.badgeColor}22`)
                  : 'var(--card2)',
                color: isActive ? 'var(--txt)' : 'var(--mut)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <div 
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isActive ? st.badgeColor : 'var(--card)',
                  color: isActive ? '#ffffff' : 'var(--mut)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  transition: 'all 0.25s ease'
                }}
              >
                {isActive ? <StepIcon size={14} /> : st.stage}
              </div>
              <span style={{ fontSize: '13px', fontWeight: isActive ? 700 : 500 }}>
                {st.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. IMMERSIVE AQUACULTURE POND VISUALIZER (Interactive Cross-Section Diagram) */}
      <div 
        style={{
          position: 'relative',
          borderRadius: '32px',
          background: 'linear-gradient(180deg, rgba(13, 71, 161, 0.08) 0%, rgba(33, 150, 243, 0.05) 50%, rgba(2, 132, 199, 0.12) 100%)',
          border: '1.5px solid var(--border-strong)',
          padding: 'clamp(20px, 3.5vw, 36px)',
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(13, 71, 161, 0.08)'
        }}
      >
        {/* Subtle Water Ripples Visual Background SVG */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.25,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 30%, rgba(33, 150, 243, 0.4) 0%, transparent 65%)'
          }}
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '32px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Left: Dynamic Visual Cross-Section of Biofloc Tank */}
          <div 
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '24px',
              background: 'rgba(14, 36, 71, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              overflow: 'hidden'
            }}
          >
            {/* Top pond label badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    background: '#22c55e', 
                    display: 'inline-block',
                    boxShadow: '0 0 10px #22c55e'
                  }} 
                />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Anatomi Kolam Bundar D4 Bioflok
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#90caf9', fontWeight: 700 }}>
                Diameter 4m • Kedalaman 1.2m
              </span>
            </div>

            {/* Visual Cross-Section Water Graphic */}
            <div 
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: '18px',
                background: 'linear-gradient(180deg, #1e88e5 0%, #1565c0 40%, #0d47a1 85%, #0a2540 100%)',
                overflow: 'hidden',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Surface Layer: Auto-feeder & Oxygen Saturation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '9999px', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
                  <Wind size={12} color="#90caf9" />
                  <span>Permukaan: Aerasi Micro-Bubble</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(34, 197, 94, 0.3)', border: '1px solid rgba(34, 197, 94, 0.5)', padding: '3px 8px', borderRadius: '9999px', color: '#4ade80', fontSize: '10.5px', fontWeight: 800 }}>
                  <Activity size={11} />
                  <span>DO 6.4 mg/L</span>
                </div>
              </div>

              {/* Mid Layer: Tilapia Swimming in Biofloc Medium */}
              <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Visual Biofloc Particles */}
                <div style={{ position: 'absolute', top: '20%', left: '15%', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', filter: 'blur(1px)' }} />
                <div style={{ position: 'absolute', top: '60%', left: '30%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', filter: 'blur(1px)' }} />
                <div style={{ position: 'absolute', top: '35%', right: '25%', width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', filter: 'blur(1px)' }} />
                <div style={{ position: 'absolute', top: '75%', right: '15%', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', filter: 'blur(1px)' }} />

                {/* Animated Tilapia Graphic Representation */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <Fish size={22} color="#60a5fa" />
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                      Ikan Nila Hitam & Merah Sehat
                    </span>
                    <small style={{ fontSize: '10px', color: '#93c5fd' }}>
                      Populasi Padat 3.500 Ekor • Aktif & Segar
                    </small>
                  </div>
                </div>
              </div>

              {/* Bottom Layer: Conical Sludge Flush & Uniring Diffuser */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#93c5fd', fontSize: '11px' }}>
                  <Droplets size={12} color="#38bdf8" />
                  <span>Dasar Kerucut: Central Drain Flusher</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '9999px', color: '#fbbf24', fontSize: '10.5px', fontWeight: 700 }}>
                  Amonia &lt; 0.12 ppm
                </div>
              </div>
            </div>

            {/* Live Aquaculture Telemetry Metrics Grid below graphic */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
              <div style={{ textAlign: 'center', padding: '10px 8px', borderRadius: '14px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 600 }}>BAU LUMPUR</span>
                <b style={{ fontSize: '14px', color: '#4ade80' }}>0% (Nol)</b>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 8px', borderRadius: '14px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 600 }}>RASIO PAKAN</span>
                <b style={{ fontSize: '14px', color: '#60a5fa' }}>FCR 1.2</b>
              </div>
              <div style={{ textAlign: 'center', padding: '10px 8px', borderRadius: '14px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 600 }}>SENSOR IOT</span>
                <b style={{ fontSize: '14px', color: '#fbbf24' }}>24 Jam Aktif</b>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Information & Story for the Selected Stage */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span 
                style={{ 
                  background: current.badgeColor, 
                  color: '#ffffff', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  padding: '3px 10px', 
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}
              >
                FASE {current.stage} • {current.tag}
              </span>
              <span style={{ fontSize: '12.5px', color: 'var(--mut)', fontWeight: 600 }}>
                {activeStep + 1} dari {steps.length} Alur Utama
              </span>
            </div>

            <h3 
              style={{ 
                fontSize: 'clamp(22px, 2.8vw, 30px)', 
                fontWeight: 800, 
                color: 'var(--txt)', 
                margin: '8px 0 12px',
                lineHeight: 1.3
              }}
            >
              {current.title}
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--mut)', lineHeight: 1.7, marginBottom: '20px' }}>
              {current.summary}
            </p>

            {/* Visual Highlight Feature Pill */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '18px',
                background: 'var(--card2)',
                border: '1px solid var(--border)',
                marginBottom: '24px'
              }}
            >
              <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block', marginBottom: '2px' }}>
                  Standar Mutu Budidaya:
                </b>
                <span style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.5 }}>
                  {current.ecoFeature}
                </span>
              </div>
            </div>

            {/* Quick action buttons & indicator */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <button
                type="button"
                onClick={() => onNavigate('produk')}
                className="btn-primary"
                style={{ padding: '11px 22px', fontSize: '13.5px' }}
              >
                <span>Pesan Hasil Panen</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                className="btn-ghost"
                style={{ padding: '11px 20px', fontSize: '13.5px' }}
              >
                <span>Tahap Selanjutnya</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VISUAL STORY SPLIT (Keep Media Frame only for Farm Photo) */}
      <div 
        id="tentang"
        style={{
          marginTop: '48px',
          padding: 'clamp(24px, 3.5vw, 42px)',
          borderRadius: '30px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        <div>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              color: 'var(--b)', 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={14} />
            Profil Usaha Budidaya Sumedang
          </span>
          <h3 
            style={{ 
              fontSize: 'clamp(24px, 3vw, 32px)', 
              fontWeight: 800, 
              color: 'var(--txt)', 
              marginTop: '8px', 
              marginBottom: '16px',
              lineHeight: 1.25
            }}
          >
            Dari Kolam Sendiri, Untuk Meja Makan Keluarga Indonesia
          </h3>
          <p style={{ fontSize: '14.5px', color: 'var(--mut)', lineHeight: 1.7, marginBottom: '16px' }}>
            NilaFarm berawal dari inisiatif keluarga di Sumedang yang mengelola 4 unit kolam budidaya (3 unit kolam bundar D4 berdiameter 4 meter dan 1 kolam kotak karantina). Berangkat dari kendala amonia naik mendadak di malam hari dan pemborosan pakan, kami merancang sistem telemetri sensor IoT sendiri.
          </p>
          <p style={{ fontSize: '14.5px', color: 'var(--mut)', lineHeight: 1.7, marginBottom: '24px' }}>
            Kini setiap tetes air, putaran aerator, dan pemberian pelet terpantau presisi. Kami bangga dapat menyediakan ikan nila terbaik dengan rasa gurih alami ke para pelanggan di Sumedang dan sekitarnya.
          </p>
          <button 
            onClick={() => onNavigate('produk')}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <span>Pesan Nila Segar Hari Ini</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Media Frame for Photo */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(13, 71, 161, 0.16)',
              border: '2px solid var(--border)'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" 
              alt="Kolam Nila Bioflok Sumedang"
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              background: 'rgba(13, 71, 161, 0.90)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '9999px',
              padding: '10px 18px',
              color: '#ffffff',
              fontSize: '12.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontWeight: 700 }}>Kolam Bioflok D4 Mandiri</span>
            <span style={{ opacity: 0.85, fontSize: '11.5px' }}>Sumedang, Jawa Barat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
