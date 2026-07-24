import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar.jsx";
import {
  DashboardSidebarProvider,
  useDashboardSidebar,
} from "@/context/DashboardSidebarContext.jsx";
import {
  dashboardShellClass,
  dashboardMainClass,
  dashboardPageWrapperClass,
  dashboardMobileTopBarClass,
  dashboardMobileMenuButtonClass,
  dashboardSidebarBackdropClass,
  dashboardSidebarBrandClass,
} from "@/styles/prometeoStyleClasses.js";
import { getSessions } from "@/services/session.service.js";

const DashboardLayoutContent = () => {
  const location = useLocation();
  const { isMobileOpen, openMobile, closeMobile } = useDashboardSidebar();

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      getSessions().catch(() => {});
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={dashboardShellClass}>
      {isMobileOpen && (
        <button
          type="button"
          className={dashboardSidebarBackdropClass}
          onClick={closeMobile}
          aria-label="Close navigation"
        />
      )}

      <Sidebar />

      <div className={dashboardMainClass}>
        <header className={dashboardMobileTopBarClass}>
          <button
            type="button"
            className={dashboardMobileMenuButtonClass}
            onClick={openMobile}
            aria-label="Open navigation"
            aria-expanded={isMobileOpen}
          >
            <Menu size={20} />
          </button>
          <span className={dashboardSidebarBrandClass}>Prometeo</span>
        </header>

        <main className={dashboardPageWrapperClass}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const DashboardLayout = () => (
  <DashboardSidebarProvider>
    <DashboardLayoutContent />
  </DashboardSidebarProvider>
);
