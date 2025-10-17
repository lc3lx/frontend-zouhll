import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import ProductCardSkeleton from '../Uitily/ProductCardSkeleton';

const ModernProductGrid = ({ 
  products = [], 
  title = "المنتجات", 
  subtitle = "", 
  loading = false,
  showViewAll = true,
  viewAllLink = "/products",
  columns = { lg: 4, md: 3, sm: 2, xs: 1 }
}) => {
  return (
    <section className="modern-product-grid" style={{
      padding: "100px 0",
      background: "#ffffff"
    }}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="grid-title" style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#1a202c",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em"
          }}>
            {title}
          </h2>
          {subtitle && (
            <p className="grid-subtitle" style={{
              fontSize: "1.1rem",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.8"
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <Row className="g-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <Col 
                key={index}
                lg={3} 
                md={4} 
                sm={6} 
                xs={12}
              >
                <ProductCardSkeleton />
              </Col>
            ))
          ) : products && products.length > 0 ? (
            products.slice(0, 8).map((product, index) => (
              <Col 
                key={product._id || index}
                lg={3} 
                md={4} 
                sm={6} 
                xs={12}
              >
                <ProductCard item={product} />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center py-5">
                <h4 style={{ color: "#64748b", marginBottom: "0.5rem" }}>
                  لا توجد منتجات حالياً
                </h4>
                <p style={{ color: "#94a3b8" }}>
                  سنضيف منتجات جديدة قريباً
                </p>
              </div>
            </Col>
          )}
        </Row>

        {/* View All Button */}
        {showViewAll && products && products.length > 0 && (
          <div className="text-center mt-5">
            <Link 
              to={viewAllLink}
              className="btn btn-lg"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "50px",
                padding: "15px 40px",
                color: "white",
                fontWeight: "600",
                fontSize: "1.1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              <span>عرض جميع المنتجات</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        )}
      </Container>

    </section>
  );
};

export default ModernProductGrid;
