import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserCheck, 
  UserPlus, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import './AuthPage.css';

// CardNav component from frontendjoe (Part 11)
const CardNav = ({ view, onSelect }) => (
  <ul className="card-nav">
    <li>
      <img 
        src="/assets/logo/logoo.png" 
        alt="NilaFarm Logo" 
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/assets/logo/logo.png';
        }}
      />
      <span className="active-bar"></span>
    </li>
    <li>
      <button
        type="button"
        className={`signin ${view === "signin" ? "active" : ""}`}
        onClick={() => onSelect("signin")}
      >
        <UserCheck size={18} />
        <span>Sign In</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        className={`signup ${view === "signup" ? "active" : ""}`}
        onClick={() => onSelect("signup")}
      >
        <UserPlus size={18} />
        <span>Sign Up</span>
      </button>
    </li>
  </ul>
);

// Hero component from frontendjoe (Part 11)
const Hero = ({ variant, title, subtitle }) => (
  <div className={`card-hero-content ${variant}`}>
    <h2>{title}</h2>
    <h3>{subtitle}</h3>
    <a 
      className="terms"
      onClick={() => alert("Syarat & Ketentuan NilaFarm Indonesia: Pembelian benih bersertifikasi SKAI, pakan berstandar SNI, serta ikan konsumsi segar terlindungi garansi 100% aman se-Jawa & Bali.")}
    >
      <span>Terms &amp; Conditions</span>
      <ArrowRight size={13} />
    </a>
  </div>
);

// Sign In Form
const SignInForm = ({ 
  onSwitch, 
  loginEmail, 
  setLoginEmail, 
  loginPassword, 
  setLoginPassword, 
  loginError, 
  onSubmit, 
  setDemoAdmin,
  onShowToast 
}) => {
  const handleSocialClick = (provider) => {
    if (onShowToast) {
      onShowToast(`Login cepat dengan ${provider} siap disinkronkan. Silakan gunakan akun email/admin.`, 'info');
    }
  };

  return (
    <form className="signin signin-form-view" onSubmit={onSubmit}>
      {/* Social Login Buttons (Google, Facebook, Apple) */}
      <div className="social-buttons">
        <button 
          type="button" 
          className="social-btn"
          onClick={() => handleSocialClick('Google')}
          title="Masuk dengan Google"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.43 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.57 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Google</span>
        </button>

        <button 
          type="button" 
          className="social-btn"
          onClick={() => handleSocialClick('Facebook')}
          title="Masuk dengan Facebook"
        >
          <svg width="16" height="16" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>

        <button 
          type="button" 
          className="social-btn"
          onClick={() => handleSocialClick('Apple')}
          title="Masuk dengan Apple ID"
        >
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.06-7.7-7.85-12.01-14.37-6.03-9.17-10.74-19.8-14.13-31.91-3.39-12.11-5.09-23.6-5.09-34.46 0-14.88 3.73-27.46 11.19-37.74 7.46-10.28 17.06-15.54 28.8-15.79 4.89 0 10.37 1.25 16.44 3.75 6.07 2.5 10.23 3.86 12.48 4.09 1.96-.23 6.3-1.63 13.01-4.2 6.72-2.58 12.14-3.74 16.27-3.48 12.28.76 22.18 5.43 29.7 14.02-10.88 6.53-16.2 15.68-15.96 27.47.24 9.17 3.8 16.94 10.68 23.32 6.89 6.38 15.15 10.05 24.8 11.01-2.18 6.76-4.94 13.43-8.29 20zM119.22 33.15c0-6.76 2.45-13.43 7.35-20.02 4.9-6.59 11.03-11.45 18.39-14.58.44 1.74.66 3.49.66 5.23 0 6.98-2.61 13.88-7.84 20.71-5.23 6.83-11.41 11.41-18.56 13.74z"/>
          </svg>
          <span>Apple</span>
        </button>
      </div>

      <div className="divider-text">atau dengan kredensial</div>

      {/* Quick Admin Credential Hint */}
      <div 
        className="admin-hint-pill"
        onClick={setDemoAdmin}
        title="Klik untuk mengisi data demo Admin Farm"
      >
        <ShieldCheck size={13} />
        <span>Demo Admin: Ham@farm.id / admin123 (Klik)</span>
      </div>

      {loginError && (
        <div className="auth-error-banner">
          <AlertCircle size={14} />
          <span>{loginError}</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Email atau Nomor WhatsApp</label>
        <div className="input-wrapper">
          <Mail size={15} className="input-icon" />
          <input 
            type="text"
            required
            className="form-input"
            placeholder="nama@email.com / 0812..."
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Kata Sandi</label>
        <div className="input-wrapper">
          <Lock size={15} className="input-icon" />
          <input 
            type="password"
            required
            className="form-input"
            placeholder="••••••••"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn-submit">
        <span>Sign In</span>
        <ArrowRight size={15} />
      </button>

      <p>
        Belum punya akun?
        <a onClick={onSwitch}>Sign Up</a>
      </p>
    </form>
  );
};

// Sign Up Form
const SignUpForm = ({ 
  onSwitch, 
  regData, 
  setRegData, 
  regError, 
  onSubmit 
}) => {
  return (
    <form className="signup signup-form-view" onSubmit={onSubmit}>
      {regError && (
        <div className="auth-error-banner">
          <AlertCircle size={14} />
          <span>{regError}</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Nama Lengkap *</label>
        <div className="input-wrapper">
          <User size={15} className="input-icon" />
          <input 
            type="text"
            required
            className="form-input"
            placeholder="Nama lengkap Anda..."
            value={regData.name}
            onChange={(e) => setRegData({ ...regData, name: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Nomor WhatsApp Aktif *</label>
        <div className="input-wrapper">
          <Phone size={15} className="input-icon" />
          <input 
            type="tel"
            required
            className="form-input"
            placeholder="0813xxxxxxxx"
            value={regData.phone}
            onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Email (Opsional)</label>
        <div className="input-wrapper">
          <Mail size={15} className="input-icon" />
          <input 
            type="email"
            className="form-input"
            placeholder="nama@email.com"
            value={regData.email}
            onChange={(e) => setRegData({ ...regData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Kata Sandi (Min. 6 Karakter) *</label>
        <div className="input-wrapper">
          <Lock size={15} className="input-icon" />
          <input 
            type="password"
            required
            className="form-input"
            placeholder="Minimal 6 karakter"
            value={regData.password}
            onChange={(e) => setRegData({ ...regData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Konfirmasi Kata Sandi *</label>
        <div className="input-wrapper">
          <Lock size={15} className="input-icon" />
          <input 
            type="password"
            required
            className="form-input"
            placeholder="Ulangi kata sandi"
            value={regData.confirmPassword}
            onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
          />
        </div>
      </div>

      <button type="submit" className="btn-submit">
        <span>Sign Up</span>
        <ArrowRight size={15} />
      </button>

      <p>
        Sudah memiliki akun?
        <a onClick={onSwitch}>Sign In</a>
      </p>
    </form>
  );
};

// Main Export Page
export default function AuthPage({ 
  initialMode = 'login', // 'login' | 'register'
  onLoginSuccess, 
  onAdminLogin,
  onNavigate,
  onShowToast,
  isDark = false 
}) {
  const [view, setView] = useState(
    initialMode === 'register' || initialMode === 'signup' ? 'signup' : 'signin'
  );

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [regError, setRegError] = useState('');

  useEffect(() => {
    setView(initialMode === 'register' || initialMode === 'signup' ? 'signup' : 'signin');
    setLoginError('');
    setRegError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialMode]);

  const setDemoAdmin = () => {
    setLoginEmail('Ham@farm.id');
    setLoginPassword('admin123');
    if (onShowToast) {
      onShowToast('Kredensial Admin dimuat: Ham@farm.id (admin123)', 'info');
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const inputVal = loginEmail.trim();
    const passVal = loginPassword.trim();

    if (!inputVal || !passVal) {
      if (onShowToast) onShowToast('Harap masukkan email/no HP dan kata sandi.', 'bad');
      return;
    }

    // Check Admin Login (Ham@farm.id)
    if (inputVal.toLowerCase() === 'ham@farm.id' || inputVal.toLowerCase() === 'admin@nilafarm.id') {
      if (passVal === 'admin123') {
        const adminSession = {
          email: 'Ham@farm.id',
          name: 'Hamdan Russ',
          role: 'Farm Owner & Admin'
        };
        if (onAdminLogin) {
          onAdminLogin(adminSession);
          if (onShowToast) onShowToast('Selamat datang Admin Farm (Hamdan Russ)! Mengalihkan ke dashboard...', 'ok');
          return;
        } else if (onLoginSuccess) {
          onLoginSuccess(adminSession);
          if (onShowToast) onShowToast('Selamat datang Admin Farm (Hamdan Russ)!', 'ok');
          if (onNavigate) onNavigate('beranda');
          return;
        }
      } else {
        setLoginError('Kata sandi admin tidak sesuai. Silakan periksa kembali.');
        if (onShowToast) onShowToast('Kata sandi admin salah.', 'bad');
        return;
      }
    }

    // Customer login check from localStorage
    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
    } catch {
      savedUsers = [];
    }

    const found = savedUsers.find(
      u => (
        (u.email && u.email.toLowerCase() === inputVal.toLowerCase()) || 
        (u.phone && u.phone === inputVal)
      ) && u.password === passVal
    );

    if (found) {
      if (onLoginSuccess) onLoginSuccess(found);
      if (onShowToast) onShowToast(`Selamat datang kembali, ${found.name}!`, 'ok');
      if (onNavigate) onNavigate('beranda');
    } else {
      const userExists = savedUsers.find(
        u => (u.email && u.email.toLowerCase() === inputVal.toLowerCase()) || (u.phone && u.phone === inputVal)
      );

      if (userExists) {
        setLoginError('Kata sandi yang Anda masukkan salah. Silakan periksa kembali.');
        if (onShowToast) onShowToast('Kata sandi tidak sesuai.', 'bad');
      } else {
        setLoginError('Akun belum terdaftar di sistem NilaFarm. Silakan klik Sign Up.');
        if (onShowToast) onShowToast('Akun belum terdaftar. Silakan buat akun baru.', 'bad');
      }
    }
  };

  // Register handler
  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regData.name.trim() || !regData.phone.trim() || !regData.password.trim()) {
      setRegError('Harap lengkapi semua kolom bertanda bintang (*).');
      if (onShowToast) onShowToast('Harap lengkapi semua kolom bertanda bintang.', 'bad');
      return;
    }

    if (regData.password.length < 6) {
      setRegError('Kata sandi minimal 6 karakter.');
      if (onShowToast) onShowToast('Kata sandi minimal 6 karakter.', 'bad');
      return;
    }

    if (regData.password !== regData.confirmPassword) {
      setRegError('Konfirmasi kata sandi tidak cocok.');
      if (onShowToast) onShowToast('Konfirmasi kata sandi tidak cocok.', 'bad');
      return;
    }

    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
    } catch {
      savedUsers = [];
    }

    const alreadyRegistered = savedUsers.find(
      u => (u.phone && u.phone === regData.phone.trim()) ||
           (regData.email.trim() && u.email && u.email.toLowerCase() === regData.email.trim().toLowerCase())
    );

    if (alreadyRegistered) {
      setRegError('Nomor WhatsApp atau Email ini sudah terdaftar. Silakan Sign In.');
      if (onShowToast) onShowToast('Nomor WhatsApp atau Email sudah terdaftar. Silakan login.', 'bad');
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: regData.name.trim(),
      email: regData.email.trim() || `${regData.phone.trim()}@nilafarm.id`,
      phone: regData.phone.trim(),
      address: regData.address.trim() || 'Sumedang, Jawa Barat',
      password: regData.password,
      createdAt: new Date().toISOString()
    };

    savedUsers.push(newUser);
    try {
      localStorage.setItem('nilafarm_users', JSON.stringify(savedUsers));
    } catch {}

    if (onLoginSuccess) onLoginSuccess(newUser);
    if (onShowToast) onShowToast(`Akun berhasil dibuat! Selamat datang di NilaFarm, ${newUser.name}.`, 'ok');
    if (onNavigate) onNavigate('beranda');
  };

  return (
    <div className="auth-page-container">
      {/* Return to Home / Back Nav */}
      <button 
        type="button" 
        onClick={() => onNavigate ? onNavigate('beranda') : window.history.back()}
        className="auth-back-nav"
      >
        <ArrowLeft size={15} />
        <span>Kembali ke Beranda</span>
      </button>

      {/* FrontendJoe 3-Column Card Architecture from PDF */}
      <div className={`card ${view}`}>
        <CardNav view={view} onSelect={setView} />

        <div className="card-hero">
          <div className="card-hero-bg"></div>
          <div className="card-hero-inner">
            <Hero
              variant="signin"
              title="Welcome back"
              subtitle="Please enter your credentials"
            />
            <Hero
              variant="signup"
              title="Join us today"
              subtitle="Creating an account is quick"
            />
          </div>
        </div>

        <div className="card-form">
          <div className="forms">
            <SignInForm 
              onSwitch={() => setView("signup")}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              loginError={loginError}
              onSubmit={handleLogin}
              setDemoAdmin={setDemoAdmin}
              onShowToast={onShowToast}
            />
            <SignUpForm 
              onSwitch={() => setView("signin")}
              regData={regData}
              setRegData={setRegData}
              regError={regError}
              onSubmit={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
