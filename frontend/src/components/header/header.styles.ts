import { CSSProperties } from 'react';

export const headerStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#282c34',
  padding: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  borderBottom: '2px solid #282c34', 
};

export const hamburgerIconStyles: CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer',
  color: 'white',
  marginRight: '10px', 
};

export const menuStyles: CSSProperties = {
  display: 'flex',
  gap: '20px',
  overflow: 'hidden',
  width: '0', 
  opacity: 0, 
  transition: 'width 0.3s ease, opacity 0.3s ease', 
};

export const menuItemStyles: CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  whiteSpace: 'nowrap', 
};

export const activeMenuItemStyles: CSSProperties = {
  backgroundColor: '#ff4444',
};