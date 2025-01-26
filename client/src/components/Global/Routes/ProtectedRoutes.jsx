// src/components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../../store/slices/auth.slice";

export const ProtectedRoute = ({ children }) => {
  const auth = useSelector(selectIsAuthenticated);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const UnProtectedRoute = ({ children }) => {
  const auth = useSelector(selectIsAuthenticated);

  if (auth) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
