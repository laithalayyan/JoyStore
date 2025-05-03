import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { SignInPage } from "./modules/auth/signin/SignInPage";
import { SignUpPage } from "./modules/auth/signup/SignUpPage";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { AdminRoute } from "./AdminRoute";
import { Layout } from "./modules/Admin/Layout";
import { AdminDashboard } from "./modules/Admin/AdminDashboard";
import { UsersPage } from "./modules/Admin/Pages/Users/UsersPage";

function App() {
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      // Or process.env.NODE_ENV === 'development'
      const existingUsers = JSON.parse(
        localStorage.getItem("auth_users") || "[]"
      );

      // Check if admin user already exists
      type User = { email: string; password: string; role: string };
      const adminExists = existingUsers.some(
        (user: User) => user.email === "admin@example.com"
      );

      if (!adminExists) {
        const testUsers = [
          ...existingUsers,
          {
            email: "admin@example.com",
            password: "securepassword123",
            role: "admin",
          },
        ];
        localStorage.setItem("auth_users", JSON.stringify(testUsers));
      }
    }
  }, []);

  const toast = useRef<Toast>(null);
  return (
    <>
      <Toast ref={toast} position="top-right" />

      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            {/* <Route path="meals" element={<AdminDashboard />} />
            <Route path="plans" element={<AdminDashboard />} />
            <Route path="maintenance" element={<AdminDashboard />} /> */}
          </Route>
        </Route>
        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/dashboard" element={<DashboardPage />} />  */}
        </Route>
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
