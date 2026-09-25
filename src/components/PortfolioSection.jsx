import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { MapPin, Eye, Building2, CheckCircle2, Search, ArrowUpRight } from 'lucide-react';

export default function PortfolioSection({ onInspectProject }) {
  return (
    <section id="portofolio" style={{
      padding: '70px 20px',
      maxWidth: '1240px',
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '28px',
      border: '1px solid rgba(13, 71, 161, 0.08)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
          <Building2 size={14} style={{ color: '#0d47a1' }} />
          <span>Rekam Jejak &amp; Galeri Proyek</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(26px, 3.2vw, 38px)',
          fontWeight: 800,
          color: '#071e3d',
          marginBottom: '14px',
          letterSpacing: '-0.3px'
        }}>
          Portofolio Konstruksi Sipil &amp; Bioflok
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#64748b',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Setiap proyek kami rancang dengan presisi teknik sipil tinggi, ketahanan rangka terpal teruji, serta hasil panen nyata dengan FCR terendah.
        </p>
      </div>

      {/* Portfolio Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: '28px'
      }}>
        {PORTFOLIO_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '22px',
              border: '1px solid rgba(13, 71, 161, 0.12)',
              boxShadow: '0 8px 24px rgba(13, 71, 161, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 18px 40px rgba(13, 71, 161, 0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(13, 71, 161, 0.06)';
            }}
          >
            {/* Card Header & Image */}
            <div style={{ position: 'relative', height: '210px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
              <img
                src={proj.image}
                alt={proj.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                color: '#0d47a1',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {proj.category}
              </div>

              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(13, 71, 161, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                {proj.status}
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#64748b',
                fontSize: '12px',
                marginBottom: '6px'
              }}>
                <MapPin size={14} style={{ color: '#0d47a1' }} />
                <span>{proj.lokasi}</span>
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0c2f66',
                lineHeight: 1.35,
                marginBottom: '10px'
              }}>
                {proj.title}
              </h3>

              <p style={{
                fontSize: '13px',
                color: '#475569',
                lineHeight: 1.55,
                marginBottom: '18px',
                flex: 1
              }}>
                {proj.desk}
              </p>

              {/* Stats highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '12px',
                padding: '10px',
                marginBottom: '18px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>FCR Real</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0d47a1' }}>{proj.stats.fcr}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Survival</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#16a34a' }}>{proj.stats.survival}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Siklus</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0c2f66' }}>{proj.stats.harvestDays}</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {proj.tags.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      color: '#475569',
                      backgroundColor: '#e2e8f0',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* INSPECT BUTTON ON PORTFOLIO CARD: Triggers the clean white consultation modal! */}
              <button
                onClick={() => onInspectProject(proj)}
                className="btn-royal"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700
                }}
              >
                <Search size={16} />
                <span>Inspect Detail Proyek</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
