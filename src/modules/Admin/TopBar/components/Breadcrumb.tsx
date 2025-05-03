import { useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1) || "Dashboard";
  };

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        {getPageTitle()}
      </h1>
    </div>
  );
};
