import React from "react";
import {
  Paginator,
  PaginatorPageChangeEvent,
  PaginatorPassThroughMethodOptions,
} from "primereact/paginator";

interface PaginatorPageButtonContext {
  active: boolean;
  disabled: boolean;
}

interface PaginatorPageButtonPTOptions
  extends PaginatorPassThroughMethodOptions {
  context: PaginatorPageButtonContext;
}

interface PaginationControlsProps {
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  first,
  rows,
  totalRecords,
  onPageChange,
}) => {
  if (totalRecords <= rows) {
    return null;
  }

  return (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPageChange={onPageChange}
      className="mt-8 sm:mt-12 justify-center [&_.p-paginator-pages]:mx-auto [&_.p-paginator-rpp-options]:text-right"
      pt={{
        root: { className: "bg-transparent dark:bg-transparent px-0" },
        pages: { className: "flex-wrap justify-center" },
        pageButton: (options) => {
          const { context } = options as PaginatorPageButtonPTOptions;
          return {
            className: `dark:text-gray-300 dark:hover:bg-gray-700 ${
              context.active
                ? "dark:!bg-orange-500 dark:!border-orange-500 dark:!text-white"
                : ""
            }`,
          };
        },
        prevPageButton: {
          className: "dark:text-gray-300 dark:hover:bg-gray-700",
        },
        nextPageButton: {
          className: "dark:text-gray-300 dark:hover:bg-gray-700",
        },
        // @ts-expect-error Property 'rowsPerPageDropdown' does not exist on type 'PaginatorPassThroughOptions'.
        rowsPerPageDropdown: {
          root: {
            className:
              "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300",
          },
          item: { className: "dark:hover:bg-gray-600" },
        },
      }}
      template={{
        layout:
          "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
        CurrentPageReport: (options) => {
          return (
            <span
              className="text-sm text-gray-600 dark:text-gray-400 mx-2"
              style={{ userSelect: "none" }}
            >
              عرض {options.first + 1} -{" "}
              {Math.min(options.first + options.rows, options.totalRecords)} من
              أصل {options.totalRecords} منتجات
            </span>
          );
        },
      }}
    />
  );
};
