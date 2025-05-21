import React from 'react';

const EmptyFav: React.FC = () => {
    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                لا توجد منتجات مفضلة حالياً
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                يمكنك إضافة المنتجات إلى المفضلة لتظهر هنا.
            </p>
            <button
                onClick={() => (window.location.href = "/")}
                className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 transition"
            >
                تصفح المنتجات
            </button>
        </div>
    );
};

export default EmptyFav;