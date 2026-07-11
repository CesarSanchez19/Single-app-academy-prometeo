import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export const PublicRoute = () => {
  const { isAuthenticated, accountType } = useAuth();

  if (isAuthenticated) {
    if (accountType === 'admin') return <Navigate to="/properties/home" replace />;
    if (accountType === 'user') return <Navigate to="/employees/home" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
