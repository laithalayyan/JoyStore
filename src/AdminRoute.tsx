import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./modules/shared/hooks/AuthContext";

export const AdminRoute = () => {
  const { userRole } = useAuth();

  const location = useLocation();

  if (userRole === "admin") {
    return <Outlet />;
  }

  // Redirect non-admins to login with state
  return <Navigate to="/signin" state={{ from: location }} replace />;
};
