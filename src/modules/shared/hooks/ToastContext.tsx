// src/shared/contexts/ToastContext.tsx
import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ToastPassThroughOptions } from 'primereact/toast'; // For PT options

interface ToastContextType {
  showToast: (message: /* PrimeReact.ToastMessage | PrimeReact.ToastMessage[] */ any) => void; // Use 'any' for simplicity or import PrimeReact.ToastMessage
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: any) => { // Use PrimeReact.ToastMessage if you have it imported
    toastRef.current?.show(message);
  };

 // Optional: PT options for global toast styling
 const toastPT: ToastPassThroughOptions = {
     summary: ({ props }) => ({
         className: `font-semibold ${props.severity === 'error' ? 'dark:!text-red-300' : 'dark:!text-white' }`
     }),
     detail: ({ props }) => ({
         className: `${props.severity === 'error' ? 'dark:!text-red-200' : 'dark:!text-gray-100' } mt-1`
     }),
     // You can add more PT for .message, .icon, .closeButton etc.
 };


  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" pt={toastPT} /> {/* Or your preferred global position & PT */}
      {children}
    </ToastContext.Provider>
  );
};