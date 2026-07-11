import { Outlet, Link } from 'react-router-dom';
import { Building2, Menu, LogIn } from 'lucide-react';
import './LandingLayout.css';

export const LandingLayout = () => {
  return (
    <div className="app-container flex-col">
      <header className="landing-header">
        <div className="header-container">
          <Link to="/" className="brand flex items-center gap-2">
            <Building2 size={24} className="brand-icon" />
            <span className="brand-text">Prometeo</span>
          </Link>
          
          <nav className="desktop-nav">
            <Link to="/about-us" className="nav-link">Nosotros</Link>
            <Link to="/features" className="nav-link">Características</Link>
            <Link to="/plans" className="nav-link">Planes</Link>
            <Link to="/contact-us" className="nav-link">Contacto</Link>
          </nav>
          
          <div className="auth-actions">
            <Link to="/login" className="btn btn-primary">
              <LogIn size={18} />
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="landing-footer">
        <div className="footer-container">
          <p className="text-muted">© 2026 Prometeo by Galetics. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
