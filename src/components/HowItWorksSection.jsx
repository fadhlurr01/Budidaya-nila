import React from 'react';
import { ShoppingBag, Scissors, Truck, ArrowRight } from 'lucide-react';

export default function HowItWorksSection({ lang = 'id', onNavigate }) {
  const steps = [
    {
      num: '01',
      icon: ShoppingBag,
      title: lang === 'en' ? 'Choose & Order' : 'Pilih & Pesan Mudah',
      desc: lang === 'en'
        ? 'Select fresh tilapia or premium fillets from our catalog, or chat directly via WhatsApp.'
        : 'Tentukan jumlah kg ikan nila utuh atau fillet vakum di katalog online kami, atau langsung chat via WhatsApp.'
    },
    {
      num: '02',
      icon: Scissors,
      title: lang === 'en' ? 'Fresh Morning Harvest' : 'Dipanen Pagi & Dibersihkan',
      desc: lang === 'en'
        ? 'Fish are netted live in the morning, scaled, cleaned, and vacuum-sealed according to your preference.'
        : 'Ikan diserok hidup dari kolam bioflok pagi hari, disisik dan dibersihkan higienis sesuai permintaan Anda secara gratis.'
    },
    {
      num: '03',
      icon: Truck,
      title: lang === 'en' ? 'Delivered or Farm Pick-Up' : 'Diantar atau Ambil Sendiri',
      desc: lang === 'en'
        ? 'Delivered same-day across Sumedang & Bandung area, or drop by our farm to pick up directly.'
        : 'Diantar same-day ke alamat Anda dalam keadaan dingin/hidup, atau Anda bisa mampir ke farm untuk memilih sendiri di kolam.'
    }
  ];

  return (
    <section 
      id="cara" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '50px 20px 40px' 
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 46px' }}>
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
          {lang === 'en' ? 'From Pond to Table' : 'Alur Pemesanan Cepat'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Pesan Hari Ini, Dimasak Segar Besok' : 'Pesan Hari Ini, Dimasak Segar Besok'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'As easy as a WhatsApp message — we take care of harvesting, cleaning, and delivery.'
            : 'Semudah chat WhatsApp — sisanya biar kami yang urus dari kolam sampai ke depan pintu Anda.'}
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '24px'
        }}
      >
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '30px 26px',
                borderRadius: '22px',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: 'rgba(33, 150, 243, 0.15)',
                  lineHeight: 1
                }}
              >
                {step.num}
              </div>

              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(33, 150, 243, 0.12)',
                  color: 'var(--b)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Icon size={24} />
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
