import React from "react";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";
import SimpleElegantHero from "../../Components/Home/SimpleElegantHero";
import StoriesSection from "../../Components/Home/StoriesSection";
import CategoriesSlider from "../../Components/Home/CategoriesSlider";
import FeaturedProducts from "../../Components/Home/FeaturedProducts";
import TrendingCategories from "../../Components/Home/TrendingCategories";
import DiscountSection from "./../../Components/Home/DiscountSection";
import QuickActions from "../../Components/Home/QuickActions";
import BrandFeatured from "../../Components/Brand/BrandFeatured";
import ScrollAnimations from "../../Components/Home/ScrollAnimations";
import ModernTestimonials from "../../Components/Home/ModernTestimonials";
import ModernFeatures from "../../Components/Home/ModernFeatures";
import ModernStats from "../../Components/Home/ModernStats";
import ModernCTA from "../../Components/Home/ModernCTA";
import "../../Components/Home/AnimatedPage.css";

const HomePage = () => {
  const [items, loading] = ViewHomeProductsHook();

  return (
    <div className="animated-page" style={{ minHeight: "670px" }}>
      <ScrollAnimations />
      
      {/* 1. Hero Section - First impression */}
      <div className="animate-on-scroll">
        <SimpleElegantHero />
      </div>

      {/* 2. Stories - Engaging content like Instagram */}
      <div className="animate-on-scroll animate-scale">
        <StoriesSection />
      </div>

      {/* 3. Modern Features - Enhanced trust signals */}
      <div className="animate-on-scroll animate-left">
        <ModernFeatures />
      </div>

      {/* 4. Categories Slider - Easy navigation */}
      <div className="animate-on-scroll animate-right">
        <CategoriesSlider />
      </div>

      {/* 5. Featured Products - Main products showcase */}
      <div className="animate-on-scroll animate-scale">
        <FeaturedProducts
          products={items}
          title="المنتجات المميزة"
          loading={loading}
        />
      </div>

      {/* 6. Trending Categories - Visual discovery */}
      <div 
        className="animate-on-scroll animate-left"
        style={{ 
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
        }}
      >
        <TrendingCategories />
      </div>

      {/* 7. Discount Section - Promotional content */}
      <div className="animate-on-scroll animate-scale">
        <DiscountSection />
      </div>

      {/* 8. Best Sellers - Social proof */}
      <div 
        className="animate-on-scroll animate-right"
        style={{ 
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
        }}
      >
        <FeaturedProducts
          products={items}
          title="الأكثر مبيعاً"
          loading={loading}
        />
      </div>

      {/* 9. Modern Testimonials - Enhanced social proof */}
      <div className="animate-on-scroll animate-scale">
        <ModernTestimonials />
      </div>

      {/* 10. Modern Stats - Impressive numbers */}
      <div className="animate-on-scroll animate-scale">
        <ModernStats />
      </div>

      {/* 11. Quick Actions - Service highlights */}
      <div className="animate-on-scroll animate-left">
        <QuickActions />
      </div>

      {/* 12. New Arrivals - Fresh content */}
      <div className="animate-on-scroll animate-right">
        <FeaturedProducts
          products={items}
          title="وصل حديثاً"
          loading={loading}
        />
      </div>

      {/* 13. Brands - Trust and variety */}
      <div 
        className="animate-on-scroll animate-left"
        style={{ 
          padding: "80px 0", 
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
        }}
      >
        <BrandFeatured title="أشهر الماركات" btntitle="المزيد" />
      </div>

      {/* 14. Modern CTA - Enhanced engagement and retention */}
      <div className="animate-on-scroll animate-scale">
        <ModernCTA />
      </div>
    </div>
  );
};

export default HomePage;
