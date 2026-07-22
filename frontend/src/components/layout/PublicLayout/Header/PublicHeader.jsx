import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './PublicHeader.css';

export const PublicHeader = () => {
  return (
    <header className="public-header">
      <div className="header-container">
        <Link to="/" className="brand flex items-center gap-2">
          <Building2 size={24} className="brand-icon" />
          <span className="brand-text">Prometeo</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-link">Home</Link>
          <Link to="/about-us" className="header-link">Nosotros</Link>
          <Link to="/login" className="header-link">Iniciar sesión</Link>
        </nav>
      </div>
    </header>
  );
};
