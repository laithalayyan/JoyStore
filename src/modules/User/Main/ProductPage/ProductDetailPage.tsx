import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, Product } from "../../../../api/user/productData";
import { Header } from "../Header/Header";
import { ProductActions } from "./Components/ProductActions/ProductActions";
import { ProductDescription } from "./Components/ProductDescription";
import { ProductImages } from "./Components/ProductImages/ProductImages";
import { ProductInfo } from "./Components/ProductInfo/ProductInfo";
import MobileMenu from "../SideBarCategories/MobileMenu";
import { ProductPath } from "./Components/ProductPath";
import { ProductShippingInfoTable } from "./Components/ShippingTable/ProductShippingInfoTable";
import { RelatedProducts } from "./Components/RelatedProducts";

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (!productId) {
      setError("لم يتم تحديد المنتج.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getProductById(productId)
      .then((fetchedProduct) => {
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("لم يتم العثور على المنتج.");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("حدث خطأ أثناء تحميل المنتج.");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="container mx-auto p-6 text-center">
          <i className="pi pi-spin pi-spinner text-3xl text-orange-500 dark:text-orange-400"></i>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            جاري تحميل المنتج...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="container mx-auto p-6 text-center">
          <i className="pi pi-exclamation-triangle text-3xl text-red-500 dark:text-red-400"></i>
          <h1 className="text-2xl font-semibold my-4 text-gray-800 dark:text-gray-100">
            {error || "لم يتم العثور على المنتج"}
          </h1>
          <Link
            to="/"
            className="text-orange-600 hover:underline dark:text-orange-400"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductPath
          productName={product.name}
          categoryId={product.categoryId}
          categoryName={product.categoryName}
        />
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
          <div className="w-full md:w-5/12 lg:w-6/12 xl:w-5/12 order-1 md:order-2 md:sticky md:top-28 md:h-[calc(100vh-8rem)] md:overflow-y-hidden">
            <ProductImages
              mainImageUrl={product!.imageUrl}
              additionalImages={product!.images}
              productName={product!.name}
              maxVisibleThumbnails={3.5}
            />
          </div>
          <div className="w-full md:w-7/12 lg:w-6/12 xl:w-7/12 order-2 md:order-1 mt-6 md:mt-0">
            <ProductInfo product={product!} />
            <ProductActions product={product!} />
            <ProductShippingInfoTable />
          </div>
        </div>
        <ProductDescription description={product.description} />

        {/* Related Products Section */}
        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
          className="mt-6 md:mt-6" // Add some top margin
        />
      </div>
      {isMobileMenuOpen && (
        <MobileMenu
          isMobileMenuOpen={true}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </div>
  );
};
