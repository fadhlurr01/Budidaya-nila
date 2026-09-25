import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AccordionGallery from '../components/AccordionGallery';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingCart, 
  MessageCircle, 
  Waves, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  Calculator, 
  HelpCircle, 
  ChevronDown, 
  X,
  Droplets,
  TrendingUp,
  Cpu,
  Truck,
  Fish,
  Wind,
  Activity,
  Layers,
  Check
} from 'lucide-react';

export default function HomePage({ 
  products, 
  articles, 
  onAddToCart, 
  onOpenCart, 
  onNavigate, 
  onOpenDashboard, 
  isDark, 
  lang = 'id' 
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const [compareMode, setCompareMode] = useState('bioflok'); // 'bioflok' | 'konvensional'
  const [activeBenchmark, setActiveBenchmark] = useState(0);

  const galleryItems = [
    {
      id: 'p1',
      image: '/assets/products/nila-segar.jpg',
      label: 'Nila Hitam Segar',
      sublabel: 'Rp38.000 / Kg • Panen Pagi',
      alt: 'Nila Segar Panen Pagi',
      product: products.find(p => p.id === 'p1') || products[0]
    },
    {
      id: 'p2',
      image: '/assets/products/nila-fillet.jpg',
      label: 'Nila Fillet Bersih Sisik',
      sublabel: 'Rp45.000 / Pack • Tanpa Duri',
      alt: 'Nila Fillet Kemasan Vakum',
      product: products.find(p => p.id === 'p2') || products[1]
    },
    {
      id: 'p3',
      image: '/assets/products/benih-nila.jpg',
      label: 'Bibit Benih Nila Unggul',
      sublabel: 'Rp600 / Ekor • Ukuran 5-7 cm',
      alt: 'Bibit Benih Nila Bioflok',
      product: products.find(p => p.id === 'p3') || products[2]
    },
    {
      id: 'p4',
      image: '/assets/products/kolam-d4.jpg',
      label: 'Paket Kolam Bundar D4',
      sublabel: 'Rp4.800.000 / Unit • Rangka Wiremesh M8',
      alt: 'Kolam Bioflok D4 Galvanis',
      product: products.find(p => p.id === 'p4') || products[3]
    },
    {
      id: 'p8',
      image: '/assets/products/pakan-nila.jpg',
      label: 'Pelet Apung FCR 1.2',
      sublabel: 'Rp320.000 / Sak • Protein 32%',
      alt: 'Pakan Pelet Apung Nila',
      product: products.find(p => p.id === 'p8') || products[4] || products[0]
    }
  ];

  const [selectedGalleryProduct, setSelectedGalleryProduct] = useState(galleryItems[0].product);

  const formatRupiah = (val) => 'Rp' + Number(val || 0).toLocaleString('id-ID');

  const faqs = [
    {
      q: 'Mengapa ikan nila dari NilaFarm dijamin tidak bau lumpur / bau tanah?',
      a: 'Ikan nila kami dibesarkan di dalam kolam terpal bundar bioflok berketinggian 1.2 meter tanpa menyentuh tanah dasar. Air diaerasi tinggi dengan suplai dissolved oxygen (DO > 5.5 mg/L) sepanjang hari, serta didukung konsorsium bakteri probiotik Bacillus yang mengurai amonia sebelum mengendap. Hal ini mencegah tumbuhnya alga mikroskopis penghasil geosmin yang biasanya menyebabkan aroma amis lumpur pada tambak tanah.'
    },
    {
      q: 'Apakah bisa memesan ikan dalam kondisi hidup atau sudah dibersihkan?',
      a: 'Bisa keduanya! Anda dapat memesan ikan nila hidup (diantar dalam wadah beroksigen), ikan segar utuh ber-es, maupun ikan yang sudah kami buang sisik, insang, dan jeroannya tanpa biaya tambahan. Tersedia juga varian Nila Fillet tanpa tulang yang divakum kedap udara.'
    },
    {
      q: 'Bagaimana cara membeli bibit benih nila atau paket kolam bioflok D4?',
      a: 'Anda dapat langsung memesan melalui halaman Katalog Produk atau berkonsultasi dengan Owner kami, Hamdan Russ, melalui WhatsApp 0813-8257-0406. Kami menyediakan paket kolam D4 komplit rangka wiremesh galvanis M8, aerator uniring, dan pendampingan teknis aklimatisasi benih hingga panen.'
    },
    {
      q: 'Berapa lama estimasi pengantaran pesanan?',
      a: 'Untuk area Sumedang, Tanjungsari, Cimalaka, dan sekitarnya kami melayani pengantaran Same-Day (pesan pagi saat panen jam 06:30 - 09:00, diantar siang hari). Untuk pesanan luar kota berupa fillet beku atau peralatan bioflok, kami menggunakan kurir logistik khusus berpendingin.'
    },
    {
      q: 'Apakah saya bisa datang langsung berkunjung ke lokasi kolam farm?',
      a: 'Sangat bisa! Kami menyambut kunjungan silaturahmi, belajar budidaya bioflok, maupun pembelian langsung di lokasi (Jl. Raya Sumedang - Cimalaka KM 4). Mohon mengabari terlebih dahulu melalui Admin 1 (Hamdan Russ: 0813-8257-0406) atau Admin 2 (CS: 0821-2231-9510) agar tim kami siap menyambut.'
    }
  ];

  const benchmarks = [
    {
      title: 'Aroma & Bau Lumpur (Geosmin)',
      bioflokScore: 100,
      bioflokLabel: '0% Bau Lumpur (100% Bersih)',
      bioflokDetail: 'Kolam terpal tanpa lumpur dasar. Bakteri Bacillus mengurai zat bau amonia sebelum menempel ke insang dan daging ikan.',
      konvensionalScore: 25,
      konvensionalLabel: 'Bau Lumpur Sangat Terasa',
      konvensionalDetail: 'Ikan menyerap geosmin dari alga biru-hijau di lumpur dasar tambak, menimbulkan bau amis tanah pekat saat dimasak.'
    },
    {
      title: 'Kadar Oksigen Terlarut (DO)',
      bioflokScore: 95,
      bioflokLabel: 'DO 5.8 - 6.8 mg/L (Super Optimal)',
      bioflokDetail: 'Aerator uniring micro-bubble bekerja 24 jam nonstop. Ikan sangat aktif, metabolisme lancar, nafsu makan stabil.',
      konvensionalScore: 40,
      konvensionalLabel: 'DO 2.5 - 3.8 mg/L (Fluktuatif)',
      konvensionalDetail: 'Tanpa aerasi kontinu, oksigen anjlok drastis pada dini hari menyebabkan stres dan kematian massal ikan.'
    },
    {
      title: 'Efisiensi Pakan & Tekstur Daging',
      bioflokScore: 92,
      bioflokLabel: 'FCR 1.18 - 1.22 (Daging Padat & Manis)',
      bioflokDetail: 'Flok mikroba kaya protein dimakan kembali oleh ikan sebagai suplemen alami, menghasilkan daging padat dan susut goreng minimal.',
      konvensionalScore: 35,
      konvensionalLabel: 'FCR 1.60 - 1.85 (Boros & Lembek)',
      konvensionalDetail: 'Banyak pelet tenggelam membusuk di dasar tanah. Daging cenderung berlemak lembek dan banyak susut saat dimasak.'
    },
    {
      title: 'Sistem Higienitas & Pengawasan Limbah',
      bioflokScore: 98,
      bioflokLabel: 'Central Drain & Sensor IoT 24 Jam',
      bioflokDetail: 'Feses dan sisa amonia terkuras setiap hari lewat saluran pembuangan sentral kerucut. Kualitas air selalu terkontrol.',
      konvensionalScore: 30,
      konvensionalLabel: 'Endapan Lumpur Mengendap Bertahun-tahun',
      konvensionalDetail: 'Kotoran dan racun amonia menumpuk di dasar tanah tanpa filter, rentan menjadi sarang parasit dan penyakit ikan.'
    }
  ];

  const getProductImage = (p) => {
    if (p.img) return p.img;
    const map = {
      'p1': '/assets/products/nila-segar.jpg',
      'p2': '/assets/products/nila-fillet.jpg',
      'p3': '/assets/products/benih-nila.jpg',
      'p4': '/assets/products/kolam-d4.jpg',
      'p5': '/assets/products/sensor-iot.jpg',
      'p6': '/assets/products/auto-feeder.jpg',
      'p7': '/assets/products/nila-bumbu.jpg',
      'p8': '/assets/products/pakan-nila.jpg',
      'p9': '/assets/products/probiotik-bioflok.jpg',
      'p10': '/assets/products/kolam-d3.jpg'
    };
    return map[p.id] || '/assets/products/nila-segar.jpg';
  };

  const topProducts = products.slice(0, 4);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* 1. HERO SECTION */}
      <HeroSection 
        onNavigate={onNavigate}
        onOpenDashboard={onOpenDashboard}
        lang={lang}
        isDark={isDark}
      />

      {/* 2. INTERACTIVE AQUACULTURE QUALITY STUDIO (Replaces Plain Cards with Visual Interactive Comparison) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 20px 40px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={15} />
            Standar Mutu Ikan
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            Perbedaan Nila Bioflok vs Tambak Tanah
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '10px' }}>
            Visualisasi komparasi kualitas air, tekstur daging, dan higienitas sistem bioflok NilaFarm dibandingkan tambak konvensional.
          </p>

          {/* Interactive Mode Switcher Pill */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: 'var(--card2)', 
              padding: '5px', 
              borderRadius: '9999px', 
              border: '1px solid var(--border)',
              marginTop: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => setCompareMode('bioflok')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                background: compareMode === 'bioflok' ? 'var(--b)' : 'transparent',
                color: compareMode === 'bioflok' ? '#ffffff' : 'var(--txt)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.25s ease'
              }}
            >
              <Sparkles size={14} />
              <span>Bioflok Modern NilaFarm</span>
            </button>
            <button
              type="button"
              onClick={() => setCompareMode('konvensional')}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                background: compareMode === 'konvensional' ? '#ef4444' : 'transparent',
                color: compareMode === 'konvensional' ? '#ffffff' : 'var(--txt)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.25s ease'
              }}
            >
              <X size={14} />
              <span>Tambak Tanah Tradisional</span>
            </button>
          </div>
        </div>

        {/* Visual Interactive Comparison Board */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '28px',
            background: compareMode === 'bioflok'
              ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(13, 71, 161, 0.04) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(185, 28, 28, 0.04) 100%)',
            border: compareMode === 'bioflok' ? '2px solid rgba(33, 150, 243, 0.3)' : '2px solid rgba(239, 68, 68, 0.3)',
            padding: 'clamp(20px, 3.5vw, 36px)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Header indicator banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: compareMode === 'bioflok' ? '#22c55e' : '#ef4444', 
                  color: '#ffffff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: compareMode === 'bioflok' ? '0 4px 14px rgba(34, 197, 94, 0.4)' : '0 4px 14px rgba(239, 68, 68, 0.4)'
                }}
              >
                {compareMode === 'bioflok' ? <CheckCircle2 size={20} /> : <X size={20} />}
              </div>
              <div>
                <b style={{ fontSize: '18px', color: 'var(--txt)', display: 'block' }}>
                  {compareMode === 'bioflok' ? 'Standar Mutu Nila Bioflok Modern' : 'Risiko Mutu Tambak Tanah Konvensional'}
                </b>
                <span style={{ fontSize: '12px', color: compareMode === 'bioflok' ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
                  {compareMode === 'bioflok' ? '100% HIGIENIS & KONTROL TEKNOLOGI' : 'METODE TANAH RAWAN BAU AMIS & AMONIA'}
                </span>
              </div>
            </div>

            <span style={{ fontSize: '12.5px', color: 'var(--mut)', fontWeight: 600 }}>
              Klik parameter untuk inspeksi teknis
            </span>
          </div>

          {/* 4 Interactive Visual Benchmark Bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))', gap: '18px' }}>
            {benchmarks.map((bm, bIdx) => {
              const isSelected = activeBenchmark === bIdx;
              const isBio = compareMode === 'bioflok';
              const currentScore = isBio ? bm.bioflokScore : bm.konvensionalScore;
              const currentLabel = isBio ? bm.bioflokLabel : bm.konvensionalLabel;
              const currentDetail = isBio ? bm.bioflokDetail : bm.konvensionalDetail;
              const scoreColor = isBio ? '#22c55e' : '#ef4444';

              return (
                <div
                  key={bIdx}
                  onClick={() => setActiveBenchmark(bIdx)}
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    background: isSelected ? 'var(--card)' : 'var(--card2)',
                    border: isSelected ? `2px solid ${scoreColor}` : '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>
                    BENCHMARK {bIdx + 1}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {bm.title}
                  </h4>

                  {/* Progress Gauge */}
                  <div style={{ height: '8px', borderRadius: '9999px', background: 'rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '10px' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${currentScore}%`, 
                        background: scoreColor, 
                        borderRadius: '9999px',
                        transition: 'width 0.4s ease'
                      }} 
                    />
                  </div>

                  <b style={{ fontSize: '13px', color: scoreColor, display: 'block', marginBottom: '6px' }}>
                    {currentLabel}
                  </b>

                  <p style={{ fontSize: '12.5px', color: 'var(--mut)', lineHeight: 1.55, margin: 0 }}>
                    {currentDetail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VISUAL AQUACULTURE PIPELINE (Features Section without bland cards) */}
      <FeaturesSection lang={lang} onNavigate={onNavigate} />

      {/* 4. FEATURED PRODUCTS SHOWCASE WITH ACCORDION GALLERY */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '50px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Media Showcase & Katalog
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '6px' }}>
              Produk Panen & Peralatan Terlaris
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginTop: '6px' }}>
              Arahkan kursor atau sentuh panel untuk melihat detail media produk segar dan perlengkapan bioflok.
            </p>
          </div>

          <button 
            onClick={() => onNavigate('produk')}
            className="btn-ghost"
            style={{ padding: '10px 20px', fontSize: '13.5px' }}
          >
            <span>Buka Semua Produk di Katalog</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* React Bits AccordionGallery Component */}
        <div style={{ marginBottom: '24px' }}>
          <AccordionGallery
            items={galleryItems}
            defaultIndex={0}
            expandRatio={0.46}
            trigger="hover"
            height={420}
            gap={12}
            radius={22}
            accentColor="#2196f3"
            overlayColor="#07152b"
            textColor="#ffffff"
            onSelect={(item) => item?.product && setSelectedGalleryProduct(item.product)}
          />
        </div>

        {/* Selected Product Interactive Action Bar */}
        {selectedGalleryProduct && (
          <div 
            style={{
              padding: '16px 24px',
              borderRadius: '9999px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '36px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid var(--b)'
                }}
              >
                <img 
                  src={getProductImage(selectedGalleryProduct)} 
                  alt={selectedGalleryProduct.nama}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <b style={{ fontSize: '15.5px', color: 'var(--txt)', display: 'block' }}>
                  {selectedGalleryProduct.nama}
                </b>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--p)' }}>
                    {formatRupiah(selectedGalleryProduct.harga)}
                  </span>
                  <small style={{ color: 'var(--mut)', fontSize: '12px' }}>{selectedGalleryProduct.satuan}</small>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => onAddToCart(selectedGalleryProduct)}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '9999px' }}
              >
                <ShoppingCart size={15} />
                <span>+ Tambah ke Keranjang</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('produk')}
                className="btn-ghost"
                style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '9999px' }}
              >
                <span>Lihat Detail</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Quick Grid of Products */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))', gap: '20px' }}>
          {topProducts.map((p) => (
            <div 
              key={p.id}
              className="glass-panel product-card-hover"
              style={{
                padding: '18px',
                borderRadius: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border)'
              }}
            >
              <div>
                {/* Media Image Frame */}
                <div style={{ height: '170px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
                  <img 
                    src={getProductImage(p)} 
                    alt={p.nama}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', background: 'rgba(13, 71, 161, 0.88)', padding: '3px 10px', borderRadius: '9999px' }}>
                      {p.kategori}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--txt)', marginBottom: '4px' }}>
                  {p.nama}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--p)' }}>
                    {formatRupiah(p.harga)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--mut)' }}>{p.satuan}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--mut)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {p.desk}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onAddToCart(p)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: '10px', fontSize: '12.5px', borderRadius: '9999px' }}
                >
                  <ShoppingCart size={14} />
                  <span>+ Keranjang</span>
                </button>
                <button
                  onClick={() => onNavigate('produk')}
                  className="btn-primary"
                  style={{ padding: '10px 14px', fontSize: '12.5px', borderRadius: '9999px' }}
                >
                  <span>Detail</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VISUAL BUDIDAYA PIPELINE & CALCULATOR BANNER (Replaces Heavy Boxy Card) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 20px 60px', width: '100%', boxSizing: 'border-box' }}>
        <div 
          style={{
            position: 'relative',
            padding: 'clamp(28px, 4vw, 48px)',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.12) 0%, rgba(13, 71, 161, 0.08) 100%)',
            border: '1.5px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '28px',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--grad)', color: '#ffffff', padding: '5px 16px', borderRadius: '9999px', fontSize: '11.5px', fontWeight: 700, marginBottom: '16px' }}>
              <Calculator size={13} />
              <span>Simulasi & Riset Akuakultur</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px', lineHeight: 1.25 }}>
              Ingin Menghitung Estimasi Panen & Omset Sendiri?
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--mut)', lineHeight: 1.65, margin: 0 }}>
              Gunakan <b>Kalkulator Budidaya Nila Bioflok</b> kami untuk mensimulasikan modal pakan FCR 1.2, padat tebar bibit, biomassa tonase, hingga keuntungan bersih siklus 90 hari secara realtime.
            </p>

            {/* Quick Feature Metric Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--txt)' }}>
                ⚡ Auto-Hitung FCR 1.2
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--txt)' }}>
                🐟 Standar Kolam D4 (4.000 Ekor)
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--txt)' }}>
                📈 Proyeksi Laba Bersih Siklus
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 2 }}>
            <button
              onClick={() => onNavigate('budidaya')}
              className="btn-primary"
              style={{ padding: '13px 26px', fontSize: '14px' }}
            >
              <Waves size={16} />
              <span>Buka Kalkulator & SOP Budidaya</span>
              <ArrowRight size={15} />
            </button>
            <a 
              href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ,%20saya%20tertarik%20konsultasi%20pembuatan%20kolam%20bioflok"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ padding: '11px 20px', fontSize: '13.5px', justifyContent: 'center' }}
            >
              <MessageCircle size={15} color="#22c55e" />
              <span>Konsultasi Teknis via WA (Hamdan Russ)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <TestimonialsSection lang={lang} />

      {/* 7. LATEST ARTICLES CALLOUT (Cards preserved strictly for media presentation) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '50px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Edukasi & Riset
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '6px' }}>
              Artikel & Wawasan Terbaru dari Kolam
            </h2>
          </div>

          <button 
            onClick={() => onNavigate('artikel')}
            className="btn-ghost"
            style={{ padding: '10px 20px', fontSize: '13.5px' }}
          >
            <span>Buka Semua Artikel Edukasi</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px' }}>
          {articles.slice(0, 2).map((art) => (
            <article 
              key={art.id}
              className="glass-panel"
              onClick={() => onNavigate('artikel-detail', art.id)}
              style={{
                borderRadius: '22px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Media Image Frame */}
                <div style={{ height: '190px', overflow: 'hidden' }}>
                  <img src={art.img} alt={art.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '22px' }}>
                  <small style={{ color: 'var(--b)', fontWeight: 700, fontSize: '12px' }}>{art.tgl}</small>
                  <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: 'var(--txt)', margin: '8px 0', lineHeight: 1.4 }}>
                    {art.judul}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6 }}>
                    {art.ringkas}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 22px 20px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('artikel-detail', art.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--b)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0
                  }}
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION (Visual Clean Bordered Flow without Bland Glass Cards) */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 20px 70px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Tanya Jawab Seputar NilaFarm
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div 
                key={fIdx}
                style={{
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.2s ease',
                  background: isOpen ? 'var(--card2)' : 'transparent'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  style={{
                    width: '100%',
                    padding: '20px 16px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '14px'
                  }}
                >
                  <span style={{ fontSize: '15.5px', fontWeight: isOpen ? 800 : 600, color: isOpen ? 'var(--b)' : 'var(--txt)' }}>
                    {faq.q}
                  </span>
                  <div 
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--b)' : 'var(--card2)',
                      color: isOpen ? '#ffffff' : 'var(--mut)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <ChevronDown 
                      size={16} 
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }} 
                    />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 16px 20px', color: 'var(--mut)', fontSize: '14px', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM DUAL ADMIN WHATSAPP CALLOUT */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px 80px', width: '100%', boxSizing: 'border-box' }}>
        <div 
          style={{
            padding: 'clamp(24px, 3.5vw, 40px)',
            borderRadius: '30px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Phone size={18} color="var(--b)" />
              <b style={{ fontSize: '13px', color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Layanan 2 Admin NilaFarm Sumedang
              </b>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>
              Ada Pertanyaan atau Mau Pesan Langsung?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--mut)', margin: 0 }}>
              Hubungi <b>Hamdan Russ (+62 813-8257-0406)</b> untuk konsultasi teknis & pembuatan kolam, atau <b>CS Pemesanan (0821-2231-9510)</b> untuk order ikan & pakan harian.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ,%20saya%20ingin%20tanya%20seputar%20NilaFarm"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '13.5px' }}
            >
              <MessageCircle size={15} />
              <span>Admin 1: Hamdan Russ</span>
            </a>
            <a 
              href="https://wa.me/6282122319510?text=Halo%20CS%20NilaFarm,%20saya%20ingin%20memesan%20ikan%20nila"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ padding: '12px 20px', fontSize: '13.5px' }}
            >
              <MessageCircle size={15} color="#22c55e" />
              <span>Admin 2: CS Pemesanan</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
