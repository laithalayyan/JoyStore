import { SidebarItem } from "./SidebarItem";

export type SidebarLinkInfo = {
  to: string;
  label: string;
  icon: string;
};

interface SidebarNavProps {
  links: SidebarLinkInfo[];
}

export const SidebarNav = ({ links }: SidebarNavProps) => {
  return (
    <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
      {links.length > 0 ? (
        links.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
          />
        ))
      ) : (
        <p className="px-2 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
          No navigation items.
        </p>
      )}
    </nav>
  );
};
