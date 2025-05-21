import { Header } from "../../Header/Header";
import MobileMenu from "../../SideBarCategories/MobileMenu";

const LoadingSpinner = () => (
  <div className="container mx-auto p-6 text-center">
    <i className="pi pi-spin pi-spinner text-3xl text-orange-500 dark:text-orange-400"></i>
    <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
      جاري تحميل المفضلة...
    </p>
  </div>
);

const LoadingFav = ({
  toggleMobileMenu,
  isMobileMenuOpen,
}: {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}) => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header
      onMobileMenuToggle={toggleMobileMenu}
      isMobileMenuOpen={isMobileMenuOpen}
    />
    <LoadingSpinner />
    {isMobileMenuOpen && (
      <MobileMenu isMobileMenuOpen={true} toggleMobileMenu={toggleMobileMenu} />
    )}
  </div>
);

export default LoadingFav;
