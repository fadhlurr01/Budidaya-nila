import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/budidayaData';

export default function TestimonialsSection({ lang = 'id' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '50px 20px 40px' 
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
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
          {lang === 'en' ? 'Customer Voices' : 'Testimoni Pembeli'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Kata Mereka yang Sudah Menikmati' : 'Kata Mereka yang Sudah Memesan'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'Home cooks, local culinary stalls, to seafood restaurants — always returning for our fresh harvest.'
            : 'Ibu rumah tangga, pengusaha warung makan, hingga resto keluarga — semuanya kembali repeat order.'}
        </p>
      </div>

      <div 
        className="glass-panel"
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '36px 30px',
          borderRadius: '26px',
          position: 'relative'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#f59e0b' }}>
          {Array.from({ length: current.rating }).map((_, i) => (
            <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" />
          ))}
        </div>

        <p 
          style={{ 
            fontSize: '16.5px', 
            lineHeight: 1.7, 
            color: 'var(--txt)', 
            fontStyle: 'italic',
            marginBottom: '26px' 
          }}
        >
          "{current.teks}"
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--grad)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px'
              }}
            >
              {current.avatar}
            </div>
            <div>
              <b style={{ fontSize: '15px', color: 'var(--txt)', display: 'block' }}>{current.nama}</b>
              <small style={{ fontSize: '12.5px', color: 'var(--mut)' }}>{current.peran}</small>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrev}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--card2)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--txt)'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--card2)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--txt)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? 'var(--b)' : 'rgba(13, 71, 161, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
