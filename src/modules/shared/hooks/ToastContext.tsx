import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastMessage } from "primereact/toast";
import {
  ToastPassThroughOptions,
  ToastPassThroughMethodOptions,
} from "primereact/toast";
import { classNames } from "primereact/utils";

type ShowToastArgs = ToastMessage | ToastMessage[];

interface ToastContextType {
  showToast: (message: ShowToastArgs) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ShowToastArgs) => {
    toastRef.current?.show(message);
  };

  const toastPT: ToastPassThroughOptions = {
    message: (options?: ToastPassThroughMethodOptions) => {
      const currentMessage: ToastMessage | undefined =
        options?.state?.messages?.[0];
      const severity = currentMessage?.severity;

      return {
        className: classNames("my-1", {
          "dark:!bg-green-700 dark:!border-green-600": severity === "success",
          "dark:!bg-red-700 dark:!border-red-600": severity === "error",
          "dark:!bg-blue-700 dark:!border-blue-600": severity === "info",
          "dark:!bg-yellow-600 dark:!border-yellow-500": severity === "warn",
        }),
      };
    },
    content: () => {
      return {
        className: classNames("flex items-center p-3", {}),
      };
    },
    text: () => ({
      className: "ml-3 rtl:mr-3 rtl:ml-0 flex-1",
    }),
    summary: () => {
      return {
        className: classNames(
          "font-semibold text-lg sm:text-base lg:text-md md:text-md font-alexandria text-gray-800",
          {
            // "dark:!text-white": severity === "success" || severity === "info",
            // "dark:!text-red-100": severity === "error",
            // "dark:!text-yellow-100": severity === "warn",
            "text-gray-800":
              !document.documentElement.classList.contains("dark"),
          }
        ),
      };
    },
    detail: () => {
      return {
        className: classNames(
          "mt-1 text-sm sm:text-sm lg:text-md md:text-md font-alexandria text-gray-800"
        ),
      };
    },
    icon: () => {
      //const currentMessage: ToastMessage | undefined =
      //  options?.state?.messages?.[0];
      //const severity = currentMessage?.severity;
      return {
        className: classNames("text-lg sm:text-xl"),
      };
    },
    closeButton: {
      className:
        "p-toast-icon-close p-link ml-auto rtl:mr-auto rtl:ml-0 self-start !w-7 !h-7 rounded-full  hover:!bg-gray-100  focus:!ring-1 focus:!ring-orange-500",
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" pt={toastPT} />
      {children}
    </ToastContext.Provider>
  );
};
