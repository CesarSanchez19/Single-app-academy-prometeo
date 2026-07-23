import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
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
  { to: '/about-us', label: 'About us' },
];

export const PublicHeader = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

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

        <nav className={publicNavClass} aria-label="Main navigation">
          {navItems.map(({ to, label, end }) => (
            <Link
              key={to}
              to={to}
              className={isActive(to, end) ? navLinkActiveClass : navLinkClass}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link to="/dashboard/home" className={primaryButtonInlineClass}>Dashboard</Link>
          ) : (
            <Link to="/login" className={primaryButtonInlineClass}>Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
};