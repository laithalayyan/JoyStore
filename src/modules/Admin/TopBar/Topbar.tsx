import { AppUserMenu } from "./components/AppUserMenu";
import { Breadcrumb } from "./components/Breadcrumb";
import { ThemeToggle } from "./components/ThemeToggle";

interface TopbarProps {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
}

export const Topbar = ({ isSidebarOpen, onOpenSidebar }: TopbarProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button
                onClick={onOpenSidebar}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <i className="pi pi-bars text-xl" />
              </button>
            )}
            <Breadcrumb />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AppUserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
