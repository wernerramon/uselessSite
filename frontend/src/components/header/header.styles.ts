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
};

export const hamburgerIconStyles: CSSProperties = {
  fontSize: '24px',
  cursor: 'pointer',
  color: 'white',
  zIndex: 1001,
};

export const menuStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '200px',
  height: '100vh',
  backgroundColor: '#282c34',
  padding: '60px 20px 20px 20px',
  boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
  transform: 'translateX(-100%)', 
  transition: 'transform 0.3s ease', 
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
  backgroundColor: '#ff4444',
};