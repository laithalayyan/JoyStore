import { ThemeToggle } from "../../shared/components/ThemeToggle";
import { useLanguage } from "../../shared/hooks/LanguageContext";
import { useTheme } from "../../shared/hooks/ThemeContext";
import { ImageSection } from "../shared/components/ImageSection";
import { Cologo } from "../shared/components/logo";
import { SignUpForm } from "./components/SignUpForm";

export const SignUpPage = () => {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode
          ? "dark bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-orange-50 to-gray-100"
      }`}
    >
      {/* Main Container */}
      <div className="lg:w-full sm:px-8 sm:py-4 lg:py-0 lg:px-0 max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
        {/* Image Section */}
        {ImageSection()}

        {/* Form Section */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header with controls */}
            <div className="flex items-center justify-between">
              {Cologo()}
              <div className="flex gap-3">
                {/* <LanguageDropdown /> */}
                <ThemeToggle />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1
                className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${
                  language === "ar" ? "text-right" : "text-right"
                }`}
              >
                {"مرحبا بكم في متجرنا"}
              </h1>

              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-inner border border-gray-100 dark:border-gray-600">
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
