import React, { useState, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  clearable?: boolean;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  clearable = false,
  value = '',
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        {...props}
        type={inputType}
        value={value}
        onChange={handleChange}
        style={{ paddingRight: type === 'password' || clearable ? 32 : undefined }}
      />
      {type === 'password' && (
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((v) => !v)}
          style={{
            position: 'absolute',
            right: clearable ? 32 : 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            color: '#888',
          }}
        >
          {showPassword ? (
            // Eye open
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C2.73 16.11 7 20 12 20C17 20 21.27 16.11 23 12C21.27 7.89 17 4 12 4C7 4 2.73 7.89 1 12Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3.5" stroke="#888" strokeWidth="1.5"/>
            </svg>
            
          ) : (
            // Eye closed 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7 20 2.73 16.11 1 12C1.73 10.19 2.91 8.6 4.44 7.36M9.53 9.53C10.01 9.19 10.5 9 11 9C12.66 9 14 10.34 14 12C14 12.5 13.81 12.99 13.47 13.47M9.53 9.53L3 3M9.53 9.53L13.47 13.47M13.47 13.47L21 21" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C20.27 13.81 19.09 15.4 17.56 16.64M15 12C15 13.66 13.66 15 12 15C11.5 15 11.01 14.81 10.53 14.47" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      )}
      {clearable && value && (
        <button
          type="button"
          aria-label="Clear input"
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontSize: 16,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
