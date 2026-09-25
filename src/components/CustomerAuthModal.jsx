import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export default function CustomerAuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  onShowToast,
  initialMode = 'login' // 'login' | 'register'
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'login');
    }
  }, [isOpen, initialMode]);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      if (onShowToast) onShowToast('Harap masukkan email/no HP dan kata sandi.', 'bad');
      return;
    }

    // Check existing registered users in localStorage
    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
    } catch {
      savedUsers = [];
    }

    const found = savedUsers.find(
      u => (u.email.toLowerCase() === loginEmail.toLowerCase() || u.phone === loginEmail) && u.password === loginPassword
    );

    let loggedInUser = null;
    if (found) {
      loggedInUser = found;
    } else {
      // Allow login with demo or any valid mock if not found
      loggedInUser = {
        id: 'usr_' + Date.now().toString().slice(-4),
        name: loginEmail.includes('@') ? loginEmail.split('@')[0] : 'Pelanggan NilaFarm',
        email: loginEmail.includes('@') ? loginEmail : `${loginEmail}@gmail.com`,
        phone: loginEmail.startsWith('08') ? loginEmail : '081298452311',
        address: 'Jl. Mayor Abdurahman No. 45, Sumedang'
      };
    }

    onLoginSuccess(loggedInUser);
    if (onShowToast) onShowToast(`Selamat datang kembali, ${loggedInUser.name}!`, 'ok');
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regData.name.trim() || !regData.phone.trim() || !regData.password.trim()) {
      if (onShowToast) onShowToast('Harap lengkapi semua kolom bertanda bintang.', 'bad');
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now().toString().slice(-4),
      name: regData.name.trim(),
      email: regData.email.trim() || `${regData.phone.trim()}@nilafarm.id`,
      phone: regData.phone.trim(),
      address: regData.address.trim(),
      password: regData.password
    };

    // Save to localStorage
    try {
      const savedUsers = JSON.parse(localStorage.getItem('nilafarm_users') || '[]');
      savedUsers.push(newUser);
      localStorage.setItem('nilafarm_users', JSON.stringify(savedUsers));
    } catch {}

    onLoginSuccess(newUser);
    if (onShowToast) onShowToast(`Akun berhasil dibuat! Selamat berbelanja, ${newUser.name}.`, 'ok');
    onClose();
  };

  // Quick Demo Account Helper
  const handleQuickDemoCustomer = () => {
    const demoCustomer = {
      id: 'usr_demo',
      name: 'H. Ridwan Kosasih',
      email: 'ridwan@gmail.com',
      phone: '081298452311',
      address: 'Jl. Mayor Abdurahman No. 45, Kotakaler, Sumedang Utara'
    };
    onLoginSuccess(demoCustomer);
    if (onShowToast) onShowToast('Login sebagai Akun Pembeli (H. Ridwan Kosasih) berhasil!', 'ok');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '460px', width: '100%', boxSizing: 'border-box' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                background: 'rgba(33, 150, 243, 0.14)', 
                color: 'var(--b)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <User size={18} />
            </div>
            <div>
              <b style={{ fontSize: '16px', color: 'var(--txt)', display: 'block' }}>
                {mode === 'login' ? 'Masuk ke Akun Pembeli' : 'Daftar Akun NilaFarm'}
              </b>
              <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                Lacak status pengiriman pesanan Anda secara real-time
              </small>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'var(--card2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--txt)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector: Masuk / Daftar */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--card2)',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
            marginBottom: '18px'
          }}
        >
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              padding: '9px 16px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'login' ? 'var(--card)' : 'transparent',
              color: mode === 'login' ? 'var(--b)' : 'var(--mut)',
              fontSize: '13px',
              fontWeight: mode === 'login' ? 700 : 500,
              cursor: 'pointer',
              boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{
              padding: '9px 16px',
              borderRadius: '9999px',
              border: 'none',
              background: mode === 'register' ? 'var(--card)' : 'transparent',
              color: mode === 'register' ? 'var(--b)' : 'var(--mut)',
              fontSize: '13px',
              fontWeight: mode === 'register' ? 700 : 500,
              cursor: 'pointer',
              boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Buat Akun Baru
          </button>
        </div>

        {/* 1. FORM LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '5px' }}>
                Kata Sandi
              </label>
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
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13px'
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
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Masuk Sekarang</span>
              <ArrowRight size={15} />
            </button>

            {/* Quick Demo Customer Account */}
            <div style={{ textAlign: 'center', margin: '8px 0 0', paddingTop: '10px', borderTop: '1px dashed var(--border)' }}>
              <button
                type="button"
                onClick={handleQuickDemoCustomer}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--b)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={14} />
                <span>Klik di sini untuk Masuk Cepat sebagai Pembeli Demo</span>
              </button>
            </div>
          </form>
        )}

        {/* 2. FORM REGISTER (BUAT AKUN BARU) */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
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
                    padding: '9px 12px 9px 36px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '12.5px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  No. WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="text"
                    required
                    placeholder="081234..."
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
                      fontSize: '12.5px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                  Email (Opsional)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input 
                    type="email"
                    placeholder="budi@gmail.com"
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
                      fontSize: '12.5px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                Alamat Pengiriman Utama
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input 
                  type="text"
                  placeholder="Alamat rumah/kantor di Sumedang/sekitarnya"
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
                    fontSize: '12.5px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--txt)', marginBottom: '4px' }}>
                Kata Sandi Baru *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input 
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
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
                    fontSize: '12.5px'
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
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Daftar Akun Baru</span>
              <CheckCircle2 size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
