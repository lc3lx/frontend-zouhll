import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AmazonStyleProducts = ({
  products = [],
  title = "المنتجات المميزة",
  loading = false,
  showViewAll = true,
}) => {
  // Mock products if none provided

  const displayProducts = products.length > 0 ? products : [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: "#ffa41c" }}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: "#ffa41c" }}>
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: "#ddd" }}>
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

  if (loading) {
    return (
      <div style={{ background: "#fff", padding: "30px 0" }}>
        <Container>
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px 0",
        margin: "0",
        borderBottom: "1px solid #e7e7e7",
      }}
    >
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#0f1111",
                  margin: 0,
                  textAlign: "right",
                  borderBottom: "3px solid #ff9900",
                  paddingBottom: "8px",
                  display: "inline-block",
                }}
              >
                {title}
              </h2>
              {showViewAll && (
                <Link
                  to="/products"
                  style={{
                    color: "#007185",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    padding: "8px 16px",
                    border: "1px solid #007185",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#007185";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#007185";
                  }}
                >
                  عرض الكل ←
                </Link>
              )}
            </div>
          </Col>
        </Row>

        <Row className="g-3">
          {displayProducts.slice(0, 8).map((product) => (
            <Col key={product._id} xl={3} lg={4} md={6} sm={6} xs={6}>
              <Card
                className="h-100 amazon-product-card"
                style={{
                  border: "none",
                  borderRadius: "16px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  background:
                    "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.08)";
                }}
              >
                <Link
                  to={`/products/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ position: "relative" }}>
                    <Card.Img
                      variant="top"
                      src={product.imageCover}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        padding: "10px",
                        borderRadius: "12px 12px 0 0",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    />

                    {/* Discount Badge */}
                    {product.priceAfterDiscount &&
                      product.priceAfterDiscount < product.price && (
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            background: "#cc0c39",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          -
                          {Math.round(
                            ((product.price - product.priceAfterDiscount) /
                              product.price) *
                              100
                          )}
                          %
                        </div>
                      )}
                  </div>

                  <Card.Body style={{ padding: "15px" }}>
                    {/* Brand */}
                    {product.brand && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#007185",
                          marginBottom: "5px",
                          textAlign: "right",
                        }}
                      >
                        {product.brand.name}
                      </div>
                    )}

                    {/* Title */}
                    <Card.Title
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        marginBottom: "8px",
                        textAlign: "right",
                        lineHeight: "1.3",
                        height: "2.6em",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      {product.title}
                    </Card.Title>

                    {/* Rating */}
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#565959",
                          marginLeft: "5px",
                        }}
                      >
                        ({product.ratingsQuantity?.toLocaleString() || 0})
                      </span>
                      <div className="d-flex">
                        {renderStars(product.ratingsAverage || 0)}
                      </div>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#0f1111",
                          marginLeft: "5px",
                        }}
                      >
                        {product.ratingsAverage || 0}
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                      {product.priceAfterDiscount &&
                      product.priceAfterDiscount < product.price ? (
                        <>
                          <div style={{ marginBottom: "3px" }}>
                            <span
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: "700",
                                color: "#B12704",
                              }}
                            >
                              {formatPrice(product.priceAfterDiscount)}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "0.85rem",
                                color: "#565959",
                                textDecoration: "line-through",
                              }}
                            >
                              كان: {formatPrice(product.price)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "700",
                            color: "#0f1111",
                          }}
                        >
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Badges */}
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      <span
                        style={{
                          background: "#007185",
                          color: "white",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: "600",
                        }}
                      >
                        شحن مجاني لسوريا
                      </span>

                      {product.priceAfterDiscount &&
                        product.priceAfterDiscount < product.price && (
                          <span
                            style={{
                              background: "#ff9900",
                              color: "#0f1111",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.7rem",
                              fontWeight: "600",
                            }}
                          >
                            عرض محدود
                          </span>
                        )}

                      {product.ratingsAverage >= 4.5 && (
                        <span
                          style={{
                            background: "#ff9900",
                            color: "#0f1111",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            fontWeight: "600",
                          }}
                        >
                          اختيار زوحال
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AmazonStyleProducts;
