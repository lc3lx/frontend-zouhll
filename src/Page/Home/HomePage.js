import React from "react";
import { Link } from "react-router-dom";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";
import AmazonStyleHero from "../../Components/Home/AmazonStyleHero";
import AmazonStyleCategories from "../../Components/Home/AmazonStyleCategories";
import AmazonStyleProducts from "../../Components/Home/AmazonStyleProducts";
import AmazonStyleBrands from "../../Components/Home/AmazonStyleBrands";
import AmazonStyleFooter from "../../Components/Uitily/AmazonStyleFooter";
import ScrollAnimations from "../../Components/Home/ScrollAnimations";
import "../../Components/Home/AmazonStyle.css";

const HomePage = () => {
  const [items, loading] = ViewHomeProductsHook();

  return (
    <div className="amazon-homepage" style={{ background: '#ffffff' }}>
      <ScrollAnimations />
      
      {/* 1. Amazon Style Hero Carousel */}
      <AmazonStyleHero />

      {/* Main Content Container */}
      <div style={{ 
        background: "#ffffff",
        paddingTop: "20px",
        position: "relative",
        zIndex: 2
      }}>
        {/* 2. Categories Grid */}
        <div style={{ marginBottom: "20px" }}>
          <AmazonStyleCategories />
        </div>

        {/* Products Sections Container */}
        <div style={{ 
          maxWidth: "1500px", 
          margin: "0 auto"
        }}>
          {/* 3. Featured Products */}
          <AmazonStyleProducts
            products={items}
            title="المنتجات المميزة"
            loading={loading}
          />

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
        <div style={{
          background: "#fff3cd",
          margin: "0",
          padding: "30px 0",
          textAlign: "center",
          borderTop: "1px solid #e7e7e7",
          borderBottom: "1px solid #e7e7e7"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px"
          }}>
            <h2 style={{
              color: "#0f1111",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "10px"
            }}>
              🔥 عروض حصرية لفترة محدودة
            </h2>
            <p style={{
              color: "#0f1111",
              fontSize: "1.1rem",
              marginBottom: "20px"
            }}>
              وفر حتى 70% على مجموعة مختارة من المنتجات - أسعار بالدولار الأمريكي
            </p>
            <Link
              to="/products"
              style={{
                background: "#ff9900",
                color: "#0f1111",
                padding: "12px 30px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "600",
                display: "inline-block",
                transition: "all 0.2s ease",
                border: "1px solid #e47911"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e47911";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ff9900";
                e.target.style.transform = "translateY(0)";
              }}
            >
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
