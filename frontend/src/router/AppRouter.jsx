import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './guards/PrivateRoute.jsx';
import { PublicRoute } from './guards/PublicRoute.jsx';
import { RoleRoute } from './guards/RoleRoute.jsx';
import { BusinessGuard } from './guards/BusinessGuard.jsx';
import { PageSpinner } from '../components/ui/PageSpinner/PageSpinner.jsx';

const LandingLayout = lazy(() => import('../components/layout/LandingLayout/LandingLayout.jsx').then(m => ({ default: m.LandingLayout })));
const AdminDashboardLayout = lazy(() => import('../components/layout/AdminDashboardLayout/AdminDashboardLayout.jsx').then(m => ({ default: m.AdminDashboardLayout })));
const UserDashboardLayout = lazy(() => import('../components/layout/UserDashboardLayout/UserDashboardLayout.jsx').then(m => ({ default: m.UserDashboardLayout })));

const Home = lazy(() => import('../pages/Landing-page/Home/Home.jsx').then(m => ({ default: m.Home })));
const AboutUs = lazy(() => import('../pages/Landing-page/AboutUs/AboutUs.jsx').then(m => ({ default: m.AboutUs })));
const Features = lazy(() => import('../pages/Landing-page/Features/Features.jsx').then(m => ({ default: m.Features })));
const Plans = lazy(() => import('../pages/Landing-page/Plans/Plans.jsx').then(m => ({ default: m.Plans })));
const ContactUs = lazy(() => import('../pages/Landing-page/ContactUs/ContactUs.jsx').then(m => ({ default: m.ContactUs })));

const Login = lazy(() => import('../pages/Login/Login.jsx').then(m => ({ default: m.Login })));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword.jsx').then(m => ({ default: m.ForgotPassword })));
const Signup = lazy(() => import('../pages/admins/properties/signup/Signup.jsx').then(m => ({ default: m.Signup })));

const RegisterBusiness = lazy(() => import('../pages/admins/properties/register-business/RegisterBusiness.jsx').then(m => ({ default: m.RegisterBusiness })));
const PropertyHome = lazy(() => import('../pages/admins/properties/home/PropertyHome.jsx').then(m => ({ default: m.PropertyHome })));
const Customers = lazy(() => import('../pages/admins/properties/clients/Customers.jsx').then(m => ({ default: m.Customers })));
const Employees = lazy(() => import('../pages/admins/properties/employees/Employees.jsx').then(m => ({ default: m.Employees })));
const Services = lazy(() => import('../pages/admins/properties/services/Services.jsx').then(m => ({ default: m.Services })));
const RevenueAndSales = lazy(() => import('../pages/admins/properties/financial-management/revenue-and-sales/RevenueAndSales.jsx').then(m => ({ default: m.RevenueAndSales })));
const PaymentControl = lazy(() => import('../pages/admins/properties/financial-management/payment-control/PaymentControl.jsx').then(m => ({ default: m.PaymentControl })));
const Settings = lazy(() => import('../pages/admins/properties/settings/Settings.jsx').then(m => ({ default: m.Settings })));
const ProfileProperties = lazy(() => import('../pages/admins/properties/profile/ProfileProperties.jsx').then(m => ({ default: m.ProfileProperties })));

const EmployeeHome = lazy(() => import('../pages/users/employees/home/EmployeeHome.jsx').then(m => ({ default: m.EmployeeHome })));
const EmployeeClients = lazy(() => import('../pages/users/employees/clients/EmployeeClients.jsx').then(m => ({ default: m.EmployeeClients })));
const EmployeeServices = lazy(() => import('../pages/users/employees/services/EmployeeServices.jsx').then(m => ({ default: m.EmployeeServices })));
const EmployeeProfile = lazy(() => import('../pages/users/employees/profile/EmployeeProfile.jsx').then(m => ({ default: m.EmployeeProfile })));


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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/properties/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>
        
        <Route element={<RoleRoute accountType="admin" />}>
          <Route path="/properties/register-business" element={<RegisterBusiness />} />

          <Route element={<RoleRoute accountType="admin" role="property" />}>
            <Route element={<AdminDashboardLayout />}>
              <Route path="/properties/settings" element={<Settings />} />
              <Route path="/properties/profile" element={<ProfileProperties />} />

              <Route element={<BusinessGuard fallbackRoute="/properties/register-business" />}>
                <Route path="/properties/home" element={<PropertyHome />} />
                <Route path="/properties/clients" element={<Customers />} />
                <Route path="/properties/employees" element={<Employees />} />
                <Route path="/properties/services" element={<Services />} />
                <Route path="/properties/finances/revenue" element={<RevenueAndSales />} />
                <Route path="/properties/finances/payment-control" element={<PaymentControl />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route element={<RoleRoute accountType="user" role="employee" />}>
          <Route element={<UserDashboardLayout />}>
            <Route path="/employees/profile" element={<EmployeeProfile />} />

            <Route element={<BusinessGuard fallbackRoute="/employees/profile" />}>
              <Route path="/employees/home" element={<EmployeeHome />} />
              <Route path="/employees/clients" element={<EmployeeClients />} />
              <Route path="/employees/services" element={<EmployeeServices />} />
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  </Suspense>
);
