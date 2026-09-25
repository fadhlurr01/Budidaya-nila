import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, X, Clock, Share2 } from 'lucide-react';

export default function ArticlesSection({ articles, lang = 'id' }) {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section 
      id="artikel" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 20px 40px' 
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
        <p 
          style={{ 
            fontSize: '12.5px', 
            fontWeight: 800, 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            color: 'var(--b)',
            marginBottom: '8px'
          }}
        >
          {lang === 'en' ? 'Farming Knowledge' : 'Panduan Budidaya Nila'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Belajar Budidaya Ikan Nila' : 'Catatan & Panduan Dari Kolam Kami'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'Practical tips from our biofloc farm — written directly by our farm technicians and updated regularly.'
            : 'Panduan teknis langsung dari pengalaman harian di kolam bioflok Sumedang — update berkala.'}
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '24px'
        }}
      >
        {articles.map((art) => (
          <article 
            key={art.id}
            className="glass-panel"
            style={{
              borderRadius: '22px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ height: '190px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={art.img} 
                  alt={art.judul}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(13, 71, 161, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Calendar size={12} />
                  <span>{art.tgl}</span>
                </div>
              </div>

              <div style={{ padding: '22px' }}>
                <h3 
                  style={{ 
                    fontSize: '17px', 
                    fontWeight: 700, 
                    color: 'var(--txt)', 
                    marginBottom: '10px',
                    lineHeight: 1.35
                  }}
                >
                  {art.judul}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6 }}>
                  {art.ringkas}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 22px 22px' }}>
              <button
                onClick={() => setActiveArticle(art)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--b)',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div 
          className="modal-backdrop"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="modal-dialog"
            style={{ maxWidth: '680px' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--b)', fontWeight: 600 }}>
                  {activeArticle.tgl} • NilaFarm Guide
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', marginTop: '4px' }}>
                  {activeArticle.judul}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
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

            <img 
              src={activeArticle.img} 
              alt={activeArticle.judul}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                borderRadius: '16px',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--txt)', fontSize: '14.5px', lineHeight: 1.75 }}>
              {(activeArticle.isi || []).map((par, pIdx) => (
                <p key={pIdx}>{par}</p>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveArticle(null)}
                className="btn-ghost"
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
