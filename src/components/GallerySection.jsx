import React, { useState } from 'react';
import { Eye, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/budidayaData';

export default function GallerySection({ lang = 'id' }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section 
      id="galeri" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '50px 20px 40px' 
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
          {lang === 'en' ? 'Pond Gallery' : 'Galeri Tambak Kami'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Intip Langsung Kolam Kami' : 'Intip Langsung Suasana Farm Kami'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'Round biofloc D4 ponds, pristine water, active fish — our farm atmosphere every single morning.'
            : 'Kolam bundar D4, air teratur, ikan lincah — suasana tambak keluarga kami setiap pagi di Sumedang.'}
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '20px'
        }}
      >
        {GALLERY_ITEMS.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="glass-panel"
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              group: 'gallery-card'
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={item.img} 
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(13, 71, 161, 0.75) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '16px',
                  color: '#ffffff'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{item.title}</h4>
                  <small style={{ fontSize: '12px', opacity: 0.85 }}>{item.sub}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="modal-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="modal-dialog"
            style={{ maxWidth: '720px', padding: '16px' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--txt)' }}>{selectedImage.title}</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mut)' }}
              >
                <X size={20} />
              </button>
            </div>
            <img 
              src={selectedImage.img} 
              alt={selectedImage.title} 
              style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'cover', borderRadius: '16px' }}
            />
            <p style={{ marginTop: '12px', color: 'var(--mut)', fontSize: '13.5px' }}>{selectedImage.sub}</p>
          </div>
        </div>
      )}
    </section>
  );
}
