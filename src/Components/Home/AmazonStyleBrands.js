import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeBrandHook from "../../hook/brand/home-brand-hook";

const AmazonStyleBrands = () => {
  const [brand, loading] = HomeBrandHook();

  // Default logos for brands without images
  const defaultLogos = [
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop",
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px 0",
        borderTop: "1px solid #e7e7e7",
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
              العلامات التجارية المميزة
            </h2>
          </Col>
        </Row>

        <Row className="g-3">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} xl={3} lg={4} md={6} sm={6} xs={6}>
                <Card
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                    textAlign: "center",
                    height: "200px",
                  }}
                >
                  <Card.Body style={{ padding: "20px" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 15px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "amazonShimmer 1.5s infinite",
                      }}
                    />
                    <div
                      style={{
                        height: "20px",
                        background:
                          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "amazonShimmer 1.5s infinite",
                        marginBottom: "8px",
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
                        borderRadius: "4px",
                        width: "60%",
                        margin: "0 auto",
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : brand.data && brand.data.length > 0 ? (
            brand.data.slice(0, 8).map((brandItem, index) => (
              <Col key={brandItem._id} xl={3} lg={4} md={6} sm={6} xs={6}>
                <Card
                  className="h-100 amazon-brand-card"
                  style={{
                    border: "none",
                    borderRadius: "16px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    background:
                      "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    textAlign: "center",
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
                    to={`/products/brand/${brandItem._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card.Body style={{ padding: "20px" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto 15px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: "2px solid #f0f0f0",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.1)";
                          e.target.style.boxShadow =
                            "0 8px 25px rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(0,0,0,0.1)";
                        }}
                      >
                        <img
                          src={
                            brandItem.image ||
                            defaultLogos[index % defaultLogos.length]
                          }
                          alt={brandItem.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "all 0.3s ease",
                          }}
                        />
                      </div>

                      <Card.Title
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                          marginBottom: "8px",
                          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }}
                      >
                        {brandItem.name}
                      </Card.Title>

                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#565959",
                          marginBottom: "10px",
                        }}
                      >
                        علامة تجارية مميزة
                      </div>

                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#007185",
                          fontWeight: "500",
                        }}
                      >
                        تسوق الآن ←
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))
          ) : (
            // No brands message
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
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🏪</div>
                <h3 style={{ color: "#565959", marginBottom: "15px" }}>
                  لا توجد علامات تجارية متاحة حالياً
                </h3>
                <p style={{ color: "#565959" }}>
                  قريباً ستُضاف علامات تجارية جديدة ومتنوعة
                </p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AmazonStyleBrands;
