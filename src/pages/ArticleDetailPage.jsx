import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  MessageCircle, 
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function ArticleDetailPage({ 
  articleId, 
  articles = [], 
  onNavigate, 
  onShowToast, 
  lang = 'id' 
}) {
  // Find target article or fallback to first
  const article = articles.find(a => a.id === articleId) || articles[0];

  // Forum Comments State (loaded from localStorage or default comments)
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem(`nilafarm_comments_${article?.id}`);
      if (saved) return JSON.parse(saved);
      return article?.comments || [];
    } catch {
      return article?.comments || [];
    }
  });

  // Comment Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync comments when article changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`nilafarm_comments_${article?.id}`);
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments(article?.comments || []);
      }
    } catch {
      setComments(article?.comments || []);
    }
    setForm({ name: '', email: '', message: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article?.id]);

  if (!article) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center', background: 'var(--bg)', color: 'var(--txt)' }}>
        <h2>Artikel tidak ditemukan</h2>
        <button onClick={() => onNavigate('artikel')} className="btn-primary" style={{ marginTop: '16px' }}>
          Kembali ke Daftar Artikel
        </button>
      </div>
    );
  }

  // Calculate Previous and Next Articles
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Handle Share to WhatsApp
  const handleShareWa = () => {
    const text = encodeURIComponent(
      `Baca artikel menarik dari NilaFarm: "${article.judul}"\n\nPelajari panduan lengkap budidaya nila bioflok di: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Direct WhatsApp Question to Hamdan Russ
  const handleAskOwnerWa = () => {
    const text = encodeURIComponent(
      `Halo Pak Hamdan Russ, saya membaca artikel Anda tentang "${article.judul}" dan ingin berdiskusi lebih lanjut mengenai penerapannya di kolam saya.`
    );
    window.open(`https://wa.me/6281382570406?text=${text}`, '_blank');
  };

  // Submit comment to forum
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      if (onShowToast) onShowToast('Harap isi Nama, Email, dan Pesan Diskusi.', 'bad');
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newComment = {
      id: 'c_' + Date.now(),
      nama: form.name.trim(),
      email: form.email.trim(),
      tgl: dateStr,
      pesan: form.message.trim()
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(`nilafarm_comments_${article.id}`, JSON.stringify(updated));
    } catch {}

    setForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    if (onShowToast) onShowToast('Komentar Anda berhasil dipublikasikan di forum diskusi!', 'ok');
  };

  return (
    <div style={{ paddingTop: '86px', minHeight: '100vh', background: 'var(--bg)', color: 'var(--txt)' }}>
      {/* Top Breadcrumb & Header Bar */}
      <section style={{ background: 'var(--card2)', borderBottom: '1px solid var(--border)', padding: '24px 20px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          {/* Breadcrumb Links */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px', color: 'var(--mut)', marginBottom: '16px' }}>
            <button 
              onClick={() => onNavigate('beranda')}
              style={{ background: 'none', border: 'none', color: 'var(--b)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
            >
              Beranda
            </button>
            <ChevronRight size={13} />
            <button 
              onClick={() => onNavigate('artikel')}
              style={{ background: 'none', border: 'none', color: 'var(--b)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
            >
              Artikel & Edukasi
            </button>
            <ChevronRight size={13} />
            <span style={{ color: 'var(--txt)', fontWeight: 600, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {article.judul}
            </span>
          </div>

          {/* Category Tag & Meta */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <span 
              style={{
                background: 'rgba(33, 150, 243, 0.14)',
                color: 'var(--b)',
                fontSize: '11.5px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Tag size={12} />
              <span>{article.kategori || 'Teknik Bioflok'}</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: 'var(--mut)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} />
                <span>{article.tgl}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} />
                <span>{article.bacaWaktu || '5 menit baca'}</span>
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            style={{
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 800,
              color: 'var(--txt)',
              lineHeight: 1.3,
              letterSpacing: '-0.4px',
              marginBottom: '16px'
            }}
          >
            {article.judul}
          </h1>

          {/* Author Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2196f3, #0d47a1)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                HR
              </div>
              <div>
                <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block' }}>
                  {article.penulis || 'Hamdan Russ'}
                </b>
                <small style={{ color: 'var(--mut)', fontSize: '11.5px' }}>
                  Praktisi Bioflok & Founder NilaFarm Sumedang
                </small>
              </div>
            </div>

            <button
              onClick={handleShareWa}
              style={{
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: '#25d366',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12.5px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Share2 size={14} />
              <span>Bagikan Artikel</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Reading Container */}
      <article style={{ maxWidth: '920px', margin: '0 auto', padding: '36px 20px 60px' }}>
        {/* Cover Image */}
        <div 
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            background: 'var(--card)'
          }}
        >
          <img 
            src={article.img} 
            alt={article.judul}
            style={{
              width: '100%',
              maxHeight: '440px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Key Takeaways Box */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div 
            className="glass-panel"
            style={{
              borderRadius: '16px',
              padding: '24px 26px',
              marginBottom: '36px',
              borderLeft: '4px solid var(--b)',
              background: 'var(--card2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--b)', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>
              <Sparkles size={18} />
              <span>POIN PENTING & RINGKASAN PRAKTEK</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.keyPoints.map((pt, pIdx) => (
                <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--txt)', lineHeight: 1.55 }}>
                  <CheckCircle2 size={16} color="var(--ok)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Article Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '16px', lineHeight: 1.85, color: 'var(--txt)' }}>
          {Array.isArray(article.isi) ? (
            article.isi.map((paragraph, idx) => (
              <p key={idx} style={{ margin: 0, textAlign: 'justify' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p style={{ margin: 0 }}>{article.isi}</p>
          )}
        </div>

        {/* Author Bio Box */}
        <div 
          className="glass-panel"
          style={{
            marginTop: '45px',
            padding: '26px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'var(--card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '540px' }}>
            <div 
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2196f3, #0d47a1)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              HR
            </div>
            <div>
              <b style={{ fontSize: '15px', color: 'var(--txt)', display: 'block', marginBottom: '4px' }}>
                Hamdan Russ
              </b>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--mut)', lineHeight: 1.5 }}>
                Pemilik NilaFarm Sumedang dan praktisi budidaya bioflok intensif berbasis otomasi sensor IoT. Berpengalaman mendampingi puluhan peternak pemula di Jawa Barat.
              </p>
            </div>
          </div>

          <button
            onClick={handleAskOwnerWa}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(37, 211, 102, 0.3)'
            }}
          >
            <MessageCircle size={16} />
            <span>Tanya Langsung ke Penulis</span>
          </button>
        </div>

        {/* ========================================================
            PREV & NEXT NAVIGATION CARDS
           ======================================================== */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '36px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border)'
          }}
        >
          {/* Previous Article Button */}
          {prevArticle ? (
            <div 
              onClick={() => onNavigate('artikel-detail', prevArticle.id)}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.25s ease'
              }}
            >
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--card2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--b)'
                }}
              >
                <ArrowLeft size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <small style={{ color: 'var(--mut)', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                  Artikel Sebelumnya
                </small>
                <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                  {prevArticle.judul}
                </b>
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Next Article Button */}
          {nextArticle ? (
            <div 
              onClick={() => onNavigate('artikel-detail', nextArticle.id)}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                <small style={{ color: 'var(--mut)', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                  Artikel Selanjutnya
                </small>
                <b style={{ fontSize: '13.5px', color: 'var(--txt)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                  {nextArticle.judul}
                </b>
              </div>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--card2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--b)'
                }}
              >
                <ArrowRight size={18} />
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Back to all articles */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => onNavigate('artikel')}
            className="btn-ghost"
            style={{ padding: '8px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BookOpen size={15} />
            <span>Lihat Semua Artikel Lainnya</span>
          </button>
        </div>

        {/* ========================================================
            FORUM DISKUSI & CHAT KOMENTAR
           ======================================================== */}
        <section 
          id="forum-diskusi"
          style={{
            marginTop: '56px',
            paddingTop: '36px',
            borderTop: '2px dashed var(--border)'
          }}
        >
          {/* Section Heading */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                  Forum Diskusi & Tanya Jawab
                </h3>
                <small style={{ color: 'var(--mut)', fontSize: '12.5px' }}>
                  {comments.length} diskusi dan pertanyaan peternak
                </small>
              </div>
            </div>

            <span 
              style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: 'var(--b)',
                background: 'var(--card2)',
                padding: '4px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--border)'
              }}
            >
              Komunitas Bioflok
            </span>
          </div>

          {/* Comment Form (Nama, Email, Pesan Chat) */}
          <form 
            onSubmit={handleCommentSubmit}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '20px',
              marginBottom: '36px',
              border: '1px solid var(--border-strong)',
              background: 'var(--card)'
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--txt)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={15} color="var(--b)" />
              <span>Tulis Pertanyaan atau Komentar Anda:</span>
            </div>

            {/* Inputs: Nama & Email */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                gap: '14px',
                marginBottom: '14px'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--mut)', marginBottom: '6px' }}>
                  Nama Lengkap *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--mut)', marginBottom: '6px' }}>
                  Alamat Email (tidak dipublikasikan) *
                </label>
                <input 
                  type="email"
                  required
                  placeholder="Contoh: budi@gmail.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--card2)',
                    color: 'var(--txt)',
                    fontSize: '13.5px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Message Area */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--mut)', marginBottom: '6px' }}>
                Pesan / Pertanyaan Diskusi *
              </label>
              <textarea 
                required
                rows={3}
                placeholder="Tuliskan kendala kolam, takaran pakan, probiotik, atau pengalaman budidaya Anda..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--card2)',
                  color: 'var(--txt)',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                Pertanyaan akan dijawab langsung oleh Tim NilaFarm Sumedang.
              </small>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  padding: '11px 24px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Send size={15} />
                <span>Kirim Komentar Forum</span>
              </button>
            </div>
          </form>

          {/* List of Comments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--mut)', fontSize: '13.5px' }}>
                Belum ada komentar. Jadilah peternak pertama yang memulai diskusi!
              </div>
            ) : (
              comments.map((cm) => {
                const initial = (cm.nama || 'P').charAt(0).toUpperCase();
                return (
                  <div 
                    key={cm.id}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      borderRadius: '18px',
                      background: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {/* User header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--card2)',
                            color: 'var(--b)',
                            fontWeight: 700,
                            fontSize: '13.5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {initial}
                        </div>
                        <div>
                          <b style={{ fontSize: '14px', color: 'var(--txt)', display: 'block' }}>
                            {cm.nama}
                          </b>
                          <small style={{ color: 'var(--mut)', fontSize: '11px' }}>
                            {cm.tgl}
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* User message */}
                    <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--txt)', lineHeight: 1.6, paddingLeft: '46px' }}>
                      {cm.pesan}
                    </p>

                    {/* Admin Response (if any) */}
                    {cm.reply && (
                      <div 
                        style={{
                          marginTop: '14px',
                          marginLeft: '46px',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: 'var(--card2)',
                          borderLeft: '3px solid var(--b)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--b)', marginBottom: '4px' }}>
                          <ShieldCheck size={14} />
                          <span>Tanggapan dari Hamdan Russ (NilaFarm)</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--txt)', lineHeight: 1.55 }}>
                          {cm.reply}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
