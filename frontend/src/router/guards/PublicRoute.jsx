import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};
