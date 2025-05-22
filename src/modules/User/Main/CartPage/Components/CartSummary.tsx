// src/modules/User/CartPage/components/CartSummary.tsx
import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { CartItem } from "../../../../../store/slices/cartSlice"; // Your Redux CartItem

interface CartSummaryProps {
  items: CartItem[];
  // onCheckout: () => void; // Function to handle navigation to checkout
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  items /*, onCheckout */,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 0 ? 20.0 : 0; // Example fixed shipping, make this dynamic
  const total = subtotal + shippingCost;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mt-6 lg:mt-0">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b dark:border-gray-600">
        ملخص الطلب
      </h2>
      <div className="space-y-3 text-sm sm:text-base">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>المجموع الفرعي:</span>
          <span>
            <span className="font-sans">₪</span>
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>رسوم التوصيل (تقديري):</span>
          <span>
            <span className="font-sans">₪</span>
            {shippingCost.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-600">
          <span>الإجمالي:</span>
          <span>
            <span className="font-sans">₪</span>
            {total.toFixed(2)}
          </span>
        </div>
      </div>
      <Link to="/checkout" className="block mt-6">
        {" "}
        {/* Navigate to /checkout */}
        <Button
          label="المتابعة إلى الدفع"
          icon="pi pi-credit-card"
          iconPos="right"
          className="w-full p-button-orange p-button-lg text-sm sm:text-base"
          disabled={items.length === 0}
        />
      </Link>
      <Link
        to="/"
        className="block mt-3 text-center text-orange-600 hover:text-orange-500 dark:text-orange-400 text-xs sm:text-sm"
      >
        أو متابعة التسوق
      </Link>
    </div>
  );
};
