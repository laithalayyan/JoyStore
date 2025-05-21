import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./modules/shared/hooks/AuthContext";

export const PrivateRoutes = () => {
  const { user } = useAuth(); // Implement your authentication logic

  //   const isAuthenticated = true; // Replace with actual authentication check
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
