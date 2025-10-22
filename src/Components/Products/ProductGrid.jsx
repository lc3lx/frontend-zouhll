import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, Button, Image } from "../ui";
import ProductCardSkeleton from "../Common/ProductCardSkeleton";
// import ErrorMessage from "../Common/ErrorMessage";

const ProductGrid = ({
  products = [],
  title = "المنتجات المميزة",
  loading = false,
  error = null,
  showViewAll = true,
  maxItems = 8,
  onRetry = null,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-warning">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-warning">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-muted">
          ★
        </span>
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    if (!discountedPrice || discountedPrice >= originalPrice) return 0;
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  // Loading state with skeletons
  if (loading) {
    return (
      <section className="py-5 bg-white border-bottom">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div
              className="skeleton"
              style={{ width: "200px", height: "32px", borderRadius: "4px" }}
            />
            {showViewAll && (
              <div
                className="skeleton"
                style={{ width: "100px", height: "36px", borderRadius: "4px" }}
              />
            )}
          </div>

          <Row className="g-3">
            {Array.from({ length: maxItems }).map((_, index) => (
              <Col key={index} xl={3} lg={4} md={6} sm={6} xs={12}>
                <ProductCardSkeleton />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-5 bg-white border-bottom">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold text-dark mb-0 border-bottom border-warning border-3 pb-2 d-inline-block">
              {title}
            </h2>
          </div>

          {/* <ErrorMessage
            error={error}
            onRetry={onRetry}
            title="خطأ في تحميل المنتجات"
          /> */}
        </Container>
      </section>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <section className="py-5 bg-white border-bottom">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold text-dark mb-0 border-bottom border-warning border-3 pb-2 d-inline-block">
              {title}
            </h2>
          </div>

          <div className="text-center py-5">
            <div className="mb-3">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                className="text-muted"
              >
                <path
                  d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h5 className="text-muted mb-2">لا توجد منتجات</h5>
            <p className="text-muted">
              لم يتم العثور على منتجات في هذا القسم حالياً
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const displayProducts = products.slice(0, maxItems);

  return (
    <section className="py-5 bg-white border-bottom">
      <Container>
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold text-dark mb-0 border-bottom border-warning border-3 pb-2 d-inline-block">
            {title}
          </h2>
          {showViewAll && (
            <Button
              as={Link}
              to="/products"
              variant="outline-primary"
              size="sm"
              className="d-flex align-items-center gap-2"
            >
              عرض الكل
              <span aria-hidden="true">←</span>
            </Button>
          )}
        </div>

        {/* Products Grid */}
        <Row className="g-3">
          {displayProducts.map((product) => (
            <Col key={product._id} xl={3} lg={4} md={6} sm={6} xs={12}>
              <Card
                hover
                clickable
                className="h-100 product-card"
                onClick={() =>
                  (window.location.href = `/products/${product._id}`)
                }
              >
                <div className="position-relative">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    aspectRatio="1/1"
                    className="p-3"
                    lazy
                    fallback="/images/placeholder.png"
                  />

                  {/* Discount Badge */}
                  {product.priceAfterDiscount &&
                    product.priceAfterDiscount < product.price && (
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-danger">
                          -
                          {calculateDiscount(
                            product.price,
                            product.priceAfterDiscount
                          )}
                          %
                        </span>
                      </div>
                    )}
                </div>

                <div className="p-3">
                  {/* Brand */}
                  {product.brand?.name && (
                    <div className="small text-primary mb-1 text-end">
                      {product.brand.name}
                    </div>
                  )}

                  {/* Title */}
                  <h6
                    className="card-title text-end mb-2"
                    style={{
                      lineHeight: "1.3",
                      height: "2.6em",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.title}
                  </h6>

                  {/* Rating */}
                  {product.ratingsAverage > 0 && (
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <span className="small text-muted me-2">
                        ({product.ratingsQuantity?.toLocaleString() || 0})
                      </span>
                      <div className="d-flex me-2">
                        {renderStars(product.ratingsAverage)}
                      </div>
                      <span className="small fw-medium">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-end mb-3">
                    {product.priceAfterDiscount &&
                    product.priceAfterDiscount < product.price ? (
                      <>
                        <div className="fw-bold text-danger h6 mb-1">
                          {formatPrice(product.priceAfterDiscount)}
                        </div>
                        <div className="small text-muted text-decoration-line-through">
                          كان: {formatPrice(product.price)}
                        </div>
                      </>
                    ) : (
                      <div className="fw-bold text-dark h6 mb-0">
                        {formatPrice(product.price)}
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="d-flex gap-1 justify-content-end flex-wrap">
                    <span className="badge bg-primary small">شحن مجاني</span>

                    {product.priceAfterDiscount &&
                      product.priceAfterDiscount < product.price && (
                        <span className="badge bg-warning text-dark small">
                          عرض محدود
                        </span>
                      )}

                    {product.ratingsAverage >= 4.5 && (
                      <span className="badge bg-warning text-dark small">
                        اختيار زوحال
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductGrid;
