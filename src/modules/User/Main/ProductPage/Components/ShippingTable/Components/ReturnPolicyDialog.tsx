// src/modules/User/ProductPage/components/PolicyDialogs/ReturnPolicyDialog.tsx
import React from "react";
import { Dialog } from "primereact/dialog";
//import { Button } from "primereact/button";

// Dummy policy content - replace with your actual policy
const returnPolicyContent = `
  <h4 class="text-md font-semibold mb-2 text-gray-800 dark:text-white">سياسة الإرجاع لدينا:</h4>
  <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
    <li>يمكنك إرجاع المنتج خلال 3 أيام من تاريخ الاستلام.</li>
    <li>يجب أن يكون المنتج بحالته الأصلية (غير مستخدم، وفي تغليفه الأصلي، مع جميع الملحقات والبطاقات).</li>
    <li>يتم الإرجاع في حال وجود عيب مصنعي واضح، أو إذا كان المنتج المستلم مختلفًا عن الوصف المعروض على الموقع.</li>
    <li>في حالة الإرجاع بسبب عيب مصنعي أو خطأ من طرفنا، سنتحمل كامل رسوم الشحن. في الحالات الأخرى، قد يتحمل العميل رسوم شحن الإرجاع.</li>
    <li>يجب إرفاق الفاتورة الأصلية.</li>
    <li>المبالغ المستردة تتم خلال 7-14 يوم عمل بعد استلام وفحص المنتج المرتجع، بنفس طريقة الدفع الأصلية.</li>
    <li>لطلب الإرجاع، يرجى التواصل مع خدمة العملاء.</li>
  </ul>
`;

interface ReturnPolicyDialogProps {
  visible: boolean;
  onHide: () => void;
}

export const ReturnPolicyDialog: React.FC<ReturnPolicyDialogProps> = ({
  visible,
  onHide,
}) => {
  //   const dialogFooter = (
  //     <div>
  //       <Button
  //         label="إغلاق"
  //         icon="pi pi-times"
  //         onClick={onHide}
  //         className="p-button-text dark:text-white mt-4"
  //       />
  //     </div>
  //   );

  return (
    <Dialog
      header="سياسة الإرجاع"
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
            "bg-gray-100 font-alexandria dark:bg-gray-700 dark:text-white dark:border-b dark:border-gray-600 text-right rtl:text-right",
        },
        content: {
          className:
            "dark:bg-gray-800 font-alexandria pt-5 dark:text-gray-300 leading-relaxed text-right rtl:text-right",
        },
        footer: {
          className: "dark:bg-gray-700 dark:border-t dark:border-gray-600",
        },
      }}
    >
      <div
        className="m-0"
        dangerouslySetInnerHTML={{ __html: returnPolicyContent }}
      />
    </Dialog>
  );
};
