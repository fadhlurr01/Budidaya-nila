import React, { useState } from 'react';
import { 
  ArrowUp
} from 'lucide-react';

export default function Footer({ 
  onNavigate,
  lang = 'id'
}) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        background: '#0e2440', // Deep Marine Nila Navy
        color: '#ffffff',
        padding: '60px 24px 30px',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(130, 215, 225, 0.2)'
      }}
    >
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Column 1: Layanan Pelanggan */}
        <div>
          <h4 
            style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '20px'
            }}
          >
            {lang === 'en' ? 'Customer Service' : 'Layanan Pelanggan'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#a6c5de' }}>
            <li>
              <button 
                onClick={() => onNavigate('beranda')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'FAQ & Farming Knowledge' : 'FAQ & Panduan Order'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('kontak')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Contacts & Farm Support' : 'Kontak Layanan'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('kontak')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Live Arrival Guarantee Policy' : 'Garansi Ikan Hidup'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Akun & Pesanan */}
        <div>
          <h4 
            style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '20px'
            }}
          >
            {lang === 'en' ? 'My Account' : 'Akun & Pesanan'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#a6c5de' }}>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'My Order' : 'Pesanan Saya'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Track Live Transport' : 'Lacak Pengiriman'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Claim Mortality / Return' : 'Klaim Garansi Kematian'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('produk')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Feed Subscription' : 'Langganan Pakan Rutin'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Tentang Kami */}
        <div>
          <h4 
            style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '20px'
            }}
          >
            {lang === 'en' ? 'About Us' : 'Tentang Kami'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#a6c5de' }}>
            <li>
              <button 
                onClick={() => onNavigate('budidaya')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Partnership & Careers' : 'Kemitraan Bioflok'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('kontak')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Farm Location (Sumedang)' : 'Lokasi Farm Sumedang'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('budidaya')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#82D7E1'}
                onMouseLeave={e => e.target.style.color = '#a6c5de'}
              >
                {lang === 'en' ? 'Our Story & Philosophy' : 'Kisah NilaFarm'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Social */}
        <div style={{ maxWidth: '380px' }}>
          <h4 
            style={{ 
              fontSize: '15px', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '16px'
            }}
          >
            {lang === 'en' ? 'Get harvest alerts and exclusive offers' : 'Dapatkan info jadwal panen & penawaran spesial'}
          </h4>

          <form 
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '9999px',
              padding: '4px',
              marginBottom: '20px',
              alignItems: 'center'
            }}
          >
            <input 
              type="text" 
              placeholder={lang === 'en' ? 'Enter your email here...' : 'Masukkan email Anda...'}
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                padding: '9px 16px',
                fontSize: '13px',
                color: '#163665',
                minWidth: 0
              }}
            />
            <button
              type="submit"
              style={{
                background: '#2483B3',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 20px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={e => e.target.style.background = '#1a6b94'}
              onMouseLeave={e => e.target.style.background = '#2483B3'}
            >
              {lang === 'en' ? 'Subscribe' : 'Langganan'}
            </button>
          </form>

          {subscribed && (
            <p style={{ fontSize: '12px', color: '#82D7E1', marginBottom: '16px' }}>
              ✓ {lang === 'en' ? 'Thank you for subscribing!' : 'Terima kasih telah berlangganan info panen!'}
            </p>
          )}

          {/* Social Media Circular Buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #82D7E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#82D7E1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2483B3';
                e.currentTarget.style.borderColor = '#2483B3';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#82D7E1';
                e.currentTarget.style.color = '#82D7E1';
              }}
            >
              f
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #82D7E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#82D7E1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2483B3';
                e.currentTarget.style.borderColor = '#2483B3';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#82D7E1';
                e.currentTarget.style.color = '#82D7E1';
              }}
            >
              📷
            </a>

            {/* Twitter */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #82D7E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#82D7E1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2483B3';
                e.currentTarget.style.borderColor = '#2483B3';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#82D7E1';
                e.currentTarget.style.color = '#82D7E1';
              }}
            >
              𝕏
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Terms */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid rgba(130, 215, 225, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12.5px',
          color: '#82D7E1'
        }}
      >
        <div>
          2026 NilaFarm Indonesia. Privacy • Terms • Sitemap
        </div>

        <button
          onClick={scrollToTop}
          title="Back to Top"
          style={{
            background: 'transparent',
            border: '1px solid #82D7E1',
            color: '#82D7E1',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#2483B3';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#82D7E1';
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
