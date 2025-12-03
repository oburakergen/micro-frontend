import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNavigate }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <nav className="header-nav">
        <button onClick={() => onNavigate?.('/')}>Home</button>
        <button onClick={() => onNavigate?.('/app1')}>App 1</button>
        <button onClick={() => onNavigate?.('/app2')}>App 2</button>
      </nav>
    </header>
  );
};
