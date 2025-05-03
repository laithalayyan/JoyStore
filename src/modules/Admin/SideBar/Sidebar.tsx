import { useAuth } from "../../shared/hooks/AuthContext";
import { SidebarItem } from "./components/SidebarItem";

type SidebarLink = {
  to: string;
  label: string;
  icon: string;
  adminOnly?: boolean;
};

const sidebarLinks: SidebarLink[] = [
  { to: "admin", label: "Dashboard", icon: "pi-home" },
  { to: "users", label: "Users", icon: "pi-users" },
  // { to: "/meals", label: "Meals", icon: "pi-apple", adminOnly: true },
  // { to: "/plans", label: "Plans", icon: "pi-file" },
  // { to: "/maintenance", label: "Maintenance", icon: "pi-cog" },
];

export const Sidebar = () => {
  const { userRole } = useAuth(); // Get user role from auth context
  const isAdmin = userRole === "admin";

  // Filter links based on admin status
  const accessibleLinks = sidebarLinks.filter((link) => {
    // Show link if:
    // 1. It's not admin-only, OR
    // 2. It's admin-only AND user is admin
    return !link.adminOnly || (link.adminOnly && isAdmin);
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-center h-16 px-4 flex-shrink-0">
        <a href="/dashboard" aria-label="Go to dashboard">
          <img src="/logo.png" alt="Logo" className="h-10 md:h-14" />
        </a>
      </div>

      <nav className="flex-1 px-2 md:px-4 space-y-1 pt-4 overflow-y-auto">
        {accessibleLinks.map((item) => (
          <SidebarItem
            key={item.to} // Changed from 'to' to 'item.to'
            to={item.to} // Changed from 'to' to 'item.to'
            label={item.label} // Changed from 'label' to 'item.label'
            icon={item.icon} // Changed from 'icon' to 'item.icon'
          />
        ))}
      </nav>
    </div>
  );
};
