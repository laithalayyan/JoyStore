import React from "react";
import { Button } from "primereact/button";
import { CartItem } from "../../../../../store/slices/cartSlice";

interface CartPageHeaderProps {
  cartItems: CartItem[];
  handleClearCart: () => void;
}

const CartPageHeader: React.FC<CartPageHeaderProps> = ({
  cartItems,
  handleClearCart,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
        سلة التسوق
      </h1>

      {cartItems.length > 0 && (
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-outlined p-button-sm py-2 px-3 !bg-orange-500 !border-orange-500 hover:!bg-orange-600 dark:hover:!bg-orange-700 !text-white justify-center "
          onClick={handleClearCart}
        >
          <span className="font-bold md:inline ml-2 rtl:mr-2 rtl:ml-0">
            إفراغ السلة
          </span>
        </Button>
      )}
    </div>
  );
};

export default CartPageHeader;
