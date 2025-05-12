// src/modules/User/Main/Categories/CategoryPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Header/Header"; // Adjust path
import {
  Product,
  getProductsByCategoryId,
  getCategoryDetailsBySlug,
  CategoryWithProducts,
} from "../../../../api/user/productData"; // Adjust path
import { Paginator } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ProductCard } from "../MainPage/Components/ProductCard";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS[0].value);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12); // Products per page

  useEffect(() => {
    if (!categorySlug) return;
    setLoading(true);
    const fetchData = async () => {
      const catDetails = await getCategoryDetailsBySlug(categorySlug);
      if (catDetails) {
        setCategoryDetails(catDetails);
        const prods = await getProductsByCategoryId(catDetails.id);
        setProducts(prods);
        setFilteredProducts(prods); // Initially all products
      } else {
        // Handle category not found
        setCategoryDetails(null);
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);

  // Filtering and Sorting Logic
  useEffect(() => {
    let currentProducts = [...products];

    // Filter by search term (name)
    if (searchTerm) {
      currentProducts = currentProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOrder) {
      case "price_asc":
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        currentProducts.sort((a, b) => a.name.localeCompare(b.name, "ar")); // Arabic localeCompare
        break;
      case "name_desc":
        currentProducts.sort((a, b) => b.name.localeCompare(a.name, "ar"));
        break;
      // case 'newest': // Requires a 'createdAt' field on product
      //   currentProducts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      //   break;
      default:
        // Default sort or 'newest' could be just the original order from API
        break;
    }
    setFilteredProducts(currentProducts);
    setFirst(0); // Reset pagination when filters/sort change
  }, [products, searchTerm, sortOrder]);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // For Header's mobile menu, not strictly needed here but good for consistency
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header onMobileMenuToggle={() => {}} isMobileMenuOpen={false} />
        <div className="container mx-auto p-6 text-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2em" }}></i>
          <p className="mt-2">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  if (!categoryDetails) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header onMobileMenuToggle={() => {}} isMobileMenuOpen={false} />
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">
            لم يتم العثور على الفئة
          </h1>
          <Link to="/" className="text-orange-600 hover:underline">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const paginatedProducts = filteredProducts.slice(first, first + rows);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* Mobile menu rendering if needed on this page */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-right rtl:text-right">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <nav className="text-sm mb-2" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex space-x-2 rtl:space-x-reverse">
              <li className="flex items-center">
                <Link
                  to="/"
                  className="text-gray-500 dark:text-gray-400 hover:text-orange-600"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="flex items-center">
                <i className="pi pi-angle-left rtl:pi-angle-right mx-2 text-gray-400"></i>
                <span className="text-gray-700 dark:text-gray-200 font-semibold">
                  {categoryDetails.name}
                </span>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {categoryDetails.name}
          </h1>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto sm:flex-grow">
            <span className="p-input-icon-left rtl:p-input-icon-right w-full">
              <i className="pi pi-search" />
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث داخل الفئة..."
                className="w-full p-inputtext-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </span>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <Dropdown
              value={sortOrder}
              options={SORT_OPTIONS}
              onChange={(e) => setSortOrder(e.value)}
              placeholder="ترتيب حسب"
              className="w-full p-dropdown-sm dark:bg-gray-700 dark:border-gray-600 [&_.p-dropdown-label]:text-right"
              panelClassName="dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length > rows && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredProducts.length}
                onPageChange={onPageChange}
                className="mt-8 justify-center"
                template={{
                  layout:
                    "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
                  CurrentPageReport: (options) => {
                    return (
                      <span
                        style={{
                          color: "var(--text-color)",
                          userSelect: "none",
                          width: "120px",
                          textAlign: "center",
                        }}
                      >
                        {options.first} - {options.last} of{" "}
                        {options.totalRecords}
                      </span>
                    );
                  },
                }}
              />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">
            {searchTerm
              ? "لم يتم العثور على منتجات تطابق بحثك."
              : "لا توجد منتجات في هذه الفئة حاليًا."}
          </p>
        )}
      </div>
    </div>
  );
};
