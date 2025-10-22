import React from "react";
import { Link } from "react-router-dom";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";
import AmazonStyleHero from "../../Components/Home/AmazonStyleHero";
import AmazonStyleCategories from "../../Components/Home/AmazonStyleCategories";
import AmazonStyleProducts from "../../Components/Home/AmazonStyleProducts";
import AmazonStyleBrands from "../../Components/Home/AmazonStyleBrands";
import AmazonStyleFooter from "../../Components/Uitily/AmazonStyleFooter";
import ScrollAnimations from "../../Components/Home/ScrollAnimations";
import ErrorMessage from "../../Components/Common/ErrorMessage";
import "../../Components/Home/AmazonStyle.css";

const HomePage = () => {
  const [items, loading, error] = ViewHomeProductsHook();

  return (
    <div className="amazon-homepage" style={{ background: "#ffffff" }}>
      <ScrollAnimations />

      {/* 1. Amazon Style Hero Carousel */}
      <AmazonStyleHero />

      {/* Main Content Container */}
      <div
        style={{
          background: "#ffffff",
          paddingTop: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 2. Categories Grid */}
        <div style={{ marginBottom: "20px" }}>
          <AmazonStyleCategories />
        </div>

        {/* Products Sections Container */}
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {/* 3. Featured Products */}
          {error ? (
            <ErrorMessage
              error={error}
              onRetry={() => window.location.reload()}
              title="خطأ في تحميل المنتجات"
            />
          ) : (
            <AmazonStyleProducts
              products={items}
              title="المنتجات المميزة"
              loading={loading}
            />
          )}

          {/* 4. Best Sellers */}
          <AmazonStyleProducts
            products={items}
            title="الأكثر مبيعاً"
            loading={loading}
          />

          {/* 5. Brands */}
          <AmazonStyleBrands />

          {/* 6. New Arrivals */}
          <AmazonStyleProducts
            products={items}
            title="وصل حديثاً"
            loading={loading}
          />

          {/* 7. Recommended Products */}
          <AmazonStyleProducts
            products={items}
            title="منتجات مقترحة لك"
            loading={loading}
          />
        </div>

        {/* Special Offers Banner */}
        <div className="theme-bg-light theme-border-medium py-5 text-center">
          <div className="container">
            <h2
              className="theme-text-primary mb-3"
              style={{ fontSize: "2rem", fontWeight: "700" }}
            >
              🔥 عروض حصرية لفترة محدودة
            </h2>
            <p
              className="theme-text-secondary mb-4"
              style={{ fontSize: "1.1rem" }}
            >
              وفر حتى 70% على مجموعة مختارة من المنتجات - أسعار بالدولار
              الأمريكي
            </p>
            <Link to="/products" className="theme-btn theme-btn-amazon">
              تسوق العروض الآن
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AmazonStyleFooter />
    </div>
  );
};

export default HomePage;
