import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';

export const RoleRoute = ({ role }) => {
  const auth = useAuth();

  if (role && auth.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
