// src/modules/User/ProductPage/components/ProductShippingInfoTable.tsx
import React, { JSX, useState } from "react";
import { Button } from "primereact/button";
import { ExchangePolicyDialog } from "./Components/ExchangePolicyDialog";
import { ReturnPolicyDialog } from "./Components/ReturnPolicyDialog";
// Import the new dialog components

interface InfoRow {
  label: string;
  value: string | JSX.Element;
}

interface ProductShippingInfoTableProps {
  className?: string;
}

export const ProductShippingInfoTable: React.FC<
  ProductShippingInfoTableProps
> = ({ className = "" }) => {
  const [displayExchangePolicy, setDisplayExchangePolicy] = useState(false);
  const [displayReturnPolicy, setDisplayReturnPolicy] = useState(false);

  // Data for the information table - updated to trigger dialogs
  const infoTableData: InfoRow[] = [
    { label: "طرق الدفع", value: "نقدا عند الاستلام" },
    {
      label: "رسوم التوصيل",
      value: (
        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm leading-relaxed">
          <li>
            <strong className="font-medium">الضفة الغربية:</strong> 20 شيكل
            (مجاني للطلبات بقيمة 250 شيكل وأكثر)
          </li>
          <li>
            <strong className="font-medium">داخل القدس:</strong> 30 شيكل (مجاني
            للطلبات بقيمة 500 شيكل وأكثر)
          </li>
          <li>
            <strong className="font-medium">مناطق 48:</strong> 65 شيكل (مجاني
            للطلبات بقيمة 1000 شيكل وأكثر)
          </li>
        </ul>
      ),
    },
    { label: "مدة التوصيل", value: "2-5 ايام" },
    {
      label: "سياسة التبديل",
      value: (
        <Button
          label="اقرا سياسة التبديل من هنا"
          onClick={() => setDisplayExchangePolicy(true)}
          className="p-button-link !p-0 !text-orange-600 hover:!underline dark:!text-orange-400 !text-sm !font-medium"
        />
      ),
    },
    {
      label: "سياسة الارجاع",
      value: (
        <Button
          label="اقرا سياسة الارجاع من هنا"
          onClick={() => setDisplayReturnPolicy(true)}
          className="p-button-link !p-0 !text-orange-600 hover:!underline dark:!text-orange-400 !text-sm !font-medium"
        />
      ),
    },
  ];

  return (
    <>
      {" "}
      {/* Fragment because we now render the dialogs alongside the table div */}
      <div
        className={`mt-6 sm:mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4 text-right rtl:text-right">
          معلومات الشحن والدفع
        </h3>
        <dl className="space-y-3">
          {infoTableData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:gap-2 text-sm"
            >
              <dt className="w-full sm:w-1/3 md:w-1/4 flex-shrink-0 font-medium text-gray-900 dark:text-gray-100 text-right rtl:text-right mb-1 sm:mb-0">
                {item.label}:
              </dt>
              <dd className="w-full sm:w-2/3 md:w-3/4 text-gray-600 dark:text-gray-400 text-right rtl:text-right">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {/* Render the Dialog Components */}
      <ExchangePolicyDialog
        visible={displayExchangePolicy}
        onHide={() => setDisplayExchangePolicy(false)}
      />
      <ReturnPolicyDialog
        visible={displayReturnPolicy}
        onHide={() => setDisplayReturnPolicy(false)}
      />
    </>
  );
};
