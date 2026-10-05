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
  products = [], 
  onAddToCart, 
  onOpenCart, 
  onNavigate, 
  lang = 'id' 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua Produk');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua Produk', 'Ikan Segar Konsumsi', 'Olahan Siap Masak', 'Bibit Unggul', 'Perlengkapan IoT', 'Paket Kolam'];

  const filteredProducts = (products || []).filter(p => {
    const pCategory = p.kategori || p.category || '';
    const matchesCat = selectedCategory === 'Semua Produk' || 
      pCategory.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Ikan Segar Konsumsi' && (pCategory.includes('Segar') || pCategory.includes('Konsumsi')));
    const pName = p.nama || p.name || '';
    const pDesk = p.desk || p.description || '';
    const matchesSearch = 
      pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pDesk.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const getProductImage = (p) => {
    if (p.img) return p.img.startsWith('/') ? p.img : `/${p.img}`;
    if (p.image_url) return p.image_url.startsWith('/') ? p.image_url : `/${p.image_url}`;
    return '/assets/ikan-nila-bioflok.png';
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
            <span style={{ color: 'var(--txt)', fontWeight: 600 }}>Katalog Produk Nila</span>
          </div>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#e5eff5',
              color: '#163665',
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
            <span>Garansi Ikan Hidup & Panen Segar Setiap Hari</span>
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
            Katalog Produk & Budidaya Nila Modern
          </h1>

          <p 
            style={{
              fontSize: '16px',
              color: 'var(--mut)',
              maxWidth: '680px',
              margin: '0 auto 28px',
              lineHeight: 1.65
            }}
          >
            Pesan bibit Nila Nirwana bersertifikat, ikan nila merah segar bebas bau lumpur, pelet pakan protein 32%, dan paket kolam bioflok siap pasang.
          </p>

          {/* Search Box */}
          <div style={{ maxWidth: '520px', margin: '0 auto 22px', position: 'relative' }}>
            <Search size={18} color="var(--mut)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
            <input 
              type="text"
              placeholder="Cari produk (misal: Bibit Nirwana, Fillet, Pelet, Kolam D3)..."
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
                  padding: '7px 18px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? '1.5px solid #2483B3' : '1px solid var(--border)',
                  background: selectedCategory === cat ? '#2483B3' : 'var(--card)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--txt)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCategory === cat ? '0 3px 12px rgba(36, 131, 179, 0.3)' : 'none'
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
          className="card-solid"
          style={{
            padding: '16px 24px',
            borderRadius: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '16px',
            alignItems: 'center',
            background: 'var(--card2)',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={22} color="#2483B3" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>Pengiriman Bergaransi Hidup Se-Jawa & Bali 🚚</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={22} color="#10b981" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>100% Organik & Bebas Bau Lumpur</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fish size={22} color="#2483B3" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)' }}>Harga Spesial Mulai Rp 35.000/kg Langsung Peternak</span>
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
                  className="card-solid product-card-hover"
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: isPop ? '2px solid var(--b)' : '1.5px solid var(--border)',
                    background: 'var(--card)',
                    boxShadow: isPop ? '0 10px 24px rgba(36, 131, 179, 0.2)' : 'var(--shadow-sm)',
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
                            color: '#82D7E1',
                            background: '#163665',
                            border: '1px solid rgba(130, 215, 225, 0.35)',
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
                        {formatPrice(p.harga)}
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
          className="card-solid"
          style={{
            marginTop: '40px',
            padding: '24px 28px',
            borderRadius: '16px',
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
