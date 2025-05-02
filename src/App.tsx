import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { SignInPage } from "./modules/auth/signin/SignInPage";
import { SignUpPage } from "./modules/auth/signup/SignUpPage";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} />  */}
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
