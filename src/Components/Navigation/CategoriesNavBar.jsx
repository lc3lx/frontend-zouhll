import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCurrentCategories from "../../hook/categories/useCurrentCategories";
import CategoryDropdown from "./CategoryDropdown";
import LoadingSpinner from "../Common/LoadingSpinner";

const CategoriesNavBar = ({ className = "" }) => {
  const { data: categories, loading, error } = useCurrentCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navRef = useRef(null);

  // تنظيف timeout عند unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // دالة إظهار القائمة المنسدلة
  const handleMouseEnter = (category) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(category);
    setShowDropdown(true);
  };

  // دالة إخفاء القائمة المنسدلة مع تأخير
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setActiveCategory(null);
    }, 200); // تأخير 200ms لتحسين UX
  };

  // منع إخفاء القائمة عند تمرير الماوس على القائمة نفسها
  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // إخفاء القائمة عند مغادرة القائمة المنسدلة
  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setActiveCategory(null);
    }, 200);
  };

  if (loading) {
    return (
      <div className={`categories-navbar ${className}`}>
        <Container>
          <div className="d-flex justify-content-center py-3">
            <LoadingSpinner size="sm" text="جاري تحميل التصنيفات..." />
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`categories-navbar ${className}`}>
        <Container>
          <div className="text-center py-3">
            <small className="theme-text-muted">خطأ في تحميل التصنيفات</small>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={`categories-navbar ${className}`} ref={navRef}>
      <Container>
        <nav className="categories-nav">
          <ul className="categories-list">
            {/* رابط "جميع الفئات" */}
            <li className="category-item">
              <Link to="/products" className="category-link all-categories">
                <i className="fas fa-th-large me-2"></i>
                جميع الفئات
              </Link>
            </li>

            {/* التصنيفات الرئيسية */}
            {categories.slice(0, 10).map((category) => (
              <li
                key={category._id}
                className={`category-item ${
                  activeCategory?._id === category._id ? "active" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={`/products/category/${category._id}`}
                  className="category-link"
                >
                  {category.name}
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <i className="fas fa-chevron-down ms-1"></i>
                    )}
                </Link>
              </li>
            ))}

            {/* رابط "المزيد" إذا كان هناك تصنيفات أكثر */}
            {categories.length > 10 && (
              <li className="category-item">
                <Link
                  to="/categories"
                  className="category-link more-categories"
                >
                  المزيد
                  <i className="fas fa-ellipsis-h ms-1"></i>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>

      {/* القائمة المنسدلة */}
      {showDropdown && activeCategory && (
        <CategoryDropdown
          category={activeCategory}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          onClose={() => {
            setShowDropdown(false);
            setActiveCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoriesNavBar;
