import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  ShoppingCart, 
  LayoutDashboard, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  Waves,
  ShieldCheck,
  Image as ImageIcon,
  Cpu,
  Package,
  User,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  onOpenDashboard, 
  onOpenCart, 
  cartCount,
  customerUser = null,
  onOpenCustomerAuth,
  onOpenOrderTracking,
  onCustomerLogout,
  isDark,
  onToggleTheme,
  lang,
  onToggleLang,
  onOpenDevModal,
  onOpenCorpModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [budidayaDropOpen, setBudidayaDropOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBudidayaDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 main multipage views: Beranda, Budidaya, Produk, Artikel, Kontak
  const navItems = [
    { id: 'beranda', label: lang === 'en' ? 'Home' : 'Beranda' },
    { id: 'budidaya', label: lang === 'en' ? 'Biofloc Farming' : 'Budidaya' },
    { id: 'produk', label: lang === 'en' ? 'Products & Seed' : 'Produk' },
    { id: 'artikel', label: lang === 'en' ? 'Articles' : 'Artikel' },
    { id: 'kontak', label: lang === 'en' ? 'Contact' : 'Kontak' }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setBudidayaDropOpen(false);
  };

  const handleDropdownSubClick = (sub) => {
    if (sub.isModal) {
      onOpenDevModal('api');
    } else {
      onNavigate(sub.id);
    }
    setBudidayaDropOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: isScrolled ? '10px' : '16px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: 'calc(100% - 32px)',
        maxWidth: '1180px',
        zIndex: 1000,
        transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {/* Floating Navbar Container */}
      <div 
        style={{
          background: isDark ? 'rgba(14, 36, 71, 0.88)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          border: isDark ? '1px solid rgba(144, 202, 249, 0.22)' : '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: isDark 
            ? '0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)' 
            : '0 14px 38px rgba(13, 71, 161, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: isScrolled ? '8px 18px' : '10px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Logo with assets/logo.png */}
        <div 
          onClick={() => handleLinkClick('beranda')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img 
            src="/assets/logo.png" 
            alt="NilaFarm Logo" 
            style={{ 
              height: '38px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(33, 150, 243, 0.3))'
            }} 
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', lineHeight: 1.1 }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#2196f3', letterSpacing: '-0.3px' }}>
                Nila
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: isDark ? '#ffffff' : '#0d47a1', letterSpacing: '-0.3px' }}>
                Farm
              </span>
            </div>
            <span 
              style={{ 
                fontSize: '10px', 
                fontWeight: 600, 
                color: 'var(--mut)', 
                letterSpacing: '1.2px', 
                textTransform: 'uppercase',
                display: 'block'
              }}
            >
              Smart Bioflok IoT
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (5 Main Items) */}
        <nav 
          style={{ 
            display: 'none', 
            alignItems: 'center', 
            gap: '12px' 
          }}
          className="desktop-floating-menu"
        >
          {navItems.map((item) => {
            if (item.isDropdown) {
              const isChildActive = item.children.some(c => c.id === activeSection);
              return (
                <div key={item.id} style={{ position: 'relative' }} ref={dropdownRef}>
                  <button
                    onClick={() => setBudidayaDropOpen(!budidayaDropOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isChildActive ? 'var(--b)' : 'var(--txt)',
                      fontSize: '13.5px',
                      fontWeight: isChildActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--card2)'}
                    onMouseLeave={e => {
                      if (!budidayaDropOpen) e.currentTarget.style.background = 'none';
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} style={{ transform: budidayaDropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {/* Dropdown Menu */}
                  {budidayaDropOpen && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '230px',
                        background: isDark ? 'rgba(14, 36, 71, 0.96)' : 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border)',
                        borderRadius: '18px',
                        padding: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 100,
                        animation: 'fadeIn 0.2s ease'
                      }}
                    >
                      {item.children.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleDropdownSubClick(sub)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              padding: '10px 12px',
                              borderRadius: '12px',
                              border: 'none',
                              background: isSubActive ? 'var(--card2)' : 'transparent',
                              color: isSubActive ? 'var(--b)' : 'var(--txt)',
                              fontSize: '13px',
                              fontWeight: isSubActive ? 600 : 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              transition: 'background 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--card2)'}
                            onMouseLeave={e => {
                              if (!isSubActive) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <SubIcon size={16} color="var(--b)" />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--b)' : 'var(--txt)',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--card2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {item.label}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '20%',
                      right: '20%',
                      height: '2px',
                      background: 'var(--b)',
                      borderRadius: '4px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls & CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
            style={{
              padding: '6px 10px',
              borderRadius: '10px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Globe size={13} />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: '0.2s'
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Lacak Pesanan Button */}
          <button
            onClick={onOpenOrderTracking}
            title="Lacak Status Pesanan"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontWeight: 600
            }}
          >
            <Package size={15} color="var(--b)" />
            <span className="cta-text-desk">Lacak Pesanan</span>
          </button>

          {/* Customer Auth / Profile Pill */}
          {customerUser ? (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(33, 150, 243, 0.12)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                padding: '4px 10px',
                borderRadius: '12px'
              }}
            >
              <button
                type="button"
                onClick={onOpenOrderTracking}
                title="Lihat Pesanan Saya"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--b)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: 0
                }}
              >
                <User size={14} />
                <span>{customerUser.name.split(' ')[0]}</span>
              </button>

              <button
                type="button"
                onClick={onCustomerLogout}
                title="Keluar dari Akun Pembeli"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--mut)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenCustomerAuth}
              title="Masuk atau Daftar Akun Pembeli"
              className="btn-ghost"
              style={{
                padding: '6px 12px',
                fontSize: '12.5px',
                borderRadius: '10px'
              }}
            >
              <User size={14} />
              <span className="cta-text-desk">Masuk</span>
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            title="Keranjang Belanja"
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: 'var(--grad)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(33, 150, 243, 0.5)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Dashboard Enter CTA */}
          <button
            onClick={onOpenDashboard}
            className="btn-primary"
            style={{ 
              padding: '8px 14px', 
              fontSize: '12.5px',
              borderRadius: '12px'
            }}
          >
            <LayoutDashboard size={14} />
            <span className="cta-text-desk">{lang === 'en' ? 'IoT Panel' : 'Panel Farm'}</span>
            <ArrowRight size={12} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-burger-btn"
            style={{
              display: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            marginTop: '8px',
            background: isDark ? 'rgba(14, 36, 71, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ padding: '8px 12px', fontSize: '11.5px', fontWeight: 800, color: 'var(--b)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {item.label}
                  </div>
                  {item.children.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleDropdownSubClick(sub)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: activeSection === sub.id ? 'var(--card2)' : 'transparent',
                        color: activeSection === sub.id ? 'var(--b)' : 'var(--txt)',
                        fontSize: '13.5px',
                        fontWeight: activeSection === sub.id ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <sub.icon size={15} color="var(--b)" />
                      <span>{sub.label}</span>
                    </button>
                  ))}
                  <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeSection === item.id ? 'var(--card2)' : 'transparent',
                  color: activeSection === item.id ? 'var(--b)' : 'var(--txt)',
                  fontSize: '14px',
                  fontWeight: activeSection === item.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <Sparkles size={16} color="var(--b)" />}
              </button>
            );
          })}

          <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />

          {/* Lacak Pesanan Mobile Link */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderTracking();
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '11px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'var(--card2)',
              color: 'var(--txt)',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={16} color="var(--b)" />
            <span>Lacak Status Pesanan</span>
          </button>

          {/* Akun Pembeli Mobile Link */}
          {customerUser ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderTracking();
                }}
                style={{
                  flex: 1,
                  textAlign: 'left',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'rgba(33, 150, 243, 0.12)',
                  color: 'var(--b)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <User size={15} />
                <span>Akun: {customerUser.name}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCustomerLogout();
                }}
                className="btn-danger"
                style={{ padding: '0 14px', borderRadius: '12px', fontSize: '12px' }}
                title="Keluar Akun Pembeli"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomerAuth();
              }}
              className="btn-ghost"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <User size={15} />
              <span>Masuk / Buat Akun Pembeli</span>
            </button>
          )}
        </div>
      )}

      {/* Responsiveness overrides */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-floating-menu {
            display: flex !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-burger-btn {
            display: flex !important;
          }
          .cta-text-desk {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
