import React from 'react';

const WelcomeBanner: React.FC = () => {
    return (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100 text-right rtl:text-right">
                مرحباً بك في متجرنا!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-right rtl:text-right">
                اكتشف أحدث المنتجات والعروض الحصرية.
            </p>
        </div>
    );
};

export default WelcomeBanner;