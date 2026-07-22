import { Outlet, Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './PublicLayout.css';

export const PublicLayout = () => {
  return (
    <div className="app-container flex-col">
      <header className="public-header">
        <div className="header-container">
          <Link to="/" className="brand flex items-center gap-2">
            <Building2 size={24} className="brand-icon" />
            <span className="brand-text">Prometeo</span>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-container">
          <nav className="footer-nav" aria-label="Navegación principal">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about-us" className="footer-link">Nosotros</Link>
            <Link to="/login" className="footer-link">Iniciar sesión</Link>
          </nav>
          <p className="text-muted footer-copyright">
            © 2026 Prometeo by Galetics. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
