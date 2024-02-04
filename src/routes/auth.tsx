import AuthLayout from '../layouts/Auth';
import AuthLogin from "../pages/Auth/Login";
import AuthRegister from "../pages/Auth/Register";
import AuthVerify from "../pages/Auth/Verify";
import AuthForgotPassword from "../pages/Auth/ForgotPassword";
import AuthForgotPasswordSuccess from "../pages/Auth/ForgotPassword/success";
import AuthResetPassword from "../pages/Auth/ResetPassword";

const authRoutes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <AuthLogin /> },
      { path: '/register', element: <AuthRegister /> },
      { path: '/verify', element: <AuthVerify /> },
      { path: '/forgot-password', element: <AuthForgotPassword /> },
      { path: '/forgot-password/success', element: <AuthForgotPasswordSuccess /> },
      { path: '/reset-password', element: <AuthResetPassword /> },
    ]
  }
];

export default authRoutes;
