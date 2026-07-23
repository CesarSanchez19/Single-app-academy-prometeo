import { Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { Navigate } from 'react-router-dom';

export const RoleRoute = ({ role }) => {
  const auth = useAuth();

  if (role && auth.user?.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};
