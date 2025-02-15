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
};

export const hamburgerIconStyles: CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer',
  color: 'white',
};

export const menuStyles: CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
  backgroundColor: '#282c34',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export const menuItemStyles: CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

export const activeMenuItemStyles: CSSProperties = {
  backgroundColor: '#61dafb',
};