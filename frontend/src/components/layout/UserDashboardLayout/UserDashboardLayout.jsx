import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, User, LogOut } from 'lucide-react';
import '../DashboardLayout.css';

export const UserDashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
            <span className="brand-text" style={{ color: 'var(--color-success)' }}>Employee Portal</span>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-subtitle">Mi Trabajo</div>
            <NavItem to="/employees/home" icon={Home} label="Inicio" />
            <NavItem to="/employees/clients" icon={Users} label="Mis Clientes" />
            <NavItem to="/employees/services" icon={Briefcase} label="Mis Servicios" />
          </div>
          
          <div className="sidebar-section">
            <div className="sidebar-subtitle">Cuenta</div>
            <NavItem to="/employees/profile" icon={User} label="Mi Perfil" />
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div></div>
          <div className="topbar-actions">
            <button className="btn btn-icon">
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
