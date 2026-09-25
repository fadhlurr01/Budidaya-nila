import React from 'react';
import { X, Code, Terminal, Cpu, CheckCircle2, Download, Shield, MessageCircle, PhoneCall, ExternalLink, Sparkles, MapPin } from 'lucide-react';

export default function DevCorpModals({ modalType, onClose, onShowToast }) {
  if (!modalType) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'api':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Dokumentasi REST API Telemetri Kolam
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '16px' }}>
              Kirim data sensor dari hardware custom Anda (ESP32 / Arduino / Raspberry Pi) langsung ke cloud NilaFarm.
            </p>

            <div style={{ background: '#0a1d37', color: '#c7e0ff', padding: '14px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '14px', overflowX: 'auto', maxWidth: '100%' }}>
              <b>POST /api/v1/telemetry</b><br />
              Headers: <code>Authorization: Bearer NF_API_KEY_LIVE</code><br /><br />
              {`{
  "pond_id": "K-A1",
  "temperature": 28.4,
  "ph": 7.20,
  "dissolved_oxygen": 6.4,
  "ammonia": 0.12,
  "water_level": 82
}`}
            </div>

            <div style={{ fontSize: '13px', color: 'var(--txt)' }}>
              <b>Status Respons:</b> <code>200 OK - {"{ status: 'saved', alerts: [] }"}</code>
            </div>
          </div>
        );

      case 'mqtt':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              MQTT Broker Realtime (Publish & Subscribe)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '16px' }}>
              Protokol pesan berbobot ringan untuk komunikasi sensor dan aktuator dua arah latensi rendah.
            </p>

            <div style={{ background: '#0a1d37', color: '#c7e0ff', padding: '14px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '14px', overflowX: 'auto', maxWidth: '100%' }}>
              <b>Broker:</b> mqtt.nilafarm.id (Port 8883 - TLS / SSL)<br />
              <b>Topic Telemetri:</b> <code>nilafarm/pond/{'{pond_id}'}/telemetry</code><br />
              <b>Topic Kontrol Aktuator:</b> <code>nilafarm/actuator/{'{device_id}'}/command</code><br />
              <b>QoS:</b> 1 (At least once delivery)
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--mut)' }}>
              Aktuator aerator dan pompa akan otomatis mendengarkan perintah darurat jika DO terdeteksi di bawah 4.0 mg/L.
            </p>
          </div>
        );

      case 'firmware':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Firmware Resmi ESP32 NilaFarm Node
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '16px' }}>
              Flash biner firmware ke mikrokontroler ESP32 DevKit V1 dengan fitur auto-reconnect WiFi & sleep mode hemat daya.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div>
                  <b style={{ fontSize: '13.5px', display: 'block' }}>ESP32-MultiProbe-v1.9.0.bin</b>
                  <small style={{ color: 'var(--mut)' }}>Mendukung probe pH, DO analog, DS18B20, dan sensor level</small>
                </div>
                <button
                  onClick={() => onShowToast('Firmware v1.9.0 mulai diunduh (demo)', 'ok')}
                  className="btn-primary"
                  style={{ padding: '7px 12px', fontSize: '12px' }}
                >
                  <Download size={13} />
                  <span>Unduh</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div>
                  <b style={{ fontSize: '13.5px', display: 'block' }}>ESP32-AutoFeeder-v1.2.0.bin</b>
                  <small style={{ color: 'var(--mut)' }}>Kontrol motor servo sebar pakan dengan jadwal RTC</small>
                </div>
                <button
                  onClick={() => onShowToast('Firmware Auto-Feeder v1.2.0 mulai diunduh (demo)', 'ok')}
                  className="btn-primary"
                  style={{ padding: '7px 12px', fontSize: '12px' }}
                >
                  <Download size={13} />
                  <span>Unduh</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Status Sistem & Layanan Cloud
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '16px' }}>
              Semua server cloud telemetri, gateway lokal Sumedang, dan bot WhatsApp beroperasi normal (Uptime 99.98%).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px' }}>Gateway Tambak Sumedang (GW-01)</span>
                <span className="chip ok">Operasional (Latensi 42ms)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px' }}>MQTT Message Broker</span>
                <span className="chip ok">Operasional</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--card2)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px' }}>WhatsApp Alert Engine</span>
                <span className="chip ok">Operasional</span>
              </div>
            </div>
          </div>
        );

      case 'tentang':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Profil Usaha Budidaya NilaFarm
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.65, marginBottom: '14px' }}>
              NilaFarm didirikan oleh Hamdan Russ di Sumedang, Jawa Barat. Kami memadukan kearifan lokal peternakan ikan air tawar dengan sistem bioflok berteknologi sensor IoT modern.
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.65 }}>
              Fokus utama kami adalah menjaga rantai kesegaran ikan nila dari kolam langsung ke meja makan konsumen, meminimalisir waktu transit sehingga kualitas rasa, tekstur kenyal, dan nutrisi daging tetap utuh.
            </p>
          </div>
        );

      case 'privasi':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Kebijakan Privasi Data
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.65 }}>
              Data kontak pelanggan (nama, nomor WhatsApp, alamat pengiriman) yang Anda cantumkan hanya digunakan semata-mata untuk koordinasi pengantaran pesanan ikan nila dan tidak pernah diperjualbelikan kepada pihak ketiga manapun.
            </p>
          </div>
        );

      case 'syarat':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', marginBottom: '8px' }}>
              Syarat & Ketentuan Layanan
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--mut)', lineHeight: 1.65 }}>
              Pemesanan ikan nila konsumsi segar dilakukan dengan sistem panen pagi same-day. Garansi ikan hidup 3 hari berlaku untuk benih unggul ukuran 5-8 cm dengan syarat pembudidaya menerapkan SOP aklimatisasi suhu yang telah kami sediakan.
            </p>
          </div>
        );

      case 'konsultasi':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(33, 150, 243, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} color="var(--b)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--txt)', margin: 0 }}>
                Konsultasi NilaFarm Sumedang
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '18px', lineHeight: 1.55 }}>
              Diskusikan kebutuhan budidaya bioflok, paket kolam, bibit unggul, maupun pemesanan ikan segar langsung dengan tim kami:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {/* Option 1: Owner */}
              <div style={{ padding: '14px', background: 'var(--card2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--b)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Teknis & Budidaya Bioflok IoT
                    </span>
                    <b style={{ fontSize: '14.5px', color: 'var(--txt)', display: 'block', marginTop: '2px' }}>
                      Hamdan Russ (Owner & Pengelola Farm)
                    </b>
                    <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                      Konsultasi SOP probiotik, pembuatan kolam D4, uniring, dan sensor IoT
                    </small>
                  </div>
                </div>
                <a
                  href="https://wa.me/6281382570406?text=Halo%20Pak%20Hamdan,%20saya%20ingin%20konsultasi%20mengenai%20budidaya%20nila%20bioflok%20NilaFarm"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '12.5px', textDecoration: 'none', borderRadius: '10px', marginTop: '6px' }}
                >
                  <MessageCircle size={14} />
                  <span>Chat WhatsApp Pak Hamdan</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Option 2: CS */}
              <div style={{ padding: '14px', background: 'var(--card2)', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Pesanan Segar & Pengantaran
                    </span>
                    <b style={{ fontSize: '14.5px', color: 'var(--txt)', display: 'block', marginTop: '2px' }}>
                      Customer Service NilaFarm
                    </b>
                    <small style={{ color: 'var(--mut)', fontSize: '12px' }}>
                      Pemesanan ikan nila hidup/fillet, jadwal panen same-day & kurir logistik
                    </small>
                  </div>
                </div>
                <a
                  href="https://wa.me/6282122319510?text=Halo%20Admin%20NilaFarm,%20saya%20ingin%20konsultasi%20pemesanan%20ikan%20nila"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '12.5px', textDecoration: 'none', borderRadius: '10px', marginTop: '6px', background: '#16a34a', color: '#fff', fontWeight: 700 }}
                >
                  <PhoneCall size={14} />
                  <span>Chat WhatsApp CS Pemesanan</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Option 3: Kunjungan Farm */}
              <div style={{ padding: '12px 14px', background: 'var(--card)', borderRadius: '12px', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--b)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '12px', color: 'var(--txt)', lineHeight: 1.4 }}>
                  <b>Lokasi Farm:</b> Jl. Raya Sumedang - Cimalaka KM 4, Sumedang, Jawa Barat. Terbuka untuk kunjungan silaturahmi & belajar langsung.
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="modal-dialog"
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <button 
            onClick={onClose}
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

        {renderContent()}

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-ghost">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
