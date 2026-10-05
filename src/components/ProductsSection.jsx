import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ShoppingCart, 
  MessageCircle, 
  Sparkles, 
  Tag, 
  ArrowRight,
  Fish,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { getProducts } from '../services/api';

export default function ProductsSection({ 
  products: initialProducts = [], 
  onAddToCart, 
  lang = 'id',
  onOpenCart,
  onNavigate 
}) {
  const [productList, setProductList] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState('initial');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Fetch dynamically from Laravel REST API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadApiProducts() {
      try {
        setLoading(true);
        const result = await getProducts();
        if (isMounted && result && Array.isArray(result.data) && result.data.length > 0) {
          setProductList(result.data);
          setDataSource(result.source);
        }
      } catch (err) {
        console.warn('Failed loading products from API, staying on local catalog:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadApiProducts();
    return () => { isMounted = false; };
  }, []);

  // Sync if parent updates products
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0 && productList.length === 0) {
      setProductList(initialProducts);
    }
  }, [initialProducts]);

  const categories = ['Semua', 'Ikan Konsumsi', 'Olahan Siap Masak', 'Benih Unggul', 'Peralatan Bioflok', 'Perangkat IoT'];

  const filteredProducts = selectedCategory === 'Semua' 
    ? productList 
    : productList.filter(p => {
        const cat = p.kategori || p.category || '';
        return cat.toLowerCase().includes(selectedCategory.toLowerCase()) || 
               (selectedCategory === 'Ikan Konsumsi' && (cat.includes('Segar') || cat.includes('Konsumsi')));
      });

  const formatRupiah = (val) => {
    return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
  };

  const handleOrderWhatsApp = (product) => {
    const text = encodeURIComponent(`Halo Admin NilaFarm, saya ingin memesan produk "${product.nama}" (${formatRupiah(product.harga)} ${product.satuan}). Mohon info ketersediaan stok hari ini dan jadwal pengiriman.`);
    window.open(`https://wa.me/6281382570406?text=${text}`, '_blank');
  };

  return (
    <section 
      id="produk" 
      style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '70px 24px 50px',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '1.8px', 
              textTransform: 'uppercase', 
              color: '#2483B3',
              background: 'rgba(36, 131, 179, 0.1)',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(36, 131, 179, 0.2)'
            }}
          >
            {lang === 'en' ? 'Fresh Harvest Catalog' : 'Katalog Panen Nila Bioflok'}
          </span>

          {dataSource === 'api' && (
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 10px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Data tersinkronisasi langsung dari Laravel REST API"
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              API Connected
            </span>
          )}
        </div>

        <h2 
          style={{ 
            fontSize: 'clamp(28px, 4vw, 42px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.8px',
            lineHeight: 1.2
          }}
        >
          {lang === 'en' ? 'Fresh Tilapia & Biofloc Equipment' : 'Panen Segar Harian & Perlengkapan Kolam'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15.5px', marginTop: '12px', lineHeight: 1.6 }}>
          {lang === 'en'
            ? 'Order directly from our sustainable biofloc aquaculture farm. Guaranteed live arrival and freshest quality.'
            : 'Dipanen langsung dari kolam bioflok Sumedang setiap pagi. Daging manis padat bebas bau lumpur, dengan produk utama Ikan Nila Segar hanya Rp 35.000/kg.'}
        </p>

        {/* Category Pills Filter */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginTop: '26px' 
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected ? '1.5px solid #2483B3' : '1px solid var(--border)',
                  background: isSelected ? '#2483B3' : 'var(--card2)',
                  color: isSelected ? '#ffffff' : 'var(--txt)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 12px rgba(36, 131, 179, 0.3)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid with Modern Hover Scale & Soft Shadow */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(285px, 100%), 1fr))',
          gap: '24px'
        }}
      >
        {filteredProducts.map((p) => {
          const isMainProduct = p.nama.toLowerCase().includes('nila segar') || p.id === 1 || p.is_main;
          const displayImg = p.img || (p.image_url ? `/${p.image_url.replace(/^\//, '')}` : '/assets/ikan-nila-bioflok.png');

          return (
            <div
              key={p.id}
              className="product-card group"
              style={{
                background: 'var(--card)',
                borderRadius: '20px',
                border: isMainProduct 
                  ? '2px solid #82D7E1' 
                  : '1px solid var(--border)',
                boxShadow: isMainProduct 
                  ? '0 8px 24px rgba(36, 131, 179, 0.16)' 
                  : '0 4px 16px rgba(22, 54, 101, 0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = isMainProduct 
                  ? '0 16px 36px rgba(36, 131, 179, 0.30)' 
                  : '0 12px 28px rgba(22, 54, 101, 0.14)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = isMainProduct 
                  ? '0 8px 24px rgba(36, 131, 179, 0.16)' 
                  : '0 4px 16px rgba(22, 54, 101, 0.06)';
              }}
            >
              {/* Main Product Ribbon */}
              {isMainProduct && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
                    color: '#ffffff',
                    border: '1px solid #82D7E1',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.4px',
                    zIndex: 3,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={12} color="#82D7E1" />
                  <span>PRODUK UTAMA • BEST SELLER</span>
                </div>
              )}

              {/* Product Image Box */}
              <div 
                style={{ 
                  height: '210px', 
                  position: 'relative', 
                  overflow: 'hidden',
                  background: 'var(--card2)'
                }}
              >
                <img 
                  src={displayImg} 
                  alt={p.nama}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/products/nila-segar.jpg';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                
                {/* Category Chip */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(14, 36, 64, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#82D7E1',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {p.kategori || 'Nila Farm'}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 
                  style={{ 
                    fontSize: '17px', 
                    fontWeight: 800, 
                    color: 'var(--txt)', 
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}
                >
                  {p.nama}
                </h3>

                <p 
                  style={{ 
                    fontSize: '13px', 
                    color: 'var(--mut)', 
                    lineHeight: 1.55,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1
                  }}
                >
                  {p.desk}
                </p>

                {/* Price Display in Rupiah (Rp) */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '4px',
                    marginBottom: '16px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border)'
                  }}
                >
                  <span 
                    style={{ 
                      fontSize: '22px', 
                      fontWeight: 800, 
                      color: isMainProduct ? '#2483B3' : 'var(--p)',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {formatRupiah(p.harga)}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', fontWeight: 600 }}>
                    {p.satuan || '/kg'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(p);
                    }}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #163665 0%, #2483B3 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 3px 10px rgba(36, 131, 179, 0.25)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 5px 16px rgba(36, 131, 179, 0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(36, 131, 179, 0.25)';
                    }}
                  >
                    <ShoppingCart size={15} />
                    <span>+ Keranjang</span>
                  </button>

                  <button
                    onClick={() => handleOrderWhatsApp(p)}
                    title="Pesan Langsung via WhatsApp"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10b981',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#10b981';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
                      e.currentTarget.style.color = '#10b981';
                    }}
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA linking to full dedicated page */}
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button
          onClick={() => onNavigate ? onNavigate('produk') : (window.location.href = '/produk')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.9rem 2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.15))',
            border: '1.5px solid rgba(6,182,212,0.4)',
            color: '#38bdf8',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 15px rgba(6,182,212,0.15)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4, #10b981)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.15))';
            e.currentTarget.style.color = '#38bdf8';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(6,182,212,0.15)';
          }}
        >
          <span>Buka Katalog Lengkap Semua Produk (Filter & Pencarian)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
