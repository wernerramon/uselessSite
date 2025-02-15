import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headerStyles, hamburgerIconStyles, menuStyles, menuItemStyles, activeMenuItemStyles } from './header.styles';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={headerStyles}>
      <div style={hamburgerIconStyles} onClick={toggleMenu}>
        ☰
      </div>
      {isMenuOpen && (
        <div style={menuStyles}>
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
      )}
    </header>
  );
};

export default Header;