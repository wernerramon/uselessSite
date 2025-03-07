export const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popupContainer: {
      backgroundColor: '#282c34',
      borderRadius: '12px',
      border: '3px solid #1a1d23',
      width: '80%',
      maxWidth: '600px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      color: '#ffffff',
    },
    browserHeader: {
      background: 'linear-gradient(#343842, #282c34)',
      padding: '10px',
      borderBottom: '2px solid #1a1d23',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    browserControls: {
      display: 'flex',
      gap: '8px',
    },
    controlClose: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#ff5f57',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: '2px solid #1a1d23',
    },
    closeSymbol: {
      color: '#1a1d23',
      fontSize: '18px',
      marginTop: '-2px',
      fontWeight: 'bold',
    },
    content: {
      padding: '20px',
      fontSize: '18px',
      lineHeight: '1.5',
      textAlign: 'center',
    },
  };