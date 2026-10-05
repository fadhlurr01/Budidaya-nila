import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { 
  Truck, 
  Waves, 
  Globe, 
  ArrowRight, 
  Check, 
  Star, 
  Heart, 
  Camera, 
  Sparkles,
  ShoppingBag,
  Fish,
  ShieldCheck,
  Activity,
  Layers,
  Zap
} from 'lucide-react';
import { PLANT_CATEGORIES } from '../data/budidayaData';

export default function HomePage({ 
  products, 
  onAddToCart, 
  onNavigate, 
  isDark = false,
  lang = 'id'
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* 1. HERO SECTION (Centered with Latar Background Nila) */}
      <HeroSection 
        onNavigate={onNavigate}
        isDark={isDark}
        lang={lang}
      />

      {/* 2. FEATURED NILA CATEGORIES */}
      <section 
        style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '60px 24px 40px', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h2 
            style={{ 
              fontSize: 'clamp(28px, 3.6vw, 40px)', 
              fontWeight: 800, 
              color: 'var(--txt)', 
              letterSpacing: '-0.5px', 
              margin: 0 
            }}
          >
            {lang === 'en' ? 'Featured Aquaculture Categories' : 'Kategori Produk & Budidaya Nila'}
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '8px' }}>
            {lang === 'en' 
              ? 'Complete supplies from certified fingerlings to zero-waste biofloc pond equipment.' 
              : 'Pilihan lengkap mulai dari bibit bersertifikat, ikan konsumsi segar, pakan, hingga kolam terpal bioflok.'}
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))', 
            gap: '24px' 
          }}
        >
          {/* Category 1: Bibit Unggul */}
          <div 
            onClick={() => onNavigate('produk')}
            style={{
              background: 'var(--card)',
              border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ height: '260px', overflow: 'hidden', background: '#f0f6fa' }}>
              <img 
                src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=600&q=80" 
                alt="Bibit Unggul" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '22px 18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                {lang === 'en' ? 'Certified Fingerlings' : 'Bibit Unggul Nirwana'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                {lang === 'en' ? 'Strain Nirwana & Red Tilapia' : 'Sertifikasi SKAI, SR > 95%'}
              </p>
            </div>
          </div>

          {/* Category 2: Ikan Segar Konsumsi */}
          <div 
            onClick={() => onNavigate('produk')}
            style={{
              background: 'var(--card)',
              border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ height: '260px', overflow: 'hidden', background: '#f0f6fa' }}>
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" 
                alt="Ikan Segar Konsumsi" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '22px 18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                {lang === 'en' ? 'Fresh Harvest Tilapia' : 'Ikan Segar Konsumsi'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                {lang === 'en' ? 'Zero muddy smell, pan-ready' : 'Bebas bau lumpur & fillet murni'}
              </p>
            </div>
          </div>

          {/* Category 3: Pakan & Nutrisi */}
          <div 
            onClick={() => onNavigate('produk')}
            style={{
              background: 'var(--card)',
              border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ height: '260px', overflow: 'hidden', background: '#f0f6fa' }}>
              <img 
                src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80" 
                alt="Pakan & Nutrisi" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '22px 18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                {lang === 'en' ? 'Feed & Biofloc Nutrition' : 'Pakan & Nutrisi Bioflok'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                {lang === 'en' ? '32% Protein & Nitrifying Probiotics' : 'Pelet protein 32% & probiotik pengurai'}
              </p>
            </div>
          </div>

          {/* Category 4: Peralatan & Kolam with 'Lihat Semua' Pill */}
          <div 
            onClick={() => onNavigate('produk')}
            style={{
              background: 'var(--card)',
              border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ height: '260px', overflow: 'hidden', background: '#f0f6fa', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80" 
                alt="Peralatan & Kolam" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Overlaid Pill Button */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#2483B3',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '8px 20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(36, 131, 179, 0.45)'
                }}
              >
                {lang === 'en' ? 'See All Equipment' : 'Lihat Semua Paket'}
              </div>
            </div>
            <div style={{ padding: '22px 18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--b)', margin: '0 0 6px' }}>
                {lang === 'en' ? 'Ponds & Aeration Equipment' : 'Peralatan & Kolam Bundar'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0 }}>
                {lang === 'en' ? 'Round Terpal Orchid D2/D3/D4' : 'Kolam bundar D3 & uniring aerasi'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MOST POPULAR NILA PRODUCTS (5 Cards matching clean reference) */}
      <section 
        style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '50px 24px 60px', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h2 
            style={{ 
              fontSize: 'clamp(28px, 3.6vw, 40px)', 
              fontWeight: 800, 
              color: 'var(--txt)', 
              letterSpacing: '-0.5px', 
              margin: 0 
            }}
          >
            {lang === 'en' ? 'Most Popular Products' : 'Produk Nila Paling Diminati'}
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '8px' }}>
            {lang === 'en' 
              ? 'Top selling fingerlings, harvest fish, feed, and biofloc starter kits.' 
              : 'Paling banyak dipesan peternak mitra dan penikmat kuliner ikan nila segar.'}
          </p>
        </div>

        {/* 5 Product Cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', 
            gap: '18px' 
          }}
        >
          {products.slice(0, 5).map((p, idx) => {
            const isFeatured = idx === 1; // Nila Merah Segar as featured highlight

            return (
              <div
                key={p.id}
                style={{
                  background: 'var(--card)',
                  border: isFeatured 
                    ? '2px solid #2483B3' 
                    : (isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec'),
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div>
                  {/* Photo */}
                  <div style={{ height: '210px', overflow: 'hidden', background: '#f0f6fa' }}>
                    <img 
                      src={p.img} 
                      alt={p.nama} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Title & Specs */}
                  <div style={{ padding: '16px 14px 8px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px', minHeight: '44px', lineHeight: 1.3 }}>
                      {p.nama}
                    </h3>

                    {/* Feature Badges */}
                    {isFeatured && (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#ffffff', background: '#2483B3', padding: '2px 7px', borderRadius: '4px' }}>
                          Bebas Lumpur
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#ffffff', background: '#163665', padding: '2px 7px', borderRadius: '4px' }}>
                          Panen Hidup
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#ffffff', background: '#10b981', padding: '2px 7px', borderRadius: '4px' }}>
                          Manis Gurih
                        </span>
                      </div>
                    )}

                    {/* Small Icon Indicators */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
                      <span title="Rating Kualitas" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5eff5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#2483B3' }}>
                        ★
                      </span>
                      <span title="Bioflok Sirkulasi" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5eff5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#2483B3' }}>
                        💧
                      </span>
                      <span title="Higienis" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5eff5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#2483B3' }}>
                        🐟
                      </span>
                      <span title="Garansi Sehat" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5eff5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#2483B3' }}>
                        🛡️
                      </span>
                    </div>

                    {/* Price and Available Sizes */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: isFeatured ? '#2483B3' : 'var(--txt)' }}>
                        Rp {p.harga.toLocaleString('id-ID')}{p.satuan || ''}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 500 }}>
                        {p.sizes?.[0] || 'Tersedia'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart / See All Action Button */}
                <div style={{ padding: '0 14px 16px' }}>
                  <button
                    onClick={() => onAddToCart(p)}
                    style={{
                      width: '100%',
                      background: isFeatured ? '#e0f0f7' : 'transparent',
                      color: isFeatured ? '#163665' : 'var(--txt)',
                      border: isFeatured ? 'none' : '1.5px solid #cfe2ec',
                      borderRadius: '8px',
                      padding: '9px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#2483B3';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = isFeatured ? '#e0f0f7' : 'transparent';
                      e.currentTarget.style.color = isFeatured ? '#163665' : 'var(--txt)';
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>{lang === 'en' ? 'Add to Cart' : 'Pesan Sekarang'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. NILA DOCTOR & DIAGNOSA PENYAKIT IKAN VIA SMARTPHONE */}
      <section 
        style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '20px 24px 60px', 
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
            padding: 'clamp(32px, 5vw, 60px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Text & QR Code */}
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '30px',
                background: '#ffffff',
                border: '1px solid #cfe2ec',
                fontSize: '12px',
                fontWeight: 700,
                color: '#2483B3',
                marginBottom: '16px'
              }}
            >
              <Activity size={15} color="#2483B3" />
              <span>AI Aquaculture Telemetry & Doctor</span>
            </div>

            <h2 
              style={{ 
                fontSize: 'clamp(30px, 4.2vw, 46px)', 
                fontWeight: 800, 
                lineHeight: 1.15,
                margin: '0 0 16px',
                color: 'var(--txt)' 
              }}
            >
              <span style={{ color: '#2483B3' }}>Nila Doctor</span> Melalui Diagnosa Foto Ikan
            </h2>

            <p 
              style={{ 
                fontSize: '16px', 
                color: 'var(--mut)', 
                lineHeight: 1.6, 
                maxWidth: '480px', 
                margin: '0 0 28px' 
              }}
            >
              Scan QR code di bawah ini, ambil foto ikan atau sampel air kolam Anda, dan sistem AI kami akan mendeteksi kesehatan serta memberikan rekomendasi penanganan seketika.
            </p>

            {/* Clean QR Code Box */}
            <div 
              style={{
                display: 'inline-flex',
                background: '#ffffff',
                padding: '14px',
                borderRadius: '14px',
                boxShadow: '0 6px 20px rgba(36, 131, 179, 0.15)',
                border: '1.5px solid #2483B3'
              }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="8" y="8" width="28" height="28" rx="4" fill="#163665" />
                <rect x="13" y="13" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="17" y="17" width="10" height="10" rx="1" fill="#2483B3" />
                <rect x="64" y="8" width="28" height="28" rx="4" fill="#163665" />
                <rect x="69" y="13" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="73" y="17" width="10" height="10" rx="1" fill="#2483B3" />
                <rect x="8" y="64" width="28" height="28" rx="4" fill="#163665" />
                <rect x="13" y="69" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="17" y="73" width="10" height="10" rx="1" fill="#2483B3" />
                <rect x="42" y="10" width="7" height="7" rx="1" fill="#2483B3" />
                <rect x="52" y="10" width="7" height="7" rx="1" fill="#163665" />
                <rect x="42" y="24" width="7" height="7" rx="1" fill="#2483B3" />
                <rect x="42" y="42" width="16" height="16" rx="2" fill="#163665" />
                <rect x="12" y="44" width="7" height="7" rx="1" fill="#2483B3" />
                <rect x="24" y="44" width="7" height="7" rx="1" fill="#163665" />
                <rect x="68" y="44" width="7" height="7" rx="1" fill="#2483B3" />
                <rect x="80" y="44" width="7" height="7" rx="1" fill="#163665" />
                <rect x="44" y="68" width="7" height="7" rx="1" fill="#2483B3" />
                <rect x="54" y="78" width="7" height="7" rx="1" fill="#163665" />
                <rect x="68" y="68" width="9" height="9" rx="1" fill="#2483B3" />
                <rect x="82" y="82" width="9" height="9" rx="1" fill="#163665" />
              </svg>
            </div>
          </div>

          {/* Right Smartphone Screen Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '280px',
                background: '#ffffff',
                border: '6px solid #163665',
                borderRadius: '36px',
                padding: '24px 18px',
                boxShadow: '0 20px 50px rgba(22, 54, 101, 0.28)',
                color: '#163665',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '50px', height: '4px', background: '#cfe2ec', borderRadius: '4px', margin: '0 auto 16px' }} />
              <b style={{ fontSize: '13px', color: '#163665', display: 'block', marginBottom: '24px' }}>
                Nila Doctor AI
              </b>

              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#2483B3',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 6px 18px rgba(36, 131, 179, 0.35)'
                }}
              >
                <Camera size={30} />
              </div>

              <b style={{ fontSize: '13.5px', color: '#163665', display: 'block', marginBottom: '10px' }}>
                Foto Insang, Sisik, atau Air
              </b>

              <p style={{ fontSize: '11px', color: '#47637e', lineHeight: 1.5, margin: '0 0 24px' }}>
                Arahkan kamera ke ikan yang kurang aktif atau busa kolam. AI mendeteksi amonia, parasit, & defisiensi oksigen dalam 3 detik.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('budidaya')}
                style={{
                  width: '100%',
                  background: '#2483B3',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Mulai Diagnosa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WE RESPECT EARTH BY (Kelestarian Lingkungan Akuakultur) */}
      <section 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '40px 24px 60px', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 
            style={{ 
              fontSize: 'clamp(28px, 3.8vw, 42px)', 
              fontWeight: 800, 
              color: 'var(--txt)', 
              letterSpacing: '-0.5px', 
              margin: 0 
            }}
          >
            {lang === 'en' ? 'We Respect Nature By' : 'Kelestarian Ekosistem yang Kami Junjung'}
          </h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '10px' }}>
            {lang === 'en'
              ? 'Our circular zero-waste biofloc technology saves up to 90% water compared to traditional earth ponds.'
              : 'Teknologi sirkulasi bioflok zero-waste kami menghemat hingga 90% air dibanding tambak konvensional.'}
          </p>
        </div>

        {/* 3 Circular Cerulean/Navy Icons */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '36px',
            textAlign: 'center'
          }}
        >
          {/* Circle 1: Zero-Waste Biofloc */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '2.5px solid #2483B3',
                background: isDark ? '#142a47' : '#f0f6fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2483B3',
                marginBottom: '18px',
                boxShadow: '0 6px 18px rgba(36, 131, 179, 0.18)'
              }}
            >
              <Waves size={38} strokeWidth={1.8} />
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>
              Zero-Waste Biofloc System
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0, maxWidth: '240px' }}>
              Air disirkulasikan kembali tanpa membuang limbah kotoran ke sungai atau danau umum.
            </p>
          </div>

          {/* Circle 2: Pakan Ramah Lingkungan */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '2.5px solid #2483B3',
                background: isDark ? '#142a47' : '#f0f6fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2483B3',
                marginBottom: '18px',
                boxShadow: '0 6px 18px rgba(36, 131, 179, 0.18)'
              }}
            >
              <Sparkles size={38} strokeWidth={1.8} />
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>
              Pakan Alami & FCR Hemat
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0, maxWidth: '240px' }}>
              Flok mikroorganisme mengolah amonia menjadi protein pakan alami tambahan untuk ikan.
            </p>
          </div>

          {/* Circle 3: Kemasan Rantai Dingin Higienis */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '2.5px solid #2483B3',
                background: isDark ? '#142a47' : '#f0f6fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2483B3',
                marginBottom: '18px',
                boxShadow: '0 6px 18px rgba(36, 131, 179, 0.18)'
              }}
            >
              <ShieldCheck size={38} strokeWidth={1.8} />
            </div>
            <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>
              Rantai Dingin Higienis
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--mut)', margin: 0, maxWidth: '240px' }}>
              Ikan dipanen hidup dan dikirim dengan insulasi ramah lingkungan bergaransi kesegaran.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMERS & FARMERS REVIEWS */}
      <TestimonialsSection isDark={isDark} lang={lang} />
    </div>
  );
}
