import { Link, useLocation } from 'react-router-dom';
import {
  publicHeaderClass,
  publicHeaderInnerClass,
  brandLinkClass,
  brandWordmarkClass,
  publicNavClass,
  navLinkClass,
  navLinkActiveClass,
  primaryButtonInlineClass,
} from '@/styles/prometeoStyleClasses.js';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'Nosotros' },
];

export const PublicHeader = () => {
  const { pathname } = useLocation();

  const isActive = (to, end = false) => {
    if (end) return pathname === to;
    return pathname.startsWith(to);
  };

  return (
    <header className={publicHeaderClass}>
      <div className={publicHeaderInnerClass}>
        <Link to="/" className={brandLinkClass}>
          <span className={brandWordmarkClass}>Prometeo</span>
        </Link>

        <nav className={publicNavClass} aria-label="Navegación principal">
          {navItems.map(({ to, label, end }) => (
            <Link
              key={to}
              to={to}
              className={isActive(to, end) ? navLinkActiveClass : navLinkClass}
            >
              {label}
            </Link>
          ))}
          <Link to="/login" className={primaryButtonInlineClass}>Iniciar sesión</Link>
        </nav>
      </div>
    </header>
  );
};