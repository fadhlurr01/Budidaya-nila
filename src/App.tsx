import React, { useState, useEffect, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation, 
  Navigate 
} from 'react-router-dom';

// Layout & Navigation Components
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

// Dedicated Multipage & Route Components
import HomePage from './pages/HomePage';
import BudidayaPage from './pages/BudidayaPage';
import ProductsPage from './pages/ProductsPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';

import { 
  DEFAULT_PRODUCTS, 
  DEFAULT_ARTICLES, 
  DEFAULT_ORDERS,
  INITIAL_PONDS, 
  INITIAL_DEVICES 
} from './data/budidayaData';
import { getProducts, getArticles } from './services/api';

// Error Boundary to prevent any blank page from runtime exceptions
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[NilaFarm ErrorBoundary] Uncaught runtime exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d1e34 0%, #163665 100%)',
          color: '#ffffff',
          padding: '24px',
          textAlign: 'center',
          fontFamily: "'Outfit', sans-serif"
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐟🌊</div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#82D7E1', marginBottom: '12px' }}>
            Terjadi Kendala Teknis Sementara
          </h1>
          <p style={{ color: '#cfe2ec', maxWidth: '500px', lineHeight: 1.6, marginBottom: '24px', fontSize: '15px' }}>
            Sistem pengawasan air kolam mendeteksi kendala pada halaman ini. Mari segarkan kembali atau kembali ke beranda utama.
          </p>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            style={{
              background: '#2483B3',
              color: '#ffffff',
              border: '1.5px solid #82D7E1',
              borderRadius: '9999px',
              padding: '12px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(36, 131, 179, 0.4)'
            }}
          >
            Muat Ulang Beranda
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    }
  }, [pathname, hash]);

  return null;
}

// Main Root Application Inner
function MainAppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active section from pathname
  const currentPath = location.pathname.replace(/^\//, '') || 'beranda';
  const isDashboardRoute = location.pathname === '/dashboard';
  const isAuthRoute = location.pathname === '/auth';

  // Dashboard tab state
  const [dashboardTab, setDashboardTab] = useState('dashboard');
  const [selectedArticleId, setSelectedArticleId] = useState('1');

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

  // Dynamic Products & Articles with API fetch
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);

  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await getProducts();
        if (prodRes && Array.isArray(prodRes.data) && prodRes.data.length > 0) {
          setProducts(prodRes.data);
        }
        const artRes = await getArticles();
        if (artRes && Array.isArray(artRes.data) && artRes.data.length > 0) {
          setArticles(artRes.data);
        }
      } catch (e) {
        console.warn('API fetch warning:', e);
      }
    }
    loadData();
  }, []);

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
      title: 'Kolam B2: Suhu Siang Terpantau (30.2°C)',
      desc: 'Aerator otomatis diaktifkan untuk menjaga kadar DO tetap di atas 5.0 mg/L.',
      t: '11:45:00',
      read: false
    }
  ]);

  // Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [devModal, setDevModal] = useState<string | null>(null);
  const [corpModal, setCorpModal] = useState<string | null>(null);

  // Customer Authentication & Order Tracking
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nilafarm_customer_session') || 'null');
    } catch {
      return null;
    }
  });
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: string }>>([]);

  const showToast = useCallback((message: string, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('nilafarm_theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  const handleToggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    try {
      localStorage.setItem('nilafarm_lang', next);
    } catch {}
    showToast(next === 'en' ? 'Switched to English' : 'Beralih ke Bahasa Indonesia', 'info');
  };

  // Navigation router helper
  const handleNavigate = useCallback((pathOrSection: string, extraId?: string) => {
    const target = (pathOrSection || '').toLowerCase().replace(/^#/, '');

    // Homepage
    if (['beranda', 'home', ''].includes(target)) {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Dedicated Full Pages for each menu item
    if (['produk', 'budidaya', 'artikel', 'kontak'].includes(target)) {
      navigate('/' + target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'artikel-detail') {
      if (extraId) {
        setSelectedArticleId(extraId);
        navigate(`/artikel/${extraId}`);
      } else {
        navigate('/artikel');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'auth' || target === 'login' || target === 'register') {
      navigate('/auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'dashboard') {
      if (session) {
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default route navigation
    navigate('/' + target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, session]);

  // Cart operations
  const handleAddToCart = useCallback((product: any) => {
    setCartItems((prev: any[]) => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`"${product.nama}" berhasil masuk ke keranjang belanja.`, 'ok');
  }, [showToast]);

  const handleUpdateCartQty = (productId: any, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev: any[]) => prev.filter(i => i.id !== productId));
    } else {
      setCartItems((prev: any[]) => prev.map(i => i.id === productId ? { ...i, qty } : i));
    }
  };

  const handleRemoveCartItem = (productId: any) => {
    setCartItems((prev: any[]) => prev.filter(i => i.id !== productId));
    showToast('Item berhasil dihapus dari keranjang.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Keranjang telah dikosongkan.', 'info');
  };

  const handleCreateOrder = (newOrder: any) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('nilafarm_orders', JSON.stringify(updated));
    } catch {}
    showToast(`Pesanan #${newOrder.id} berhasil dibuat!`, 'ok');
  };

  const handleOpenDashboard = useCallback(() => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  }, [session, navigate]);

  const handleLoginSuccess = (userSession: any) => {
    setSession(userSession);
    try {
      localStorage.setItem('nilafarm_session', JSON.stringify(userSession));
    } catch {}
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem('nilafarm_session');
    } catch {}
    navigate('/');
    showToast('Anda telah keluar dari panel admin.', 'info');
  };

  const [customerAuthInitialMode, setCustomerAuthInitialMode] = useState('login');
  const handleOpenCustomerAuth = (mode = 'login') => {
    setCustomerAuthInitialMode(mode);
    setIsCartOpen(false);
    setIsOrderTrackingOpen(false);
    setIsAuthOpen(false);
    navigate('/auth');
  };

  const handleCustomerLogin = (user: any) => {
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

  const handleOpenOrderTracking = (orderId: string | null = null) => {
    setTrackingOrderId(orderId);
    setIsOrderTrackingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Scroll to Top on Navigation */}
      <ScrollToTop />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onRemoveToast={removeToast} />

      {/* Navbar rendered on all public routes except /auth and /dashboard */}
      {!isDashboardRoute && !isAuthRoute && (
        <Navbar 
          activeSection={currentPath}
          onNavigate={handleNavigate}
          onOpenDashboard={handleOpenDashboard}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cartItems.reduce((acc: number, i: any) => acc + i.qty, 0)}
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
      )}

      {/* Main Content with Pure React Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Landing / Home Page */}
          <Route 
            path="/" 
            element={
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
            } 
          />
          <Route path="/beranda" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/products" element={<Navigate to="/produk" replace />} />
          <Route path="/articles" element={<Navigate to="/artikel" replace />} />
          <Route path="/contact" element={<Navigate to="/kontak" replace />} />
          <Route path="/tentang" element={<Navigate to="/budidaya" replace />} />
          <Route path="/about" element={<Navigate to="/budidaya" replace />} />

          {/* Products Catalog */}
          <Route 
            path="/produk" 
            element={
              <ProductsPage 
                products={products}
                onAddToCart={handleAddToCart}
                onOpenCart={() => setIsCartOpen(true)}
                onNavigate={handleNavigate}
                lang={lang}
              />
            } 
          />

          {/* Budidaya & IoT System */}
          <Route 
            path="/budidaya" 
            element={
              <BudidayaPage 
                onNavigate={handleNavigate}
                onOpenConsultation={() => setCorpModal('tentang')}
                lang={lang}
                isDark={isDark}
              />
            } 
          />

          {/* Articles & Educational Knowledge */}
          <Route 
            path="/artikel" 
            element={
              <ArticlesPage 
                articles={articles}
                onNavigate={handleNavigate}
                lang={lang}
              />
            } 
          />
          <Route 
            path="/artikel/:id" 
            element={
              <ArticleDetailPage 
                articleId={selectedArticleId}
                articles={articles}
                onNavigate={handleNavigate}
                onShowToast={showToast}
                lang={lang}
              />
            } 
          />
          <Route 
            path="/artikel-detail/:id" 
            element={
              <ArticleDetailPage 
                articleId={selectedArticleId}
                articles={articles}
                onNavigate={handleNavigate}
                onShowToast={showToast}
                lang={lang}
              />
            } 
          />

          {/* Contact Page */}
          <Route 
            path="/kontak" 
            element={
              <ContactPage 
                onNavigate={handleNavigate}
                onShowToast={showToast}
                lang={lang}
              />
            } 
          />

          {/* Dedicated Auth Page Routes (Login / Register / Signup) */}
          <Route 
            path="/auth" 
            element={
              <AuthPage 
                initialMode={customerAuthInitialMode}
                onLoginSuccess={handleCustomerLogin}
                onAdminLogin={handleLoginSuccess}
                onNavigate={handleNavigate}
                onShowToast={showToast}
                isDark={isDark}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <AuthPage 
                initialMode="login"
                onLoginSuccess={handleCustomerLogin}
                onAdminLogin={handleLoginSuccess}
                onNavigate={handleNavigate}
                onShowToast={showToast}
                isDark={isDark}
              />
            } 
          />
          <Route 
            path="/register" 
            element={
              <AuthPage 
                initialMode="register"
                onLoginSuccess={handleCustomerLogin}
                onAdminLogin={handleLoginSuccess}
                onNavigate={handleNavigate}
                onShowToast={showToast}
                isDark={isDark}
              />
            } 
          />
          <Route path="/signup" element={<Navigate to="/register" replace />} />
          <Route path="/masuk" element={<Navigate to="/login" replace />} />
          <Route path="/daftar" element={<Navigate to="/register" replace />} />

          {/* Admin Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              session ? (
                <DashboardView 
                  session={session}
                  onLogout={handleLogout}
                  onBackToLanding={() => { navigate('/'); window.scrollTo({ top: 0 }); }}
                  ponds={ponds}
                  onUpdatePonds={setPonds}
                  devices={devices}
                  onUpdateDevices={setDevices}
                  products={products}
                  onUpdateProducts={setProducts}
                  articles={articles}
                  onUpdateArticles={setArticles}
                  alerts={alerts}
                  onAddAlert={() => {}}
                  onMarkAllAlertsRead={() => {}}
                  orders={orders}
                  onUpdateOrders={setOrders}
                  onShowToast={showToast}
                  dashboardTab={dashboardTab}
                  onSelectDashboardTab={setDashboardTab}
                  isDark={isDark}
                  onToggleTheme={() => setIsDark(!isDark)}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            } 
          />

          {/* 404 Not Found Page for all unmatched routes (Never blank!) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer rendered on all public routes except /auth and /dashboard */}
      {!isDashboardRoute && !isAuthRoute && (
        <Footer 
          onNavigate={handleNavigate}
          onOpenDashboard={handleOpenDashboard}
          onOpenDevModal={setDevModal}
          onOpenCorpModal={setCorpModal}
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

      {/* Realtime Order Tracking Modal */}
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
      <FloatingActionButtons isDashboard={isDashboardRoute || isAuthRoute} />
    </div>
  );
}

// Export Root App wrapped in BrowserRouter and ErrorBoundary
export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <MainAppContent />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
