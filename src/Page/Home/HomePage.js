import React from "react";
import { Link } from "react-router-dom";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";
import AmazonStyleHero from "../../Components/Home/AmazonStyleHero";
import AmazonStyleCategories from "../../Components/Home/AmazonStyleCategories";
import AmazonStyleProducts from "../../Components/Home/AmazonStyleProducts";
import AmazonStyleBrands from "../../Components/Home/AmazonStyleBrands";
import OffersSlider from "../../Components/Home/OffersSlider";
import ScrollAnimations from "../../Components/Home/ScrollAnimations";
import ErrorMessage from "../../Components/Common/ErrorMessage";
import "../../Components/Home/AmazonStyle.css";

const HomePage = () => {
  const [items, loading, error] = ViewHomeProductsHook();

  return (
    <div
      className="amazon-homepage"
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #dee2e6 50%, #ced4da 75%, #adb5bd 100%)",
        minHeight: "100vh",
      }}
    >
      <ScrollAnimations />

      {/* 1. Amazon Style Hero Carousel */}
      <AmazonStyleHero />

      {/* Main Content Container */}
      <div
        style={{
          background: "transparent",
          paddingTop: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 2. Categories Grid - كارد عائم */}
        <div
          style={{
            marginBottom: "30px",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            margin: "30px auto",
            maxWidth: "1500px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AmazonStyleCategories />
        </div>

        {/* 3. Featured Products - كارد عائم */}
        <div
          style={{
            maxWidth: "1500px",
            margin: "30px auto",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
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
        </div>

        {/* 4. Offers Slider */}
        <OffersSlider />

        {/* 5. Best Sellers - كارد عائم */}
        <div
          style={{
            maxWidth: "1500px",
            margin: "30px auto",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AmazonStyleProducts
            products={items}
            title="الأكثر مبيعاً"
            loading={loading}
          />
        </div>

        {/* 5. Brands - كارد عائم */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            margin: "30px auto",
            maxWidth: "1500px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AmazonStyleBrands />
        </div>

        {/* 6. New Arrivals - كارد عائم */}
        <div
          style={{
            maxWidth: "1500px",
            margin: "30px auto",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AmazonStyleProducts
            products={items}
            title="وصل حديثاً"
            loading={loading}
          />
        </div>

        {/* 7. Recommended Products - كارد عائم */}
        <div
          style={{
            maxWidth: "1500px",
            margin: "30px auto",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <AmazonStyleProducts
            products={items}
            title="منتجات مقترحة لك"
            loading={loading}
          />
        </div>

        {/* Special Offers Banner - كارد عائم */}
        <div
          className="theme-bg-light theme-border-medium py-5 text-center"
          style={{
            background:
              "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 25%, #ff9ff3 50%, #54a0ff 75%, #5f27cd 100%)",
            color: "white",
            borderRadius: "20px",
            margin: "30px auto",
            maxWidth: "1200px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="container">
            <h2
              className="theme-text-primary mb-3"
              style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                color: "#fff",
                textShadow: "0 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              🔥 عروض حصرية لفترة محدودة
            </h2>
            <p
              className="theme-text-secondary mb-4"
              style={{
                fontSize: "1.2rem",
                color: "#f8f9fa",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              وفر حتى 70% على مجموعة مختارة من المنتجات - أسعار بالدولار
              الأمريكي
            </p>
            <Link
              to="/products"
              className="theme-btn theme-btn-amazon"
              style={{
                background: "linear-gradient(135deg, #ff9f43 0%, #ff6348 100%)",
                border: "none",
                borderRadius: "30px",
                padding: "15px 40px",
                fontSize: "1.2rem",
                fontWeight: "700",
                boxShadow: "0 8px 25px rgba(255,159,67,0.4)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 12px 30px rgba(255,159,67,0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 25px rgba(255,159,67,0.4)";
              }}
            >
              تسوق العروض الآن
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <AmazonStyleFooter /> */}
    </div>
  );
};

export default HomePage;
