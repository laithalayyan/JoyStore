import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { CartItem } from "../../../../../store/slices/cartSlice";
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
    const newQuantity = e.value ?? 0;
    if (newQuantity >= 0) {
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

  const isRtl =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center py-4 px-2 border-b border-gray-200 dark:border-gray-700 gap-3 sm:gap-4">
      <Button
        icon="pi pi-trash"
        className="!absolute sm:hidden top-6 left-2 rtl:left-2 ltr:left-auto z-10 p-button-rounded p-button-danger p-button-text p-button-xs sm:p-button-sm !text-red-500 hover:!bg-red-500/10 dark:!text-red-400 dark:hover:!bg-red-400/20"
        onClick={handleRemove}
        tooltip="إزالة"
        tooltipOptions={{ position: isRtl ? "left" : "right" }}
      />
      <div className="flex items-center flex-grow gap-3 sm:gap-4 min-w-0 sm:w-auto sm:flex-initial">
        <Link
          to={`/product/${item.product.id}`}
          className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20"
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
            <h3 className=" text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate max-w-[220px] lg:max-w-[280px]">
              {item.product.name}
            </h3>
          </Link>
          <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 mt-1">
            سعر الوحدة: <span className="font-sans">₪</span>
            {item.product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-2 w-full sm:w-auto sm:flex-grow sm:space-x-3 rtl:sm:space-x-reverse">
        <p className="sm:hidden text-xs text-gray-600 dark:text-gray-400 flex-shrink-0">
          <span>سعر الوحدة: </span>
          <span className="font-sans">₪</span>
          {item.product.price.toFixed(2)}
        </p>
        <div className="w-32 sm:w-28 lg:w-38 flex-shrink-0 order-2 sm:order-none">
          <InputNumber
            value={item.quantity}
            onValueChange={handleQuantityChange}
            showButtons
            buttonLayout="horizontal"
            decrementButtonIcon="pi pi-minus"
            incrementButtonIcon="pi pi-plus"
            step={1}
            min={1}
            max={item.product.stock || 100}
            decrementButtonClassName="p-button-secondary p-button-sm !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
            incrementButtonClassName="p-button-secondary p-button-sm !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
            inputClassName="!text-center rounded-md w-8 sm:w-10 !text-xs sm:!text-sm dark:!bg-gray-700 dark:!text-white"
            className="p-inputnumber-sm"
          />
        </div>
        <div className="w-auto sm:w-20 text-center font-semibold text-xs sm:text-sm md:text-lg lg:text-lg text-gray-800 dark:text-white flex-shrink-0 order-1 sm:order-none">
          <span className="sm:hidden">الإجمالي: </span>
          <span className="font-sans">₪</span>
          {(item.product.price * item.quantity).toFixed(2)}
        </div>
        <div className="hidden md:flex flex-shrink-0 order-last sm:order-none ml-auto sm:ml-0 rtl:mr-auto rtl:sm:mr-0">
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text p-button-sm !text-red-500 hover:!bg-red-500/10 dark:!text-red-400 dark:hover:!bg-red-400/20"
            onClick={handleRemove}
            tooltip="إزالة"
            tooltipOptions={{ position: "top" }}
          />
        </div>
      </div>
    </div>
  );
};
