import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Phone, MapPin, Building2, Sparkles } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, selectedProject, onSubmitted }) {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    layanan: 'Pembuatan Kolam Bioflok D4 Komplit',
    lokasi: '',
    pesan: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setFormData(prev => ({
        ...prev,
        layanan: `Inspeksi Proyek: ${selectedProject.title}`,
        pesan: `Saya tertarik dengan detail spesifikasi dan rancangan seperti proyek ${selectedProject.title} (${selectedProject.lokasi}).`
      }));
    } else {
      setFormData({
        nama: '',
        telepon: '',
        layanan: 'Pembuatan Kolam Bioflok D4 Komplit',
        lokasi: '',
        pesan: ''
      });
    }
    setIsSuccess(false);
  }, [selectedProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.telepon) {
      alert('Silakan masukkan nama dan nomor WhatsApp Anda.');
      return;
    }
    setIsSuccess(true);
    if (onSubmitted) {
      onSubmitted(formData);
    }
  };

  return (
    <div 
      className="modal-backdrop-translucent"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(13, 71, 161, 0.16)', // Clean translucent backdrop (NOT black/dark!)
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
    >
      {/* Clean White Modal Dialog with Crisp Dark Text & Soft Gray Borders */}
      <div 
        className="modal-dialog-clean"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0', // Soft gray border
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(13, 71, 161, 0.18), 0 4px 12px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '28px 24px',
          color: '#0f172a' // Crisp dark text
        }}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Title & Subtitle */}
            <div style={{ paddingRight: '36px', marginBottom: '20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#e3f2fd',
                color: '#0d47a1',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.4px',
                marginBottom: '10px',
                textTransform: 'uppercase'
              }}>
                <Sparkles size={14} style={{ color: '#0d47a1' }} />
                <span>Konsultasi &amp; Inspeksi Proyek</span>
              </div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#0c2f66', // Crisp dark text
                lineHeight: 1.25,
                margin: '0 0 6px 0'
              }}>
                {selectedProject ? `Inspeksi Proyek: ${selectedProject.title}` : 'Konsultasi Gratis Konstruksi Bioflok'}
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#475569', // Soft dark text
                lineHeight: 1.5,
                margin: 0
              }}>
                Diskusikan perencanaan konstruksi kolam bundar D4/D3, sistem aerasi, atau integrasi sensor IoT telemetri bersama tim spesialis kami.
              </p>
            </div>

            {/* Selected Project Quick Preview Badge if applicable */}
            {selectedProject && (
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Building2 size={24} style={{ color: '#0d47a1', flexShrink: 0 }} />
                <div style={{ fontSize: '12.5px', lineHeight: 1.4 }}>
                  <div style={{ fontWeight: 700, color: '#0c2f66' }}>{selectedProject.title}</div>
                  <div style={{ color: '#64748b' }}>
                    Lokasi: {selectedProject.lokasi} • Status: {selectedProject.status}
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '5px'
                }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hendra Pratama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1', // Soft gray border
                    backgroundColor: '#ffffff',
                    color: '#0f172a', // Crisp dark text
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div className="form-grid-2col">
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '5px'
                  }}>
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '5px'
                  }}>
                    Kota / Wilayah Lahan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sumedang / Bandung"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '5px'
                }}>
                  Layanan yang Dibutuhkan
                </label>
                <select
                  value={formData.layanan}
                  onChange={(e) => setFormData({ ...formData, layanan: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Pembuatan Kolam Bioflok D4 Komplit">Pembuatan Kolam Bioflok D4 Komplit</option>
                  <option value="Paket Kolam Bioflok D3 Praktis">Paket Kolam Bioflok D3 Praktis</option>
                  <option value="Instalasi Sensor IoT & Otomasi Telemetri">Instalasi Sensor IoT & Otomasi Telemetri</option>
                  <option value="Pengadaan Blueprint & Kalkulator RAB">Pengadaan Blueprint & Kalkulator RAB</option>
                  <option value="Survei Lahan & Estimasi Konstruksi">Survei Lahan & Estimasi Konstruksi</option>
                  <option value="Pengadaan Benih Nila & Pakan Grade A">Pengadaan Benih Nila & Pakan Grade A</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '5px'
                }}>
                  Catatan Proyek / Pertanyaan
                </label>
                <textarea
                  rows="3"
                  placeholder="Jelaskan perkiraan luas lahan, jumlah kolam yang ingin dibuat, atau kendala budidaya saat ini..."
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '13.5px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11.5px',
                color: '#64748b'
              }}>
                <ShieldCheck size={16} style={{ color: '#0d47a1', flexShrink: 0 }} />
                <span>Konsultasi 100% gratis &amp; data kontak Anda aman terlindungi.</span>
              </div>

              {/* ROYAL BLUE ACTION BUTTON: Crisp White text, NO ORANGE */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#0d47a1', // Royal Blue action button
                    backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                    border: 'none',
                    color: '#ffffff', // Crisp white text
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(13, 71, 161, 0.32)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Send size={16} />
                  <span>Kirim Permintaan Konsultasi</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              color: '#0d47a1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle2 size={36} style={{ color: '#0d47a1' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0c2f66', marginBottom: '8px' }}>
              Permintaan Konsultasi Terkirim!
            </h3>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 20px auto' }}>
              Terima kasih, <b>{formData.nama}</b>. Konsultan teknis CONTRACTOR.HUB akan segera menghubungi Anda melalui nomor WhatsApp <b>{formData.telepon}</b> dalam waktu 1x24 jam kerja.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '11px 24px',
                borderRadius: '12px',
                backgroundColor: '#0d47a1',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                fontSize: '13.5px',
                cursor: 'pointer'
              }}
            >
              Tutup Jendela
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
