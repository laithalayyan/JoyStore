import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { Navigation, Thumbs, FreeMode, A11y } from "swiper/modules";
import { ProductImage } from "../../../../../../api/user/productData"; // Adjust path as needed

interface ThumbnailsSwiperProps {
  images: (ProductImage & { id: string; altText: string })[];
  productName: string; // For alt text fallback
  onSwiperInstance: (swiper: SwiperCore) => void;
  onThumbnailClick: (index: number) => void;
  currentSlideIndex: number;
  maxVisibleThumbnails: number;
}

export const ThumbnailsSwiperComponent: React.FC<ThumbnailsSwiperProps> = ({
  images,
  productName,
  onSwiperInstance,
  onThumbnailClick,
  currentSlideIndex,
  maxVisibleThumbnails,
}) => {
  const thumbPrevRef = useRef<HTMLButtonElement>(null);
  const thumbNextRef = useRef<HTMLButtonElement>(null);

  if (images.length <= 1) {
    return null; // Don't render thumbnails if only one image or none
  }

  return (
    <div className="w-16 sm:w-20 flex-shrink-0 flex flex-col items-center">
      <button
        ref={thumbPrevRef}
        className="custom-desktop-thumb-prev p-1.5 w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-t-md disabled:opacity-40"
      >
        <i className="pi pi-angle-up text-sm"></i>
      </button>
      <Swiper
        onSwiper={onSwiperInstance}
        modules={[Navigation, Thumbs, FreeMode, A11y]}
        direction="vertical"
        spaceBetween={8}
        slidesPerView={maxVisibleThumbnails}
        freeMode={true}
        watchSlidesProgress={true}
        navigation={{
          nextEl: thumbNextRef.current, // Use ref directly
          prevEl: thumbPrevRef.current, // Use ref directly
        }}
        className="w-full md:my-1 vertical-thumbnails-swiper"
        // Important: Re-initialize navigation when refs are available
        // Swiper might initialize before refs are assigned to buttons.
        // A common pattern is to update swiper params after mount.
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = thumbPrevRef.current;
            swiper.params.navigation.nextEl = thumbNextRef.current;
          }
          swiper.navigation.destroy(); // Destroy default/empty nav
          swiper.navigation.init(); // Initialize with correct elements
          swiper.navigation.update(); // Update states
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id || `thumb-desktop-${index}`}
            onClick={() => onThumbnailClick(index)}
            className={`w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all
              ${
                currentSlideIndex === index
                  ? "border-orange-500 scale-105 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
          >
            <img
              src={image.url}
              alt={image.altText || `Thumb ${index} for ${productName}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={thumbNextRef}
        className="custom-desktop-thumb-next p-1.5 w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-b-md disabled:opacity-40"
      >
        <i className="pi pi-angle-down text-sm"></i>
      </button>
    </div>
  );
};
