import React, { useState, useEffect, useMemo } from "react";
import type { Swiper as SwiperCore } from "swiper";
import { ProductImage as ProductImagePropType } from "../../../../../../api/user/productData"; // Adjust path
import { ThumbnailsSwiperComponent } from "./Components/ThumbnailsSwiperComponent";
import { MainImageComponent } from "./Components/MainImageComponent";

interface ProductImagesProps {
  mainImageUrl: string;
  additionalImages?: ProductImagePropType[];
  productName: string;
  maxVisibleThumbnails?: number;
}

// Define a consistent internal image type
type InternalImageType = ProductImagePropType & { id: string; altText: string };

export const ProductImages: React.FC<ProductImagesProps> = ({
  mainImageUrl,
  additionalImages = [],
  productName,
  maxVisibleThumbnails = 4,
}) => {
  const allImages: InternalImageType[] = useMemo(
    () => [
      { id: "main-img-id-swiper", url: mainImageUrl, altText: productName },
      ...additionalImages.map((img, index) => ({
        ...img,
        id: String(img.id || `gallery-thumb-${index}`), // Ensure ID exists and convert to string
        altText: img.altText || `${productName} - image ${index + 2}`, // Provide default alt text
      })),
    ],
    [mainImageUrl, additionalImages, productName]
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [mainSwiperInstance, setMainSwiperInstance] =
    useState<SwiperCore | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const initialIdx = allImages.findIndex((img) => img.url === mainImageUrl);
    const validInitialIndex = initialIdx >= 0 ? initialIdx : 0;
    if (mainSwiperInstance && !mainSwiperInstance.destroyed) {
      // Use slideToLoop if loop is enabled and more than 1 image, otherwise slideTo
      if (allImages.length > 1 && mainSwiperInstance.params.loop) {
        mainSwiperInstance.slideToLoop(validInitialIndex, 0);
      } else {
        mainSwiperInstance.slideTo(validInitialIndex, 0);
      }
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
      if (allImages.length > 1 && mainSwiperInstance.params.loop) {
        mainSwiperInstance.slideToLoop(index);
      } else {
        mainSwiperInstance.slideTo(index);
      }
    }
  };

  const handleMainSwiperSlideChange = (swiper: SwiperCore) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  return (
    <div className="flex flex-row-reverse space-x-2 rtl:space-x-reverse h-[60vh] sm:h-[70vh] md:h-auto md:max-h-[calc(80vh-2rem)]">
      <MainImageComponent
        images={allImages}
        productName={productName}
        onSwiperInstance={setMainSwiperInstance}
        thumbsSwiper={thumbsSwiper}
        onSlideChange={handleMainSwiperSlideChange}
        isRtl={isRtl}
      />
      {allImages.length > 1 && ( // Conditionally render thumbnails
        <ThumbnailsSwiperComponent
          images={allImages}
          productName={productName}
          onSwiperInstance={setThumbsSwiper}
          onThumbnailClick={handleThumbnailClick}
          currentSlideIndex={currentSlideIndex}
          maxVisibleThumbnails={maxVisibleThumbnails}
        />
      )}
    </div>
  );
};
