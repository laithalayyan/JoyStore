import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./modules/shared/hooks/AuthContext";

export const AdminRoute = () => {
  const { userRole } = useAuth();
  const location = useLocation();

  if (!userRole) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return userRole === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
