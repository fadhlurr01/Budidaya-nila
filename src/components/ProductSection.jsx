import React, { useState } from 'react';
import { TEMPLATE_PRODUCTS } from '../data/mockData';
import { ShoppingCart, Check, FileText, Sparkles, Layers, Box, Cpu } from 'lucide-react';

export default function ProductSection({ onAddToCart, onOpenConsultation }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Template Desain', 'Paket Kolam', 'Perangkat IoT', 'Benih & Pakan'];

  const filteredProducts = selectedCategory === 'Semua'
    ? TEMPLATE_PRODUCTS
    : TEMPLATE_PRODUCTS.filter(p => p.category === selectedCategory);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <section id="produk" style={{
      padding: '70px 20px',
      maxWidth: '1240px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#e3f2fd',
          color: '#0d47a1',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          <Sparkles size={14} style={{ color: '#0d47a1' }} />
          <span>Katalog Resmi &amp; Penawaran Unggulan</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(26px, 3.2vw, 38px)',
          fontWeight: 800,
          color: '#071e3d',
          marginBottom: '14px',
          letterSpacing: '-0.3px'
        }}>
          Template Konstruksi &amp; Produk Siap Pakai
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#64748b',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Dari gambar kerja CAD berstandar teknik sipil, rangka kolam terpal galvanis, hingga perangkat pemantau telemetri IoT multi-parameter.
        </p>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginTop: '28px'
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1.5px solid #0d47a1' : '1px solid rgba(13, 71, 161, 0.2)',
                  backgroundColor: isActive ? '#0d47a1' : '#ffffff',
                  color: isActive ? '#ffffff' : '#0d47a1',
                  boxShadow: isActive ? '0 4px 14px rgba(13, 71, 161, 0.28)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
        gap: '24px'
      }}>
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid rgba(13, 71, 161, 0.12)',
              boxShadow: '0 8px 24px rgba(13, 71, 161, 0.06)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(13, 71, 161, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(13, 71, 161, 0.06)';
            }}
          >
            <div>
              {/* Category & Tag */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0d47a1',
                  backgroundColor: '#e3f2fd',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {prod.category}
                </span>

                {prod.populer && (
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#ffffff',
                    backgroundColor: '#1976d2',
                    padding: '3px 9px',
                    borderRadius: '12px'
                  }}>
                    Paling Diminati
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '17.5px',
                fontWeight: 700,
                color: '#0c2f66',
                lineHeight: 1.35,
                marginBottom: '8px'
              }}>
                {prod.nama}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '13px',
                color: '#475569',
                lineHeight: 1.5,
                marginBottom: '16px'
              }}>
                {prod.desk}
              </p>

              {/* Specs */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 700, color: '#0c2f66', marginBottom: '6px' }}>
                  Spesifikasi Teknis:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {prod.specs.map((sp, idx) => (
                    <div key={idx} style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#0d47a1' }} />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                {prod.feats.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                    <Check size={14} style={{ color: '#0d47a1', flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Button Footer */}
            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid rgba(13, 71, 161, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Harga Resmi</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0c2f66' }}>
                  {formatRupiah(prod.harga)}
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748b' }}>{prod.satuan}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="btn-royal"
                  style={{
                    padding: '9px 14px',
                    fontSize: '12.5px',
                    borderRadius: '10px'
                  }}
                  title="Tambah ke keranjang pesanan"
                >
                  <ShoppingCart size={15} />
                  <span>Pesan</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
