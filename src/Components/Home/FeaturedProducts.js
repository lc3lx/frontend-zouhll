import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getProductImage } from "../../utils/imageHelper";

const FeaturedProducts = ({ products = [], title = "المنتجات المميزة", loading = false }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const displayProducts = Array.isArray(products) ? products.slice(0, 8) : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        size={12}
        style={{
          color: index < Math.floor(rating) ? "#ffd93d" : "#e2e8f0",
          fill: index < Math.floor(rating) ? "#ffd93d" : "transparent",
        }}
      />
    ));
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 0", background: "white" }}>
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div
              style={{
                width: "200px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "20px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          </div>
          <Row>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "white",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "250px",
                      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite",
                    }}
                  />
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        width: "80%",
                        height: "20px",
                        borderRadius: "4px",
                        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        marginBottom: "10px",
                      }}
                    />
                    <div
                      style={{
                        width: "60%",
                        height: "16px",
                        borderRadius: "4px",
                        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }

  if (!loading && displayProducts.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: "80px 0", background: "white" }}>
      <Container>
        {/* Section Header */}
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: "900",
                color: "#1a202c",
                marginBottom: "8px",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#718096",
                margin: 0,
              }}
            >
              اكتشف أفضل المنتجات المختارة خصيصاً لك
            </p>
          </div>
          
          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#667eea",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "50px",
              border: "2px solid #667eea",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#667eea";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#667eea";
              e.target.style.transform = "translateY(0)";
            }}
          >
            عرض الكل
            <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Products Grid */}
        <Row>
          {displayProducts.map((product, index) => (
            <Col key={product._id} lg={3} md={6} className="mb-4">
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#667eea";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: "relative",
                    height: "250px",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {product.isNew && (
                      <span
                        style={{
                          background: "#6bcf7f",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        جديد
                      </span>
                    )}
                    {product.isHot && (
                      <span
                        style={{
                          background: "#ff6b6b",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        🔥 مميز
                      </span>
                    )}
                    {product.discount && (
                      <span
                        style={{
                          background: "#f093fb",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      opacity: hoveredProduct === product._id ? 1 : 0,
                      transform: hoveredProduct === product._id ? "translateX(0)" : "translateX(20px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "white",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#ff6b6b";
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#4a5568";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <FiHeart size={18} />
                    </button>
                    <button
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "white",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#667eea";
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#4a5568";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <FiEye size={18} />
                    </button>
                  </div>

                  {/* Quick Add to Cart */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      right: "12px",
                      opacity: hoveredProduct === product._id ? 1 : 0,
                      transform: hoveredProduct === product._id ? "translateY(0)" : "translateY(20px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        background: "#667eea",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        padding: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#5a6fd8";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#667eea";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <FiShoppingCart size={16} />
                      أضف للسلة
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ padding: "20px" }}>
                  {/* Category */}
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#667eea",
                      fontWeight: "600",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {product.category?.name}
                  </div>

                  {/* Product Title */}
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      color: "#1a202c",
                      marginBottom: "8px",
                      lineHeight: "1.4",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </h4>

                  {/* Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px" }}>
                      {renderStars(product.ratingsAverage)}
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#718096",
                      }}
                    >
                      ({product.ratingsQuantity})
                    </span>
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "900",
                        color: "#1a202c",
                      }}
                    >
                      {formatPrice(product.priceAfterDiscount || product.price)}
                    </span>
                    {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                      <span
                        style={{
                          fontSize: "1rem",
                          color: "#a0aec0",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
