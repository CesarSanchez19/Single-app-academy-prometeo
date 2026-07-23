import { Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { Forbidden } from '@components/dashboard/Forbidden.jsx';

export const RoleRoute = ({ role }) => {
  const auth = useAuth();

  if (role && auth.user?.role !== role) {
    return <Forbidden />;
  }

  return <Outlet />;
};
