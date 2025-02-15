import React from 'react';
import {
    cartoonBrowserBoxStyles,
    browserHeaderStyles,
    browserButtonsStyles,
    browserButtonCloseStyles,
    browserButtonMinimizeStyles,
    browserButtonMaximizeStyles,
    browserContentStyles,
    copyButtonStyles
  } from './box.styles';

interface CartoonBrowserBoxProps {
  fact: string;
}

const CartoonBrowserBox: React.FC<CartoonBrowserBoxProps> = ({ fact }) => {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(fact)
          .then(() => {
            alert('Fact copied to clipboard!'); 
          })
          .catch((err) => {
            console.error('Failed to copy fact: ', err);
          });
      };
    return (
      <div style={cartoonBrowserBoxStyles}>
        <div style={browserHeaderStyles}>
          <div style={browserButtonsStyles}>
            <span style={browserButtonCloseStyles}></span>
            <span style={browserButtonMinimizeStyles}></span>
            <span style={browserButtonMaximizeStyles}></span>
          </div>
        </div>
        <div style={browserContentStyles}>
          <p>{fact}</p>
          <button style={copyButtonStyles} onClick={handleCopyClick}>
          Copy Fact
        </button>
        </div>
      </div>
    );
  };

export default CartoonBrowserBox;