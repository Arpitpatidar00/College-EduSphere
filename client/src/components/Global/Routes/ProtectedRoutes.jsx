import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectUserRole } from "../../../store/slices/auth.slice";
import ROUTES from "./CommonRoutes";
import { UserType } from "../../../enums/AuthConstants";

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_KEY;

/**
 * Extracts the admin secret key from the URL.
 */
const getAdminSecretFromURL = (pathname) => {
  const parts = pathname.split("/");
  return parts[parts.length - 1]; // Get the last segment of the path
};

/**
 * Protected Route - Ensures only authenticated users can access.
 */
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to={ROUTES.AUTH.STUDENT} replace />;
};

/**
 * Unprotected Route - Ensures only non-authenticated users can access.
 */
export const UnProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return !isAuthenticated ? children : <Navigate to={ROUTES.USER.INDEX} replace />;
};

/**
 * Admin Protected Route - Ensures only authenticated admins or valid secret key holders can access.
 */
export const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();
  const urlAdminSecret = getAdminSecretFromURL(location.pathname);
  const isValidAdminRoute = urlAdminSecret === ADMIN_SECRET;



  // ✅ Allow access if:
  // - The user is authenticated & is an admin
  // - OR if the correct admin secret is present in the URL
  if (isAuthenticated && userRole === UserType.ADMIN) {
    return children;
  }
  if (isValidAdminRoute) {
    return children;
  }

  // ❌ Otherwise, redirect to Admin Login
  return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
};

/**
 * Admin Unprotected Route - Ensures only non-authenticated admins can access (with the correct secret key).
 */
export const AdminUnProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const urlAdminSecret = getAdminSecretFromURL(location.pathname);
  const isValidAdminRoute = urlAdminSecret === ADMIN_SECRET;

  // ✅ If admin is already logged in, redirect to the admin dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
  }

  // ❌ If the secret key is incorrect, block access
  if (!isValidAdminRoute) {
    return <Navigate to={ROUTES.AUTH.STUDENT} replace />;
  }

  return children;
};
