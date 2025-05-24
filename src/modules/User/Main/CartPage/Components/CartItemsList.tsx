import React from "react";
import { CartItemRow } from "./CartItemRow";
import { CartItem } from "../../../../../store/slices/cartSlice";

interface CartItemsListProps {
  cartItems: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems }) => {
  return (
    <div className="lg:w-2/3 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      {/* Table Header (Optional) */}
      <div className="hidden sm:flex px-2 py-3 bg-gray-50 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">
        <div className="w-24 flex-shrink-0 pr-1 rtl:ml-0 rtl:mr-0">المنتج</div>
        <div className="w-80 text-right pr-1">الوصف</div>
        <div className="w-44 text-right pr-1">الكمية</div>
        <div className="w-28 text-right pr-1">الإجمالي</div>
        <div className="w-12 text-center pr-1"></div> {/* For remove button */}
      </div>
      {cartItems.map((item) => (
        <CartItemRow key={item.product.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemsList;
