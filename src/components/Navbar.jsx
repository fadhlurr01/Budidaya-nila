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
      const scrolled = window.scrollY > 30;
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
      label: lang === 'en' ? 'Products & Shop' : 'Katalog Produk',
      badge: lang === 'en' ? 'Popular' : 'Populer',
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
      label: lang === 'en' ? 'Farming & IoT' : 'Budidaya & IoT',
      badge: 'IoT',
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
      label: lang === 'en' ? 'Articles & Guide' : 'Artikel & Edukasi',
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
      label: lang === 'en' ? 'Contact & Farm' : 'Kontak & Mitra' 
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
        boxSizing: 'border-box'
      }}
    >
      {/* Top Announcement Bar */}
      <div 
        style={{
          background: '#163665',
          color: '#ffffff',
          fontSize: '11.5px',
          fontWeight: 600,
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          letterSpacing: '0.3px',
          borderBottom: '1px solid rgba(130, 215, 225, 0.25)'
        }}
      >
        <span style={{ color: '#82D7E1' }}>●</span>
        <span>{lang === 'en' ? 'Live Fresh Tilapia & Fingerlings Delivery Across Java & Bali' : 'Pengiriman Ikan Segar & Bibit Hidup Bergaransi Se-Jawa & Bali'}</span>
        <span style={{ fontSize: '13px' }}>🚚</span>
      </div>

      {/* Main Navbar Container */}
      <div 
        className="navbar-main-container"
        style={{
          width: '100%',
          maxWidth: '1760px',
          margin: '0 auto',
          background: isDark ? '#142a47' : '#ffffff',
          borderBottom: isDark ? '1px solid rgba(130, 215, 225, 0.2)' : '1px solid #cfe2ec',
          boxShadow: 'var(--shadow-sm)',
          padding: '12px clamp(16px, 3.5vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Side: Brand Logo + Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', minWidth: 0 }}>
          {/* Brand Logo NilaFarm */}
          <div 
            onClick={() => handleLinkClick('beranda')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #163665 0%, #2483B3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #82D7E1',
                boxShadow: '0 4px 12px rgba(36, 131, 179, 0.25)'
              }}
            >
              <Waves size={20} color="#82D7E1" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--p)', letterSpacing: '-0.5px' }}>
                Nila
              </span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#2483B3', letterSpacing: '-0.5px' }}>
                Farm
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Exactly 5 Items with Dropdowns) */}
          <nav 
            className="desktop-floating-menu"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
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
                      background: isDropdownOpen ? 'var(--card2)' : 'none',
                      border: 'none',
                      color: isActive ? '#2483B3' : 'var(--txt)',
                      fontSize: '14.5px',
                      fontWeight: isActive ? 700 : 600,
                      cursor: 'pointer',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onMouseEnter={e => {
                      if (!isActive && !isDropdownOpen) e.currentTarget.style.color = '#2483B3';
                    }}
                    onMouseLeave={e => {
                      if (!isActive && !isDropdownOpen) e.currentTarget.style.color = 'var(--txt)';
                    }}
                  >
                    <span>{item.label}</span>

                    {/* Optional Badge */}
                    {item.badge && (
                      <span 
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: item.badge === 'IoT' ? 'rgba(36, 131, 179, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: item.badge === 'IoT' ? '#2483B3' : '#10b981'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Dropdown Indicator Icon */}
                    {hasSub && (
                      <ChevronDown 
                        size={14} 
                        style={{
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease',
                          color: isDropdownOpen ? '#2483B3' : 'var(--mut)'
                        }}
                      />
                    )}

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '14px',
                          right: '14px',
                          height: '2.5px',
                          background: '#2483B3',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu Window */}
                  {hasSub && isDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '0',
                        minWidth: '320px',
                        background: isDark ? '#142a47' : '#ffffff',
                        border: isDark ? '1px solid rgba(130, 215, 225, 0.3)' : '1px solid #cfe2ec',
                        borderRadius: '16px',
                        boxShadow: '0 16px 40px rgba(22, 54, 101, 0.18)',
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
                                e.currentTarget.style.background = isDark ? '#1c3b63' : '#f0f6fa';
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
                                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.2 }}>
                                  {sub.label}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--mut)', lineHeight: 1.3 }}>
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
                          borderTop: isDark ? '1px solid rgba(130, 215, 225, 0.15)' : '1px solid #cfe2ec',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingLeft: '12px',
                          paddingRight: '12px'
                        }}
                      >
                        <span style={{ fontSize: '11.5px', color: 'var(--mut)', fontWeight: 500 }}>
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

        {/* Right Controls & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
            className="nav-desk-only"
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.2s ease'
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
              borderRadius: '50%',
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            title="Keranjang Belanja"
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#2483B3',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(36, 131, 179, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
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

          {/* Order Tracking / Customer Account */}
          <button
            onClick={onOpenOrderTracking}
            title="Lacak Pesanan"
            className="nav-desk-only"
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              background: 'transparent',
              border: '1.5px solid var(--border)',
              color: 'var(--txt)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2483B3';
              e.currentTarget.style.color = '#2483B3';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--txt)';
            }}
          >
            <Package size={14} color="#2483B3" />
            <span>Lacak Order</span>
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
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              color: 'var(--txt)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
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
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: isDark ? '#142a47' : '#ffffff',
            borderBottom: isDark ? '1px solid rgba(130, 215, 225, 0.25)' : '1px solid #cfe2ec',
            boxShadow: '0 16px 36px rgba(0,0,0,0.2)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: 'calc(85vh - 80px)',
            overflowY: 'auto'
          }}
        >
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
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: isActive ? 'var(--card2)' : 'transparent',
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
                  <span style={{ fontSize: '15px', fontWeight: isActive ? 700 : 600, color: isActive ? '#2483B3' : 'var(--txt)' }}>
                    {item.label}
                  </span>
                  {hasSub ? (
                    <ChevronDown 
                      size={16} 
                      style={{
                        transform: isExp ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: 'var(--mut)'
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
                            color: 'var(--txt)',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          <SubIcon size={15} color="#2483B3" />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{sub.label}</span>
                            <span style={{ fontSize: '10.5px', color: 'var(--mut)' }}>{sub.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />

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
                border: '1px solid var(--border)',
                background: 'var(--card2)',
                color: 'var(--txt)',
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
        @media (min-width: 1024px) {
          .desktop-floating-menu {
            display: flex !important;
          }
          .mobile-burger-btn {
            display: none !important;
          }
          .nav-desk-only {
            display: inline-flex !important;
          }
        }
        @media (max-width: 1023px) {
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
        @media (max-width: 640px) {
          .navbar-main-container {
            padding: 8px 14px !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </header>
  );
}
