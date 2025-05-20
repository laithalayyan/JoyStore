// src/modules/User/ProductPage/components/PolicyDialogs/ExchangePolicyDialog.tsx
import React from "react";
import { Dialog } from "primereact/dialog";
//import { Button } from "primereact/button";

// Dummy policy content - replace with your actual policy
const exchangePolicyContent = `
  <h4 class="text-md font-semibold mb-2 text-gray-800 dark:text-white">سياسة التبديل لدينا:</h4>
  <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
    <li>يمكنك تبديل المنتج خلال 7 أيام من تاريخ الاستلام.</li>
    <li>يجب أن يكون المنتج بحالته الأصلية (غير مستخدم، وفي تغليفه الأصلي، مع جميع الملحقات والبطاقات).</li>
    <li>يتحمل العميل رسوم الشحن المترتبة على عملية التبديل، ما لم يكن الخطأ من طرفنا.</li>
    <li>يجب إرفاق الفاتورة الأصلية.</li>
    <li>لا يمكن تبديل المنتجات المخفضة أو التي تم شراؤها خلال عروض خاصة إلا إذا كان بها عيب مصنعي واضح.</li>
    <li>لطلب التبديل، يرجى التواصل مع خدمة العملاء.</li>
  </ul>
`;

interface ExchangePolicyDialogProps {
  visible: boolean;
  onHide: () => void;
}

export const ExchangePolicyDialog: React.FC<ExchangePolicyDialogProps> = ({
  visible,
  onHide,
}) => {
  // const dialogFooter = (
  //   <div>
  //     <Button
  //       label="إغلاق"
  //       icon="pi pi-times"
  //       onClick={onHide}
  //       className="p-button-text"
  //     />
  //   </div>
  // );

  return (
    <Dialog
      header="سياسة التبديل"
      visible={visible}
      style={{ width: "90vw", maxWidth: "600px" }}
      modal
      //footer={dialogFooter}
      onHide={onHide}
      draggable={false}
      resizable={false}
      pt={{
        header: {
          className:
            "bg-gray-100 dark:bg-gray-700 font-alexandria dark:text-white dark:border-b dark:border-gray-600 text-right rtl:text-right",
        },
        content: {
          className:
            "dark:bg-gray-800 pt-5 font-alexandria dark:text-gray-300 leading-relaxed text-right rtl:text-right",
        },
        footer: {
          className: "dark:bg-gray-700 dark:border-t dark:border-gray-600",
        },
      }}
    >
      <div
        className="m-0"
        dangerouslySetInnerHTML={{ __html: exchangePolicyContent }}
      />
    </Dialog>
  );
};
