import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const EmptyCartPage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <i className="pi pi-shopping-cart text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
        سلة التسوق فارغة.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        لم تقم بإضافة أي منتجات إلى السلة بعد.
      </p>
      <Link to="/">
        <Button
          label="ابدأ التسوق"
          icon="pi pi-arrow-left rtl:pi-arrow-right"
          className="p-button-danger p-button-outlined p-button-sm py-2 px-3 !bg-orange-500 !border-orange-500 hover:!bg-orange-600 dark:hover:!bg-orange-700 !text-white justify-center"
        />
      </Link>
    </div>
  );
};

export default EmptyCartPage;
