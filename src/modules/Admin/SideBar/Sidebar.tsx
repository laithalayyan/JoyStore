import React, { useMemo } from "react";
import { useAuth } from "../../shared/hooks/AuthContext";
import { Logo } from "./components/Logo";
import { SidebarNav, SidebarLinkInfo } from "./components/SidebarNav";
import { useLanguage } from "../../shared/hooks/LanguageContext";

type AppSidebarLink = SidebarLinkInfo & {
  adminOnly?: boolean;
};

export const Sidebar = () => {
  const { userRole } = useAuth();
  const { t } = useLanguage();
  const isAdmin = userRole === "admin";

  const sidebarLinks = useMemo(
    (): AppSidebarLink[] => [
      { to: "admin", label: t.sidebar.dashboard, icon: "pi pi-home" },
      {
        to: "users",
        label: t.sidebar.users,
        icon: "pi pi-users",
        adminOnly: true,
      },
      {
        to: "orders",
        label: t.sidebar.orders,
        icon: "pi pi-shopping-cart",
        adminOnly: true,
      },
      {
        to: "products",
        label: t.sidebar.products,
        icon: "pi pi-tags",
        adminOnly: true,
      },
      {
        to: "customers",
        label: t.sidebar.customers,
        icon: "pi pi-id-card",
        adminOnly: true,
      },
      {
        to: "content",
        label: t.sidebar.content,
        icon: "pi pi-file-edit",
        adminOnly: true,
      },
      {
        to: "reborts",
        label: t.sidebar.reports,
        icon: "pi pi-chart-pie",
        adminOnly: true,
      },

      // Add more links here if needed
    ],
    [t]
  );

  const accessibleLinks = useMemo(() => {
    return sidebarLinks.filter((link) => {
      return !link.adminOnly || (link.adminOnly && isAdmin);
    });
  }, [sidebarLinks, isAdmin]); // Dependencies: sidebarLinks and isAdmin

  return (
    <aside className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg">
      <Logo src="/logo.png" alt="Your Company Logo" href="/dashboard" />
      <hr className="border-t border-gray-200 dark:border-gray-700 mx-4" />
      <div className="flex flex-1 flex-col overflow-hidden min-h-0">
        <SidebarNav links={accessibleLinks} />
      </div>
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          App Version 1.0.0
        </p>
      </div>
    </aside>
  );
};
