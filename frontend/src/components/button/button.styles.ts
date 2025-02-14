import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-block'
};

export const baseStyle = (isPressed: boolean): CSSProperties => ({
  position: 'absolute',
  width: '100%',
  backgroundColor: '#4a4a4a',
  borderRadius: '12px',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  top: '4px',
  height: isPressed ? 'calc(100% - 4px)' : '100%'
});

export const buttonStyle = (isPressed: boolean): CSSProperties => ({
  position: 'relative',
  padding: '20px 40px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#ff4444',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  transformStyle: 'preserve-3d',
  transform: isPressed ? 'translateY(4px)' : 'translateY(0)'
});