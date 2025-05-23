// src/modules/User/CartPage/components/CartItemRow.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { CartItem } from "../../../../../store/slices/cartSlice"; // Path to your Redux CartItem type
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import {
  updateCartItemQuantity,
  removeProductFromCart,
} from "../../../../../store/slices/cartSlice";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (e: InputNumberValueChangeEvent) => {
    const newQuantity = e.value ?? 0; // Default to 0 if null/undefined
    if (newQuantity >= 0) {
      // Allow quantity to be 0, which will then be handled as remove by thunk
      dispatch(
        updateCartItemQuantity({
          productId: item.product.id,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeProductFromCart(item.product.id));
  };

  return (
    <div className="flex items-center py-4 px-2 border-b border-gray-200 dark:border-gray-700 gap-3 sm:gap-4">
      <Link
        to={`/product/${item.product.id}`}
        className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24"
      >
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      <div className="flex-grow min-w-0">
        <Link
          to={`/product/${item.product.id}`}
          className="hover:text-orange-600 dark:hover:text-orange-400"
        >
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate">
            {item.product.name}
          </h3>
        </Link>
        {/* Placeholder for product options/variants if applicable */}
        {/* <p className="text-xs text-gray-500 dark:text-gray-400">اللون: أسود, المقاس: M</p> */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          سعر الوحدة: <span className="font-sans">₪</span>
          {item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="w-28 sm:w-32 flex-shrink-0">
        <InputNumber
          value={item.quantity}
          onValueChange={handleQuantityChange}
          showButtons
          buttonLayout="horizontal"
          step={1}
          min={0} // Allow setting to 0 to trigger removal via update logic
          max={item.product.stock || 100} // Use actual stock if available
          decrementButtonClassName="p-button-secondary p-button-sm !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
          incrementButtonClassName="p-button-secondary p-button-sm !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
          inputClassName="!text-center w-10 !text-sm dark:!bg-gray-700 dark:!text-white"
          className="p-inputnumber-sm"
        />
      </div>
      <div className="w-20 sm:w-24 text-center font-semibold text-sm sm:text-base text-gray-800 dark:text-white">
        <span className="font-sans">₪</span>
        {(item.product.price * item.quantity).toFixed(2)}
      </div>
      <div className="flex-shrink-0">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text p-button-sm"
          onClick={handleRemove}
          tooltip="إزالة"
        />
      </div>
    </div>
  );
};
