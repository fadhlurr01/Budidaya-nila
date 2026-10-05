import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/budidayaData';

export default function TestimonialsSection({ isDark = false, lang = 'id' }) {
  return (
    <section 
      style={{ 
        maxWidth: '1360px', 
        margin: '0 auto', 
        padding: '60px 20px 70px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Centered Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 
          style={{ 
            fontSize: 'clamp(28px, 4vw, 42px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px', 
            margin: 0
          }}
        >
          {lang === 'en' ? 'Customer & Partner Reviews' : 'Ulasan Pembudidaya & Mitra Restoran'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '10px' }}>
          {lang === 'en'
            ? 'Real feedback from commercial farmers, restaurant chefs, and regular households.'
            : 'Pengalaman nyata mitra pembudidaya bioflok, chef restoran, dan keluarga penikmat ikan segar.'}
        </p>
      </div>

      {/* 5-Card Clean Horizontal Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: '16px',
          alignItems: 'stretch'
        }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            style={{
              background: isDark ? '#142a47' : '#f0f6fa',
              border: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
              borderRadius: '16px',
              padding: '24px 18px',
              display: 'flex',
              flexDirection: 'column',
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
            {/* Circular Avatar at Top Center */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '14px' 
              }}
            >
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #82D7E1',
                  boxShadow: '0 4px 12px rgba(36, 131, 179, 0.25)'
                }}
              >
                {t.avatar}
              </div>
            </div>

            {/* Reviewer Name, 5 Golden Stars & Date */}
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <b style={{ fontSize: '15px', color: 'var(--txt)', display: 'block', marginBottom: '2px' }}>
                {t.nama}
              </b>
              <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'block', marginBottom: '6px' }}>
                {t.peran}
              </span>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '6px',
                  flexWrap: 'wrap' 
                }}
              >
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={13} fill="#eab308" color="#eab308" />
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 500 }}>
                  {t.date}
                </span>
              </div>
            </div>

            {/* Review Quote Text */}
            <p 
              style={{ 
                fontSize: '12.5px', 
                lineHeight: 1.6, 
                color: 'var(--mut)', 
                textAlign: 'left',
                margin: 0,
                marginTop: 'auto'
              }}
            >
              "{t.teks}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
