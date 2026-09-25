import React, { useState, useEffect } from 'react';
import { ChevronUp, X, ExternalLink } from 'lucide-react';

export default function FloatingActionButtons({ isDashboard = false }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isWaMenuOpen, setIsWaMenuOpen] = useState(false);

  // Monitor window scroll to show/hide Scroll to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenWa = (phone, adminName) => {
    const message = encodeURIComponent(
      `Halo ${adminName}, saya ingin konsultasi mengenai budidaya ikan nila bioflok & produk NilaFarm Sumedang.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setIsWaMenuOpen(false);
  };

  // Adjust position if in dashboard on mobile (to avoid overlapping mobile bottom dock)
  const bottomOffset = isDashboard ? 'clamp(85px, 12vh, 100px)' : 'clamp(20px, 4vw, 28px)';
  const rightOffset = 'clamp(16px, 4vw, 24px)';

  return (
    <div
      style={{
        position: 'fixed',
        right: rightOffset,
        bottom: bottomOffset,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 998,
        transition: 'bottom 0.3s ease'
      }}
    >
      {/* 1. TOMBOL PANAH KE ATAS (Scroll to Top) - DI ATAS ICON WA */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll ke atas"
        title="Kembali ke atas"
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'var(--card)',
          color: 'var(--b)',
          border: '1.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(10px)',
          outline: 'none',
          padding: 0
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
          e.currentTarget.style.borderColor = 'var(--b)';
          e.currentTarget.style.background = 'var(--card2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.background = 'var(--card)';
        }}
      >
        <ChevronUp size={22} strokeWidth={2.5} />
      </button>

      {/* 2. POPUP MENU PILIHAN ADMIN WHATSAPP */}
      {isWaMenuOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '68px',
            right: 0,
            width: '270px',
            maxWidth: 'calc(100vw - 36px)',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backdropFilter: 'blur(16px)',
            animation: 'fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 999,
            boxSizing: 'border-box'
          }}
        >
          {/* Header Popover */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <b style={{ fontSize: '13px', color: 'var(--txt)' }}>WhatsApp NilaFarm</b>
            </div>
            <button
              onClick={() => setIsWaMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--mut)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex'
              }}
            >
              <X size={15} />
            </button>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--mut)', margin: '0 0 4px', lineHeight: 1.45 }}>
            Silakan pilih admin untuk konsultasi langsung via WhatsApp:
          </p>

          {/* Admin 1 - Hamdan Russ (Owner) */}
          <button
            onClick={() => handleOpenWa('6281382570406', 'Hamdan Russ (Owner NilaFarm)')}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              background: 'rgba(34, 197, 94, 0.08)',
              color: 'var(--txt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              width: '100%',
              boxSizing: 'border-box'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)'}
          >
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--txt)' }}>
                Hamdan Russ (Owner)
              </div>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                +62 813-8257-0406
              </div>
            </div>
            <ExternalLink size={14} color="#16a34a" />
          </button>

          {/* Admin 2 - CS Layanan & Pemesanan */}
          <button
            onClick={() => handleOpenWa('6282122319510', 'Admin Layanan NilaFarm')}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'var(--card2)',
              color: 'var(--txt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              width: '100%',
              boxSizing: 'border-box'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--card)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--card2)'}
          >
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--txt)' }}>
                Admin 2 (Layanan Produk)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--mut)', fontWeight: 600 }}>
                0821-2231-9510
              </div>
            </div>
            <ExternalLink size={14} color="var(--mut)" />
          </button>
        </div>
      )}

      {/* 3. TOMBOL WHATSAPP (Bulat sempurna, tidak terpotong) */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsWaMenuOpen(!isWaMenuOpen)}
          aria-label="Hubungi WhatsApp NilaFarm"
          title="Chat WhatsApp NilaFarm"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            border: '2.5px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            outline: 'none',
            padding: 0,
            overflow: 'visible',
            boxSizing: 'border-box',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 10px 28px rgba(37, 211, 102, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
          }}
        >
          {/* Official WhatsApp Precise Full Vector Path */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 448 512"
            fill="#ffffff"
            style={{
              display: 'block',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
              transform: 'translate(0px, 0px)'
            }}
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>

          {/* Online green indicator badge */}
          <span
            style={{
              position: 'absolute',
              top: '1px',
              right: '1px',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #ffffff',
              boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.4)'
            }}
          />
        </button>
      </div>
    </div>
  );
}
