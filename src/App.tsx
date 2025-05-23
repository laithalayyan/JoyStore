import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { SignInPage } from "./modules/auth/signin/SignInPage";
import { SignUpPage } from "./modules/auth/signup/SignUpPage";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { AdminRoute } from "./AdminRoute";
import { Layout } from "./modules/Admin/Layout";
import { AdminDashboard } from "./modules/Admin/AdminDashboard";
import { UsersPage } from "./modules/Admin/Pages/Users/UsersPage";
import { MainPage } from "./modules/User/Main/mainpage";
import { CategoryPage } from "./modules/User/Main/CategoryPage/CategoryPage";
import { ProductDetailPage } from "./modules/User/Main/ProductPage/ProductDetailPage";
import { FavoritesPage } from "./modules/User/Main/FavoritesPage/FavoritesPage";
import { ConfirmDialog } from "primereact/confirmdialog";
import { CartPage } from "./modules/User/Main/CartPage/CartPage";

function App() {
  const toast = useRef<Toast>(null);
  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} position="top-right" />

      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
