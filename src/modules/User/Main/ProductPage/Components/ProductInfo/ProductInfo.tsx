import React from "react";
import { Product } from "../../../../../../api/user/productData"; // Adjust path as needed
import { ProductName } from "./Components/ProductName";
import { ProductPriceDisplay } from "./Components/ProductPriceDisplay";
//import { ProductRating } from "./Components/ProductRating";
import { ProductShortDescription } from "./Components/ProductShortDescription";
import { ProductStockAndSku } from "./Components/ProductStockAndSku";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="text-right rtl:text-right">
      <ProductName name={product.name} />
      {/* <ProductRating
        rating={product.rating}
        numberOfReviews={product.numberOfReviews}
      /> */}
      <ProductPriceDisplay
        price={product.price}
        originalPrice={product.originalPrice}
      />
      <ProductShortDescription description={product.shortDescription} />
      <ProductStockAndSku sku={product.sku} stock={product.stock} />
    </div>
  );
};
