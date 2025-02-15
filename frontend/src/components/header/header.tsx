import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  headerStyles, 
  hamburgerIconStyles, 
  menuStyles, 
  menuItemStyles, 
  activeMenuItemStyles,
  sliderContainerStyles,
  sliderTrackStyles,
  sliderThumbStyles
} from './header.styles';
import { useMode } from '../../context/context';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isHardMode, toggleHardMode} = useMode();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header style={headerStyles}>
      <div style={hamburgerIconStyles} onClick={toggleMenu}>
        ☰
      </div>
      <div style={{ ...menuStyles, width: isMenuOpen ? '700px' : '0', opacity: isMenuOpen ? 1 : 0 }}>
        <Link
          to="/"
          style={location.pathname === '/' ? { ...menuItemStyles, ...activeMenuItemStyles } : menuItemStyles}
          onClick={toggleMenu}
        >
          Generate Facts
        </Link>
        <Link
          to="/facts"
          style={location.pathname === '/facts' ? { ...menuItemStyles, ...activeMenuItemStyles } : menuItemStyles}
          onClick={toggleMenu}
        >
          Your Facts
        </Link>
      </div>
      <div style={sliderContainerStyles}>
        <div 
          style={{ 
            ...sliderTrackStyles,
            backgroundColor: isHardMode ? '#ff4444' : '#ccc',
          }}
          onClick={toggleHardMode}
        >
          <div 
            style={{ 
              ...sliderThumbStyles,
              transform: isHardMode ? 'translateX(20px)' : 'translateX(2px)'
            }}
          />
        </div>
        <span style={{ 
          color: 'white', 
          marginLeft: '8px', 
          fontSize: '0.9rem',
          minWidth: '85px', 
          marginRight: '10px'
        }}>
          {isHardMode ? 'Hard Mode' : 'Normal Mode'}
        </span>
      </div>
    </header>
  );
};

export default Header;