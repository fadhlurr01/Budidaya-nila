import React, { useState } from 'react';
import { 
  Waves, 
  ShieldCheck, 
  Activity, 
  Droplets, 
  Thermometer, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  MessageCircle, 
  PhoneCall, 
  FileText, 
  Layers, 
  Zap, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  Fish,
  Wind
} from 'lucide-react';
import GallerySection from '../components/GallerySection';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

export default function BudidayaPage({ onNavigate, onOpenConsultation, lang = 'id', isDark = false }) {
  // Interactive Calculator State
  const [seedCount, setSeedCount] = useState(3000);
  const [targetWeight, setTargetWeight] = useState(600); // grams
  const [fcr, setFcr] = useState(1.2);
  const [sellingPrice, setSellingPrice] = useState(38000); // Rp / kg
  const [survivalRate, setSurvivalRate] = useState(92); // %
  const [activeSopStage, setActiveSopStage] = useState(0);

  // Calculations
  const harvestedFishCount = Math.round(seedCount * (survivalRate / 100));
  const totalBiomassKg = Math.round((harvestedFishCount * (targetWeight / 1000)));
  const totalFeedKg = Math.round(totalBiomassKg * fcr);
  const feedCostPerKg = 12800; // estimated Rp / kg feed
  const totalFeedCost = totalFeedKg * feedCostPerKg;
  const seedCost = seedCount * 600; // Rp600 / seed
  const probioticElectricityCost = 750000; // est operational
  const totalProductionCost = totalFeedCost + seedCost + probioticElectricityCost;
  const grossRevenue = totalBiomassKg * sellingPrice;
  const estimatedProfit = grossRevenue - totalProductionCost;

  const formatRupiah = (val) => 'Rp' + Number(val || 0).toLocaleString('id-ID');

  const sopSteps = [
    {
      step: '01',
      title: 'Persiapan Kolam & Fermentasi Flok (Hari -7 s/d Hari 0)',
      tag: 'Bakteri & Air',
      accent: '#2196f3',
      desc: 'Isi kolam terpal D4 dengan air bersih setinggi 90 cm. Masukkan garam krosok 1-2 kg/m³ untuk menekan parasit. Tambahkan probiotik Bacillus subtilis (10 ml/m³) dicampur molase (100 ml/m³) yang telah diaerasi selama 24 jam. Nyalakan aerator uniring 24 jam nonstop hingga flok mulai berkembang (air berwarna kehijauan cokelat muda).',
      points: [
        'Sterilisasi kolam dengan kaporit ringan atau garam krosok',
        'Inokulasi probiotik multi-strain NilaFarm + tetes tebu / molase',
        'Aerasi konstan 24 jam untuk melipatgandakan bakteri aerob',
        'Uji parameter awal: pH 7.2–7.8, suhu 28°C–29°C'
      ]
    },
    {
      step: '02',
      title: 'Aklimatisasi & Penebaran Benih Unggul (Hari ke-1)',
      tag: 'Penebaran Benih',
      accent: '#0284c7',
      desc: 'Gunakan benih nila hitam / merah berukuran 5–8 cm yang bersertifikasi bebas penyakit. Lakukan aklimatisasi suhu dengan mengapungkan kantong benih di atas permukaan air kolam selama 20–30 menit agar benih tidak mengalami shock temperatur sebelum dilepas perlahan.',
      points: [
        'Padat tebar ideal kolam D4: 3.000 - 4.000 ekor',
        'Waktu penebaran terbaik: Pagi hari (06:30 - 08:30) atau sore hari',
        'Puasakan benih selama 24 jam pertama agar menyesuaikan diri',
        'Pemberian pakan perdana pelet halus ukuran 1 mm berprotein 35%'
      ]
    },
    {
      step: '03',
      title: 'Manajemen Pakan Presisi & Target FCR 1.2 (Hari ke-2 s/d Hari ke-70)',
      tag: 'Feeding Schedule',
      accent: '#10b981',
      desc: 'Pakan pelet apung diberikan 3 kali sehari dengan takaran feeding rate 2.5%–3.5% dari biomassa ikan. Pemberian pakan teratur menggunakan bantuan Auto-Feeder cerdas mencegah pakan berlebih mengendap di dasar kolam.',
      points: [
        'Jadwal makan: 07:30 (30%), 12:30 (30%), dan 17:00 (40%)',
        'Sampling bobot setiap 14 hari untuk penyesuaian porsi pakan harian',
        'Suplemen daun azolla dan daun pepaya setiap hari Minggu untuk serat alami',
        'Hasil target FCR 1.18 - 1.22 menghemat hingga 25% biaya produksi pakan'
      ]
    },
    {
      step: '04',
      title: 'Monitoring Kualitas Air & Telemetri Sensor IoT (Realtime 24 Jam)',
      tag: 'Pengawasan IoT',
      accent: '#f59e0b',
      desc: 'Sensor probe industri memantau dissolved oxygen (DO), suhu air, pH, dan amonia (NH3) tanpa henti. Jika DO turun di bawah batas kritis 4.5 mg/L pada dini hari, sistem otomatis menyalakan aerator cadangan dan mengirim peringatan ke WhatsApp pengelola.',
      points: [
        'Batas aman DO: 5.0 - 7.5 mg/L untuk pertumbuhan maksimal nila',
        'Batas aman Amonia: < 0.20 ppm (diurai bakteri flok jadi protein mikro)',
        'Pembuangan endapan sentral (central drain) selama 30 detik tiap 5 hari',
        'Penambahan molase rutin jika rasio C/N kolam menurun'
      ]
    },
    {
      step: '05',
      title: 'Panen Raya Selektif & Distribusi Segar (Hari ke-85 s/d Hari ke-90)',
      tag: 'Panen & Jual',
      accent: '#8b5cf6',
      desc: 'Ikan nila mencapai bobot 500–800 gram per ekor (ukuran konsumsi idaman resto dan pasar). Panen dilakukan pagi hari dalam kondisi hidup. Air dikuras separuh, ikan dijaring halus, dan disortir. Kami sediakan layanan bersihkan sisik dan isi perut gratis sebelum diantar ke pemesan.',
      points: [
        'Ikan dipuasakan 24 jam sebelum panen agar perut bersih higienis',
        'Daging putih kenyal, gurih manis, dan 100% bebas bau lumpur',
        'Bisa dipesan hidup, segar dingin di atas es, atau fillet vakum kedap udara',
        'Pengantaran same-day untuk area Sumedang, Bandung, dan sekitarnya'
      ]
    }
  ];

  const parameters = [
    { name: 'Oksigen Terlarut (DO)', ideal: '5.0 - 7.5 mg/L', min: '4.0 mg/L', currentVal: 88, role: 'Kunci metabolisme bakteri bioflok & keaktifan makan ikan nila', color: '#2196f3' },
    { name: 'Derajat Keasaman (pH)', ideal: '7.0 - 8.2', min: '6.5 - 8.5', currentVal: 92, role: 'Menjaga kestabilan cangkang sel bakteri & imunitas insang ikan', color: '#10b981' },
    { name: 'Suhu Air Kolam', ideal: '27.5°C - 29.5°C', min: '25°C - 32°C', currentVal: 85, role: 'Mengoptimalkan laju cerna pakan dan mencegah serangan jamur', color: '#f59e0b' },
    { name: 'Amonia Bebas (NH3)', ideal: '< 0.15 ppm', min: '< 0.30 ppm', currentVal: 96, role: 'Racun berbahaya yang segera diurai oleh bakteri heterotrof aktif', color: '#ef4444' },
    { name: 'Kepadatan Flok', ideal: '20 - 45 ml/L', min: '15 - 50 ml/L', currentVal: 80, role: 'Diukur dengan kerucut Imhoff untuk kontrol populasi bakteri', color: '#8b5cf6' }
  ];

  const activeSop = sopSteps[activeSopStage];

  return (
    <div style={{ paddingTop: '86px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Header Banner */}
      <section 
        style={{
          position: 'relative',
          padding: '60px 20px 40px',
          textAlign: 'center',
          background: 'radial-gradient(circle at 50% 20%, rgba(33, 150, 243, 0.15) 0%, transparent 70%)'
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(33, 150, 243, 0.12)',
              color: 'var(--b)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}
          >
            <Waves size={14} />
            <span>SOP Budidaya Nila Bioflok Modern Sumedang</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: 'var(--txt)',
              letterSpacing: '-0.5px',
              marginBottom: '16px'
            }}
          >
            Teknologi Bioflok 90 Hari Panen Raya
          </h1>

          <p 
            style={{
              fontSize: '16px',
              color: 'var(--mut)',
              maxWidth: '720px',
              margin: '0 auto 28px',
              lineHeight: 1.65
            }}
          >
            Pelajari rahasia tambak keluarga kami di Sumedang: bagaimana kolam bundar D4 dengan sirkulasi aerasi uniring dan pengawasan sensor IoT menghasilkan ikan nila gemuk, sehat, dan 100% tanpa aroma lumpur.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ,%20saya%20tertarik%20belajar%20sistem%20budidaya%20bioflok%20NilaFarm"
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <MessageCircle size={16} />
              <span>Konsultasi Teknis via WA (Hamdan Russ)</span>
            </a>

            <button 
              onClick={() => onNavigate('produk')}
              className="btn-ghost"
              style={{ padding: '12px 22px', fontSize: '14px' }}
            >
              <span>Lihat Paket Kolam & Alat</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Pilar Keunggulan Bioflok (Visual Connected Flow) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 30px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--b)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Mengapa Sistem Bioflok?
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            4 Pilar Efisiensi Dibandingkan Tambak Konvensional
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px' }}>
          <div style={{ padding: '22px', borderRadius: '22px', background: 'var(--card2)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(33, 150, 243, 0.14)', color: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={22} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--b)', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(33,150,243,0.12)' }}>
                EFISIENSI TINGGI
              </span>
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>FCR Hemat 1.18 - 1.22</h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>
              Bakteri mengolah kotoran dan sisa pakan menjadi gumpalan flok berprotein 30%+ yang dimakan kembali oleh ikan. Menghemat hingga 25% biaya pelet harian.
            </p>
          </div>

          <div style={{ padding: '22px', borderRadius: '22px', background: 'var(--card2)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.14)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={22} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(34,197,94,0.12)' }}>
                0% BAU LUMPUR
              </span>
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>Daging Manis Alami</h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>
              Air kolam bioflok kaya oksigen bebas alga geosmin penyebab bau amis tanah. Rasa daging nila menjadi manis alami, lembut, dan disukai restoran.
            </p>
          </div>

          <div style={{ padding: '22px', borderRadius: '22px', background: 'var(--card2)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={22} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(245,158,11,0.12)' }}>
                HEMAT LAHAN
              </span>
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>Padat Tebar 3x Lipat</h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>
              Satu kolam bundar D4 berdiameter 4 meter dapat menampung 3.000 hingga 4.000 ekor ikan nila. Sangat cocok untuk usaha pekarangan produktif.
            </p>
          </div>

          <div style={{ padding: '22px', borderRadius: '22px', background: 'var(--card2)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(13, 71, 161, 0.14)', color: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={22} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--p)', padding: '3px 10px', borderRadius: '9999px', background: 'rgba(13,71,161,0.12)' }}>
                OTOMASI IOT
              </span>
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>Proteksi Sensor 24 Jam</h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>
              Pemantauan dissolved oxygen, suhu, dan relay aerator otomatis. Risiko gagal panen karena mati lampu atau oksigen drop dapat dicegah dini.
            </p>
          </div>
        </div>
      </section>

      {/* REACT BITS SCROLLSTACK WORKFLOW BUDIDAYA */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 30px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--b)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Workflow & Roadmap Budidaya Nila
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)', marginTop: '8px' }}>
            5 Langkah Budidaya Nila dari Awal Hingga Panen
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '10px' }}>
            Alur 90 hari terstandarisasi bioflok NilaFarm. Putar atau gulir tumpukan kartu di bawah secara interaktif.
          </p>
        </div>

        {/* Interactive Quick Stage Navigator Pills */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '22px' }}>
          {sopSteps.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveSopStage(i);
                const scroller = document.querySelector('.budidaya-scrollstack-container .scroll-stack-scroller');
                const cards = document.querySelectorAll('.budidaya-scrollstack-container .scroll-stack-card');
                if (scroller && cards[i]) {
                  scroller.scrollTo({ top: cards[i].offsetTop - 15, behavior: 'smooth' });
                }
              }}
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeSopStage === i ? `1.5px solid ${st.accent}` : '1px solid var(--border)',
                background: activeSopStage === i ? `${st.accent}22` : 'var(--card2)',
                color: activeSopStage === i ? st.accent : 'var(--mut)'
              }}
            >
              Tahap {st.step}: {st.tag}
            </button>
          ))}
        </div>

        {/* ScrollStack Interactive Container - Open, Cardless Modern Wrapper */}
        <div 
          className="budidaya-scrollstack-container"
          style={{
            height: 'clamp(520px, 70vh, 620px)',
            borderRadius: '28px',
            position: 'relative',
            overflow: 'hidden',
            background: isDark ? 'rgba(14, 36, 71, 0.45)' : 'rgba(240, 247, 255, 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)'
          }}
        >
          <ScrollStack
            itemDistance={60}
            itemScale={0.03}
            itemStackDistance={24}
            stackPosition="10%"
            scaleEndPosition="4%"
            baseScale={0.9}
            blurAmount={0}
            useWindowScroll={false}
          >
            {sopSteps.map((st, sIdx) => {
              const accentColor = st.accent || '#2196f3';
              return (
                <ScrollStackItem 
                  key={sIdx}
                  style={{
                    background: isDark ? 'rgba(14, 36, 71, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1.5px solid ${accentColor}55`,
                    boxShadow: `0 14px 36px ${accentColor}18, 0 4px 12px rgba(0, 0, 0, 0.04)`,
                    position: 'relative',
                    borderRadius: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span 
                        style={{
                          background: accentColor,
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 800,
                          padding: '4px 14px',
                          borderRadius: '9999px',
                          letterSpacing: '0.8px'
                        }}
                      >
                        TAHAP {st.step}
                      </span>
                      <span style={{ fontSize: '13.5px', color: accentColor, fontWeight: 700 }}>
                        {st.tag}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--mut)', fontWeight: 600 }}>
                      SOP Resmi NilaFarm Sumedang
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 800, color: 'var(--txt)', marginBottom: '12px', lineHeight: 1.3 }}>
                    {st.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'var(--mut)', lineHeight: 1.65, marginBottom: '18px' }}>
                    {st.desc}
                  </p>

                  <div 
                    style={{
                      background: isDark ? 'rgba(7, 21, 43, 0.65)' : 'rgba(240, 247, 255, 0.7)',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--txt)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={15} color={accentColor} />
                      <span>Kunci Keberhasilan Teknis:</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '8px' }}>
                      {st.points.map((pt, ptIdx) => (
                        <div key={ptIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--txt)' }}>
                          <CheckCircle2 size={15} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ lineHeight: 1.45 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </section>

      {/* DYNAMIC PARAMETER VISUAL MATRIX (Replaces Plain Table Card) */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 20px 50px' }}>
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--b)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Monitoring Parameter
          </span>
          <h3 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: 'var(--txt)', marginTop: '6px' }}>
            Standar Kualitas Air Bioflok Ideal NilaFarm
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--mut)', marginTop: '6px' }}>
            Setiap fluktuasi parameter diawasi otomatis melalui node sensor telemetri nirkabel 24 jam nonstop.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '16px' }}>
          {parameters.map((param, pIdx) => (
            <div 
              key={pIdx} 
              style={{ 
                padding: '20px', 
                borderRadius: '20px', 
                background: 'var(--card)', 
                border: '1px solid var(--border)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: param.color }} />
                  <b style={{ fontSize: '14px', color: 'var(--txt)' }}>{param.name}</b>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: param.color, background: `${param.color}22`, padding: '2px 8px', borderRadius: '9999px' }}>
                  TARGET OPTIMAL
                </span>
              </div>

              {/* Visual Meter Bar */}
              <div style={{ height: '6px', borderRadius: '9999px', background: 'rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${param.currentVal}%`, background: param.color, borderRadius: '9999px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--mut)' }}>Nilai Ideal:</span>
                <b style={{ color: 'var(--b)' }}>{param.ideal}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '10px' }}>
                <span style={{ color: 'var(--mut)' }}>Batas Toleransi:</span>
                <span style={{ color: 'var(--txt)' }}>{param.min}</span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--mut)', lineHeight: 1.5, margin: 0, borderTop: '1px dashed var(--border)', paddingTop: '8px' }}>
                {param.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CALCULATOR SECTION */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div 
          style={{ 
            padding: 'clamp(24px, 3.5vw, 42px)', 
            borderRadius: '30px',
            border: '1.5px solid var(--border-strong)',
            background: 'linear-gradient(180deg, var(--card2) 0%, var(--card) 40%)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--grad)', color: '#ffffff', padding: '6px 16px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
              <Calculator size={15} />
              <span>Simulasi Finansial Budidaya Nila</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: 'var(--txt)' }}>
              Kalkulator Estimasi Panen & Omset
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginTop: '8px' }}>
              Geser nilai untuk memperkirakan kebutuhan pakan, biomassa panen, dan potensi keuntungan bersih kolam bioflok Anda.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
            {/* Left Form Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--txt)' }}>
                    Jumlah Benih yang Ditebar (Ekor):
                  </label>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--b)' }}>
                    {seedCount.toLocaleString('id-ID')} ekor
                  </span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={seedCount} 
                  onChange={e => setSeedCount(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--b)' }}
                />
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Kapasitas 1 Kolam D4: 3.000–4.000 ekor</small>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--txt)' }}>
                    Target Bobot Ikan saat Panen (Gram/Ekor):
                  </label>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--b)' }}>
                    {targetWeight} gram
                  </span>
                </div>
                <input 
                  type="range" 
                  min="400" 
                  max="1000" 
                  step="50"
                  value={targetWeight} 
                  onChange={e => setTargetWeight(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--b)' }}
                />
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Ukuran konsumsi ideal resto: 500 - 700 gram</small>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--txt)' }}>
                    Tingkat Kelangsungan Hidup (SR):
                  </label>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#22c55e' }}>
                    {survivalRate}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="75" 
                  max="98" 
                  step="1"
                  value={survivalRate} 
                  onChange={e => setSurvivalRate(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#22c55e' }}
                />
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Rata-rata SR bioflok NilaFarm: 90% - 95%</small>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--txt)' }}>
                    Target Nilai FCR (Feed Conversion):
                  </label>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--p)' }}>
                    {fcr}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="1.6" 
                  step="0.05"
                  value={fcr} 
                  onChange={e => setFcr(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--p)' }}
                />
                <small style={{ color: 'var(--mut)', fontSize: '11px' }}>Bioflok matang mampu menekan FCR ke 1.15–1.20</small>
              </div>
            </div>

            {/* Right Result Card */}
            <div 
              style={{
                background: 'var(--card)',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--txt)', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                  Rincian Estimasi Hasil Panen (90 Hari)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mut)' }}>Ikan Hidup Panen:</span>
                    <b style={{ color: 'var(--txt)' }}>{harvestedFishCount.toLocaleString('id-ID')} ekor</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mut)' }}>Total Biomassa Panen:</span>
                    <b style={{ color: 'var(--b)', fontSize: '15px' }}>{totalBiomassKg.toLocaleString('id-ID')} Kg</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mut)' }}>Kebutuhan Pelet Apung:</span>
                    <b style={{ color: 'var(--txt)' }}>{totalFeedKg.toLocaleString('id-ID')} Kg</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mut)' }}>Estimasi Biaya Pakan:</span>
                    <b style={{ color: '#ef4444' }}>{formatRupiah(totalFeedCost)}</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mut)' }}>Total Biaya Produksi (Bibit + Pakan + Listrik):</span>
                    <b style={{ color: '#ef4444' }}>{formatRupiah(totalProductionCost)}</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--mut)' }}>Estimasi Omset Bruto (Rp38.000/kg):</span>
                    <b style={{ color: 'var(--txt)', fontSize: '15px' }}>{formatRupiah(grossRevenue)}</b>
                  </div>
                </div>
              </div>

              {/* Profit Highlight */}
              <div 
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  textAlign: 'center'
                }}
              >
                <small style={{ color: '#15803d', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Perkiraan Keuntungan Bersih per Siklus
                </small>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
                  {formatRupiah(estimatedProfit)}
                </div>
                <small style={{ color: '#15803d', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                  *Estimasi 1 siklus panen (90 hari) dengan SOP Bioflok NilaFarm
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Kolam (Media Cards Kept for Photos) */}
      <GallerySection lang={lang} />

      {/* Profil Hamdan Russ Consultation Banner */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 20px 80px' }}>
        <div 
          style={{
            padding: 'clamp(24px, 3.5vw, 40px)',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            background: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--grad)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: '0 8px 24px rgba(33, 150, 243, 0.35)'
              }}
            >
              HR
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                  Hamdan Russ
                </h3>
                <span className="chip ok" style={{ fontSize: '11px', borderRadius: '9999px' }}>Owner & Farm Operator</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--mut)', margin: '4px 0 0', lineHeight: 1.5 }}>
                Siap mendampingi konsultasi pembuatan kolam bioflok, pemilihan benih, setting aerasi, dan instalasi sensor IoT di lokasi Anda.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281382570406?text=Halo%20Hamdan%20Russ,%20saya%20ingin%20konsultasi%20langsung%20tentang%20budidaya%20nila%20bioflok"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <MessageCircle size={16} />
              <span>Chat WhatsApp: 0813-8257-0406</span>
            </a>

            <a 
              href="https://wa.me/6282122319510?text=Halo%20CS%20NilaFarm,%20saya%20ingin%20info%20kunjungan%20ke%20tambak%20Sumedang"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <PhoneCall size={16} />
              <span>Hubungi CS: 0821-2231-9510</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
