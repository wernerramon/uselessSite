import React, {useRef, useCallback, useState, useEffect} from 'react';
import { styles } from './popup.styles';

interface PopupProps {
  text: string;
  onClose: () => void;
  soundUrl?: string;
  openSound?: string;
}

const Popup: React.FC<PopupProps> = ({ text, onClose, soundUrl, openSound }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefOpen = useRef<HTMLAudioElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

    const playOpen = useCallback(() => {
      if (openSound) {
        if (audioRefOpen.current) {
          audioRefOpen.current.pause();
          audioRefOpen.current.currentTime = 0;
        }
        
        const audio = new Audio(openSound);
        audioRefOpen.current = audio;
        audio.play().catch(error => console.error("Error playing sound:", error));
      }
    }, [openSound]);

    const handleClose = useCallback(() => {
      setIsClosing(true);
      playSound();
      setTimeout(() => {
        onClose();
      }, 300);
    }, [playSound, onClose]);

    useEffect(() => {
      setIsVisible(true);
      playOpen();
    }, [playOpen]);

  return (
    <div style={styles.overlay}>
      <div style={{ 
          ...styles.popupContainer, 
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'scale(1)' : 'scale(0.8)', 
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' 
        }}
        className={isClosing ? 'popup-exit' : 'popup-enter'}>
        <div style={styles.browserHeader}>
          <div style={styles.browserControls}>
            <div style={styles.controlClose} onClick={handleClose}>
              <span style={styles.closeSymbol}>×</span>
            </div>
          </div>
        </div>
        <div style={styles.content}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Popup;