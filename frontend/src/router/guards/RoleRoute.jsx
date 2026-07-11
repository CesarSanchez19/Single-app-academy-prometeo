import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export const RoleRoute = ({ accountType, role }) => {
  const auth = useAuth();

  if (accountType && auth.accountType !== accountType) {
    return <Navigate to="/" replace />; 
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
