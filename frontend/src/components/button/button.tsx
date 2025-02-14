import { useState, useCallback } from 'react';
import { containerStyle, baseStyle, buttonStyle } from './button.styles';

interface CartoonButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CartoonButton = ({ onClick, children }: CartoonButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  }, []);

  return (
    <div className="button-container" style={containerStyle}>
      <div 
        className="button-base"
        style={baseStyle(isPressed)}
      />
      
      <button
        onClick={() => {
          handlePress();
          onClick?.();
        }}
        style={buttonStyle(isPressed)}
        className="cartoon-button"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {children}
      </button>
    </div>
  );
};

export default CartoonButton;