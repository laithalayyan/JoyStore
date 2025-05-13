import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import {
  Product,
  getProductsByCategoryId,
  getCategoryDetailsBySlug,
  CategoryWithProducts,
} from "../../../../api/user/productData";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { CategoryPageHeader } from "./Components/CategoryPageHeader";
import { FilterSortControls } from "./Components/FilterSortControls";
import { PaginationControls } from "./Components/PaginationControls";
import { ProductGrid } from "./Components/ProductGrid";
import MobileMenu from "../SideBarCategories/MobileMenu";

const SORT_OPTIONS = [
  { label: "الأحدث", value: "newest" },
  { label: "السعر: من الأقل إلى الأعلى", value: "price_asc" },
  { label: "السعر: من الأعلى إلى الأقل", value: "price_desc" },
  { label: "الاسم: أ-ي", value: "name_asc" },
  { label: "الاسم: ي-أ", value: "name_desc" },
];

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [categoryDetails, setCategoryDetails] =
    useState<CategoryWithProducts | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    Product[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS[0].value);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);

  useEffect(() => {
    if (!categorySlug) return;
    setLoading(true);
    const fetchData = async () => {
      const catDetails = await getCategoryDetailsBySlug(categorySlug);
      if (catDetails) {
        setCategoryDetails(catDetails);
        const prods = await getProductsByCategoryId(catDetails.id);
        setProducts(prods);
      } else {
        setCategoryDetails(null);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);

  useEffect(() => {
    let processedProducts = [...products];
    if (searchTerm) {
      processedProducts = processedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortOrder) {
      case "price_asc":
        processedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        processedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        processedProducts.sort((a, b) => a.name.localeCompare(b.name, "ar"));
        break;
      case "name_desc":
        processedProducts.sort((a, b) => b.name.localeCompare(a.name, "ar"));
        break;
      default:
        break;
    }

    setFilteredAndSortedProducts(processedProducts);
    setFirst(0);
  }, [products, searchTerm, sortOrder]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    /* ... loading UI ... */
  }
  if (!categoryDetails) {
    /* ... category not found UI ... */
  }

  const paginatedProducts = filteredAndSortedProducts.slice(
    first,
    first + rows
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-right rtl:text-right">
        {categoryDetails && (
          <CategoryPageHeader categoryName={categoryDetails.name} />
        )}

        <FilterSortControls
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          sortOptions={SORT_OPTIONS}
        />

        <ProductGrid products={paginatedProducts} searchTerm={searchTerm} />

        <PaginationControls
          first={first}
          rows={rows}
          totalRecords={filteredAndSortedProducts.length}
          onPageChange={onPageChange}
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
