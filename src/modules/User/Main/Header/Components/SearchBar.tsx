import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from "primereact/autocomplete";
import { SearchSuggestion } from "../Types";

interface SearchBarProps {
  shouldFocus?: boolean;
  className?: string;
}

const initialSearchData: SearchSuggestion[] = [
  { id: 1, name: "أريكة حديثة" },
  { id: 2, name: "طاولة قهوة بلوط" },
  { id: 3, name: "كرسي مكتب مريح" },
  { id: 4, name: "مصباح مكتب LED" },
  { id: 5, name: "رف كتب، 5 طبقات" },
  { id: 6, name: "لوحة ماوس ألعاب XL" },
  { id: 7, name: "سماعات لاسلكية" },
  { id: 8, name: "ساعة ذكية سيريز 7" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  shouldFocus = false,
  className = "",
}) => {
  const [value, setValue] = useState<string | SearchSuggestion>("");
  const [items, setItems] = useState<SearchSuggestion[]>([]);
  const acRef = useRef<AutoComplete>(null);

  useEffect(() => {
    if (shouldFocus && acRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inputElement = (acRef.current as any).inputEL?.nativeElement;
      if (inputElement) {
        setTimeout(() => inputElement.focus(), 50);
      }
    }
  }, [shouldFocus]);

  const search = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    const filteredItems = initialSearchData.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setItems(filteredItems);
  };

  const handleSelect = (event: AutoCompleteSelectEvent) => {
    console.log("Selected:", event.value);
  };

  const handleChange = (e: { value: string | SearchSuggestion }) => {
    setValue(e.value);
  };

  const itemTemplate = (item: SearchSuggestion) => {
    return (
      <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-right">
        {item.name}
      </div>
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      <AutoComplete
        ref={acRef}
        value={value}
        suggestions={items}
        completeMethod={search}
        field="name"
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder="ابحث في المتجر ..."
        className="w-full"
        inputClassName="w-full py-2 pr-10 pl-1 text-sm text-right border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rtl:placeholder:font-alexandria"
        panelClassName="dark:bg-gray-700 dark:border-gray-600 text-right"
        itemTemplate={itemTemplate}
        pt={{
          list: { className: "dark:bg-gray-800" },
          item: { className: "dark:text-gray-200 dark:hover:bg-gray-700" },
        }}
        aria-label="شريط البحث"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <i className="pi pi-search text-gray-500 dark:text-gray-400 text-base"></i>
      </div>
    </div>
  );
};
