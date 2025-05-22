// src/shared/contexts/ToastContext.tsx
import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastMessage } from "primereact/toast"; // Import the specific ToastMessage type
import {
  ToastPassThroughOptions,
  ToastPassThroughMethodOptions,
} from "primereact/toast"; // Import PT types
import { classNames } from "primereact/utils"; // For conditional classes

// For the showToast function argument
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

  // Define PT options for global toast styling
  const toastPT: ToastPassThroughOptions = {
    // Each individual toast message container
    message: (options?: ToastPassThroughMethodOptions) => {
      // `options.state.messages` should be an array of ToastMessage
      // `options.index` is the index of the current message
      // `options.props` are the props of the Toast component itself, NOT the individual message.
      // The individual message details are typically in `options.state.messages[options.index]`
      const currentMessage: ToastMessage | undefined =
        options?.state?.messages?.[0];
      const severity = currentMessage?.severity;

      return {
        className: classNames(
          "my-1", // Example: add some vertical margin to each toast
          {
            // Conditional classes based on severity
            "dark:!bg-green-700 dark:!border-green-600": severity === "success",
            "dark:!bg-red-700 dark:!border-red-600": severity === "error",
            "dark:!bg-blue-700 dark:!border-blue-600": severity === "info",
            "dark:!bg-yellow-600 dark:!border-yellow-500": severity === "warn",
          }
        ),
      };
    },
    // The content wrapper inside a message (holds icon, summary, detail)
    content: () => {
      //const currentMessage: ToastMessage | undefined = options?.state?.messages?.[0];
      //const severity = currentMessage?.severity;
      return {
        className: classNames("flex items-center p-3", {
          // Add specific padding or flex properties if needed
        }),
      };
    },
    // The text container (holds summary and detail)
    text: () => ({
      className: "ml-3 rtl:mr-3 rtl:ml-0 flex-1", // Spacing from icon, allow text to grow
    }),
    summary: (options?: ToastPassThroughMethodOptions) => {
      const currentMessage: ToastMessage | undefined =
        options?.state?.messages?.[0]; // Default to the first message
      const severity = currentMessage?.severity;
      return {
        className: classNames(
          "font-semibold text-lg sm:text-base lg:text-md md:text-md font-alexandria",
          {
            "dark:!text-white": severity === "success" || severity === "info",
            "dark:!text-red-100": severity === "error", // Lighter red for text on dark red bg
            "dark:!text-yellow-100": severity === "warn", // Lighter yellow for text on dark yellow bg
            // Default text color for summary if not dark mode and not a specific severity
            "text-gray-800":
              !document.documentElement.classList.contains("dark"),
          }
        ),
      };
    },
    detail: (options?: ToastPassThroughMethodOptions) => {
      const currentMessage: ToastMessage | undefined =
        options?.state?.messages?.[0];
      const severity = currentMessage?.severity;
      return {
        className: classNames(
          "mt-1 text-sm sm:text-sm lg:text-md md:text-md font-alexandria",
          {
            "dark:!text-gray-200":
              severity === "success" || severity === "info",
            "dark:!text-red-200": severity === "error",
            "dark:!text-yellow-200": severity === "warn",
            // Default text color for detail if not dark mode and not a specific severity
            "text-gray-600":
              !document.documentElement.classList.contains("dark"),
          }
        ),
      };
    },
    icon: (options?: ToastPassThroughMethodOptions) => {
      const currentMessage: ToastMessage | undefined =
        options?.state?.messages?.[0];
      const severity = currentMessage?.severity;
      return {
        // PrimeReact usually adds icon classes like p-toast-message-icon pi pi-check
        // We can ensure the color matches the severity based text.
        className: classNames("text-lg sm:text-xl", {
          "dark:!text-white": severity === "success" || severity === "info",
          "dark:!text-red-100": severity === "error",
          "dark:!text-yellow-100": severity === "warn",
        }),
      };
    },
    closeButton: {
      // The 'X' close button on the toast
      className:
        "p-toast-icon-close p-link ml-auto rtl:mr-auto rtl:ml-0 self-start !w-7 !h-7 rounded-full dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700 focus:!ring-1 focus:!ring-orange-500",
    },
    // closeIcon: { // The icon inside the close button
    //     className: '!text-sm'
    // }
    // You might not need to style 'wrapper' or 'life' unless you have specific requirements.
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" pt={toastPT} />
      {children}
    </ToastContext.Provider>
  );
};
