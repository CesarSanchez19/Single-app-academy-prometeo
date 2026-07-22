import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './guards/PrivateRoute.jsx';
import { PublicRoute } from './guards/PublicRoute.jsx';
import { RoleRoute } from './guards/RoleRoute.jsx';
import { PageSpinner } from '@components/ui/PageSpinner/PageSpinner.jsx';

const PublicLayout = lazy(() =>
  import('@components/layout/PublicLayout/PublicLayout.jsx').then((m) => ({
    default: m.PublicLayout,
  }))
);
const AdminDashboardLayout = lazy(() =>
  import('@components/layout/AdminDashboardLayout/AdminDashboardLayout.jsx').then((m) => ({
    default: m.AdminDashboardLayout,
  }))
);
const UserDashboardLayout = lazy(() =>
  import('@components/layout/UserDashboardLayout/UserDashboardLayout.jsx').then((m) => ({
    default: m.UserDashboardLayout,
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

const AdminHome = lazy(() =>
  import('@pages/admin/home/AdminHome.jsx').then((m) => ({ default: m.AdminHome }))
);
const AdminProfile = lazy(() =>
  import('@pages/admin/profile/AdminProfile.jsx').then((m) => ({ default: m.AdminProfile }))
);

const UserHome = lazy(() =>
  import('@pages/user/home/UserHome.jsx').then((m) => ({ default: m.UserHome }))
);
const UserProfile = lazy(() =>
  import('@pages/user/profile/UserProfile.jsx').then((m) => ({ default: m.UserProfile }))
);

export const AppRouter = () => (
  <Suspense fallback={<PageSpinner />}>
    <Routes>
      {/* Público: Home + AboutUs */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/properties/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute role="admin" />}>
          <Route element={<AdminDashboardLayout />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
        </Route>

        <Route element={<RoleRoute role="user" />}>
          <Route element={<UserDashboardLayout />}>
            <Route path="/user/home" element={<UserHome />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
