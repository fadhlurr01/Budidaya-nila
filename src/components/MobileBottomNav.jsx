import React from 'react';
import { Home, Package, FolderGit2, Activity, PhoneCall } from 'lucide-react';

export default function MobileBottomNav({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'beranda', label: 'Home', icon: Home },
    { id: 'produk', label: 'Produk', icon: Package },
    { id: 'portofolio', label: 'Proyek', icon: FolderGit2 },
    { id: 'monitoring', label: 'IoT', icon: Activity },
    { id: 'kontak', label: 'Kontak', icon: PhoneCall },
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeTab);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div className="mobile-magic-nav">
      <div className="magic-navigation-box">
        <ul>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === safeIndex;
            return (
              <li 
                key={item.id} 
                className={isActive ? 'active' : ''}
              >
                <button 
                  onClick={() => onSelectTab(item.id)}
                  aria-label={item.label}
                  type="button"
                >
                  <span className="magic-icon">
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  <span className="magic-text">{item.label}</span>
                  <span className="magic-circle"></span>
                </button>
              </li>
            );
          })}
          {/* Animated Indicator Notch sliding with translateX */}
          <div 
            className="magic-indicator"
            style={{
              left: `${safeIndex * 20}%`,
              transform: 'translateX(calc((100% - 64px) / 2))'
            }}
          />
        </ul>
      </div>

      <style>{`
        .magic-navigation-box ul {
          position: relative;
        }
        .magic-indicator {
          position: absolute;
          top: -30px;
          width: 58px;
          height: 58px;
          background: linear-gradient(135deg, #1e88e5, #0d47a1);
          border: 5px solid var(--bg);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 22px rgba(13, 71, 161, 0.4);
          pointer-events: none;
          z-index: 0;
        }
        .magic-indicator::before {
          content: '';
          position: absolute;
          top: 48%;
          left: -19px;
          width: 18px;
          height: 18px;
          background: transparent;
          border-top-right-radius: 18px;
          box-shadow: 1px -7px 0 0 var(--bg);
        }
        .magic-indicator::after {
          content: '';
          position: absolute;
          top: 48%;
          right: -19px;
          width: 18px;
          height: 18px;
          background: transparent;
          border-top-left-radius: 18px;
          box-shadow: -1px -7px 0 0 var(--bg);
        }
      `}</style>
    </div>
  );
}
