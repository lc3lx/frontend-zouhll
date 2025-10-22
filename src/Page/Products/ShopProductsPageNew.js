import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import ProductsToolbar from "../../Components/Products/ProductsToolbar";
import ProductsFilter from "../../Components/Products/ProductsFilter";
import Pagination from "../../Components/Uitily/Pagination";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import ErrorMessage from "../../Components/Common/ErrorMessage";
import ProductCardSkeleton from "../../Components/Common/ProductCardSkeleton";
import {
  useProductsList,
  useProductSearch,
} from "../../hook/products/useProducts";
import { useAllCategories } from "../../hook/categories/useCategories";
import { useAllBrands } from "../../hook/brands/useBrands";
import { parseUrlParams } from "../../Api/queryBuilder";

const ShopProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);

  // Parse URL parameters
  const urlFilters = parseUrlParams(searchParams);
  const {
    keyword = "",
    category = "",
    brand = "",
    minPrice = "",
    maxPrice = "",
    page = 1,
    sort = "-createdAt",
  } = urlFilters;

  // Build filters object
  const filters = {
    page: parseInt(page) || 1,
    limit: 20,
    sort: sortBy === "default" ? sort : sortBy,
    keyword: keyword || undefined,
    category: category || undefined,
    brand: brand || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  };

  // Use appropriate hook based on whether we have a search keyword
  const productsQuery = keyword
    ? useProductSearch(keyword, filters)
    : useProductsList(filters);

  const categoriesQuery = useAllCategories();
  const brandsQuery = useAllBrands();

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch,
  } = productsQuery;

  // Extract products and pagination from response
  const products = productsData?.data || [];
  const pagination = productsData?.paginationResult || {};
  const results = productsData?.results || 0;

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    const newParams = new URLSearchParams(searchParams);
    if (newSort === "default") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", newSort);
    }
    newParams.delete("page"); // Reset to first page when sorting
    setSearchParams(newParams);
  };

  // Handle view mode change
  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
  };

  // Handle filter toggle
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const newParams = new URLSearchParams(searchParams);

    // Update URL parameters
    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];
      if (value && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    newParams.delete("page"); // Reset to first page when filtering
    setSearchParams(newParams);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="theme-bg-secondary min-vh-100">
        <CategoryHeader />

        <Container fluid className="py-4">
          <Row>
            {/* Sidebar Filter */}
            <Col
              lg={3}
              className={`${showFilter ? "d-block" : "d-none d-lg-block"}`}
            >
              <div className="theme-card p-4 mb-4">
                <h5 className="theme-text-primary mb-3">تصفية المنتجات</h5>
                <ProductsFilter
                  categories={categoriesQuery.data?.data || []}
                  brands={brandsQuery.data?.data || []}
                  onFilterChange={handleFilterChange}
                  currentFilters={urlFilters}
                  loading={categoriesQuery.loading || brandsQuery.loading}
                />
              </div>
            </Col>

            {/* Main Content */}
            <Col lg={9}>
              {/* Toolbar */}
              <div className="theme-card p-3 mb-4">
                <ProductsToolbar
                  sortBy={sortBy}
                  viewMode={viewMode}
                  onSortChange={handleSortChange}
                  onViewModeChange={handleViewModeChange}
                  onToggleFilter={toggleFilter}
                  showFilter={showFilter}
                  results={results}
                  loading={productsLoading}
                />
              </div>

              {/* Products Grid */}
              <div className="mb-4">
                {productsError ? (
                  <ErrorMessage
                    error={productsError}
                    onRetry={refetch}
                    title="خطأ في تحميل المنتجات"
                  />
                ) : productsLoading ? (
                  <Row>
                    <ProductCardSkeleton
                      count={8}
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    />
                  </Row>
                ) : products.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="theme-card p-5">
                      <i
                        className="fas fa-search theme-text-muted mb-3"
                        style={{ fontSize: "3rem" }}
                      ></i>
                      <h4 className="theme-text-primary mb-3">
                        لا توجد منتجات
                      </h4>
                      <p className="theme-text-secondary">
                        {keyword
                          ? `لم يتم العثور على منتجات تحتوي على "${keyword}"`
                          : "لا توجد منتجات متاحة حالياً"}
                      </p>
                      {keyword && (
                        <button
                          onClick={() => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.delete("keyword");
                            setSearchParams(newParams);
                          }}
                          className="theme-btn theme-btn-primary mt-3"
                        >
                          عرض جميع المنتجات
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Row>
                    {products.map((product, index) => (
                      <Col
                        key={product._id || index}
                        lg={viewMode === "grid" ? 3 : 12}
                        md={viewMode === "grid" ? 4 : 12}
                        sm={viewMode === "grid" ? 6 : 12}
                        className="mb-4 theme-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ProductCard product={product} viewMode={viewMode} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>

              {/* Pagination */}
              {pagination.numberOfPages > 1 && (
                <div className="d-flex justify-content-center">
                  <Pagination
                    pageCount={pagination.numberOfPages}
                    currentPage={pagination.currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

// Simple Product Card Component (you can replace with existing one)
const ProductCard = ({ product, viewMode }) => {
  return (
    <div className={`theme-card h-100 ${viewMode === "list" ? "d-flex" : ""}`}>
      <div className={viewMode === "list" ? "flex-shrink-0" : ""}>
        <img
          src={product.imageCover || "/images/default-product.png"}
          alt={product.title}
          className="w-100"
          style={{
            height: viewMode === "list" ? "120px" : "200px",
            width: viewMode === "list" ? "120px" : "100%",
            objectFit: "cover",
            borderRadius: "var(--radius-md)",
          }}
        />
      </div>

      <div className={`p-3 ${viewMode === "list" ? "flex-grow-1" : ""}`}>
        <h6
          className="theme-text-primary mb-2"
          style={{
            fontSize: "0.9rem",
            lineHeight: "1.4",
            height: viewMode === "grid" ? "2.8rem" : "auto",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </h6>

        <div className="d-flex align-items-center mb-2">
          <span className="theme-text-primary fw-bold me-2">
            ${product.priceAfterDiscount || product.price}
          </span>
          {product.priceAfterDiscount && (
            <span
              className="text-muted text-decoration-line-through"
              style={{ fontSize: "0.8rem" }}
            >
              ${product.price}
            </span>
          )}
        </div>

        {product.ratingsAverage && (
          <div className="d-flex align-items-center mb-2">
            <div className="text-warning me-1">
              {"★".repeat(Math.floor(product.ratingsAverage))}
              {"☆".repeat(5 - Math.floor(product.ratingsAverage))}
            </div>
            <small className="theme-text-muted">
              ({product.ratingsAverage})
            </small>
          </div>
        )}

        <button className="theme-btn theme-btn-primary w-100 mt-auto">
          <i className="fas fa-cart-plus me-2"></i>
          أضف للسلة
        </button>
      </div>
    </div>
  );
};

export default ShopProductsPage;
