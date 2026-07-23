import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './guards/PrivateRoute.jsx';
import { PublicRoute } from './guards/PublicRoute.jsx';
import { RoleRoute } from './guards/RoleRoute.jsx';
import { PageSpinner } from '@components/ui/PageSpinner/PageSpinner.jsx';

const PublicLayout = lazy(() =>
  import('@components/layout/PublicLayout/PublicLayout.jsx').then((m) => ({
    default: m.PublicLayout,
  }))
);
const DashboardLayout = lazy(() =>
  import('@components/layout/DashboardLayout/DashboardLayout.jsx').then((m) => ({
    default: m.DashboardLayout,
  }))
);

const Home = lazy(() =>
  import('@pages/public/Home/Home.jsx').then((m) => ({ default: m.Home }))
);
const AboutUs = lazy(() =>
  import('@pages/public/AboutUs/AboutUs.jsx').then((m) => ({ default: m.AboutUs }))
);
const NotFound = lazy(() =>
  import('@pages/public/NotFound/NotFound.jsx').then((m) => ({ default: m.NotFound }))
);
const Unauthorized = lazy(() =>
  import('@pages/public/Unauthorized/Unauthorized.jsx').then((m) => ({ default: m.Unauthorized }))
);
const AccessDenied = lazy(() =>
  import('@pages/public/AccessDenied/AccessDenied.jsx').then((m) => ({ default: m.AccessDenied }))
);

const Login = lazy(() =>
  import('@pages/auth/Login/Login.jsx').then((m) => ({ default: m.Login }))
);
const ForgotPassword = lazy(() =>
  import('@pages/auth/ForgotPassword/ForgotPassword.jsx').then((m) => ({
    default: m.ForgotPassword,
  }))
);
const ResetPassword = lazy(() =>
  import('@pages/auth/ResetPassword/ResetPassword.jsx').then((m) => ({
    default: m.ResetPassword,
  }))
);
const Signup = lazy(() =>
  import('@pages/auth/Signup/Signup.jsx').then((m) => ({ default: m.Signup }))
);

const DashboardHome = lazy(() =>
  import('@pages/Dashboard/Home/Home.jsx').then((m) => ({ default: m.DashboardHome }))
);
const ActiveSessions = lazy(() =>
  import('@pages/Dashboard/ActiveSessions/ActiveSessions.jsx').then((m) => ({
    default: m.ActiveSessions,
  }))
);
const Profile = lazy(() =>
  import('@pages/Dashboard/Profile/Profile.jsx').then((m) => ({ default: m.Profile }))
);
const Monitoring = lazy(() =>
  import('@pages/Dashboard/Monitoring/Monitoring.jsx').then((m) => ({
    default: m.Monitoring,
  }))
);

export const AppRouter = () => (
  <Suspense fallback={<PageSpinner />}>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="active-sessions" element={<ActiveSessions />} />
          <Route path="profile" element={<Profile />} />
          <Route element={<RoleRoute role="admin" />}>
            <Route path="monitoring" element={<Monitoring />} />
          </Route>
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);
