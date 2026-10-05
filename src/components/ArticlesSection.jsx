import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, X, Clock, Share2, User } from 'lucide-react';
import { getArticles } from '../services/api';

export default function ArticlesSection({ articles: initialArticles = [], lang = 'id', onNavigate }) {
  const [articleList, setArticleList] = useState(initialArticles);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadApiArticles() {
      try {
        const result = await getArticles();
        if (isMounted && result && Array.isArray(result.data) && result.data.length > 0) {
          // Take 3 articles for the landing page grid
          setArticleList(result.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Failed loading articles from API:', err);
      }
    }
    loadApiArticles();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (initialArticles && initialArticles.length > 0 && articleList.length === 0) {
      setArticleList(initialArticles.slice(0, 3));
    }
  }, [initialArticles]);

  return (
    <section 
      id="artikel" 
      style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '70px 24px 50px',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
        <p 
          style={{ 
            fontSize: '12px', 
            fontWeight: 800, 
            letterSpacing: '1.8px', 
            textTransform: 'uppercase', 
            color: '#2483B3',
            background: 'rgba(36, 131, 179, 0.1)',
            padding: '4px 12px',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '10px'
          }}
        >
          {lang === 'en' ? 'Biofloc Knowledge & Articles' : 'Pusat Edukasi & Panduan Bioflok'}
        </p>

        <h2 
          style={{ 
            fontSize: 'clamp(28px, 4vw, 40px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.8px'
          }}
        >
          {lang === 'en' ? 'Learn Sustainable Aquaculture' : 'Wawasan & Panduan Ahli Dari Kolam Nila'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px', lineHeight: 1.6 }}>
          {lang === 'en'
            ? 'Discover essential techniques, water parameter management, and profitable business analysis from our field experts.'
            : 'Pelajari teknik praktis menjaga ekosistem kolam, perhitungan modal kemitraan, dan strategi menekan biaya pakan hingga panen melimpah.'}
        </p>
      </div>

      {/* 3 Grid Articles */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '28px'
        }}
      >
        {articleList.slice(0, 3).map((art) => {
          const displayImg = art.img || (art.image_url ? `/${art.image_url.replace(/^\//, '')}` : '/assets/products/kolam-d4.jpg');

          return (
            <article 
              key={art.id}
              className="article-card group"
              style={{
                background: 'var(--card)',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 18px rgba(22, 54, 101, 0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 14px 30px rgba(36, 131, 179, 0.16)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(22, 54, 101, 0.06)';
              }}
            >
              <div>
                {/* Article Image Container */}
                <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={displayImg} 
                    alt={art.judul}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/products/kolam-d3.jpg';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Date Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(14, 36, 64, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#82D7E1',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: '1px solid rgba(130, 215, 225, 0.3)'
                    }}
                  >
                    <Calendar size={12} />
                    <span>{art.tgl}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div style={{ padding: '22px' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: '#2483B3',
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}
                  >
                    <User size={13} />
                    <span>{art.author || 'Tim Ahli NilaFarm'}</span>
                  </div>

                  <h3 
                    style={{ 
                      fontSize: '18px', 
                      fontWeight: 800, 
                      color: 'var(--txt)', 
                      marginBottom: '10px',
                      lineHeight: 1.35
                    }}
                  >
                    {art.judul}
                  </h3>

                  {/* Clean line-clamp-3 description */}
                  <p 
                    style={{ 
                      fontSize: '13.5px', 
                      color: 'var(--mut)', 
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {art.ringkas}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div style={{ padding: '0 22px 22px' }}>
                <button
                  onClick={() => setActiveArticle(art)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2483B3',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'gap 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#163665'}
                  onMouseLeave={e => e.currentTarget.style.color = '#2483B3'}
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA linking to full dedicated page */}
      <div style={{ marginTop: '2.8rem', textAlign: 'center' }}>
        <button
          onClick={() => onNavigate ? onNavigate('artikel') : (window.location.href = '/artikel')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.9rem 2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(36,131,179,0.15), rgba(6,182,212,0.15))',
            border: '1.5px solid rgba(36,131,179,0.4)',
            color: '#38bdf8',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 15px rgba(36,131,179,0.15)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #2483B3, #06b6d4)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(36,131,179,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(36,131,179,0.15), rgba(6,182,212,0.15))';
            e.currentTarget.style.color = '#38bdf8';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(36,131,179,0.15)';
          }}
        >
          <span>Buka Pustaka Lengkap Seluruh Artikel Edukasi</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div 
          className="modal-backdrop"
          onClick={() => setActiveArticle(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 99999
          }}
        >
          <div 
            className="modal-dialog"
            style={{ 
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--card)',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#2483B3', fontWeight: 700 }}>
                  {activeArticle.tgl} • {activeArticle.author}
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--txt)', marginTop: '4px', lineHeight: 1.3 }}>
                  {activeArticle.judul}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  background: 'var(--card2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--txt)',
                  flexShrink: 0
                }}
              >
                <X size={18} />
              </button>
            </div>

            <img 
              src={activeArticle.img || (activeArticle.image_url ? `/${activeArticle.image_url.replace(/^\//, '')}` : '/assets/products/kolam-d4.jpg')} 
              alt={activeArticle.judul}
              style={{
                width: '100%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '16px',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--txt)', fontSize: '15px', lineHeight: 1.75 }}>
              {(activeArticle.isi || [activeArticle.ringkas]).map((par, pIdx) => (
                <p key={pIdx}>{par}</p>
              ))}
            </div>

            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  background: '#2483B3',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 22px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
