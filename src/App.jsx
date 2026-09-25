import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DevCorpModals from './components/DevCorpModals';
import DashboardView from './components/DashboardView';
import MagicBottomNav from './components/MagicBottomNav';
import Toast from './components/Toast';
import FloatingActionButtons from './components/FloatingActionButtons';
import OrderTrackingModal from './components/OrderTrackingModal';

// Dedicated Multipage Components
import HomePage from './pages/HomePage';
import BudidayaPage from './pages/BudidayaPage';
import ProductsPage from './pages/ProductsPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';

import { 
  DEFAULT_PRODUCTS, 
  DEFAULT_ARTICLES, 
  DEFAULT_ORDERS,
  INITIAL_PONDS, 
  INITIAL_DEVICES,
  DEFAULT_THRESHOLDS 
} from './data/budidayaData';

export default function App() {
  // View mode: 'public' | 'dashboard'
  const [currentView, setCurrentView] = useState('public');
  const [activeSection, setActiveSection] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['beranda', 'budidaya', 'produk', 'artikel', 'kontak', 'cara', 'fitur', 'auth'].includes(hash)) {
        return hash;
      }
    } catch {}
    return 'beranda';
  });
  const [dashboardTab, setDashboardTab] = useState('dashboard');
  const [selectedArticleId, setSelectedArticleId] = useState('a1');

  // Session
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nilafarm_session') || 'null');
    } catch {
      return null;
    }
  });

  // Theme & Language
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('nilafarm_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('nilafarm_lang') || 'id';
    } catch {
      return 'id';
    }
  });

  // Products & Articles (persisted in localStorage)
  const [products, setProducts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('nilafarm_products') || 'null');
      if (Array.isArray(saved) && saved.length > 0) {
        // Map existing and append any new default products
        const updated = saved.map(item => {
          const def = DEFAULT_PRODUCTS.find(d => d.id === item.id);
          return def ? { ...def, ...item, img: def.img || item.img } : item;
        });
        DEFAULT_PRODUCTS.forEach(def => {
          if (!updated.some(u => u.id === def.id)) {
            updated.push(def);
          }
        });
        return updated;
      }
      return DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  const [articles, setArticles] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('nilafarm_articles') || 'null');
      return Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_ARTICLES;
    } catch {
      return DEFAULT_ARTICLES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('nilafarm_orders') || 'null');
      return Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  // Ponds & Devices state
  const [ponds, setPonds] = useState(INITIAL_PONDS);
  const [devices, setDevices] = useState(INITIAL_DEVICES);

  // Alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Gateway Sumedang Online',
      desc: '4 kolam budidaya dan 7 sensor node terhubung dengan latensi 42ms.',
      t: '08:00:12',
      read: false
    },
    {
      id: 2,
      type: 'warn',
      title: 'Kolam B2: Suhu Siang Tinggi (30.2°C)',
      desc: 'Kenaikan suhu terpantau di siang hari. Aerator otomatis diaktifkan untuk menjaga DO.',
      t: '11:45:00',
      read: false
    }
  ]);

  // Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [devModal, setDevModal] = useState(null);
  const [corpModal, setCorpModal] = useState(null);

  // Customer Authentication & Order Tracking
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nilafarm_customer_session') || 'null');
    } catch {
      return null;
    }
  });
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme to body class
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('nilafarm_theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  // Sync lang
  const handleToggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    try {
      localStorage.setItem('nilafarm_lang', next);
    } catch {}
    showToast(next === 'en' ? 'Switched to English' : 'Beralih ke Bahasa Indonesia', 'info');
  };

  // Persist products and articles
  const handleUpdateProducts = (newProds) => {
    setProducts(newProds);
    try {
      localStorage.setItem('nilafarm_products', JSON.stringify(newProds));
    } catch {}
  };

  const handleUpdateArticles = (newArts) => {
    setArticles(newArts);
    try {
      localStorage.setItem('nilafarm_articles', JSON.stringify(newArts));
    } catch {}
  };

  const handleUpdateOrders = (newOrders) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('nilafarm_orders', JSON.stringify(newOrders));
    } catch {}
  };

  const handleCreateOrder = (newOrder) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('nilafarm_orders', JSON.stringify(updated));
    } catch {}
    handleAddAlert(
      'info',
      `Pesanan Baru #${newOrder.id}`,
      `Pesanan dari ${newOrder.pelanggan} (${newOrder.metode}) telah masuk. Bukti bayar terlampir.`
    );
  };

  // Realtime Simulation Ticker for Ponds
  useEffect(() => {
    const interval = setInterval(() => {
      setPonds(prevPonds => {
        return prevPonds.map(p => {
          const s = { ...p.s };
          // Random slight drift
          s.temp = +(s.temp + (Math.random() * 0.2 - 0.1) + (p.act.pompa ? -0.01 : 0.01)).toFixed(1);
          s.ph = +(Math.max(6.2, Math.min(8.8, s.ph + (Math.random() * 0.04 - 0.02)))).toFixed(2);
          const targetDO = p.act.aerator ? 6.5 : 4.4;
          s.do = +(Math.max(2.5, Math.min(9.5, s.do + (targetDO - s.do) * 0.05 + (Math.random() * 0.1 - 0.05)))).toFixed(1);
          s.nh3 = +(Math.max(0.05, Math.min(0.8, s.nh3 + (Math.random() * 0.01 - 0.005)))).toFixed(2);

          const hist = { ...p.hist };
          const nextTemp = [...(hist.temp || []), s.temp];
          const nextPh = [...(hist.ph || []), s.ph];
          const nextDo = [...(hist.do || []), s.do];
          const nextNh3 = [...(hist.nh3 || []), s.nh3];

          if (nextTemp.length > 48) nextTemp.shift();
          if (nextPh.length > 48) nextPh.shift();
          if (nextDo.length > 48) nextDo.shift();
          if (nextNh3.length > 48) nextNh3.shift();

          return {
            ...p,
            s,
            hist: {
              temp: nextTemp,
              ph: nextPh,
              do: nextDo,
              nh3: nextNh3
            }
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHash = () => {
      try {
        const rawHash = window.location.hash.replace('#', '').toLowerCase();
        if (rawHash.startsWith('artikel-detail')) {
          const parts = rawHash.split('_');
          if (parts[1]) {
            setSelectedArticleId(parts[1]);
          }
          setActiveSection('artikel-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (['beranda', 'budidaya', 'produk', 'artikel', 'kontak', 'cara', 'fitur', 'auth'].includes(rawHash)) {
          setActiveSection(rawHash);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch {}
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Public Multipage Navigation Handler
  const handleNavigate = (sectionId, extraId) => {
    const target = (sectionId || 'beranda').toLowerCase();
    if (target === 'artikel-detail') {
      if (extraId) {
        setSelectedArticleId(extraId);
      }
    }
    setActiveSection(target);
    if (currentView !== 'public') {
      setCurrentView('public');
    }

    try {
      window.history.pushState(
        null, 
        '', 
        '#' + target + (target === 'artikel-detail' && extraId ? `_${extraId}` : '')
      );
    } catch {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add To Cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`"${product.nama}" masuk ke keranjang belanja.`, 'ok');
  };

  const handleUpdateCartQty = (productId, qty) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== productId));
    } else {
      setCartItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
    }
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
    showToast('Item dihapus dari keranjang.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Keranjang telah dikosongkan.', 'info');
  };

  // Alerts Management
  const handleAddAlert = (type, title, desc) => {
    const d = new Date();
    const pad = n => (n < 10 ? '0' : '') + n;
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const newAlert = {
      id: Date.now(),
      type,
      title,
      desc,
      t: timeStr,
      read: false
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 35)]);
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    showToast('Semua notifikasi ditandai telah dibaca.', 'ok');
  };

  // Open Dashboard (checking auth session)
  const handleOpenDashboard = () => {
    if (session) {
      setCurrentView('dashboard');
      window.scrollTo({ top: 0 });
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleLoginSuccess = (userSession) => {
    setSession(userSession);
    try {
      localStorage.setItem('nilafarm_session', JSON.stringify(userSession));
    } catch {}
    setCurrentView('dashboard');
    window.scrollTo({ top: 0 });
  };

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem('nilafarm_session');
    } catch {}
    setCurrentView('public');
    showToast('Anda telah keluar dari panel admin.', 'info');
    window.scrollTo({ top: 0 });
  };

  // Customer Authentication Handlers
  const [customerAuthInitialMode, setCustomerAuthInitialMode] = useState('login');
  const handleOpenCustomerAuth = (mode = 'login') => {
    setCustomerAuthInitialMode(mode);
    handleNavigate('auth');
  };

  const handleCustomerLogin = (user) => {
    setCustomerUser(user);
    try {
      localStorage.setItem('nilafarm_customer_session', JSON.stringify(user));
    } catch {}
    showToast(`Selamat datang kembali, ${user.name}!`, 'ok');
  };

  const handleCustomerLogout = () => {
    setCustomerUser(null);
    try {
      localStorage.removeItem('nilafarm_customer_session');
    } catch {}
    showToast('Anda telah keluar dari akun pelanggan.', 'info');
  };

  const handleOpenOrderTracking = (orderId = null) => {
    setTrackingOrderId(orderId);
    setIsOrderTrackingOpen(true);
  };

  // Mobile Bottom Nav Select
  const handleMobileTabSelect = (tabId) => {
    if (currentView === 'public') {
      if (tabId === 'dashboard') {
        handleOpenDashboard();
      } else {
        handleNavigate(tabId);
      }
    } else {
      setDashboardTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onRemoveToast={removeToast} />

      {/* VIEW 1: PUBLIC LANDING PAGE */}
      {currentView === 'public' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar 
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenDashboard={handleOpenDashboard}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartItems.reduce((acc, i) => acc + i.qty, 0)}
            customerUser={customerUser}
            onOpenCustomerAuth={handleOpenCustomerAuth}
            onOpenOrderTracking={() => handleOpenOrderTracking()}
            onCustomerLogout={handleCustomerLogout}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            lang={lang}
            onToggleLang={handleToggleLang}
            onOpenDevModal={setDevModal}
            onOpenCorpModal={setCorpModal}
          />

          <main style={{ flex: 1 }}>
            {/* Multipage Dynamic Routing */}
            {(() => {
              switch (activeSection) {
                case 'budidaya':
                case 'cara':
                case 'fitur':
                  return (
                    <BudidayaPage 
                      onNavigate={handleNavigate}
                      onOpenConsultation={() => setCorpModal('tentang')}
                      lang={lang}
                    />
                  );
                case 'produk':
                  return (
                    <ProductsPage 
                      products={products}
                      onAddToCart={handleAddToCart}
                      onOpenCart={() => setIsCartOpen(true)}
                      onNavigate={handleNavigate}
                      lang={lang}
                    />
                  );
                case 'artikel':
                  return (
                    <ArticlesPage 
                      articles={articles}
                      onNavigate={handleNavigate}
                      lang={lang}
                    />
                  );
                case 'artikel-detail':
                  return (
                    <ArticleDetailPage 
                      articleId={selectedArticleId}
                      articles={articles}
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                      lang={lang}
                    />
                  );
                case 'kontak':
                  return (
                    <ContactPage 
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                      lang={lang}
                    />
                  );
                case 'auth':
                  return (
                    <AuthPage 
                      initialMode={customerAuthInitialMode}
                      onLoginSuccess={handleCustomerLogin}
                      onNavigate={handleNavigate}
                      onShowToast={showToast}
                      isDark={isDark}
                    />
                  );
                case 'beranda':
                default:
                  return (
                    <HomePage 
                      products={products}
                      articles={articles}
                      onAddToCart={handleAddToCart}
                      onOpenCart={() => setIsCartOpen(true)}
                      onNavigate={handleNavigate}
                      onOpenDashboard={handleOpenDashboard}
                      isDark={isDark}
                      lang={lang}
                    />
                  );
              }
            })()}
          </main>

          <Footer 
            onNavigate={handleNavigate}
            onOpenDashboard={handleOpenDashboard}
            onOpenDevModal={setDevModal}
            onOpenCorpModal={setCorpModal}
          />
        </div>
      )}

      {/* VIEW 2: IOT FARM DASHBOARD */}
      {currentView === 'dashboard' && (
        <DashboardView 
          session={session}
          onLogout={handleLogout}
          onBackToLanding={() => { setCurrentView('public'); window.scrollTo({ top: 0 }); }}
          ponds={ponds}
          onUpdatePonds={setPonds}
          devices={devices}
          onUpdateDevices={setDevices}
          products={products}
          onUpdateProducts={handleUpdateProducts}
          articles={articles}
          onUpdateArticles={handleUpdateArticles}
          alerts={alerts}
          onAddAlert={handleAddAlert}
          onMarkAllAlertsRead={handleMarkAllAlertsRead}
          orders={orders}
          onUpdateOrders={handleUpdateOrders}
          onShowToast={showToast}
          dashboardTab={dashboardTab}
          onSelectDashboardTab={setDashboardTab}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />
      )}

      {/* Magic Bottom Navigation (Active ONLY in Admin Panel mobile mode) */}
      {currentView === 'dashboard' && (
        <MagicBottomNav 
          mode="dashboard"
          activeTab={dashboardTab}
          onSelectTab={handleMobileTabSelect}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handleCreateOrder}
        onShowToast={showToast}
        customerUser={customerUser}
        onOpenCustomerAuth={handleOpenCustomerAuth}
        onCustomerLogin={handleCustomerLogin}
        onCustomerLogout={handleCustomerLogout}
        onOpenOrderTracking={handleOpenOrderTracking}
      />

      {/* Realtime Order Tracking Modal (Pelacakan Status Pembelian & Keterangan Akun) */}
      <OrderTrackingModal 
        isOpen={isOrderTrackingOpen}
        onClose={() => {
          setIsOrderTrackingOpen(false);
          setTrackingOrderId(null);
        }}
        orders={orders}
        customerUser={customerUser}
        initialOrderId={trackingOrderId}
        onOpenCustomerAuth={handleOpenCustomerAuth}
        onCustomerLogout={handleCustomerLogout}
        onShowToast={showToast}
      />

      {/* Admin Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onShowToast={showToast}
      />

      {/* Developer & Corporate Modals */}
      <DevCorpModals 
        modalType={devModal || corpModal}
        onClose={() => { setDevModal(null); setCorpModal(null); }}
        onShowToast={showToast}
      />

      {/* Floating Action Buttons: WhatsApp & Scroll To Top */}
      <FloatingActionButtons isDashboard={currentView === 'dashboard'} />
    </div>
  );
}
