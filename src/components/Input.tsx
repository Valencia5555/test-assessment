import React, { useState, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Show clear button */
  clearable?: boolean;
  /** Input value */
  value?: string;
  /** Input type (text, password, number, etc.) */
  type?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Optional style overrides */
  style?: React.CSSProperties;
}

/**
 * Primary UI input component for user interaction
 */


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
    <div className={styles.inputRoot} style={props.style}>
      <input
        {...props}
        type={inputType}
        value={value}
        onChange={handleChange}
        className={styles.inputField}
      />
      {type === 'password' && (
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((v) => !v)}
          className={
            styles.iconBtn + ' ' + (clearable ? styles.eyeBtn : styles.eyeBtn + ' ' + styles['eyeBtn'] + ' ' + styles['eyeBtn'] + ' ' + styles['noClear'])
          }
          style={clearable ? undefined : { right: -45 }}
        >
          {showPassword ? (
            // Eye open
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C2.73 16.11 7 20 12 20C17 20 21.27 16.11 23 12C21.27 7.89 17 4 12 4C7 4 2.73 7.89 1 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7"/>
            </svg>
          ) : (
            // Eye closed
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7 20 2.73 16.11 1 12C1.73 10.19 2.91 8.6 4.44 7.36M9.53 9.53C10.01 9.19 10.5 9 11 9C12.66 9 14 10.34 14 12C14 12.5 13.81 12.99 13.47 13.47M9.53 9.53L3 3M9.53 9.53L13.47 13.47M13.47 13.47L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C20.27 13.81 19.09 15.4 17.56 16.64M15 12C15 13.66 13.66 15 12 15C11.5 15 11.01 14.81 10.53 14.47" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      )}
      {clearable && value && (
        <button
          type="button"
          aria-label="Clear input"
          onClick={handleClear}
          className={styles.iconBtn + ' ' + styles.clearBtn}
        >
          ×
        </button>
      )}
    </div>
  );
};
