// components/Layout.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "../shared/hooks/AuthContext";
import { Topbar } from "./TopBar/Topbar";
import { Sidebar } from "./SideBar/Sidebar";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  // const { userRole } = useAuth();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative h-full z-50 transition-all duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
        `}
      >
        {isSidebarOpen && <Sidebar />}
      </aside>

      {/* Circle button for desktop */}
      {isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="fixed md:absolute left-64 top-4 hidden md:flex items-center justify-center w-8 h-8 -mr-4 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          <i className="pi pi-chevron-left h-4 w-7 text-gray-500" />
        </button>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
