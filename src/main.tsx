import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./modules/shared/hooks/ThemeContext.tsx";
import { LanguageProvider } from "./modules/shared/hooks/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./modules/shared/hooks/AuthContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
