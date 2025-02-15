import { CSSProperties } from 'react';

export const cartoonBrowserBoxStyles: CSSProperties = {
  border: '3px solid #000',
  borderRadius: '10px',
  backgroundColor: '#fff',
  width: '80%',
  margin: '10px auto',
  boxShadow: '5px 5px 0px #000',
};

export const browserHeaderStyles: CSSProperties = {
  backgroundColor: '#f1f1f1',
  padding: '5px',
  borderBottom: '2px solid #000',
  display: 'flex',
  justifyContent: 'flex-start',
};

export const browserButtonsStyles: CSSProperties = {
  display: 'flex',
  gap: '5px',
};

export const browserButtonStyles: CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid #000',
};

export const browserButtonCloseStyles: CSSProperties = {
  ...browserButtonStyles,
  backgroundColor: '#ff5f56',
};

export const browserButtonMinimizeStyles: CSSProperties = {
  ...browserButtonStyles,
  backgroundColor: '#ffbd2e',
};

export const browserButtonMaximizeStyles: CSSProperties = {
  ...browserButtonStyles,
  backgroundColor: '#27c93f',
};

export const browserContentStyles: CSSProperties = {
  padding: '10px',
  color: 'black'
};

export const copyButtonStyles: CSSProperties = {
    marginTop: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ff4444',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: '3px 3px 0px #000',
  };