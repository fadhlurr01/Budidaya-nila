import React, { useState } from 'react';
import { 
  Check, 
  ShoppingCart, 
  MessageCircle, 
  Sparkles, 
  Tag,
  ArrowRight
} from 'lucide-react';

export default function ProductsSection({ 
  products, 
  onAddToCart, 
  lang = 'id',
  onOpenCart 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Ikan Konsumsi', 'Olahan Siap Masak', 'Benih Unggul', 'Peralatan Bioflok', 'Perangkat IoT'];

  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(p => p.kategori === selectedCategory || (selectedCategory === 'Perangkat IoT' && p.kategori === 'Perangkat IoT'));

  const formatRupiah = (val) => {
    return 'Rp' + Number(val || 0).toLocaleString('id-ID');
  };

  const handleOrderWhatsApp = (product) => {
    const text = encodeURIComponent(`Halo Hamdan Russ / Admin NilaFarm, saya ingin memesan "${product.nama}" (${formatRupiah(product.harga)}${product.satuan}). Mohon info stok hari ini dan jadwal pengiriman.`);
    window.open(`https://wa.me/6281382570406?text=${text}`, '_blank');
  };

  const getProductImage = (p) => {
    if (p.img) return p.img;
    const map = {
      'p1': '/assets/products/nila-segar.jpg',
      'p2': '/assets/products/nila-fillet.jpg',
      'p3': '/assets/products/benih-nila.jpg',
      'p4': '/assets/products/kolam-d4.jpg',
      'p5': '/assets/products/sensor-iot.jpg',
      'p6': '/assets/products/auto-feeder.jpg',
      'p7': '/assets/products/nila-bumbu.jpg',
      'p8': '/assets/products/pakan-nila.jpg',
      'p9': '/assets/products/probiotik-bioflok.jpg',
      'p10': '/assets/products/kolam-d3.jpg'
    };
    return map[p.id] || '/assets/products/nila-segar.jpg';
  };

  return (
    <section 
      id="produk" 
      style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 20px 40px' 
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
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
          {lang === 'en' ? 'Fresh Harvest Catalog' : 'Katalog Siap Jual'}
        </p>
        <h2 
          style={{ 
            fontSize: 'clamp(26px, 3.5vw, 38px)', 
            fontWeight: 800, 
            color: 'var(--txt)',
            letterSpacing: '-0.5px'
          }}
        >
          {lang === 'en' ? 'Panen Segar Setiap Pagi' : 'Panen Segar Setiap Pagi, Siap Dipesan'}
        </h2>
        <p style={{ color: 'var(--mut)', fontSize: '15px', marginTop: '12px' }}>
          {lang === 'en'
            ? 'Directly harvested from our biofloc ponds in Sumedang. Limited daily stock — first come, first served.'
            : 'Dipanen langsung dari kolam bioflok kami setiap pagi. Stok harian terjaga kesegarannya.'}
        </p>

        {/* Category Pills Filter */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginTop: '24px' 
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'transparent' : 'var(--border-strong)',
                background: selectedCategory === cat ? 'var(--grad)' : 'var(--card)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--txt)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat ? '0 4px 12px rgba(33, 150, 243, 0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '24px'
        }}
      >
        {filteredProducts.map((p) => {
          const isPop = p.pop;
          const isOutOfStock = p.stok === 'habis';

          return (
            <div 
              key={p.id}
              className="glass-panel product-card-hover"
              style={{
                padding: '22px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isPop ? '2px solid var(--b)' : '1px solid var(--border)',
                background: isPop 
                  ? 'linear-gradient(180deg, var(--card2) 0%, var(--card) 40%)' 
                  : 'var(--card)',
                boxShadow: isPop ? '0 12px 34px rgba(33, 150, 243, 0.2)' : 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isPop && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: 'var(--grad)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 2
                  }}
                >
                  <Sparkles size={12} />
                  <span>Paling Laris</span>
                </div>
              )}

              <div>
                {/* Product Image Thumbnail */}
                <div 
                  style={{
                    width: '100%',
                    height: '190px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    background: 'var(--card2)',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={getProductImage(p)} 
                    alt={p.nama}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.35s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    loading="lazy"
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px'
                    }}
                  >
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: '#ffffff',
                        background: 'rgba(13, 71, 161, 0.85)',
                        backdropFilter: 'blur(4px)',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {p.kategori || 'Produk Farm'}
                    </span>
                  </div>
                </div>

                {/* Stock Tag */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
                  <span className={`chip ${isOutOfStock ? 'bad' : 'ok'}`}>
                    {isOutOfStock ? 'Stok Habis' : 'Stok Segar Ready'}
                  </span>
                </div>

                {/* Product Title */}
                <h3 
                  style={{ 
                    fontSize: '17.5px', 
                    fontWeight: 700, 
                    color: 'var(--txt)', 
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}
                >
                  {p.nama}
                </h3>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--p)' }}>
                    {formatRupiah(p.harga)}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--mut)', fontWeight: 500 }}>
                    {p.satuan}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {p.desk}
                </p>

                {/* Features List */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {(p.feats || []).map((f, fIdx) => (
                    <li 
                      key={fIdx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '9px',
                        fontSize: '13px',
                        color: 'var(--txt)'
                      }}
                    >
                      <div 
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'rgba(34, 197, 94, 0.14)',
                          color: '#22c55e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onAddToCart(p)}
                  disabled={isOutOfStock}
                  className="btn-ghost"
                  style={{
                    flex: 1,
                    opacity: isOutOfStock ? 0.5 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    padding: '11px',
                    fontSize: '13px'
                  }}
                >
                  <ShoppingCart size={15} />
                  <span>+ Keranjang</span>
                </button>

                <button
                  onClick={() => handleOrderWhatsApp(p)}
                  disabled={isOutOfStock}
                  className="btn-primary"
                  style={{
                    flex: 1.2,
                    opacity: isOutOfStock ? 0.5 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    padding: '11px',
                    fontSize: '13px'
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Pesan via WA</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Quick Banner */}
      <div 
        className="glass-panel"
        style={{
          marginTop: '34px',
          padding: '20px 24px',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(33, 150, 243, 0.12)',
              color: 'var(--b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={20} />
          </div>
          <div>
            <b style={{ fontSize: '14.5px', color: 'var(--txt)', display: 'block' }}>
              Mau beli beberapa item sekaligus?
            </b>
            <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
              Masukkan ke keranjang dan checkout sekali klik via WhatsApp.
            </small>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          <span>Buka Keranjang Belanja</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
