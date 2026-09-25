import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
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
  Fish
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

      {/* 2. VALUE PROPOSITION: BIOFLOC VS TRADITIONAL */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 20px 40px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Standar Mutu Ikan
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            Perbedaan Nila Bioflok vs Tambak Tanah
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '10px' }}>
            Mengapa restoran, katering, dan keluarga di Sumedang lebih memilih ikan nila hasil budidaya bioflok NilaFarm.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px' }}>
          {/* NilaFarm Biofloc Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '32px',
              borderRadius: '24px',
              border: '2px solid var(--b)',
              background: 'linear-gradient(180deg, var(--card2) 0%, var(--card) 40%)',
              boxShadow: '0 12px 36px rgba(33, 150, 243, 0.18)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--grad)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <b style={{ fontSize: '18px', color: 'var(--txt)' }}>Nila Bioflok Modern NilaFarm</b>
                <small style={{ color: 'var(--b)', display: 'block', fontWeight: 700 }}>STANDAR AKUAKULTUR SEHAT</small>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>100% Bebas Bau Lumpur:</b> Kolam bundar terpal tanpa tanah, air beroksigen tinggi mencegah alga berbau menyengat.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>Tekstur Daging Padat & Manis:</b> Protein pakan FCR 1.2 ditambah suplemen flok alami menjadikan daging kenyal dan gurih.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>Higienis & Bebas Parasit:</b> Sirkulasi central drain membuang kotoran setiap hari, air selalu jernih dan terkontrol.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><b>Terpantau Sensor IoT 24 Jam:</b> Suhu air, dissolved oxygen, dan pH dicatat realtime demi kesehatan optimal ikan.</span>
              </li>
            </ul>
          </div>

          {/* Conventional Pond Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '32px',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              opacity: 0.9
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} />
              </div>
              <div>
                <b style={{ fontSize: '18px', color: 'var(--txt)' }}>Tambak Tanah Konvensional</b>
                <small style={{ color: 'var(--mut)', display: 'block', fontWeight: 600 }}>METODE TRADISIONAL</small>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px', color: 'var(--mut)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                <span><b>Sering Berbau Lumpur:</b> Ikan memakan endapan tanah di dasar kolam yang mengandung zat geosmin berbau amis tanah.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                <span><b>Daging Lembek & Susut Tinggi:</b> Kurang asupan oksigen membuat daging cepat layu dan susut bobot setelah digoreng.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                <span><b>Rentan Kotoran & Bakteri Liar:</b> Kotoran menumpuk di dasar lumpur tanpa sistem pembuangan limbah terpusat.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                <span><b>Tanpa Pengawasan Kualitas Air:</b> Mudah mengalami kematian massal jika terjadi perubahan cuaca atau hujan lebat mendadak.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <FeaturesSection lang={lang} onNavigate={onNavigate} />

      {/* 4. FEATURED PRODUCTS HIGHLIGHT */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '50px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Katalog Pilihan
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '6px' }}>
              Produk Panen & Peralatan Terlaris
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginTop: '6px' }}>
              Dipanen segar setiap pagi dari kolam bioflok Sumedang, siap dikirim ke dapur Anda.
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '22px' }}>
          {topProducts.map((p) => (
            <div 
              key={p.id}
              className="glass-panel product-card-hover"
              style={{
                padding: '20px',
                borderRadius: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border)'
              }}
            >
              <div>
                <div style={{ height: '180px', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px', position: 'relative' }}>
                  <img 
                    src={getProductImage(p)} 
                    alt={p.nama}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', background: 'rgba(13, 71, 161, 0.88)', padding: '3px 8px', borderRadius: '6px' }}>
                      {p.kategori}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '6px' }}>
                  {p.nama}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--p)' }}>
                    {formatRupiah(p.harga)}
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'var(--mut)' }}>{p.satuan}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.55, marginBottom: '16px' }}>
                  {p.desk}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onAddToCart(p)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: '10px', fontSize: '12.5px' }}
                >
                  <ShoppingCart size={14} />
                  <span>+ Keranjang</span>
                </button>
                <button
                  onClick={() => onNavigate('produk')}
                  className="btn-primary"
                  style={{ padding: '10px 14px', fontSize: '12.5px' }}
                >
                  <span>Detail</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BUDIDAYA PIPELINE CALLOUT BANNER */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 20px 60px', width: '100%', boxSizing: 'border-box' }}>
        <div 
          className="glass-panel"
          style={{
            padding: '40px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.14) 0%, rgba(13, 71, 161, 0.1) 100%)',
            border: '2px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--grad)', color: '#ffffff', padding: '5px 14px', borderRadius: '18px', fontSize: '11.5px', fontWeight: 700, marginBottom: '14px' }}>
              <Calculator size={13} />
              <span>Kalkulator & Panduan Khusus</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 12px' }}>
              Ingin Memulai Budidaya Nila Bioflok Sendiri?
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--mut)', lineHeight: 1.65, margin: 0 }}>
              Kunjungi Halaman Budidaya kami untuk membaca SOP langkah demi langkah (persiapan air, aklimatisasi benih, jadwal pakan FCR 1.2, hingga panen 90 hari) dan gunakan <b>Kalkulator Estimasi Hasil Panen & Omset</b> interaktif.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => onNavigate('budidaya')}
              className="btn-primary"
              style={{ padding: '13px 26px', fontSize: '14.5px' }}
            >
              <Waves size={16} />
              <span>Buka Halaman Budidaya & Kalkulator</span>
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

      {/* 7. LATEST ARTICLES CALLOUT */}
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

      {/* 8. FAQ ACCORDION */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 20px 70px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Tanya Jawab Seputar NilaFarm
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div 
                key={fIdx}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isOpen ? '1.5px solid var(--b)' : '1px solid var(--border)',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--txt)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={18} 
                    color="var(--b)" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flexShrink: 0 }} 
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 22px 20px', color: 'var(--mut)', fontSize: '14px', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
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
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, var(--card2) 0%, var(--card) 100%)',
            border: '2px solid var(--border-strong)',
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
              style={{ padding: '12px 18px', fontSize: '13.5px' }}
            >
              <MessageCircle size={15} />
              <span>Admin 1: Hamdan Russ</span>
            </a>

            <a 
              href="https://wa.me/6282122319510?text=Halo%20CS%20NilaFarm,%20saya%20ingin%20pesan%20ikan%20nila%20segar"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ padding: '12px 18px', fontSize: '13.5px' }}
            >
              <Truck size={15} color="#22c55e" />
              <span>Admin 2: CS Pemesanan</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
