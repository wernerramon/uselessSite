import React from 'react';
import { styles } from './popup.styles';

interface PopupProps {
  text: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ text, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popupContainer}>
        <div style={styles.browserHeader}>
          <div style={styles.browserControls}>
            <div style={styles.controlClose} onClick={onClose}>
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