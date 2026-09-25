import React from 'react';
import { 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Truck, 
  MapPin, 
  Waves, 
  Cpu, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function FeaturesSection({ lang = 'id', onNavigate }) {
  const features = [
    {
      icon: Sun,
      title: lang === 'en' ? 'Harvested Every Morning' : 'Panen Pagi Setiap Hari',
      desc: lang === 'en'
        ? 'Fish harvested fresh upon order — never old frozen stock. Maximum tenderness and flavor.'
        : 'Ikan diserok langsung dari kolam saat Anda memesan — bukan stok beku lama. Kesegaran alami terjaga 100%.'
    },
    {
      icon: ShieldCheck,
      title: lang === 'en' ? 'Live & 100% Formalin-Free' : 'Hidup & Bebas Formalin',
      desc: lang === 'en'
        ? 'Raised in biofloc water continuously monitored by IoT probes. Clean, natural, and safe for family.'
        : 'Dibesarkan di air bioflok yang selalu terpantau sensor pH & DO. Tanpa obat kimia keras ataupun pengawet.'
    },
    {
      icon: Sparkles,
      title: lang === 'en' ? 'Complimentary Cleaning' : 'Dibersihkan & Sisik Gratis',
      desc: lang === 'en'
        ? 'Request scaled, gutted, or filleted in vacuum packs without any additional surcharge.'
        : 'Minta disisik, dibersihkan isi perut, atau dipotong fillet siap masak — tanpa biaya tambahan sepeser pun.'
    },
    {
      icon: Leaf,
      title: lang === 'en' ? 'Natural Measured Nutrition' : 'Pakan Terukur & Dedaunan Alami',
      desc: lang === 'en'
        ? 'High protein pellets paired with fresh azolla and papaya leaves — sweet flavor, zero muddy scent.'
        : 'Kombinasi pelet protein tinggi dengan selingan daun azolla segar membuat tekstur daging padat dan bebas bau lumpur.'
    },
    {
      icon: Truck,
      title: lang === 'en' ? 'Same-Day Sumedang Delivery' : 'Pengantaran Same-Day Cepat',
      desc: lang === 'en'
        ? 'Sumedang & nearby cities — order in the morning, receive fresh at your doorstep the same afternoon.'
        : 'Cakup area Sumedang kota hingga perbatasan Bandung Timur — pesan pagi hari, sore ikan tiba di dapur Anda.'
    },
    {
      icon: MapPin,
      title: lang === 'en' ? 'Direct Farm Pick-Up' : 'Bisa Pilih Sendiri di Farm',
      desc: lang === 'en'
        ? 'Visit our farm in Sumedang, handpick your fish in the round ponds, and witness the biofloc system.'
        : 'Silakan datang langsung ke lokasi tambak kami di Sumedang, pilih ikan langsung di kolam bundar D4.'
    }
  ];

  return (
    <section 
      id="fitur" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 20px 40px' 
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 46px' }}>
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
          {lang === 'en' ? 'Why Choose Us' : 'Keunggulan NilaFarm'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px',
            lineHeight: 1.2
          }}
        >
          {lang === 'en' 
            ? 'Why Tilapia from Our Farm Tastes Distinctly Fresh' 
            : 'Kenapa Nila dari Kolam Kami Lebih Gurih & Berkualitas'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px', lineHeight: 1.6 }}>
          {lang === 'en'
            ? 'Cultivated by our family with high standards, integrated with 24-hour IoT water quality control.'
            : 'Dipelihara sendiri dengan standar ketat keluarga, didukung otomasi sensor telemetri 24 jam.'}
        </p>
      </div>

      {/* Grid of 6 Feature Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '20px'
        }}
      >
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '28px',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #2196f3, #0d47a1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  marginBottom: '18px',
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.35)'
                }}
              >
                <Icon size={24} />
              </div>
              <h3 
                style={{ 
                  fontSize: '17px', 
                  fontWeight: 700, 
                  color: 'var(--txt)', 
                  marginBottom: '8px' 
                }}
              >
                {item.title}
              </h3>
              <p 
                style={{ 
                  fontSize: '13.5px', 
                  lineHeight: 1.65, 
                  color: 'var(--mut)' 
                }}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* About story banner */}
      <div 
        id="tentang"
        className="glass-panel"
        style={{
          marginTop: '40px',
          padding: '36px',
          borderRadius: '26px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '32px',
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
              textTransform: 'uppercase' 
            }}
          >
            Profil Usaha Budidaya Sumedang
          </span>
          <h3 
            style={{ 
              fontSize: '26px', 
              fontWeight: 800, 
              color: 'var(--txt)', 
              marginTop: '6px', 
              marginBottom: '14px',
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
          >
            <span>Pesan Nila Segar Hari Ini</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" 
            alt="Kolam Nila Bioflok"
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              background: 'rgba(13, 71, 161, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: '14px',
              padding: '12px 18px',
              color: '#ffffff',
              fontSize: '13px'
            }}
          >
            <b>Kolam Bioflok D4 Mandiri</b> • Sumedang, Jawa Barat
          </div>
        </div>
      </div>
    </section>
  );
}
