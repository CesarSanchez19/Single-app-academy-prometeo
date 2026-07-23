import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, User, ScrollText, LogOut } from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import { logout as logoutService } from '@services/session.service.js';
import { ConfirmModal } from '@components/dashboard/ConfirmModal.jsx';
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
  dashboardSidebarAdminSectionClass,
  dashboardLogoutButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const generalNav = [
  { to: '/dashboard/home', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/active-sessions', label: 'Active Sessions', icon: Activity },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

const adminNav = [
  { to: '/dashboard/monitoring', label: 'System Logs', icon: ScrollText },
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
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAdmin = role === 'admin';

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutOpen(false);
      logout();
    }
  };

  return (
    <>
      <aside className={dashboardSidebarClass}>
        <div className={dashboardSidebarHeaderClass}>
          <span className={dashboardSidebarBrandClass}>Prometeo</span>
        </div>

        <div className={dashboardSidebarContentClass}>
          <div className={dashboardSidebarSectionClass}>
            <div className={dashboardSidebarSubtitleClass}>General</div>
            <nav className={dashboardSidebarNavClass}>
              {generalNav.map(({ to, label, icon }) => (
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

          {isAdmin && (
            <div className={`${dashboardSidebarSectionClass} ${dashboardSidebarAdminSectionClass}`}>
              <div className={dashboardSidebarSubtitleClass}>Admin</div>
              <nav className={dashboardSidebarNavClass}>
                {adminNav.map(({ to, label, icon }) => (
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
          )}

          <div className={dashboardSidebarFooterClass}>
            <button
              type="button"
              className={dashboardLogoutButtonClass}
              onClick={() => setIsLogoutOpen(true)}
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      <ConfirmModal
        isOpen={isLogoutOpen}
        title="End your session?"
        description="You will be signed out and redirected to the login page."
        cancelLabel="Cancel"
        confirmLabel="Log out"
        isLoading={isLoggingOut}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};
