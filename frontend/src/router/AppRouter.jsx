import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './guards/PrivateRoute.jsx';
import { PublicRoute } from './guards/PublicRoute.jsx';
import { RoleRoute } from './guards/RoleRoute.jsx';
import { PageSpinner } from '@components/ui/PageSpinner/PageSpinner.jsx';

const LandingLayout = lazy(() => import('@components/layout/LandingLayout/LandingLayout.jsx').then(m => ({ default: m.LandingLayout })));
const AdminDashboardLayout = lazy(() => import('@components/layout/AdminDashboardLayout/AdminDashboardLayout.jsx').then(m => ({ default: m.AdminDashboardLayout })));
const UserDashboardLayout = lazy(() => import('@components/layout/UserDashboardLayout/UserDashboardLayout.jsx').then(m => ({ default: m.UserDashboardLayout })));

const Home = lazy(() => import('@pages/Landing-page/Home/Home.jsx').then(m => ({ default: m.Home })));
const AboutUs = lazy(() => import('@pages/Landing-page/AboutUs/AboutUs.jsx').then(m => ({ default: m.AboutUs })));
const Features = lazy(() => import('@pages/Landing-page/Features/Features.jsx').then(m => ({ default: m.Features })));
const Plans = lazy(() => import('@pages/Landing-page/Plans/Plans.jsx').then(m => ({ default: m.Plans })));
const ContactUs = lazy(() => import('@pages/Landing-page/ContactUs/ContactUs.jsx').then(m => ({ default: m.ContactUs })));

const Login = lazy(() => import('@pages/Login/Login.jsx').then(m => ({ default: m.Login })));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword/ForgotPassword.jsx').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('@pages/ResetPassword/ResetPassword.jsx').then(m => ({ default: m.ResetPassword })));
const Signup = lazy(() => import('@pages/user/signup/Signup.jsx').then(m => ({ default: m.Signup })));

const AdminHome = lazy(() => import('@pages/admin/home/AdminHome.jsx').then(m => ({ default: m.AdminHome })));
const AdminProfile = lazy(() => import('@pages/admin/profile/AdminProfile.jsx').then(m => ({ default: m.AdminProfile })));

const UserHome = lazy(() => import('@pages/user/home/UserHome.jsx').then(m => ({ default: m.UserHome })));
const UserProfile = lazy(() => import('@pages/user/profile/UserProfile.jsx').then(m => ({ default: m.UserProfile })));


export const AppRouter = () => (
  <Suspense fallback={<PageSpinner />}>
    <Routes>
      <Route element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="features" element={<Features />} />
        <Route path="plans" element={<Plans />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
    </Routes>
  </Suspense>
);
