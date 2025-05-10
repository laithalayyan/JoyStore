// src/AdminRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./modules/shared/hooks/AuthContext";

export const AdminRoute = () => {
  const { userRole, loading: authLoading } = useAuth(); // loading is for initial session check
  const location = useLocation();

  console.log(
    "[AdminRoute] Evaluating. authLoading:",
    authLoading,
    "userRole:",
    userRole
  );

  if (authLoading) {
    // This is for the very first load of the app or after a hard refresh
    // to ensure session is checked before redirecting.
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Session...
      </div>
    );
  }

  if (!userRole) {
    // No user logged in (after initial load is complete)
    console.log("[AdminRoute] No userRole, redirecting to /signin");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (userRole === "admin") {
    console.log("[AdminRoute] Access granted for admin. Rendering Outlet.");
    return <Outlet />;
  } else {
    // Logged in, but not an admin
    console.log(
      "[AdminRoute] Access denied. User role:",
      userRole,
      ". Redirecting to /"
    );
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};
