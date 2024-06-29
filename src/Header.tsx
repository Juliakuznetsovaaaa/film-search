import React from 'react';
import './Header.css'; 

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header"> 
      <h1>Фильмопоиск</h1> 
    </header>
  );
};

export default Header