import React from "react";
import { Header } from "./Header/Header";

export const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome to the Store!</h1>
        {/* Your main page content will go here */}
        <p>Browse our amazing products...</p>
      </main>
      {/* Footer can be added here */}
    </div>
  );
};
