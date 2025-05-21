import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { Navigation, Thumbs, A11y } from "swiper/modules";
import { ProductImage } from "../../../../../../../api/user/productData"; // Adjust path as needed

interface MainImageProps {
  images: (ProductImage & { id: string; altText: string })[];
  productName: string;
  onSwiperInstance: (swiper: SwiperCore) => void;
  thumbsSwiper: SwiperCore | null;
  onSlideChange: (swiper: SwiperCore) => void;
  isRtl: boolean;
}

export const MainImageComponent: React.FC<MainImageProps> = ({
  images,
  productName,
  onSwiperInstance,
  thumbsSwiper,
  onSlideChange,
  isRtl,
}) => {
  return (
    <div className="w-full md:flex-1 order-2 md:order-1 min-w-0 relative group/mainswiper mb-3 md:mb-0">
      <Swiper
        onSwiper={onSwiperInstance}
        modules={[Navigation, Thumbs, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".main-swiper-button-next-unique",
          prevEl: ".main-swiper-button-prev-unique",
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onSlideChange={onSlideChange}
        loop={images.length > 1}
        dir={isRtl ? "rtl" : "ltr"}
        className="w-full aspect-h-4 aspect-w-3 h-full rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id || `main-${index}`}
            className="flex items-center justify-center"
          >
            <img
              src={image.url}
              alt={image.altText || productName}
              className="block w-full h-full object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <>
          <button className="main-swiper-button-prev-unique absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full left-2 rtl:right-2 rtl:left-auto opacity-0 group-hover/mainswiper:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed">
            {/* Icon for LTR Previous / RTL Next */}
            <i
              className={`pi ${
                isRtl ? "pi-angle-right" : "pi-angle-left"
              } text-xl`}
            ></i>
          </button>
          <button className="main-swiper-button-next-unique absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full right-2 rtl:left-2 rtl:right-auto opacity-0 group-hover/mainswiper:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed">
            {/* Icon for LTR Next / RTL Previous */}
            <i
              className={`pi ${
                isRtl ? "pi-angle-left" : "pi-angle-right"
              } text-xl`}
            ></i>
          </button>
        </>
      )}
    </div>
  );
};
