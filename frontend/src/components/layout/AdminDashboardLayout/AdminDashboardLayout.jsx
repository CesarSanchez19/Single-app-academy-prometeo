import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, DollarSign, Settings, User, LogOut, FileText, CreditCard } from 'lucide-react';
import '../DashboardLayout.css';

export const AdminDashboardLayout = () => {
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
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-text">Admin Panel</span>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-subtitle">General</div>
            <NavItem to="/properties/home" icon={Home} label="Dashboard" />
            <NavItem to="/properties/clients" icon={Users} label="Clientes" />
            <NavItem to="/properties/employees" icon={Briefcase} label="Empleados" />
            <NavItem to="/properties/services" icon={FileText} label="Servicios" />
          </div>
          
          <div className="sidebar-section">
            <div className="sidebar-subtitle">Finanzas</div>
            <NavItem to="/properties/finances/revenue" icon={DollarSign} label="Ingresos y Ventas" />
            <NavItem to="/properties/finances/payment-control" icon={CreditCard} label="Control de Pagos" />
          </div>
          
          <div className="sidebar-section">
            <div className="sidebar-subtitle">Administración</div>
            <NavItem to="/properties/settings" icon={Settings} label="Configuración" />
            <NavItem to="/properties/profile" icon={User} label="Mi Perfil" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-search">
            {/* Search or breadcrumbs could go here */}
          </div>
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
