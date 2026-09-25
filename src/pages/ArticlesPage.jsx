import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Tag, 
  Share2, 
  ChevronRight, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

export default function ArticlesPage({ articles, onNavigate, lang = 'id' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');

  const categories = ['Semua', 'Teknik Bioflok', 'Manajemen Pakan', 'Teknologi IoT', 'Peluang Bisnis'];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.ringkas.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCat === 'Semua') return matchesSearch;
    if (art.kategori) return matchesSearch && art.kategori === selectedCat;
    if (selectedCat === 'Teknik Bioflok') return matchesSearch && (art.judul.includes('Bioflok') || art.judul.includes('Kolam'));
    if (selectedCat === 'Manajemen Pakan') return matchesSearch && (art.judul.includes('Pakan') || art.judul.includes('FCR'));
    if (selectedCat === 'Teknologi IoT') return matchesSearch && (art.judul.includes('IoT') || art.judul.includes('Sensor'));
    if (selectedCat === 'Peluang Bisnis') return matchesSearch && (art.judul.includes('Bisnis') || art.judul.includes('Investasi') || art.judul.includes('Analisa'));
    return matchesSearch;
  });

  const handleShareWa = (e, art) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Baca artikel budidaya terlengkap dari NilaFarm Sumedang: "${art.judul}"\n\n${art.ringkas}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div style={{ paddingTop: '86px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Header Banner */}
      <section 
        style={{
          background: 'linear-gradient(180deg, var(--card2) 0%, var(--bg) 100%)',
          padding: '48px 20px 36px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--mut)', marginBottom: '16px' }}>
            <button 
              onClick={() => onNavigate('beranda')}
              style={{ background: 'none', border: 'none', color: 'var(--b)', cursor: 'pointer', fontWeight: 600 }}
            >
              Beranda
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--txt)', fontWeight: 600 }}>Pusat Artikel & Edukasi</span>
          </div>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(33, 150, 243, 0.12)',
              color: 'var(--b)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}
          >
            <BookOpen size={14} />
            <span>Pusat Pengetahuan NilaFarm</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: 'var(--txt)',
              letterSpacing: '-0.5px',
              marginBottom: '16px'
            }}
          >
            Edukasi & Artikel Budidaya Nila Modern
          </h1>

          <p 
            style={{
              fontSize: '16px',
              color: 'var(--mut)',
              maxWidth: '680px',
              margin: '0 auto 28px',
              lineHeight: 1.6
            }}
          >
            Panduan terlengkap teknik budidaya bioflok, manajemen formulasi pakan, integrasi IoT otomatisasi, hingga strategi bisnis akuakultur modern.
          </p>

          {/* Search Box */}
          <div 
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '16px', color: 'var(--mut)', pointerEvents: 'none' }} 
            />
            <input 
              type="text"
              placeholder="Cari topik artikel (bioflok, pakan, IoT, DO, pH)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px 14px 46px',
                borderRadius: '30px',
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--txt)',
                fontSize: '14px',
                outline: 'none',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--mut)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 20px 80px' }}>
        {/* Category Pills Filter */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  border: isSelected ? '1px solid var(--b)' : '1px solid var(--border)',
                  background: isSelected ? 'var(--b)' : 'var(--card)',
                  color: isSelected ? '#ffffff' : 'var(--txt)',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(33, 150, 243, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Grid */}
        {filteredArticles.length === 0 ? (
          <div 
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--card)',
              borderRadius: '20px',
              border: '1px solid var(--border)'
            }}
          >
            <BookOpen size={44} color="var(--mut)" style={{ marginBottom: '14px', opacity: 0.6 }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--txt)', marginBottom: '8px' }}>
              Tidak Ada Artikel yang Cocok
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--mut)', maxWidth: '420px', margin: '0 auto 20px' }}>
              Maaf, kata kunci "{searchQuery}" tidak ditemukan pada kategori terpilih. Coba cari kata kunci lain seperti "bioflok" atau "pakan".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCat('Semua'); }}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '26px'
            }}
          >
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="glass-panel"
                onClick={() => onNavigate('artikel-detail', art.id)}
                style={{
                  borderRadius: '22px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={art.img} 
                      alt={art.judul}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(135deg, #0d47a1, #2196f3)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      {art.kategori || 'Edukasi Bioflok'}
                    </div>
                  </div>

                  <div style={{ padding: '22px 22px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--mut)', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        <span>{art.tgl}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        <span>{art.readTime || '4 min baca'}</span>
                      </div>
                    </div>

                    <h2 
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--txt)',
                        lineHeight: 1.4,
                        marginBottom: '10px'
                      }}
                    >
                      {art.judul}
                    </h2>

                    <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '16px' }}>
                      {art.ringkas}
                    </p>
                  </div>
                </div>

                <div 
                  style={{ 
                    padding: '0 22px 22px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid var(--border)', 
                    paddingTop: '14px' 
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('artikel-detail', art.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--b)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0
                    }}
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={14} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={(e) => handleShareWa(e, art)}
                      title="Bagikan ke WhatsApp"
                      style={{
                        background: 'var(--card2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#22c55e',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
