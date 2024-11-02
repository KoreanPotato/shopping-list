import React from 'react';
import '../styles/header.css';

function Header() {
    return (
      <header className="header">
        <div className="header__left">
          <span className="header__profile-icon">👤</span>
        </div>
        <h1 className="header__title">SHOPPING LIST</h1>
        <div className="header__right">
          <span className="header__menu-icon">☰</span>
        </div>
      </header>
    );
  }

export default Header;
