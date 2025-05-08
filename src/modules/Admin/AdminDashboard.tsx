import { Button } from "primereact/button";
import { useAuth } from "../shared/hooks/AuthContext";
import { useLanguage } from "../shared/hooks/LanguageContext";

export const AdminDashboard = () => {
  const { userRole, user } = useAuth();
  const { t } = useLanguage();

  if (userRole !== "admin") {
    return <div>You don't have permission to view this page</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {t.adminDashboard}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-lg dark:text-white">
          {t.welcomeAdmin} {user}
        </p>
        <div className="mt-4">
          {/* Admin-specific content */}
          <Button
            label={t.manageUsers}
            className="!bg-primary-500 hover:!bg-primary-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};
