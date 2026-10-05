import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import ArticlesSection from '../components/ArticlesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { 
  Waves, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Droplets, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function HomePage({ 
  products, 
  articles, 
  onAddToCart, 
  onNavigate, 
  isDark = false, 
  lang = 'id', 
  onOpenCart 
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* 1. HERO SECTION (High-Conversion UI with Kolam Background & Rp 35k Highlight) */}
      <HeroSection 
        onNavigate={onNavigate}
        isDark={isDark}
        lang={lang}
      />

      {/* 2. VALUE PROPOSITION / TRUST HIGHLIGHTS */}
      <section 
        style={{ 
          background: isDark ? '#0f243e' : '#f0f6fa',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '30px 24px'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', 
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(36, 131, 179, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2483B3', flexShrink: 0 }}>
              <Droplets size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 2px' }}>
                100% Bebas Bau Lumpur
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                Sirkulasi air aerasi mikroba aktif menjaga rasa daging manis gurih alami.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 2px' }}>
                Panen Segar Setiap Pagi
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                Ikan ditangkap hidup di hari pengiriman, menjamin kesegaran prima.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(36, 131, 179, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2483B3', flexShrink: 0 }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 2px' }}>
                Harga Terbaik Peternak
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                Langsung dari tambak Sumedang mulai Rp 35.000/kg tanpa perantara.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(130, 215, 225, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2483B3', flexShrink: 0 }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 2px' }}>
                Garansi Hidup Sampai
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                Pengiriman dengan sistem oksigen murni se-Jawa dan Bali bergaransi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION PREVIEW (With CTA to Dedicated /produk Page) */}
      <ProductsSection 
        products={products}
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
        onNavigate={onNavigate}
        lang={lang}
      />

      {/* 4. BIOFLOC SUSTAINABILITY & WHY CHOOSE US */}
      <section 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '60px 24px 40px', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div 
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, #142a47 0%, #1c3b63 100%)' 
              : 'linear-gradient(135deg, #f0f7fb 0%, #e2eff7 100%)',
            border: isDark ? '1px solid rgba(130, 215, 225, 0.3)' : '1px solid #cfe2ec',
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 56px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <div>
            <span 
              style={{ 
                fontSize: '12px', 
                fontWeight: 800, 
                letterSpacing: '1.5px', 
                textTransform: 'uppercase', 
                color: '#2483B3',
                background: 'rgba(36, 131, 179, 0.1)',
                padding: '4px 12px',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '12px'
              }}
            >
              Keunggulan Teknologi
            </span>

            <h3 
              style={{ 
                fontSize: 'clamp(26px, 3.5vw, 36px)', 
                fontWeight: 800, 
                color: 'var(--txt)', 
                lineHeight: 1.25,
                marginBottom: '16px'
              }}
            >
              Mengapa Nila Sistem Bioflok Jauh Lebih Unggul?
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '24px' }}>
              Bioflok memanfaatkan bakteri probiotik heterotrof yang mengubah kotoran ikan dan amonia menjadi flok bernutrisi tinggi yang dimakan kembali oleh nila.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--txt)' }}>
                  Hemat Air hingga 80% (Sirkulasi tertutup tanpa buang limbah)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--txt)' }}>
                  FCR Pakan Hemat 1.05 - 1.15 (Flok mikroba menjadi sumber pakan alami)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--txt)' }}>
                  Kepadatan Tebar Tinggi 100-150 ekor/m³ (Hasil panen padat maksimal)
                </span>
              </div>
            </div>

            {/* CTA to Dedicated /budidaya Page */}
            <div>
              <button
                onClick={() => onNavigate('budidaya')}
                style={{
                  background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
                  color: '#ffffff',
                  border: '1.5px solid #82D7E1',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(36, 131, 179, 0.35)',
                  transition: 'all 0.2s'
                }}
              >
                <span>Pelajari Budidaya Bioflok & Monitoring IoT Lengkap</span>
                <ArrowRight size={15} color="#82D7E1" />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(22, 54, 101, 0.2)',
                border: '3px solid #82D7E1',
                maxWidth: '460px',
                width: '100%'
              }}
            >
              <img 
                src="/assets/products/kolam-d3.jpg" 
                alt="Kolam Bioflok D3 NilaFarm"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(14, 36, 64, 0.95), transparent)',
                  padding: '20px',
                  color: '#ffffff'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 800 }}>Paket Kolam Bundar Bioflok D3</div>
                <div style={{ fontSize: '12px', color: '#82D7E1' }}>Kapasitas 1.000 ekor • Rangka Wiremesh Galvanis M6</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATIONAL ARTICLES PREVIEW (With CTA to Dedicated /artikel Page) */}
      <ArticlesSection 
        articles={articles}
        onNavigate={onNavigate}
        lang={lang}
      />

      {/* 6. TESTIMONIALS & REVIEWS SECTION */}
      <TestimonialsSection 
        isDark={isDark} 
        lang={lang} 
      />

      {/* 7. CONTACT & FARM LOCATION PREVIEW (CTA to Dedicated /kontak Page) */}
      <section 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '10px 24px 70px', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div 
          style={{
            background: isDark ? '#142a47' : '#ffffff',
            border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cbd5e1',
            borderRadius: '24px',
            padding: '36px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)'
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#2483B3', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Konsultasi & Kemitraan
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--txt)', margin: '6px 0 8px' }}>
              Ingin Memulai Budidaya atau Pesan Ikan Skala Besar?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--mut)', margin: 0, maxWidth: '640px' }}>
              Kunjungi kompleks tambak kami di Sumedang atau hubungi tim teknis kami untuk jadwal panen dan slot bibit unggul.
            </p>
          </div>
          <button
            onClick={() => onNavigate('kontak')}
            style={{
              background: '#2483B3',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '13px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(36, 131, 179, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            <span>Buka Halaman Kontak & Lokasi Farm</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
