import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Waves,
  ShieldCheck,
  Truck,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AuthPage({ 
  initialMode = 'login', // 'login' | 'register'
  onLoginSuccess, 
  onAdminLogin,
  onNavigate,
  onShowToast,
  isDark = false 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
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

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 840 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 840);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMode(initialMode || 'login');
    setLoginError('');
    setRegError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialMode]);

  // Login handler with real validation
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const inputVal = loginEmail.trim();
    const passVal = loginPassword.trim();

    if (!inputVal || !passVal) {
      if (onShowToast) onShowToast('Harap masukkan email/no HP dan kata sandi.', 'bad');
      return;
    }

    // Check if logging in with Admin Account (Ham@farm.id)
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
        setLoginError('Akun belum terdaftar di sistem NilaFarm. Silakan buat akun baru terlebih dahulu.');
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
      setRegError('Nomor WhatsApp atau Email ini sudah terdaftar. Silakan langsung masuk (login).');
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

  // IDENTITY FRAME
  const renderIdentity = () => (
    <motion.div 
      key={`identity-${mode}`}
      initial={{ opacity: 0, x: mode === 'login' ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: mode === 'login' ? 30 : -30 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: '1 1 45%',
        padding: 'clamp(28px, 4vw, 44px)',
        background: 'linear-gradient(145deg, rgba(33, 150, 243, 0.14) 0%, rgba(13, 71, 161, 0.22) 100%)',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        borderRight: mode === 'login' ? '1px solid var(--border)' : 'none',
        borderLeft: mode === 'register' ? '1px solid var(--border)' : 'none'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <img 
            src="/assets/logo/logoo.png" 
            alt="NilaFarm Logo HD" 
            style={{ 
              width: '42px', 
              height: '42px', 
              objectFit: 'contain',
              imageRendering: '-webkit-optimize-contrast',
              filter: 'drop-shadow(0 4px 12px rgba(33, 150, 243, 0.35))' 
            }} 
          />
          <div>
            <b style={{ fontSize: '20px', color: 'var(--txt)', display: 'block', lineHeight: 1.1 }}>
              NilaFarm
            </b>
            <span style={{ fontSize: '11px', color: 'var(--b)', fontWeight: 800, letterSpacing: '1px' }}>
              SMART BIOFLOK IOT SUMEDANG
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 26px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 12px', lineHeight: 1.25 }}>
          {mode === 'login' ? 'Selamat Datang Kembali di NilaFarm' : 'Daftar Akun & Dapatkan Akses Eksklusif'}
        </h3>
        
        <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, margin: '0 0 28px' }}>
          {mode === 'login'
            ? 'Masuk ke portal akun Anda untuk memantau status pesanan ikan nila segar, riwayat pembelian, nota digital, dan konsultasi budidaya bioflok secara real-time.'
            : 'Bergabunglah bersama komunitas pelanggan NilaFarm Sumedang untuk kemudahan belanja ikan segar panen pagi tanpa bau lumpur langsung dari kolam.'}
        </p>

        {/* Feature Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(33, 150, 243, 0.18)', color: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={17} />
            </div>
            <div>
              <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Lacak Posisi Pengiriman Real-time</b>
              <small style={{ fontSize: '12px', color: 'var(--mut)', lineHeight: 1.4, display: 'block' }}>
                Pantau armada pickup cold-chain langsung menuju alamat Anda.
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.18)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={17} />
            </div>
            <div>
              <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Garansi 100% Bebas Bau Lumpur</b>
              <small style={{ fontSize: '12px', color: 'var(--mut)', lineHeight: 1.4, display: 'block' }}>
                Daging tebal manis gurih dipelihara dengan air terawat micro-bubble.
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.18)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={17} />
            </div>
            <div>
              <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>Riwayat Belanja & Nota Digital</b>
              <small style={{ fontSize: '12px', color: 'var(--mut)', lineHeight: 1.4, display: 'block' }}>
                Semua faktur dan pesanan Anda tersimpan rapi dan mudah dicetak.
              </small>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '11.5px', color: 'var(--mut)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} color="var(--b)" />
          Layanan Resmi Budidaya Nila Bioflok Modern • Sumedang, Jawa Barat
        </span>
      </div>
    </motion.div>
  );

  // FORM FRAME
  const renderForm = () => (
    <motion.div 
      key={`form-${mode}`}
      initial={{ opacity: 0, x: mode === 'login' ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: mode === 'login' ? -30 : 30 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: '1 1 55%',
        padding: 'clamp(24px, 4vw, 44px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: isMobile ? '100%' : 'auto'
      }}
    >
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
              {mode === 'login' ? 'Portal Pelanggan' : 'Pendaftaran Anggota'}
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 28px)', fontWeight: 800, color: 'var(--txt)', margin: '4px 0 0' }}>
              {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun NilaFarm'}
            </h2>
          </div>

          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('beranda')}
            className="btn-ghost"
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={13} />
            <span>Beranda</span>
          </button>
        </div>

        {/* Tab Pill Switcher with Smooth Swap */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--card2)',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
            marginBottom: '22px',
            border: '1px solid var(--border)'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLoginError('');
              setRegError('');
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'login' ? 'var(--b)' : 'transparent',
              color: mode === 'login' ? '#ffffff' : 'var(--mut)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setLoginError('');
              setRegError('');
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'register' ? 'var(--b)' : 'transparent',
              color: mode === 'register' ? '#ffffff' : 'var(--mut)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Error Notification if login or register fails */}
        {mode === 'login' && loginError && (
          <div 
            style={{
              padding: '14px 16px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1.5px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13px', fontWeight: 700 }}>
              <AlertCircle size={17} flexShrink={0} />
              <span>{loginError}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoginError('');
                setMode('register');
              }}
              className="btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '12.5px',
                borderRadius: '9999px',
                alignSelf: 'flex-start'
              }}
            >
              <span>+ Buat Akun Baru Sekarang</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {mode === 'register' && regError && (
          <div 
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#ef4444',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={16} flexShrink={0} />
            <span>{regError}</span>
          </div>
        )}

        {/* 1. FORM LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: '6px' }}>
                Email atau No. WhatsApp
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--mut)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input 
                  type="text"
                  required
                  placeholder="Contoh: 081298452311 atau nama@gmail.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--txt)' }}>
                  Kata Sandi
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--mut)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input 
                  type="password"
                  required
                  placeholder="Masukkan kata sandi Anda"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '13px',
                fontSize: '14px',
                borderRadius: '9999px',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Masuk ke Akun Saya</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--mut)' }}>
                Belum pernah mendaftar?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setLoginError('');
                    setMode('register');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--b)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Daftar Akun Baru
                </button>
              </span>
            </div>
          </form>
        )}

        {/* 2. FORM REGISTER (BUAT AKUN BARU) */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                Nama Lengkap *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={regData.name}
                  onChange={e => setRegData({ ...regData, name: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                  No. WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={regData.phone}
                    onChange={e => setRegData({ ...regData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                  Email (Opsional)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="email"
                    placeholder="nama@gmail.com"
                    value={regData.email}
                    onChange={e => setRegData({ ...regData, email: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                Alamat Pengiriman Lengkap
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input 
                  type="text"
                  placeholder="Jl. Raya Sumedang No. 12, RT 02/04, Kotakaler"
                  value={regData.address}
                  onChange={e => setRegData({ ...regData, address: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                  Kata Sandi *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Min. 6 karakter"
                    value={regData.password}
                    onChange={e => setRegData({ ...regData, password: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--txt)', marginBottom: '5px' }}>
                  Konfirmasi Sandi *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Ulangi kata sandi"
                    value={regData.confirmPassword}
                    onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '13px',
                fontSize: '14px',
                borderRadius: '9999px',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Daftar Akun Sekarang</span>
              <CheckCircle2 size={16} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--mut)' }}>
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setRegError('');
                    setMode('login');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--b)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Masuk di sini
                </button>
              </span>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(20px, 4vw, 40px) 16px',
        boxSizing: 'border-box',
        background: isDark ? 'var(--bg)' : 'linear-gradient(180deg, #f0f6ff 0%, var(--bg) 100%)'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1000px',
          background: 'var(--card)',
          borderRadius: '28px',
          border: '1.5px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden'
        }}
      >
        {/* Elegant Swap Layout:
            - When mode === 'login': Left = Identity, Right = Form
            - When mode === 'register': Left = Form, Right = Identity (Reversed)
            - Animated with AnimatePresence for smooth swap transitions
        */}
        <div 
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
            minHeight: isMobile ? 'auto' : '580px',
            position: 'relative'
          }}
        >
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <React.Fragment key="layout-login">
                {renderIdentity()}
                {renderForm()}
              </React.Fragment>
            ) : (
              <React.Fragment key="layout-register">
                {renderForm()}
                {renderIdentity()}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
