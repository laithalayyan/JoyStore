import React, { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Product } from "../../../../../api/user/productData";

interface ProductsSliderProps {
  products: Product[];
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const isRtl =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.rtlTranslate = isRtl;
      swiperRef.current.swiper.update();
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
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1.2}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        grabCursor={true}
        loop={products.length > 5}
        breakpoints={{
          390: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
        }}
        dir={isRtl ? "rtl" : "ltr"}
        className="!pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto pb-1">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
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
                      transition-all opacity-35 group-hover:opacity-100 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="pi pi-angle-left text-gray-700 dark:text-gray-200 text-xl"></i>
      </div>
    </div>
  );
};
