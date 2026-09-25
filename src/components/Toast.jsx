import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onRemoveToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '92vw',
        width: '380px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((t) => {
        const isOk = t.type === 'ok' || t.type === 'success';
        const isBad = t.type === 'bad' || t.type === 'error';
        const Icon = isOk ? CheckCircle2 : isBad ? AlertCircle : Info;
        const iconBg = isOk 
          ? 'linear-gradient(135deg, #22c55e, #15803d)' 
          : isBad 
          ? 'linear-gradient(135deg, #ef4444, #b91c1c)' 
          : 'linear-gradient(135deg, #2196f3, #0d47a1)';

        return (
          <div
            key={t.id}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(13, 71, 161, 0.16)',
              borderRadius: '16px',
              padding: '12px 14px 14px',
              color: '#0c2f66',
              boxShadow: '0 16px 36px rgba(13, 71, 161, 0.22)',
              width: '100%',
              pointerEvents: 'auto',
              overflow: 'hidden',
              animation: 'toastIn 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.15)'
            }}
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: iconBg,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Icon size={17} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: '13px', display: 'block', marginBottom: '2px', color: '#0c2f66' }}>
                {isOk ? 'Berhasil' : isBad ? 'Perhatian' : 'Informasi'}
              </b>
              <span style={{ fontSize: '12px', color: '#5a7cb3', lineHeight: 1.45, display: 'block' }}>
                {t.message}
              </span>
            </div>

            <button
              onClick={() => onRemoveToast(t.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9db4d8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>

            {/* Time progress bar */}
            <div 
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: '3px',
                width: '100%',
                background: isOk ? '#22c55e' : isBad ? '#ef4444' : '#2196f3',
                transformOrigin: 'left',
                animation: 'toastBar 3.6s linear forwards'
              }}
            />
          </div>
        );
      })}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastBar {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
