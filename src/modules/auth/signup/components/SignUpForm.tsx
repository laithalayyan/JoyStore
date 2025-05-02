import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useLanguage } from "../../../shared/hooks/LanguageContext";
import { Link } from "react-router-dom";
// import { translations } from "../../../../utils/translations";

export const SignUpForm = () => {
  const { t } = useLanguage();

  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300">
          {t.name}
        </label>
        <InputText
          id="name"
          //placeholder={t.namePlaceholder}
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {t.email}
        </label>
        <InputText
          id="email"
          className="w-full focus:ring-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: {
              className: "border-gray-300 border-2 dark:border-gray-600",
            },
          }}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300"
        >
          {t.password}
        </label>
        <InputText
          id="password"
          type="password"
          className="w-full focus:ring-2 border-2 ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:border-primary-400"
          pt={{
            root: { className: "border-gray-300 dark:border-gray-600" },
          }}
        />
      </div>

      <Button
        label={t.signUp}
        className="w-full !bg-orange-500 hover:!bg-orange-600 !text-white !font-bold !py-3 !rounded-lg !transition-all !duration-300 !border-none"
        pt={{
          root: { className: "!shadow-sm hover:!shadow-md" },
        }}
      />

      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          {t.alreadyHaveAccount}{" "}
          <Link
            to="/signin"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium underline underline-offset-4 transition-colors"
          >
            {t.signIn}
          </Link>
        </span>
      </div>
    </form>
  );
};
