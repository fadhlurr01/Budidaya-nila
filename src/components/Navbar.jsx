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
  Package,
  User,
  LogOut,
  MessageCircle,
  Fish,
  Activity,
  Calculator,
  BookOpen,
  Send,
  PhoneCall,
  Search
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
  lang = 'id',
  onToggleLang,
  onOpenDevModal,
  onOpenCorpModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // active dropdown id
  const [mobileExpanded, setMobileExpanded] = useState({}); // accordion state on mobile
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 Main Menu Items with Rich Dropdowns
  const navItems = [
    { 
      id: 'beranda', 
      label: lang === 'en' ? 'Home' : 'Beranda' 
    },
    { 
      id: 'produk', 
      label: lang === 'en' ? 'Products' : 'Katalog Produk',
      subItems: [
        { 
          id: 'produk', 
          label: lang === 'en' ? 'SKAI Certified Fingerlings' : 'Bibit Nila Nirwana Super', 
          desc: lang === 'en' ? 'Sizes 3-5cm, 5-7cm, SR > 95%' : 'Ukuran 3-5cm, 5-7cm, Sertifikasi SKAI', 
          icon: Fish 
        },
        { 
          id: 'produk', 
          label: lang === 'en' ? 'Fresh Live Tilapia & Fillet' : 'Ikan Nila Segar & Fillet', 
          desc: lang === 'en' ? 'Mud-free, pan-ready fresh' : 'Bebas bau lumpur & fillet murni tanpa duri', 
          icon: Sparkles 
        },
        { 
          id: 'produk', 
          label: lang === 'en' ? 'Feed 32% & Probiotics' : 'Pakan Pelet 32% & Probiotik', 
          desc: lang === 'en' ? 'High protein & EM biofloc bacteria' : 'Pelet apung grower & EM-Aquatic bioflok', 
          icon: Activity 
        },
        { 
          id: 'produk', 
          label: lang === 'en' ? 'Biofloc Round Ponds D2/D3' : 'Paket Kolam Bundar D2/D3/D4', 
          desc: lang === 'en' ? 'Orchid tarpaulin, wiremesh & aerator' : 'Terpal Orchid Jerman, rangka M6 & uniring', 
          icon: Package 
        }
      ]
    },
    { 
      id: 'budidaya', 
      label: lang === 'en' ? 'Biofloc & IoT' : 'Budidaya & IoT',
      subItems: [
        { 
          id: 'budidaya', 
          label: lang === 'en' ? 'Harvest & FCR Calculator' : 'Kalkulator Panen & FCR Bioflok', 
          desc: lang === 'en' ? 'Simulate feed budget & profit' : 'Hitung kebutuhan benih, pakan & laba', 
          icon: Calculator 
        },
        { 
          id: 'budidaya', 
          label: lang === 'en' ? '5-Stage Biofloc SOP' : 'SOP 5 Tahap Budidaya Bioflok', 
          desc: lang === 'en' ? 'From pond conditioning to harvest' : 'Persiapan air, flokulasi, hingga panen', 
          icon: BookOpen 
        },
        { 
          id: 'budidaya', 
          label: lang === 'en' ? 'Real-Time Water Monitoring' : 'Monitoring Kualitas Air (IoT)', 
          desc: lang === 'en' ? 'Track pH, DO, Temp, & Ammonia' : 'Sensor pH, Oksigen Terlarut, Suhu & Amonia', 
          icon: Activity 
        },
        { 
          id: 'budidaya', 
          label: lang === 'en' ? 'Nila Doctor AI Diagnostics' : 'Diagnosa Nila Doctor AI', 
          desc: lang === 'en' ? 'Diagnose fish disease from photos' : 'Deteksi penyakit ikan & kualitas air dari foto', 
          icon: ShieldCheck 
        }
      ]
    },
    { 
      id: 'artikel', 
      label: lang === 'en' ? 'Articles' : 'Artikel Edukasi',
      subItems: [
        { 
          id: 'artikel', 
          label: lang === 'en' ? 'Treating Fish Diseases' : 'Panduan Mengatasi Penyakit Ikan', 
          desc: lang === 'en' ? 'How to cure Aeromonas & White Spot' : 'Solusi jamur, busuk insang & bintik putih', 
          icon: BookOpen 
        },
        { 
          id: 'artikel', 
          label: lang === 'en' ? 'Biofloc FCR Optimization' : 'Tips Menekan FCR Kolam Bioflok', 
          desc: lang === 'en' ? 'Cut feed costs by utilizing flocs' : 'Tekan modal pakan dengan flok aktif mikroba', 
          icon: Sparkles 
        },
        { 
          id: 'artikel', 
          label: lang === 'en' ? 'All Aquaculture Articles' : 'Semua Artikel Edukasi', 
          desc: lang === 'en' ? 'Browse entire knowledge base' : 'Akses seluruh pustaka panduan akuakultur', 
          icon: Send 
        }
      ]
    },
    { 
      id: 'kontak', 
      label: lang === 'en' ? 'Contact' : 'Kontak' 
    }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleDropdownEnter = (id) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const toggleMobileAccordion = (id) => {
    setMobileExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isHomePage = !activeSection || activeSection === 'beranda' || activeSection === '/' || activeSection === '';
  const isDarkHero = isHomePage && !isScrolled;
  
  // High-contrast font & UI tokens
  const primaryTextColor = isDarkHero ? '#ffffff' : (isDark ? '#f8fafc' : '#0b213f');
  const primaryBrandColor = isDarkHero ? '#ffffff' : (isDark ? '#f8fafc' : '#0b213f');
  const accentBrandColor = isDarkHero ? '#82D7E1' : '#2483B3';
  const navLinkInactiveColor = isDarkHero ? '#ffffff' : (isDark ? '#f8fafc' : '#0b213f');
  const navLinkActiveColor = isDarkHero ? '#82D7E1' : '#2483B3';
  
  const controlButtonBg = isDarkHero 
    ? 'rgba(255, 255, 255, 0.16)' 
    : (isDark ? '#142a47' : '#f1f5f9');
  const controlButtonBorder = isDarkHero 
    ? '1px solid rgba(255, 255, 255, 0.4)' 
    : (isDark ? '1px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #cbd5e1');
  const controlButtonColor = isDarkHero ? '#ffffff' : (isDark ? '#f8fafc' : '#0b213f');

  return (
    <header
      className="navbar-fixed-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        width: '100%',
        zIndex: 9999,
        boxSizing: 'border-box',
        pointerEvents: 'none'
      }}
    >
      {/* Top Announcement Bar - Only rendered when at top of page, completely unmounted when floating to prevent stacking */}
      {!isScrolled && (
        <div 
          style={{
            pointerEvents: 'auto',
            background: '#163665',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            padding: '7px 16px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.3px',
            borderBottom: '1px solid rgba(130, 215, 225, 0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ color: '#82D7E1' }}>●</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {lang === 'en' ? 'Live Fresh Tilapia & Fingerlings Delivery Across Java & Bali' : 'Pengiriman Ikan Segar & Bibit Hidup Bergaransi Se-Jawa & Bali'}
          </span>
          <span style={{ fontSize: '13px' }}>🚚</span>
        </div>
      )}

      {/* Main Navbar Container - Maximized Floating Pill spanning left to right */}
      <div 
        className={`navbar-main-container ${isScrolled ? 'is-floating' : ''}`}
        style={{
          pointerEvents: 'auto',
          width: isScrolled ? 'calc(100% - 32px)' : '100%',
          maxWidth: isScrolled ? '1680px' : '100%',
          margin: isScrolled ? '10px auto 0' : '0 auto',
          borderRadius: isScrolled ? '9999px' : '0',
          background: isScrolled 
            ? (isDark ? 'rgba(13, 30, 52, 0.98)' : 'rgba(255, 255, 255, 0.98)') 
            : (isHomePage 
                ? 'rgba(14, 33, 58, 0.55)' 
                : (isDark ? '#0d1e34' : '#ffffff')),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled 
            ? 'none' 
            : (isHomePage 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : (isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cbd5e1')),
          border: isScrolled 
            ? (isDark ? '1.5px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #b8d4e5') 
            : undefined,
          boxShadow: isScrolled 
            ? (isDark ? '0 14px 40px rgba(0, 0, 0, 0.55)' : '0 12px 36px rgba(15, 23, 42, 0.14)') 
            : (isHomePage ? 'none' : (isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15, 23, 42, 0.06)')),
          padding: isScrolled 
            ? '9px clamp(14px, 2vw, 32px)' 
            : '12px clamp(16px, 2.5vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          position: 'relative',
          boxSizing: 'border-box',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Left Side: Brand Logo + Desktop Menu (Pushed cleanly to the Left) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* Brand Logo NilaFarm */}
          <div 
            onClick={() => handleLinkClick('beranda')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            <img 
              src="/assets/logo/logoo.png" 
              alt="NilaFarm Logo"
              className="nav-logo-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/logo/logo.png';
              }}
              style={{
                height: '31px',
                width: 'auto',
                objectFit: 'contain',
                filter: isDarkHero ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : 'none'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px', whiteSpace: 'nowrap' }}>
              <span 
                className="nav-logo-text"
                style={{ 
                  fontSize: '18.5px', 
                  fontWeight: 800, 
                  color: primaryBrandColor, 
                  letterSpacing: '-0.5px',
                  textShadow: isDarkHero ? '0 1px 4px rgba(0,0,0,0.6)' : 'none'
                }}
              >
                Nila
              </span>
              <span 
                className="nav-logo-text"
                style={{ 
                  fontSize: '18.5px', 
                  fontWeight: 800, 
                  color: accentBrandColor, 
                  letterSpacing: '-0.5px',
                  textShadow: isDarkHero ? '0 1px 4px rgba(0,0,0,0.6)' : 'none'
                }}
              >
                Farm
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Compact & High Contrast, Zero Collision) */}
          <nav 
            className="desktop-floating-menu"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2px'
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const hasSub = item.subItems && item.subItems.length > 0;
              const isDropdownOpen = openDropdown === item.id;

              return (
                <div 
                  key={item.id}
                  className="nav-dropdown-container"
                  style={{ position: 'relative' }}
                  onMouseEnter={() => hasSub && handleDropdownEnter(item.id)}
                  onMouseLeave={() => hasSub && handleDropdownLeave()}
                >
                  <button
                    onClick={() => {
                      if (hasSub) {
                        setOpenDropdown(prev => (prev === item.id ? null : item.id));
                      }
                      handleLinkClick(item.id);
                    }}
                    style={{
                      background: isDropdownOpen 
                        ? (isDark ? '#1b385e' : '#e5eff5') 
                        : 'transparent',
                      border: 'none',
                      color: isActive 
                        ? navLinkActiveColor 
                        : navLinkInactiveColor,
                      textShadow: isDarkHero ? '0 1px 3px rgba(0,0,0,0.6)' : 'none',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 800 : 700,
                      cursor: 'pointer',
                      padding: '6px 9px',
                      borderRadius: '8px',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={e => {
                      if (!isActive && !isDropdownOpen) {
                        e.currentTarget.style.color = '#2483B3';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive && !isDropdownOpen) {
                        e.currentTarget.style.color = navLinkInactiveColor;
                      }
                    }}
                  >
                    <span>{item.label}</span>

                    {/* Dropdown Indicator */}
                    {hasSub && (
                      <ChevronDown 
                        size={12} 
                        style={{
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease',
                          color: isDropdownOpen ? '#2483B3' : (isDarkHero ? '#ffffff' : '#64748b')
                        }}
                      />
                    )}

                    {/* Active Bottom Indicator */}
                    {isActive && (
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: '-3px',
                          left: '9px',
                          right: '9px',
                          height: '2.5px',
                          background: navLinkActiveColor,
                          borderRadius: '2px',
                          boxShadow: '0 1px 4px rgba(36, 131, 179, 0.5)'
                        }}
                      />
                    )}
                  </button>

                  {/* Dropdown Window with High Contrast */}
                  {hasSub && isDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '0',
                        minWidth: '320px',
                        background: isDark ? '#0f243e' : '#ffffff',
                        border: isDark ? '1.5px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #cbd5e1',
                        borderRadius: '16px',
                        boxShadow: '0 20px 48px rgba(11, 33, 63, 0.22)',
                        padding: '10px',
                        zIndex: 99999,
                        animation: 'fadeInDown 0.2s ease forwards'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {item.subItems.map((sub, sIdx) => {
                          const SubIcon = sub.icon;
                          return (
                            <div
                              key={sIdx}
                              onClick={() => {
                                handleLinkClick(sub.id);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: 'transparent'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = isDark ? '#18385e' : '#f0f6fa';
                                e.currentTarget.style.transform = 'translateX(3px)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              <div 
                                style={{
                                  width: '34px',
                                  height: '34px',
                                  borderRadius: '8px',
                                  background: isDark ? '#163665' : '#e5eff5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#2483B3',
                                  flexShrink: 0
                                }}
                              >
                                <SubIcon size={18} />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontSize: '13.5px', fontWeight: 700, color: isDark ? '#ffffff' : '#0b213f', lineHeight: 1.2 }}>
                                  {sub.label}
                                </span>
                                <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.3, fontWeight: 500 }}>
                                  {sub.desc}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer CTA */}
                      <div 
                        style={{
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: isDark ? '1px solid rgba(130, 215, 225, 0.15)' : '1px solid #e2e8f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingLeft: '12px',
                          paddingRight: '12px'
                        }}
                      >
                        <span style={{ fontSize: '11.5px', color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>
                          {item.id === 'produk' ? 'Siap kirim ke lokasi Anda' : 'Bimbingan teknis profesional'}
                        </span>
                        <button
                          onClick={() => handleLinkClick(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#2483B3',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Buka Halaman</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Controls, Dedicated Auth, Cart, and CTAs (Pushed cleanly to the Right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
            className="nav-desk-only"
            style={{
              padding: '4px 8px',
              borderRadius: '9999px',
              background: controlButtonBg,
              border: controlButtonBorder,
              color: controlButtonColor,
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Globe size={12} />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: controlButtonBg,
              border: controlButtonBorder,
              color: controlButtonColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            title="Keranjang Belanja"
            style={{
              position: 'relative',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#2483B3',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(36, 131, 179, 0.4)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ShoppingCart size={15} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Order Tracking Button */}
          <button
            onClick={onOpenOrderTracking}
            title="Lacak Status Pesanan"
            className="nav-desk-only nav-order-btn"
            style={{
              padding: '5px 9px',
              borderRadius: '9999px',
              background: controlButtonBg,
              border: controlButtonBorder,
              color: controlButtonColor,
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2483B3';
              e.currentTarget.style.color = '#2483B3';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = isDarkHero ? 'rgba(255, 255, 255, 0.4)' : (isDark ? 'rgba(130, 215, 225, 0.35)' : '#cbd5e1');
              e.currentTarget.style.color = controlButtonColor;
            }}
          >
            <Package size={13} color="#2483B3" />
            <span className="nav-order-text">Lacak Order</span>
          </button>

          {/* Dedicated Login / Signup Page Button */}
          {customerUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} className="nav-desk-only">
              <button
                onClick={() => onNavigate('auth')}
                title={`Profil Pelanggan: ${customerUser.name}`}
                style={{
                  padding: '5px 10px',
                  borderRadius: '9999px',
                  background: controlButtonBg,
                  border: controlButtonBorder,
                  color: controlButtonColor,
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease'
                }}
              >
                <User size={13} color="#2483B3" />
                <span style={{ maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {customerUser.name?.split(' ')[0] || 'Akun'}
                </span>
              </button>
              <button
                onClick={onCustomerLogout}
                title="Keluar dari Akun"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: controlButtonBg,
                  border: controlButtonBorder,
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              title="Buka Laman Masuk / Daftar Akun"
              className="nav-desk-only nav-auth-btn"
              style={{
                padding: '5px 11px',
                borderRadius: '9999px',
                background: controlButtonBg,
                border: controlButtonBorder,
                color: controlButtonColor,
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2483B3';
                e.currentTarget.style.color = '#2483B3';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isDarkHero ? 'rgba(255, 255, 255, 0.4)' : (isDark ? 'rgba(130, 215, 225, 0.35)' : '#cbd5e1');
                e.currentTarget.style.color = controlButtonColor;
              }}
            >
              <User size={13} color={isDarkHero ? '#82D7E1' : '#2483B3'} />
              <span>Masuk / Daftar</span>
            </button>
          )}

          {/* Primary CTA Button: Pesan Sekarang */}
          <button
            onClick={() => {
              const el = document.getElementById('produk');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleLinkClick('produk');
              }
            }}
            className="nav-cta-btn"
            style={{
              background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
              color: '#ffffff',
              border: '1.5px solid #82D7E1',
              borderRadius: '9999px',
              padding: '6px 13px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 14px rgba(36, 131, 179, 0.35)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(36, 131, 179, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(36, 131, 179, 0.35)';
            }}
          >
            <ShoppingCart size={13} color="#82D7E1" />
            <span>Pesan Sekarang</span>
          </button>

          {/* Mobile Menu Burger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-burger-btn"
            style={{
              display: 'none',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: controlButtonBg,
              border: controlButtonBorder,
              color: controlButtonColor,
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Accordion Sub-Menus */}
      {mobileMenuOpen && (
        <div
          style={{
            pointerEvents: 'auto',
            position: 'absolute',
            top: isScrolled ? 'calc(100% + 8px)' : '100%',
            left: isScrolled ? '16px' : 0,
            right: isScrolled ? '16px' : 0,
            maxWidth: '1680px',
            margin: '0 auto',
            borderRadius: isScrolled ? '20px' : '0 0 20px 20px',
            background: isDark ? 'rgba(13, 30, 52, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDark ? '1.5px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #cbd5e1',
            boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
            padding: '16px 18px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: 'calc(85vh - 70px)',
            overflowY: 'auto'
          }}
        >
          {/* Primary High-Conversion CTA in Mobile Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('produk');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleLinkClick('produk');
              }
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
              color: '#ffffff',
              border: '1.5px solid #82D7E1',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(36, 131, 179, 0.35)',
              marginBottom: '4px'
            }}
          >
            <ShoppingCart size={16} color="#82D7E1" />
            <span>Pesan Nila Sekarang • Rp 35.000/kg</span>
          </button>

          {/* Dedicated Auth Button in Mobile Drawer */}
          {customerUser ? (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('auth');
                }}
                style={{
                  flex: 1,
                  padding: '11px',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #cbd5e1',
                  background: isDark ? '#142a47' : '#f1f5f9',
                  color: isDark ? '#ffffff' : '#0b213f',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <User size={15} color="#2483B3" />
                <span>Akun ({customerUser.name?.split(' ')[0]})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCustomerLogout();
                }}
                style={{
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #ef4444',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={15} />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('auth');
              }}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '10px',
                border: isDark ? '1px solid rgba(130, 215, 225, 0.4)' : '1.5px solid #2483B3',
                background: isDark ? '#142a47' : '#e8f4f9',
                color: isDark ? '#82D7E1' : '#163665',
                fontSize: '13.5px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            >
              <User size={16} color="#2483B3" />
              <span>Masuk / Daftar Akun Pelanggan</span>
            </button>
          )}

          {navItems.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isExp = mobileExpanded[item.id];
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    background: isActive ? (isDark ? '#1b385e' : '#e5eff5') : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (hasSub) {
                      toggleMobileAccordion(item.id);
                    } else {
                      handleLinkClick(item.id);
                    }
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: isActive ? 800 : 700, color: isActive ? '#2483B3' : (isDark ? '#f8fafc' : '#0b213f') }}>
                    {item.label}
                  </span>
                  {hasSub ? (
                    <ChevronDown 
                      size={16} 
                      style={{
                        transform: isExp ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: isDark ? '#94a3b8' : '#64748b'
                      }} 
                    />
                  ) : (
                    isActive && <Sparkles size={16} color="#2483B3" />
                  )}
                </div>

                {/* Sub-Items Accordion */}
                {hasSub && isExp && (
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      paddingLeft: '14px',
                      marginTop: '4px',
                      marginBottom: '8px',
                      borderLeft: '2px solid #2483B3'
                    }}
                  >
                    {item.subItems.map((sub, sIdx) => {
                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleLinkClick(sub.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: isDark ? '#f8fafc' : '#0b213f',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          <SubIcon size={16} color="#2483B3" />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700 }}>{sub.label}</span>
                            <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>{sub.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ height: '1px', background: isDark ? 'rgba(130, 215, 225, 0.2)' : '#e2e8f0', margin: '8px 0' }} />

          {/* Mobile Utilities */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderTracking();
              }}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '9999px',
                border: isDark ? '1px solid rgba(130, 215, 225, 0.35)' : '1.5px solid #cbd5e1',
                background: isDark ? '#142a47' : '#f1f5f9',
                color: isDark ? '#ffffff' : '#0b213f',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Package size={15} color="#2483B3" />
              <span>Lacak Pesanan</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCorpModal) {
                  onOpenCorpModal('konsultasi');
                } else {
                  onNavigate('kontak');
                }
              }}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '9999px',
                border: 'none',
                background: '#2483B3',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <MessageCircle size={15} />
              <span>Konsultasi</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsiveness overrides */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 1120px) {
          .desktop-floating-menu {
            display: flex !important;
          }
          .mobile-burger-btn {
            display: none !important;
          }
          .nav-desk-only {
            display: inline-flex !important;
          }
          .nav-cta-btn {
            display: inline-flex !important;
          }
        }
        @media (min-width: 1120px) and (max-width: 1280px) {
          .nav-order-text {
            display: none !important;
          }
          .nav-order-btn {
            padding: 5px !important;
            width: 32px !important;
            height: 32px !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 1119px) {
          .desktop-floating-menu {
            display: none !important;
          }
          .nav-desk-only {
            display: none !important;
          }
          .mobile-burger-btn {
            display: flex !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1119px) {
          .nav-cta-btn {
            display: inline-flex !important;
            padding: 6px 13px !important;
            font-size: 12px !important;
          }
        }
        @media (max-width: 639px) {
          .nav-cta-btn {
            display: none !important;
          }
          .navbar-main-container {
            padding: 7px 12px !important;
            gap: 6px !important;
          }
          .nav-logo-text {
            font-size: 17px !important;
          }
          .nav-logo-img {
            height: 27px !important;
          }
        }
      `}</style>
    </header>
  );
}
