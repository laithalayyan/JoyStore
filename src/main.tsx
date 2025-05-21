import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./modules/shared/hooks/ThemeContext.tsx";
import { LanguageProvider } from "./modules/shared/hooks/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./modules/shared/hooks/AuthContext.tsx";
import { store } from './store/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
