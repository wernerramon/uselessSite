import { useState, useCallback, useRef } from 'react';
import { containerStyle, baseStyle, buttonStyle } from './button.styles';

interface CartoonButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  soundUrl?: string;
}

const CartoonButton = ({ onClick, children, disabled, soundUrl }: CartoonButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (soundUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      const audio = new Audio(soundUrl);
      audioRef.current = audio;
      audio.play().catch(error => console.error("Error playing sound:", error));
    }
  }, [soundUrl]);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  }, []);

  const handleClick = useCallback(() => {
    handlePress();
    playSound();
    onClick?.();
  }, [handlePress, onClick, playSound]);

  return (
    <div className="button-container" style={containerStyle}>
      <div 
        className="button-base"
        style={baseStyle(isPressed)}
      />
      
      <button
        onClick={handleClick}
        style={buttonStyle(isPressed)}
        className="cartoon-button"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default CartoonButton;