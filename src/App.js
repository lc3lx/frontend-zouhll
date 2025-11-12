import HomePage from "./Page/Home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarLogin from "./Components/Uitily/NavBarLogin";
import Footer from "./Components/Uitily/Footer";
import LoginPage from "./Page/Auth/LoginPage";
import RegisterPage from "./Page/Auth/RegisterPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetalisPage from "./Page/Products/ProductDetalisPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethoudPage from "./Page/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./Page/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "./Page/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Page/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./Page/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "./Page/User/UserFavoriteProductsPage";
import UserAllAddresPage from "./Page/User/UserAllAddresPage";
import UserAddAddressPage from "./Page/User/UserAddAddressPage";
import UserEditAddressPage from "./Page/User/UserEditAddressPage";
import UserProfilePage from "./Page/User/UserProfilePage";
import UserWallet from "./Page/User/UserWallet";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductsPage";
import AdminEditCategoryPage from "./Page/Admin/AdminEditCategoryPage";
import AdminEditBrandPage from "./Page/Admin/AdminEditBrandPage";
import AdminAllCategoriesPage from "./Page/Admin/AdminAllCategoriesPage";
import AdminAllBrandsPage from "./Page/Admin/AdminAllBrandsPage";
import AdminAllSizesPage from "./Page/Admin/AdminAllSizesPage";
import AdminAllColorsPage from "./Page/Admin/AdminAllColorsPage";
import AdminAllStoresPage from "./Page/Admin/AdminAllStoresPage";
import AdminRechargeCodes from "./Page/Admin/AdminRechargeCodes";
import AdminAddExchangeRatePage from "./Page/Admin/AdminAddExchangeRatePage";
import AdminAllExchangeRatesPage from "./Page/Admin/AdminAllExchangeRatesPage";
import AdminAllSubcategoriesPage from "./Page/Admin/AdminAllSubcategoriesPage";
import AdminAddSecondaryCategoryPage from "./Page/Admin/AdminAddSecondaryCategoryPage";
import AdminAllSecondaryCategoriesPage from "./Page/Admin/AdminAllSecondaryCategoriesPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordPage";
import RsetPasswordPage from "./Page/Auth/ResetPasswordPage";
import AdminAllCouponsPage from "./Page/Admin/AdminAllCouponsPage";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Page/Admin/AdminEditCouponPage";
import AdminAllOffersPage from "./Page/Admin/AdminAllOffersPage";
import ProtectedRouteHook from "./hook/auth/protected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import ScrollToTop from "./Components/Uitily/ScrollToTop";
import ProductsByCategory from "./Page/Products/ProductsByCategory";
import ProductsByBrand from "./Page/Products/ProductsByBrand";
import ProductsBySubcategory from "./Page/Products/ProductsBySubcategory";
import ModernAllCategoryPage from "./Page/Category/ModernAllCategoryPage";
import ZuhalAI from "./Components/AI/ZuhalAI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "./Api/client";
import { categoryTreeCache } from "./Components/Navigation/CategoryDropdown";
import { setCategoryHierarchy } from "./redux/actions/categoryAction";

function App() {
  const [isUser, isAdmin] = ProtectedRouteHook();
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;
    async function prefetchCategoriesTree() {
      try {
        // جلب كل التصنيفات الرئيسية
        const catRes = await api.getCategories({ limit: 100, sort: "name" });
        const categories = catRes?.data || [];

        // بناء الفئات الهرمية
        const hierarchyPromises = categories.map(async (cat) => {
          if (cancelled) return null;
          try {
            const [subRes, secAllRes] = await Promise.all([
              api.getSubcategories({
                category: cat._id,
                limit: 100,
                sort: "name",
              }),
              api.getSecondaryCategories({
                category: cat._id,
                limit: 1000,
                sort: "name",
              }),
            ]);
            const subcategories = subRes?.data || [];
            const allSecondary = secAllRes?.data || [];
            const secBySubId = allSecondary.reduce((acc, item) => {
              const key = item.subCategory?._id || item.subCategory;
              if (!key) return acc;
              if (!acc[key]) acc[key] = [];
              acc[key].push(item);
              return acc;
            }, {});
            const subWithSecondary = subcategories.map((sub) => ({
              ...sub,
              secondaryCategories: secBySubId[sub._id] || [],
            }));

            // حفظ في cache محلي
            categoryTreeCache.set(cat._id, {
              data: { ...cat, subcategories: subWithSecondary },
              expireAt: Date.now() + 60 * 1000,
            });

            return {
              ...cat,
              subcategories: subWithSecondary,
            };
          } catch (_) {
            return {
              ...cat,
              subcategories: [],
            };
          }
        });

        const hierarchyResult = await Promise.all(hierarchyPromises);

        // حفظ الفئات الهرمية في Redux للاستخدام في الصفحة الرئيسية
        const hierarchyData = {
          categories: hierarchyResult.filter(Boolean),
          totalCategories: hierarchyResult.filter(Boolean).length,
          totalSubcategories: hierarchyResult.reduce(
            (sum, cat) => sum + (cat?.subcategories?.length || 0),
            0
          ),
          totalSecondaryCategories: hierarchyResult.reduce(
            (sum, cat) =>
              sum +
              (cat?.subcategories?.reduce(
                (subSum, sub) =>
                  subSum + (sub?.secondaryCategories?.length || 0),
                0
              ) || 0),
            0
          ),
        };

        dispatch(setCategoryHierarchy(hierarchyData));
      } catch (_) {}
    }
    prefetchCategoriesTree();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return (
    <div className="font">
      <BrowserRouter>
        <NavBarLogin />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/categories" element={<ModernAllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/electronics" element={<ShopProductsPage />} />
          <Route path="/fashion" element={<ShopProductsPage />} />
          <Route path="/home" element={<ShopProductsPage />} />
          <Route
            path="/user/forget-password"
            element={<ForgetPasswordPage />}
          />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<RsetPasswordPage />} />
          <Route
            path="/products/category/:id"
            element={<ProductsByCategory />}
          />
          <Route path="/products/brand/:id" element={<ProductsByBrand />} />
          <Route
            path="/products/subcategory/:id"
            element={<ProductsBySubcategory />}
          />
          <Route
            path="/products/secondary-category/:id"
            element={<ProductsBySubcategory />}
          />

          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route
              path="/admin/allproducts"
              element={<AdminAllProductsPage />}
            />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetalisPage />}
            />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route
              path="/admin/addcategory"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/allcategories"
              element={<AdminAllCategoriesPage />}
            />
            <Route path="/admin/allbrands" element={<AdminAllBrandsPage />} />
            <Route path="/admin/allstores" element={<AdminAllStoresPage />} />
            <Route path="/admin/allsizes" element={<AdminAllSizesPage />} />
            <Route path="/admin/allcolors" element={<AdminAllColorsPage />} />
            <Route
              path="/admin/addsubcategory"
              element={<AdminAddSubCategoryPage />}
            />
            <Route
              path="/admin/allsubcategories"
              element={<AdminAllSubcategoriesPage />}
            />
            <Route
              path="/admin/add-secondary-category"
              element={<AdminAddSecondaryCategoryPage />}
            />
            <Route
              path="/admin/all-secondary-categories"
              element={<AdminAllSecondaryCategoriesPage />}
            />
            <Route
              path="/admin/addproduct"
              element={<AdminAddProductsPage />}
            />
            <Route path="/admin/allcoupons" element={<AdminAllCouponsPage />} />
            <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
            <Route
              path="/admin/editcoupon/:id"
              element={<AdminEditCouponPage />}
            />
            <Route path="/admin/all-offers" element={<AdminAllOffersPage />} />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProductsPage />}
            />
            <Route
              path="/admin/editcategory/:id"
              element={<AdminEditCategoryPage />}
            />
            <Route
              path="/admin/editbrand/:id"
              element={<AdminEditBrandPage />}
            />
            <Route
              path="/admin/recharge-codes"
              element={<AdminRechargeCodes />}
            />
            <Route
              path="/admin/add-exchange-rate"
              element={<AdminAddExchangeRatePage />}
            />
            <Route
              path="/admin/all-exchange-rates"
              element={<AdminAllExchangeRatesPage />}
            />
          </Route>

          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route path="/user/allorders" element={<UserAllOrdersPage />} />
            <Route
              path="/order/paymethoud"
              element={<ChoosePayMethoudPage />}
            />
            <Route
              path="/user/favoriteproducts"
              element={<UserFavoriteProductsPage />}
            />
            <Route path="/user/addresses" element={<UserAllAddresPage />} />
            <Route path="/user/add-address" element={<UserAddAddressPage />} />
            <Route
              path="/user/edit-address/:id"
              element={<UserEditAddressPage />}
            />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route path="/user/wallet" element={<UserWallet />} />
          </Route>
        </Routes>
        <Footer />
        <ScrollToTop />
        <ZuhalAI />
      </BrowserRouter>
    </div>
  );
}

export default App;
