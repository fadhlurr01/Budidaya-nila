import React, { useState } from 'react';
import { 
  Check, 
  ShoppingCart, 
  MessageCircle, 
  Sparkles, 
  Tag, 
  ArrowRight, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Fish
} from 'lucide-react';

export default function ProductsPage({ 
  products, 
  onAddToCart, 
  onOpenCart, 
  onNavigate, 
  lang = 'id' 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Ikan Konsumsi', 'Olahan Siap Masak', 'Benih Unggul', 'Peralatan Bioflok', 'Perangkat IoT'];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'Semua' || p.kategori === selectedCategory;
    const matchesSearch = 
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desk.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatRupiah = (val) => {
    return 'Rp' + Number(val || 0).toLocaleString('id-ID');
  };

  const handleOrderWhatsApp = (product) => {
    const text = encodeURIComponent(
      `Halo Hamdan Russ & Tim NilaFarm, saya ingin memesan "${product.nama}" (${formatRupiah(product.harga)}${product.satuan}). Mohon info stok hari ini dan jadwal pengantaran.`
    );
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
            <span style={{ color: 'var(--txt)', fontWeight: 600 }}>Katalog Produk & Bibit</span>
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
            <Tag size={14} />
            <span>Katalog Siap Jual NilaFarm</span>
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
            Panen Segar Setiap Pagi, Siap Kirim
          </h1>

          <p 
            style={{
              fontSize: '16px',
              color: 'var(--mut)',
              maxWidth: '720px',
              margin: '0 auto 28px',
              lineHeight: 1.65
            }}
          >
            Ikan nila hidup langsung dari kolam bioflok Sumedang, fillet vakum higienis, pakan pelet apung FCR 1.2, hingga paket kolam bundar D4/D3 komplit rangka galvanis.
          </p>

          {/* Search Box */}
          <div style={{ maxWidth: '520px', margin: '0 auto 22px', position: 'relative' }}>
            <Search size={18} color="var(--mut)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
            <input 
              type="text"
              placeholder="Cari produk (cth: fillet, benih, pakan, kolam)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 18px 13px 44px',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--txt)',
                fontSize: '14px',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Category Pills Filter */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? '1px solid transparent' : '1px solid var(--border)',
                  background: selectedCategory === cat ? 'var(--grad)' : 'var(--card)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--txt)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 20px 0' }}>
        <div 
          className="glass-panel"
          style={{
            padding: '16px 24px',
            borderRadius: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '16px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fish size={22} color="var(--b)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>Panen Segar Setiap Pagi 06:30</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={22} color="#22c55e" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>Gratis Bersihkan Sisik & Insang</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={22} color="#f59e0b" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>Antar Cepat Area Sumedang & Sekitarnya</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 20px 60px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Tag size={48} color="var(--mut)" style={{ opacity: 0.4, marginBottom: '14px' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--txt)' }}>Produk tidak ditemukan</h3>
            <p style={{ color: 'var(--mut)', fontSize: '14px' }}>Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        ) : (
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
                        height: '200px',
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
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
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
                            background: 'rgba(13, 71, 161, 0.88)',
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px' }}>
                      <span className={`chip ${isOutOfStock ? 'bad' : 'ok'}`}>
                        {isOutOfStock ? 'Stok Habis' : 'Stok Segar Ready'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      style={{ 
                        fontSize: '17.5px', 
                        fontWeight: 700, 
                        color: 'var(--txt)', 
                        marginBottom: '8px',
                        lineHeight: 1.35
                      }}
                    >
                      {p.nama}
                    </h3>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--p)' }}>
                        {formatRupiah(p.harga)}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--mut)', fontWeight: 500 }}>
                        {p.satuan}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '18px' }}>
                      {p.desk}
                    </p>

                    {/* Features list */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(p.feats || []).map((f, fIdx) => (
                        <li 
                          key={fIdx} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            fontSize: '12.5px',
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
                            <Check size={11} strokeWidth={3} />
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
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
        )}

        {/* Quick Cart Banner */}
        <div 
          className="glass-panel"
          style={{
            marginTop: '40px',
            padding: '24px 28px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(33, 150, 243, 0.12)',
                color: 'var(--b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingCart size={22} />
            </div>
            <div>
              <b style={{ fontSize: '15px', color: 'var(--txt)', display: 'block' }}>
                Mau belanja beberapa jenis ikan atau peralatan sekaligus?
              </b>
              <small style={{ color: 'var(--mut)', fontSize: '12.5px' }}>
                Klik tombol "+ Keranjang", lalu checkout satu langkah ke WhatsApp Admin kami.
              </small>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '13.5px' }}
          >
            <span>Buka Keranjang Belanja</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
