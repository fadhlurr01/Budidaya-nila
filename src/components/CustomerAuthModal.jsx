import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag,
  Sparkles,
  Waves,
  ShieldCheck,
  Truck,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function CustomerAuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  onShowToast,
  initialMode = 'login' // 'login' | 'register'
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
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'login');
      setLoginError('');
      setRegError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const inputVal = loginEmail.trim();
    const passVal = loginPassword.trim();

    if (!inputVal || !passVal) {
      if (onShowToast) onShowToast('Harap masukkan email/no HP dan kata sandi.', 'bad');
      return;
    }

    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
    } catch {
      savedUsers = [];
    }

    // Match by email or phone and password
    const found = savedUsers.find(
      u => (
        (u.email && u.email.toLowerCase() === inputVal.toLowerCase()) || 
        (u.phone && u.phone === inputVal)
      ) && u.password === passVal
    );

    if (found) {
      onLoginSuccess(found);
      if (onShowToast) onShowToast(`Selamat datang kembali, ${found.name}!`, 'ok');
      onClose();
    } else {
      // Check if user exists with that email/phone but incorrect password
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

    onLoginSuccess(newUser);
    if (onShowToast) onShowToast(`Akun berhasil dibuat! Selamat datang di NilaFarm, ${newUser.name}.`, 'ok');
    onClose();
  };

  // 1. FRAME IDENTITAS
  const renderIdentityFrame = () => (
    <div 
      className="auth-identity-frame"
      style={{
        flex: '1 1 45%',
        padding: 'clamp(24px, 4vw, 36px)',
        background: 'linear-gradient(145deg, rgba(33, 150, 243, 0.16) 0%, rgba(13, 71, 161, 0.22) 100%)',
        borderRight: mode === 'login' ? '1px solid var(--border)' : 'none',
        borderLeft: mode === 'register' ? '1px solid var(--border)' : 'none',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <img 
            src="/assets/logo.png" 
            alt="NilaFarm Logo" 
            style={{ width: '38px', height: '38px', objectFit: 'contain' }} 
          />
          <div>
            <b style={{ fontSize: '18px', color: 'var(--txt)', display: 'block', lineHeight: 1.1 }}>
              NilaFarm
            </b>
            <span style={{ fontSize: '11px', color: 'var(--b)', fontWeight: 700, letterSpacing: '0.5px' }}>
              SMART BIOFLOK IOT
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px', lineHeight: 1.3 }}>
          {mode === 'login' ? 'Selamat Datang Kembali di NilaFarm' : 'Daftar Akun & Dapatkan Akses Eksklusif'}
        </h3>
        
        <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.55, margin: '0 0 24px' }}>
          {mode === 'login'
            ? 'Masuk untuk memantau status pesanan ikan nila segar, riwayat pembelian, dan telemetri budidaya bioflok Anda.'
            : 'Bergabunglah bersama ratusan pelanggan setia NilaFarm Sumedang dan nikmati kemudahan belanja ikan segar langsung dari kolam.'}
        </p>

        {/* Highlight Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(33, 150, 243, 0.18)', color: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={15} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block' }}>Lacak Posisi Pengiriman Real-time</b>
              <small style={{ fontSize: '11.5px', color: 'var(--mut)' }}>Pantau armada pengantar langsung dari kolam ke lokasi Anda.</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.18)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={15} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block' }}>100% Bebas Bau Lumpur</b>
              <small style={{ fontSize: '11.5px', color: 'var(--mut)' }}>Kualitas daging manis gurih dengan standar bioflok modern.</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.18)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={15} />
            </div>
            <div>
              <b style={{ fontSize: '12.5px', color: 'var(--txt)', display: 'block' }}>Nota & Riwayat Belanja Lengkap</b>
              <small style={{ fontSize: '11.5px', color: 'var(--mut)' }}>Semua faktur dan pesanan Anda tersimpan rapi otomatis.</small>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '11px', color: 'var(--mut)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="var(--b)" />
          Layanan Resmi Budidaya Nila Bioflok Sumedang
        </span>
      </div>
    </div>
  );

  // 2. FRAME FORM (LOGIN / REGISTER)
  const renderFormFrame = () => (
    <div 
      style={{
        flex: '1 1 55%',
        padding: 'clamp(20px, 3.5vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        width: isMobile ? '100%' : 'auto'
      }}
    >
      <div>
        {/* Header Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {mode === 'login' ? 'Autentikasi Pembeli' : 'Registrasi Akun Baru'}
            </span>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 800, color: 'var(--txt)', margin: '4px 0 0' }}>
              {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Pelanggan'}
            </h2>
          </div>

          <button 
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--txt)',
              flexShrink: 0
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--card2)',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
            marginBottom: '18px',
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
              padding: '8px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'login' ? 'var(--b)' : 'transparent',
              color: mode === 'login' ? '#ffffff' : 'var(--mut)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
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
              padding: '8px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'register' ? 'var(--b)' : 'transparent',
              color: mode === 'register' ? '#ffffff' : 'var(--mut)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Error Notification if login or register fails */}
        {mode === 'login' && loginError && (
          <div 
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1.5px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '12.5px', fontWeight: 700 }}>
              <AlertCircle size={16} flexShrink={0} />
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
                padding: '7px 16px',
                fontSize: '12px',
                borderRadius: '9999px',
                alignSelf: 'flex-start',
                marginTop: '2px'
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
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px'
            }}
          >
            <AlertCircle size={15} flexShrink={0} />
            <span>{regError}</span>
          </div>
        )}

        {/* 1. FORM LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '5px' }}>
                Email atau No. WhatsApp
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text"
                  required
                  placeholder="Contoh: 081298452311 atau nama@gmail.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 12px 10px 36px',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--txt)' }}>
                  Kata Sandi
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="password"
                  required
                  placeholder="Masukkan kata sandi Anda"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 12px 10px 36px',
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

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '11px',
                fontSize: '13.5px',
                borderRadius: '9999px',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Masuk ke Akun</span>
              <ArrowRight size={15} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--mut)' }}>
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
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                Nama Lengkap *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={regData.name}
                  onChange={e => setRegData({ ...regData, name: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  No. WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input 
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={regData.phone}
                    onChange={e => setRegData({ ...regData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Email (Opsional)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input 
                    type="email"
                    placeholder="nama@gmail.com"
                    value={regData.email}
                    onChange={e => setRegData({ ...regData, email: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                Alamat Pengiriman Lengkap
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                <input 
                  type="text"
                  placeholder="Jl. Raya Sumedang No. 12, RT 02/04, Kotakaler"
                  value={regData.address}
                  onChange={e => setRegData({ ...regData, address: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Kata Sandi *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Min. 6 karakter"
                    value={regData.password}
                    onChange={e => setRegData({ ...regData, password: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Konfirmasi Sandi *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Ulangi kata sandi"
                    value={regData.confirmPassword}
                    onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--card2)',
                      color: 'var(--txt)',
                      fontSize: '12.5px',
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
                padding: '11px',
                fontSize: '13.5px',
                borderRadius: '9999px',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Daftar Sekarang</span>
              <CheckCircle2 size={15} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--mut)' }}>
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
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-dialog" 
        style={{ 
          maxWidth: isMobile ? '460px' : '820px', 
          width: '95%', 
          padding: 0, 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxSizing: 'border-box',
          border: '1.5px solid var(--border)',
          background: 'var(--card)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Desktop Two-Frames Layout:
            - If Login: Left = Identity, Right = Form
            - If Register / Signup: Left = Form, Right = Identity (Reversed)
            - If Mobile: Identity is hidden, Form takes full width (Single Frame)
        */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
            minHeight: isMobile ? 'auto' : '520px'
          }}
        >
          {mode === 'login' ? (
            <>
              {renderIdentityFrame()}
              {renderFormFrame()}
            </>
          ) : (
            <>
              {renderFormFrame()}
              {renderIdentityFrame()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
