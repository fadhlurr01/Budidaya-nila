import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft, MessageCircle, Waves, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d1e34 0%, #163665 50%, #142a47 100%)',
        color: '#f8fafc',
        fontFamily: "'Outfit', 'Poppins', sans-serif"
      }}
    >
      {/* Background Decorative Ripples & Glows */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #82D7E1 0%, #2483B3 70%, transparent 100%)',
          top: '-10%',
          right: '-5%'
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #2483B3 0%, #163665 80%, transparent 100%)',
          bottom: '-10%',
          left: '-5%'
        }}
      />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold tracking-wide mb-6 backdrop-blur-md">
          <Waves size={16} className="text-cyan-400 animate-pulse" />
          <span>404 - HALAMAN TIDAK DITEMUKAN</span>
        </div>

        {/* Big Stylized 404 Number */}
        <div className="relative mb-6 select-none">
          <h1 
            className="text-8xl sm:text-9xl font-extrabold tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, #ffffff 20%, #82D7E1 70%, #2483B3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 40px rgba(36, 131, 179, 0.4)'
            }}
          >
            404
          </h1>
          <div className="text-3xl sm:text-4xl absolute -bottom-2 left-1/2 -translate-x-1/2">
            🐟🌊
          </div>
        </div>

        {/* Descriptive Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Waduh! Sepertinya Anda Terbawa Arus Terlalu Jauh
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Tautan yang Anda tuju mungkin salah ketik, telah diperbarui, atau berada di luar ekosistem kolam budidaya nila kami. Jangan khawatir, mari kembali ke perairan yang tepat.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all hover:scale-[1.02] shadow-sm"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/25"
            style={{
              background: 'linear-gradient(135deg, #2483B3 0%, #163665 100%)',
              border: '1px solid #82D7E1'
            }}
          >
            <Home size={18} className="text-cyan-300" />
            <span>Beranda Utama</span>
          </Link>

          <Link
            to="/produk"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-cyan-400/40 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-200 text-sm font-semibold transition-all hover:scale-[1.02]"
          >
            <ShoppingBag size={18} className="text-cyan-400" />
            <span>Katalog Nila (Rp 35rb)</span>
          </Link>
        </div>

        {/* Footer Support Info */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <a
            href="https://wa.me/6281234567890?text=Halo%20NilaFarm,%20saya%20mengalami%20kendala%20di%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <MessageCircle size={15} className="text-emerald-400" />
            <span>Bantuan WhatsApp Peternak</span>
          </a>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5">
            <HelpCircle size={15} className="text-cyan-400" />
            <span>CS NilaFarm Siap 24/7</span>
          </span>
        </div>
      </div>
    </div>
  );
}
