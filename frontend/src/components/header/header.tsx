import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headerStyles, hamburgerIconStyles, menuStyles, menuItemStyles, activeMenuItemStyles } from './header.styles';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={headerStyles}>
      <div style={hamburgerIconStyles} onClick={toggleMenu}>
        ☰
      </div>
      <div style={{ ...menuStyles, transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
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
    </header>
  );
};

export default Header;