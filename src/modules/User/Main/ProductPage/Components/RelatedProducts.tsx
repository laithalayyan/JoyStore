// src/modules/User/ProductPage/components/RelatedProducts.tsx
import React, { useEffect, useState } from "react";
import {
  Product,
  getProductsByCategoryId,
} from "../../../../../api/user/productData"; // Adjust path

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles (ensure these are loaded globally or imported here)
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination'; // If you want pagination for related products

// import required modules
import { Navigation, Pagination, A11y } from "swiper/modules"; // Keep A11y
import { ProductCard } from "../../MainPage/CategorySection/Components/ProductCard";
import { Link } from "react-router-dom";

interface RelatedProductsProps {
  categoryId: string | number;
  currentProductId: string | number;
  className?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  categoryId,
  currentProductId,
  className = "",
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const isRtl =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    getProductsByCategoryId(categoryId)
      .then((products) => {
        // Filter out the current product and take a slice (e.g., first 5-10 related)
        const filtered = products
          .filter((p) => p.id.toString() !== currentProductId.toString())
          .slice(0, 10); // Show up to 10 related products
        setRelatedProducts(filtered);
      })
      .catch((error) =>
        console.error("Error fetching related products:", error)
      )
      .finally(() => setLoading(false));
  }, [categoryId, currentProductId]);

  if (loading) {
    // Optional: Add a simple loading skeleton for the related products section
    return (
      <div
        className={`mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 ${className}`}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-right rtl:text-right">
          منتجات ذات صلة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null; // Don't render the section if no related products
  }

  return (
    <section
      className={`mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white text-right rtl:text-right">
          منتجات ذات صلة
        </h2>
        {/* Optional: Link to the category page if there are many related products */}
        <Link
          to={`/category/${categoryId}`}
          className="text-sm font-medium text-orange-600 hover:text-orange-500"
        >
          عرض المزيد
        </Link>
      </div>

      <div className="related-products-swiper-container group relative">
        {" "}
        {/* Added group for custom nav hover */}
        <Swiper
          modules={[Navigation, Pagination, A11y]} // Added Pagination
          spaceBetween={16}
          slidesPerView={2} // Start with 2 on smallest screens
          navigation={{
            // Enable navigation buttons
            nextEl: ".related-swiper-button-next", // Custom classes for styling
            prevEl: ".related-swiper-button-prev", // Custom classes for styling
          }}
          pagination={{ clickable: true, el: ".related-swiper-pagination" }} // Enable clickable pagination dots
          grabCursor={true}
          breakpoints={{
            640: {
              // sm
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              // md
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              // lg
              slidesPerView: 5, // Show 5 on larger screens
              spaceBetween: 24,
            },
          }}
          dir={isRtl ? "rtl" : "ltr"}
          className="!pb-12" // Add padding-bottom for pagination dots
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id} className="h-auto pb-1">
              {" "}
              {/* Ensure cards can define their height */}
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons - Overlayed */}
        {relatedProducts.length >
          (window.innerWidth < 640
            ? 2
            : window.innerWidth < 768
            ? 3
            : window.innerWidth < 1024
            ? 4
            : 5) && ( // Show only if needed
          <>
            <button
              className="related-swiper-button-prev absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md
                                left-0 rtl:right-0 rtl:left-auto 
                                opacity-0 group-hover:opacity-100 group-hover:ltr:-translate-x-1 group-hover:rtl:translate-x-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i className="pi pi-angle-left text-gray-700 dark:text-gray-200 text-lg sm:text-xl"></i>
            </button>
            <button
              className="related-swiper-button-next absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md
                                right-0 rtl:left-0 rtl:right-auto
                                opacity-0 group-hover:opacity-100 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <i className="pi pi-angle-right text-gray-700 dark:text-gray-200 text-lg sm:text-xl"></i>
            </button>
          </>
        )}
        {/* Custom Pagination Container */}
        <div className="related-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal !bottom-0 !relative !mt-4">
          {/* Swiper will populate this. Additional custom bullet classes can be added in Swiper's pagination prop if needed. */}
        </div>
      </div>
    </section>
  );
};
