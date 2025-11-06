import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCategoryHierarchy } from "../../hook/categories/useCategoryHierarchy";

const AmazonStyleCategories = () => {
  const {
    data: hierarchyData,
    loading,
    error,
  } = useCategoryHierarchy({
    enabled: true,
    ttl: 300000, // 5 دقائق كاش
  });

  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  // Default images for categories without images
  const defaultImages = [
    "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=أزياء",
    "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=إلكترونيات",
    "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=منزل",
    "https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=رياضة",
    "https://via.placeholder.com/300x200/FFEAA7/FFFFFF?text=كتب",
    "https://via.placeholder.com/300x200/DDA0DD/FFFFFF?text=جمال",
    "https://via.placeholder.com/300x200/98D8C8/FFFFFF?text=أطفال",
    "https://via.placeholder.com/300x200/F7DC6F/FFFFFF?text=سيارات",
  ];

  if (loading) {
    return (
      <div
        style={{
          background: "#ffffff",
          padding: "30px 0",
          borderBottom: "1px solid #e7e7e7",
        }}
      >
        <Container>
          <Row>
            <Col>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#0f1111",
                  marginBottom: "25px",
                  textAlign: "right",
                  borderBottom: "3px solid #ff9900",
                  paddingBottom: "8px",
                  display: "inline-block",
                }}
              >
                تسوق حسب الفئة
              </h2>
            </Col>
          </Row>

          <Row className="g-3">
            {/* Loading skeleton */}
            {Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={6}>
                <Card
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                    height: "280px",
                  }}
                >
                  <div
                    style={{
                      height: "150px",
                      background:
                        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "amazonShimmer 1.5s infinite",
                    }}
                  />
                  <Card.Body style={{ padding: "15px" }}>
                    <div
                      style={{
                        height: "20px",
                        background:
                          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "amazonShimmer 1.5s infinite",
                        marginBottom: "10px",
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      style={{
                        height: "15px",
                        background:
                          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "amazonShimmer 1.5s infinite",
                        marginBottom: "5px",
                        borderRadius: "4px",
                        width: "80%",
                      }}
                    />
                    <div
                      style={{
                        height: "15px",
                        background:
                          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "amazonShimmer 1.5s infinite",
                        borderRadius: "4px",
                        width: "60%",
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#ffffff",
          padding: "30px 0",
          borderBottom: "1px solid #e7e7e7",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>⚠️</div>
                <h3 style={{ color: "#565959", marginBottom: "15px" }}>
                  خطأ في تحميل التصنيفات
                </h3>
                <p style={{ color: "#565959" }}>
                  حدث خطأ أثناء تحميل التصنيفات. يرجى المحاولة مرة أخرى.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const categories = hierarchyData?.categories || [];

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px 0",
        borderBottom: "1px solid #e7e7e7",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#0f1111",
                marginBottom: "25px",
                textAlign: "right",
                borderBottom: "3px solid #ff9900",
                paddingBottom: "8px",
                display: "inline-block",
              }}
            >
              تسوق حسب الفئة
            </h2>
          </Col>
        </Row>

        <Row className="g-3">
          {categories.length > 0 ? (
            categories.slice(0, 8).map((cat, index) => (
              <Col key={cat._id} lg={3} md={4} sm={6} xs={6}>
                <Card
                  className="h-100 amazon-category-card"
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
                    to={`/products/category/${cat._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        cat.image || defaultImages[index % defaultImages.length]
                      }
                      style={{
                        height: "150px",
                        objectFit: "cover",
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
                    <Card.Body style={{ padding: "15px" }}>
                      <Card.Title
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                          marginBottom: "10px",
                          textAlign: "right",
                          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }}
                      >
                        {cat.name}
                      </Card.Title>

                      <div style={{ textAlign: "right" }}>
                        {/* عرض التصنيفات الفرعية */}
                        {cat.subcategories && cat.subcategories.length > 0 ? (
                          <>
                            {cat.subcategories
                              .slice(0, 4)
                              .map((sub, subIndex) => (
                                <div
                                  key={subIndex}
                                  style={{
                                    position: "relative",
                                    marginBottom: "8px",
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredSubcategory(sub)
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSubcategory(null)
                                  }
                                >
                                  <div
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: "600",
                                      color: "#0f1111",
                                      marginBottom: "5px",
                                      cursor: "pointer",
                                      padding: "4px 8px",
                                      borderRadius: "4px",
                                      transition: "all 0.2s ease",
                                      backgroundColor:
                                        hoveredSubcategory?._id === sub._id
                                          ? "#f0f8ff"
                                          : "transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.color = "#007185";
                                      e.target.style.backgroundColor =
                                        "#f0f8ff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.color = "#0f1111";
                                      e.target.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    {sub.name}
                                  </div>

                                  {/* عرض التصنيفات الثانوية عند hover فقط */}
                                  {hoveredSubcategory?._id === sub._id &&
                                    sub.secondaryCategories &&
                                    sub.secondaryCategories.length > 0 && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "100%",
                                          right: "0",
                                          background: "#fff",
                                          border: "1px solid #ddd",
                                          borderRadius: "6px",
                                          boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.15)",
                                          zIndex: 1000,
                                          minWidth: "180px",
                                          maxWidth: "250px",
                                          padding: "8px 0",
                                          marginTop: "2px",
                                        }}
                                        onMouseEnter={() =>
                                          setHoveredSubcategory(sub)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredSubcategory(null)
                                        }
                                      >
                                        <div
                                          style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            color: "#0f1111",
                                            padding: "4px 12px",
                                            borderBottom: "1px solid #eee",
                                            marginBottom: "4px",
                                          }}
                                        >
                                          {sub.name}
                                        </div>

                                        {sub.secondaryCategories
                                          .slice(0, 6)
                                          .map((secondary, secIndex) => (
                                            <Link
                                              key={secIndex}
                                              to={`/products/secondary-category/${secondary._id}`}
                                              style={{
                                                display: "block",
                                                fontSize: "0.8rem",
                                                color: "#565959",
                                                padding: "4px 12px",
                                                textDecoration: "none",
                                                transition: "all 0.2s ease",
                                              }}
                                              onMouseEnter={(e) => {
                                                e.target.style.color =
                                                  "#007185";
                                                e.target.style.backgroundColor =
                                                  "#f0f8ff";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.target.style.color =
                                                  "#565959";
                                                e.target.style.backgroundColor =
                                                  "transparent";
                                              }}
                                            >
                                              {secondary.name}
                                            </Link>
                                          ))}

                                        {sub.secondaryCategories.length > 6 && (
                                          <div
                                            style={{
                                              fontSize: "0.75rem",
                                              color: "#007185",
                                              padding: "4px 12px",
                                              fontStyle: "italic",
                                              borderTop: "1px solid #eee",
                                              marginTop: "4px",
                                            }}
                                          >
                                            +
                                            {sub.secondaryCategories.length - 6}{" "}
                                            تصنيفات أخرى
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </div>
                              ))}

                            {cat.subcategories.length > 4 && (
                              <div
                                style={{
                                  fontSize: "0.85rem",
                                  color: "#007185",
                                  marginTop: "8px",
                                  fontWeight: "500",
                                }}
                              >
                                عرض المزيد ({cat.subcategories.length - 4}+) ←
                              </div>
                            )}
                          </>
                        ) : (
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#565959",
                              fontStyle: "italic",
                              textAlign: "center",
                              padding: "20px 0",
                            }}
                          >
                            قريباً ستُضاف الفئات الفرعية
                          </div>
                        )}

                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#007185",
                            marginTop: "8px",
                            fontWeight: "500",
                          }}
                        >
                          تسوق الآن ←
                        </div>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))
          ) : (
            // No categories message
            <Col xs={12}>
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
                <h3 style={{ color: "#565959", marginBottom: "15px" }}>
                  لا توجد فئات متاحة حالياً
                </h3>
                <p style={{ color: "#565959" }}>
                  قريباً ستُضاف فئات جديدة ومتنوعة
                </p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AmazonStyleCategories;
