import { Dropdown } from "primereact/dropdown";
import { useLanguage } from "../hooks/LanguageContext";

export const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { label: "English", value: "en" },
    { label: "العربية", value: "ar" },
  ];

  return (
    <Dropdown
      value={language}
      options={languages}
      onChange={(e) => setLanguage(e.value)}
      optionLabel="label"
      className="min-w-[120px] !text-gray-800 !p-1 !rounded-lg !shadow-sm dark:bg-gray-700 dark:text-orange-400 dark:hover:!bg-gray-600"
      pt={{
        root: {
          className:
            "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:!bg-gray-600 bg-gray-100 dark:text-orange-400",
        },
        input: { className: "py-2.5 dark:text-orange-400 text-gray-800" },
        panel: {
          className: "dark:bg-gray-700 dark:text-orange-400 text-gray-800",
        },
        item: {
          className:
            "dark:hover:bg-gray-600 dark:text-orange-400 text-gray-800",
        },
        trigger: {
          className:
            "dark:hover:bg-gray-600 dark:text-orange-400 text-gray-800",
        },
      }}
    />
  );
};
