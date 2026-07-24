import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  User,
  ScrollText,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useAuth } from '@hooks/useAuth.js';
import { logout as logoutService } from '@services/session.service.js';
import { ConfirmModal } from '@components/dashboard/ConfirmModal.jsx';
import { useDashboardSidebar } from '@/context/DashboardSidebarContext.jsx';
import {
  dashboardSidebarClass,
  dashboardSidebarCollapsedClass,
  dashboardSidebarMobileOpenClass,
  dashboardSidebarHeaderClass,
  dashboardSidebarBrandClass,
  dashboardSidebarContentClass,
  dashboardSidebarSectionClass,
  dashboardSidebarSubtitleClass,
  dashboardSidebarNavClass,
  dashboardSidebarLinkClass,
  dashboardSidebarLinkCollapsedClass,
  dashboardSidebarLinkActiveClass,
  dashboardSidebarFooterClass,
  dashboardSidebarAdminSectionClass,
  dashboardLogoutButtonClass,
  dashboardLogoutButtonCollapsedClass,
  dashboardSidebarToggleButtonClass,
} from '@/styles/prometeoStyleClasses.js';

const generalNav = [
  { to: '/dashboard/home', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/active-sessions', label: 'Active Sessions', icon: Activity },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

const adminNav = [
  { to: '/dashboard/monitoring', label: 'System Logs', icon: ScrollText },
];

const NavItem = ({ to, icon: Icon, label, isActive, showLabels, onNavigate }) => (
  <Link
    to={to}
    title={!showLabels ? label : undefined}
    onClick={onNavigate}
    className={`${dashboardSidebarLinkClass} ${!showLabels ? dashboardSidebarLinkCollapsedClass : ''} ${isActive ? dashboardSidebarLinkActiveClass : ''}`}
  >
    <Icon size={20} className="shrink-0" />
    {showLabels && <span className="truncate">{label}</span>}
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();
  const { role, logout } = useAuth();
  const { isCollapsed, isMobileOpen, toggleCollapsed, closeMobile } = useDashboardSidebar();
  const asideRef = useRef(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAdmin = role === 'admin';
  const showExpandedContent = !isCollapsed || isMobileOpen;

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMobile();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    if (!isMobileOpen || !asideRef.current) return undefined;

    const focusable = asideRef.current.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    focusable[0]?.focus();

    return undefined;
  }, [isMobileOpen]);

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

  const handleNavigate = () => {
    closeMobile();
  };

  return (
    <>
      <aside
        ref={asideRef}
        className={`${dashboardSidebarClass} ${isCollapsed ? dashboardSidebarCollapsedClass : ''} ${isMobileOpen ? dashboardSidebarMobileOpenClass : ''}`}
        role={isMobileOpen ? 'dialog' : undefined}
        aria-modal={isMobileOpen ? 'true' : undefined}
        aria-label="Dashboard navigation"
      >
        <div className={dashboardSidebarHeaderClass}>
          {showExpandedContent && (
            <span className={dashboardSidebarBrandClass}>Prometeo</span>
          )}
          <button
            type="button"
            className={`${dashboardSidebarToggleButtonClass} ${!showExpandedContent ? 'mx-auto' : 'ml-auto'}`}
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <div className={dashboardSidebarContentClass}>
          <div className={dashboardSidebarSectionClass}>
            {showExpandedContent && (
              <div className={dashboardSidebarSubtitleClass}>General</div>
            )}
            <nav className={dashboardSidebarNavClass}>
              {generalNav.map(({ to, label, icon }) => (
                <NavItem
                  key={to}
                  to={to}
                  icon={icon}
                  label={label}
                  showLabels={showExpandedContent}
                  isActive={location.pathname.startsWith(to)}
                  onNavigate={handleNavigate}
                />
              ))}
            </nav>
          </div>

          {isAdmin && (
            <div
              className={`${dashboardSidebarSectionClass} ${dashboardSidebarAdminSectionClass} ${!showExpandedContent ? 'border-t-0 pt-0' : ''}`}
            >
              {showExpandedContent && (
                <div className={dashboardSidebarSubtitleClass}>Admin</div>
              )}
              <nav className={dashboardSidebarNavClass}>
                {adminNav.map(({ to, label, icon }) => (
                  <NavItem
                    key={to}
                    to={to}
                    icon={icon}
                    label={label}
                    showLabels={showExpandedContent}
                    isActive={location.pathname.startsWith(to)}
                    onNavigate={handleNavigate}
                  />
                ))}
              </nav>
            </div>
          )}

          <div className={dashboardSidebarFooterClass}>
            <button
              type="button"
              title={!showExpandedContent ? 'Log out' : undefined}
              className={`${dashboardLogoutButtonClass} ${!showExpandedContent ? dashboardLogoutButtonCollapsedClass : ''}`}
              onClick={() => setIsLogoutOpen(true)}
            >
              <LogOut size={18} className="shrink-0" />
              {showExpandedContent && <span>Log out</span>}
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
