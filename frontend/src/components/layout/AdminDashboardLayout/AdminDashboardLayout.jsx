import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import '../DashboardLayout.css';
import { useAuth } from '@hooks/useAuth.js';

export const AdminDashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = currentPath.startsWith(to);
    return (
      <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-text">Admin Panel</span>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-subtitle">General</div>
            <NavItem to="/admin/home" icon={Home} label="Dashboard" />
            <NavItem to="/admin/profile" icon={User} label="Profile" />
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-search">
          </div>
          <div className="topbar-actions">
            <button className="btn btn-icon" onClick={logout}>
              <LogOut size={20} />
            </button>
          </div>
        </header>
        
        <main className="page-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
