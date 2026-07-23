import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, User, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import {
  dashboardSidebarClass,
  dashboardSidebarHeaderClass,
  dashboardSidebarBrandClass,
  dashboardSidebarContentClass,
  dashboardSidebarSectionClass,
  dashboardSidebarSubtitleClass,
  dashboardSidebarNavClass,
  dashboardSidebarLinkClass,
  dashboardSidebarLinkActiveClass,
  dashboardSidebarFooterClass,
  dashboardLogoutButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const baseNav = [
  { to: '/dashboard/home', label: 'Home', icon: Home },
  { to: '/dashboard/active-sessions', label: 'Active Sessions', icon: Activity },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

const adminNav = [
  { to: '/dashboard/monitoring', label: 'Monitoring', icon: BarChart3 },
];

const NavItem = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`${dashboardSidebarLinkClass} ${isActive ? dashboardSidebarLinkActiveClass : ''}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();
  const { role, logout } = useAuth();
  const navItems = role === 'admin' ? [...baseNav, ...adminNav] : baseNav;

  return (
    <aside className={dashboardSidebarClass}>
      <div className={dashboardSidebarHeaderClass}>
        <span className={dashboardSidebarBrandClass}>Prometeo</span>
      </div>

      <div className={dashboardSidebarContentClass}>
        <div className={dashboardSidebarSectionClass}>
          <div className={dashboardSidebarSubtitleClass}>General</div>
          <nav className={dashboardSidebarNavClass}>
            {navItems.map(({ to, label, icon }) => (
              <NavItem
                key={to}
                to={to}
                icon={icon}
                label={label}
                isActive={location.pathname.startsWith(to)}
              />
            ))}
          </nav>
        </div>

        <div className={dashboardSidebarFooterClass}>
          <button type="button" className={dashboardLogoutButtonClass} onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
