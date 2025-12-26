import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // ms
  onClose?: () => void;
  closable?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'error',
  duration = 3000,
  onClose,
  closable = false,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!closable) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, closable]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        minWidth: 240,
        padding: '16px 24px',
        borderRadius: 8,
        color: '#fff',
        background:
          type === 'success'
            ? '#2e7d32'
            : type === 'error'
            ? '#b71c1c' 
            : type === 'warning'
            ? '#a04000' 
            : '#0d47a1', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 9999,
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span>{message}</span>
      {closable && (
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};
