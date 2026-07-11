import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export const BusinessGuard = ({ fallbackRoute }) => {
  const { hasBusiness } = useAuth();

  return hasBusiness ? <Outlet /> : <Navigate to={fallbackRoute} replace />;
};
