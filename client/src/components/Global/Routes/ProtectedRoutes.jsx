// src/components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../../store/slices/auth.slice";
import ROUTES from "./CommonRoutes";

// Routes that require authentication (protected routes)
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to={ROUTES.AUTH.STUDENT} replace />;
  }
  return children;
};

// Routes that should be accessible only by non-authenticated users (e.g., login/signup)
export const UnProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    // If the user is authenticated, redirect them to the user dashboard/home page
    return <Navigate to={ROUTES.USER.INDEX} replace />;
  }
  return children;
};
