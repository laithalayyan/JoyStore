import React, { useState, useEffect, useMemo, useRef } from "react";
import { ProductImage } from "../../../../../api/user/productData";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";

import { Navigation, Thumbs, FreeMode, A11y } from "swiper/modules";

interface ProductImagesProps {
  mainImageUrl: string;
  additionalImages?: ProductImage[];
  productName: string;
  maxVisibleThumbnails?: number;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  mainImageUrl,
  additionalImages = [],
  productName,
  maxVisibleThumbnails = 4,
}) => {
  const allImages = useMemo(
    () => [
      { id: "main-img-id-swiper", url: mainImageUrl, altText: productName },
      ...additionalImages.map((img, index) => ({
        ...img,
        id: img.id || `gallery-thumb-${index}`,
      })),
    ],
    [mainImageUrl, additionalImages, productName]
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [mainSwiperInstance, setMainSwiperInstance] =
    useState<SwiperCore | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const desktopThumbPrevRef = useRef<HTMLButtonElement>(null);
  const desktopThumbNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initialIdx = allImages.findIndex((img) => img.url === mainImageUrl);
    const validInitialIndex = initialIdx >= 0 ? initialIdx : 0;
    if (mainSwiperInstance && !mainSwiperInstance.destroyed) {
      mainSwiperInstance.slideToLoop(validInitialIndex, 0);
    }
    setCurrentSlideIndex(validInitialIndex);
  }, [mainImageUrl, allImages, mainSwiperInstance]);

  const isRtl =
    typeof document !== "undefined" && document.documentElement.dir === "rtl";

  if (!allImages || allImages.length === 0 || !allImages[0]?.url) {
    return (
      <div className="aspect-w-3 aspect-h-4 w-full rounded-lg bg-gray-700 flex items-center justify-center">
        <i className="pi pi-image text-5xl text-gray-500"></i>
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    if (mainSwiperInstance && !mainSwiperInstance.destroyed) {
      mainSwiperInstance.slideToLoop(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 rtl:md:space-x-reverse md:max-h-[calc(80vh-2rem)] md:h-auto">
      <div className="w-full md:flex-1 order-1 md:order-1 min-w-0 relative group/mainswiper mb-3 md:mb-0">
        <Swiper
          onSwiper={setMainSwiperInstance}
          modules={[Navigation, Thumbs, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".main-swiper-button-next-unique",
            prevEl: ".main-swiper-button-prev-unique",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
          loop={allImages.length > 1}
          dir={isRtl ? "rtl" : "ltr"}
          className="w-full h-full rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700"
        >
          {allImages.map((image, index) => (
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
        {allImages.length > 1 && (
          <>
            <button className="main-swiper-button-prev-unique absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full left-2 rtl:right-2 rtl:left-auto opacity-0 group-hover/mainswiper:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed">
              <i className="pi pi-angle-right text-xl"></i>
            </button>
            <button className="main-swiper-button-next-unique absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full right-2 rtl:left-2 rtl:right-auto opacity-0 group-hover/mainswiper:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed">
              <i className="pi pi-angle-left text-xl"></i>
            </button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="w-full md:w-20 lg:w-24 flex-shrink-0 order-2 md:order-2">
          <div className="hidden md:flex flex-col items-center h-full">
            <button
              ref={desktopThumbPrevRef}
              className="custom-desktop-thumb-prev p-1.5 w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-t-md disabled:opacity-40"
            >
              <i className="pi pi-angle-up text-sm"></i>
            </button>
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Navigation, Thumbs, FreeMode, A11y]}
              direction="vertical"
              spaceBetween={8}
              slidesPerView={maxVisibleThumbnails}
              freeMode={true}
              watchSlidesProgress={true}
              navigation={{
                nextEl: ".custom-desktop-thumb-next",
                prevEl: ".custom-desktop-thumb-prev",
              }}
              className="w-full md:my-1 vertical-thumbnails-swiper"
            >
              {allImages.map((image, index) => (
                <SwiperSlide
                  key={image.id || `thumb-desktop-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all
                                                            ${
                                                              currentSlideIndex ===
                                                              index
                                                                ? "border-orange-500 scale-105 opacity-100"
                                                                : "border-transparent opacity-70 hover:opacity-100"
                                                            }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Thumb ${index}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              ref={desktopThumbNextRef}
              className="custom-desktop-thumb-next p-1.5 w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-b-md disabled:opacity-40"
            >
              <i className="pi pi-angle-down text-sm"></i>
            </button>
          </div>
          <div className="md:hidden flex space-x-2 rtl:space-x-reverse overflow-x-auto py-2">
            {allImages.map((image, index) => (
              <button
                key={image.id || `thumb-mobile-${index}`}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 aspect-square rounded-md overflow-hidden border-2 transition-colors
                                                        ${
                                                          currentSlideIndex ===
                                                          index
                                                            ? "border-orange-500"
                                                            : "border-gray-300 dark:border-gray-600 opacity-80 hover:opacity-100"
                                                        }
                                                        focus:outline-none focus:ring-1 focus:ring-orange-500`}
              >
                <img
                  src={image.url}
                  alt={image.altText || `Thumb ${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
