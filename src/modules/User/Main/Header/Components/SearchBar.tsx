// src/modules/User/Main/components/SearchBar.tsx
import React, { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent, // Import this for onSelect
} from "primereact/autocomplete";
import { SearchSuggestion } from "../Types";

// Initial dummy data for search suggestions
const initialSearchData: SearchSuggestion[] = [
  { id: 1, name: "أريكة حديثة" }, // Example Arabic names
  { id: 2, name: "طاولة قهوة بلوط" },
  { id: 3, name: "كرسي مكتب مريح" },
  { id: 4, name: "مصباح مكتب LED" },
  { id: 5, name: "رف كتب، 5 طبقات" },
  { id: 6, name: "لوحة ماوس ألعاب XL" },
  { id: 7, name: "سماعات لاسلكية" },
  { id: 8, name: "ساعة ذكية سيريز 7" },
];

export const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string | SearchSuggestion>(""); // Can be string or object
  const [items, setItems] = useState<SearchSuggestion[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    // In a real app, you'd likely fetch from an API here
    // For Arabic, ensure your search logic handles Arabic characters correctly
    const filteredItems = initialSearchData.filter(
      (item) => item.name.toLowerCase().includes(query) // Basic includes, might need more robust search for Arabic
    );
    setItems(filteredItems);
  };

  const handleSelect = (event: AutoCompleteSelectEvent) => {
    // event.value is the selected SearchSuggestion object
    console.log("Selected:", event.value);
    // Example: router.push(`/product/${event.value.id}`);
    // setValue(event.value); // AutoComplete sets the value internally based on 'field' or itemTemplate
  };

  const handleChange = (e: { value: string | SearchSuggestion }) => {
    setValue(e.value);
  };

  // Item template to display in the suggestion dropdown
  const itemTemplate = (item: SearchSuggestion) => {
    return (
      // For RTL, text will align right by default if html dir="rtl"
      <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
        {item.name}
      </div>
    );
  };

  return (
    // Relative positioning for the icon
    <div className="relative md:w-96 lg:w-96 sm:w-full max-w-xs md:max-w-md lg:max-w-lg">
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        field="name" // Key from SearchSuggestion to display in the input after selection
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder="... ابحث في المتجر" // Arabic placeholder
        className="w-full" // Make PrimeReact component take full width of its container
        // Add padding to the right for the icon, and left for text alignment
        inputClassName="w-full py-3 pr-10 pl-3 text-xs md:text-lg lg-text-lg text-right border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white placeholder-gray-700 dark:placeholder-white ltr:placeholder:font-alexandria"
        panelClassName="dark:bg-gray-700 dark:border-gray-600 text-right text-gray-900 text-" // text-right for panel items
        itemTemplate={itemTemplate}
        pt={{
          list: { className: "dark:bg-gray-800" }, // Panel list
          item: { className: "dark:text-gray-200 dark:hover:bg-gray-700" }, // Individual item
          // You might need to adjust PT for token styles if using multiple selection
        }}
        aria-label="شريط البحث" // ARIA label for accessibility
      />
      {/* Search Icon - Absolutely positioned */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <i className="pi pi-search text-gray-700 dark:text-gray-500 text-xl"></i>
      </div>
    </div>
  );
};
