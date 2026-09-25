import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Fish } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  onShowToast 
}) {
  const [email, setEmail] = useState('admin@nilafarm.id');
  const [password, setPassword] = useState('admin123');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== 'admin123') {
      if (onShowToast) onShowToast('Password salah. Gunakan: admin123', 'bad');
      return;
    }

    const session = {
      email,
      name: 'Hamdan Russ',
      role: 'Farm Owner & Admin'
    };

    onLoginSuccess(session);
    if (onShowToast) onShowToast('Selamat datang kembali di panel NilaFarm!', 'ok');
    onClose();
  };

  const handleQuickDemo = () => {
    setEmail('admin@nilafarm.id');
    setPassword('admin123');
    const session = {
      email: 'admin@nilafarm.id',
      name: 'Hamdan Russ',
      role: 'Farm Owner & Admin'
    };
    onLoginSuccess(session);
    if (onShowToast) onShowToast('Login demo berhasil!', 'ok');
    onClose();
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="modal-dialog"
        style={{ maxWidth: '440px' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src="/assets/logo.png" 
              alt="Logo" 
              style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
            />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
              Masuk Panel Farm
            </h3>
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

        <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '20px' }}>
          Akses dashboard monitoring telemetri kualitas air, kendali aktuator aerator, dan manajemen penjualan.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', marginBottom: '6px' }}>
              Alamat Email Farm
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: '12px',
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)' }}>
                Kata Sandi (Demo: admin123)
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--mut)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: '12px',
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
              padding: '12px',
              fontSize: '14px',
              marginTop: '6px'
            }}
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={handleQuickDemo}
            className="btn-ghost"
            style={{
              padding: '11px',
              fontSize: '13px'
            }}
          >
            <ShieldCheck size={16} color="var(--b)" />
            <span>Masuk Langsung (Akun Demo)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
