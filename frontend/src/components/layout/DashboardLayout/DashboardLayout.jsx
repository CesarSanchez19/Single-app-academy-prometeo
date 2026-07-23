import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import {
  dashboardShellClass,
  dashboardMainClass,
  dashboardPageWrapperClass,
} from '@/styles/prometeoStyleClasses.js';

export const DashboardLayout = () => {
  return (
    <div className={dashboardShellClass}>
      <Sidebar />

      <div className={dashboardMainClass}>
        <main className={dashboardPageWrapperClass}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
