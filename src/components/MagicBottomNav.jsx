import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Waves, 
  BookOpen, 
  Phone,
  LayoutDashboard, 
  Cpu, 
  Bell,
  Settings
} from 'lucide-react';

export default function MagicBottomNav({ 
  mode = 'public', // 'public' | 'dashboard'
  activeTab, 
  onSelectTab 
}) {
  // Exactly 5 items in each mode for pixel-perfect 70px * 5 = 350px (matching fe/navbar)
  const publicTabs = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'produk', label: 'Produk', icon: ShoppingBag },
    { id: 'budidaya', label: 'Budidaya', icon: Waves },
    { id: 'artikel', label: 'Artikel', icon: BookOpen },
    { id: 'kontak', label: 'Kontak', icon: Phone }
  ];

  // Admin Dashboard tabs: matches Home, Profile, Message, Photos, Settings from fe/navbar
  const dashboardTabs = [
    { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'kolam', label: 'Kolam', icon: Waves },
    { id: 'notifikasi', label: 'Pesan', icon: Bell },
    { id: 'perangkat', label: 'Node IoT', icon: Cpu },
    { id: 'pengaturan', label: 'Settings', icon: Settings }
  ];

  const tabs = mode === 'dashboard' ? dashboardTabs : publicTabs;
  
  // Find index or map gracefully to closest tab
  let activeIndex = tabs.findIndex(t => t.id === activeTab);
  if (activeIndex === -1) {
    if (activeTab === 'cara' || activeTab === 'fitur' || activeTab === 'galeri') {
      activeIndex = 2; // maps to budidaya
    } else if (activeTab === 'analitik') {
      activeIndex = 1; // maps to kolam
    } else if (activeTab === 'produk') {
      activeIndex = 4; // maps to settings/management
    } else {
      activeIndex = 0;
    }
  }

  return (
    <div className={`mobile-magic-dock ${mode === 'dashboard' ? 'in-dashboard' : ''}`}>
      <div className={`navigation ${mode === 'dashboard' ? 'admin-dock' : ''}`}>
        <ul>
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = idx === activeIndex;

            return (
              <li 
                key={tab.id} 
                className={`list ${isActive ? 'active' : ''}`}
              >
                <a 
                  href={`#${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab(tab.id);
                  }}
                  aria-label={tab.label}
                >
                  <span className="icon">
                    <Icon size={24} strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span className="text">{tab.label}</span>
                  <span className="circle"></span>
                </a>
              </li>
            );
          })}
          <div 
            className="indicator"
            style={{
              transform: `translateX(calc(70px * ${activeIndex}))`
            }}
          />
        </ul>
      </div>
    </div>
  );
}
