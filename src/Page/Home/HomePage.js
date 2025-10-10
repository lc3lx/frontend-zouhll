import React from "react";
import HomeCategory from "../../Components/Home/HomeCategory";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import Silder from "./../../Components/Home/Silder";
import DiscountSection from "./../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";
import LoadingSpinner from "../../Components/Uitily/LoadingSpinner";

const HomePage = () => {
  const [items, loading] = ViewHomeProductsHook();

  return (
    <div className="font" style={{ minHeight: "670px" }}>
      <div className="fade-in">
        <Silder />
      </div>
      <div className="fade-in-delayed">
        <HomeCategory />
      </div>
      <div className="stagger-item">
        {loading ? (
          <div className="text-center py-5">
            <LoadingSpinner />
            <p className="mt-3 text-muted">جاري تحميل المنتجات...</p>
          </div>
        ) : (
          <CardProductsContainer
            products={items || []}
            title="الاكثر مبيعا"
            btntitle="المزيد"
            pathText="/products"
          />
        )}
      </div>
      <div className="stagger-item">
        <DiscountSection />
      </div>
      <div className="stagger-item">
        {loading ? (
          <div className="text-center py-5">
            <LoadingSpinner />
            <p className="mt-3 text-muted">جاري تحميل المنتجات...</p>
          </div>
        ) : (
          <CardProductsContainer
            products={items || []}
            title="احدث الازياء"
            btntitle="المزيد"
            pathText="/products"
          />
        )}
      </div>
      <div className="stagger-item">
        <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />
      </div>
    </div>
  );
};

export default HomePage;
