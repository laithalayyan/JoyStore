// src/modules/User/Main/components/ProductsSlider.tsx
import React, { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles - TRY THESE PATHS
//import "swiper/swiper.min.css"; // Core Swiper styles
//import "swiper/modules/navigation/navigation.min.css"; // Navigation module styles
//import "swiper/modules/pagination/pagination.min.css"; // Pagination module styles
// If A11y styles are separate (less common, but possible)
//import "swiper/modules/a11y/a11y.min.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

// import required modules
import { Navigation, Pagination, A11y } from "swiper/modules";
// import required modules
import { Product } from "../../../../../api/user/productData";

interface ProductsSliderProps {
  products: Product[];
  // You can add more Swiper-specific props if needed later
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null); // To access Swiper instance if needed
  const isRtl =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  // This useEffect is optional but can be useful if you need to update Swiper on RTL change
  // Swiper usually handles dir="rtl" on its container automatically on initialization.
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.rtlTranslate = isRtl;
      swiperRef.current.swiper.update(); // Update Swiper instance
    }
  }, [isRtl]);

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-4">
        لا توجد منتجات لعرضها في هذه الفئة.
      </p>
    );
  }

  return (
    <div className="products-swiper-container relative group">
      {" "}
      {/* Added group for custom nav hover */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, A11y]} // Add A11y for accessibility
        spaceBetween={16} // Space between slides (in px)
        slidesPerView={1.2} // Show 1 and a bit of the next on smallest screens
        navigation={{
          // Enable navigation buttons
          nextEl: ".swiper-button-next-custom", // Custom classes for styling
          prevEl: ".swiper-button-prev-custom", // Custom classes for styling
        }}
        pagination={{ clickable: true }} // Enable clickable pagination dots
        grabCursor={true}
        loop={products.length > 3} // Enable loop if enough items. Adjust threshold.
        breakpoints={{
          // when window width is >= 576px
          576: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2.5, // Show 2 and a half
            spaceBetween: 20,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
        }}
        dir={isRtl ? "rtl" : "ltr"} // Explicitly set direction for Swiper
        className="!pb-10" // Add padding-bottom for pagination dots if they overlap
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto pb-1">
            {" "}
            {/* h-auto for card height, pb-1 for potential shadow */}
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons - position them outside or overlayed */}
      <div
        className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer
                      left-0 rtl:right-0 rtl:left-auto 
                      p-2 px-3 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md
                      transition-all opacity-0 group-hover:opacity-100 group-hover:ltr:-translate-x-1 group-hover:rtl:translate-x-1 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="pi pi-angle-right text-gray-700 dark:text-gray-200 text-xl"></i>
      </div>
      <div
        className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer
                      right-0 rtl:left-0 rtl:right-auto
                      p-2 px-3 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md
                      transition-all opacity-70 group-hover:opacity-100 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="pi pi-angle-left text-gray-700 dark:text-gray-200 text-xl"></i>
      </div>
    </div>
  );
};
