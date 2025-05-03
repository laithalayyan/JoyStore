// components/AppUserMenu.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/AuthContext";
import { LanguageDropdown } from "../../../shared/components/LanguageDropdown";

export function AppUserMenu() {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-3">
        <LanguageDropdown />
        <i className="pi pi-user text-lg px-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-full" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userRole === "admin" ? "Administrator" : "Welcome back"}
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user || "Guest"}
          </span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
      >
        <i className="pi pi-sign-out text-lg" />
      </button>
    </div>
  );
}
