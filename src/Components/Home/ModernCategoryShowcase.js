import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModernCategoryShowcase = ({ 
  categories = [], 
  title = "تسوق حسب الفئة",
  subtitle = "اكتشف مجموعتنا المتنوعة من الفئات"
}) => {
  // Mock categories if none provided
  const defaultCategories = [
    {
      _id: '1',
      name: 'الإلكترونيات',
      image: '/images/electronics.jpg',
      description: 'أحدث الأجهزة والتقنيات',
      itemCount: 150
    },
    {
      _id: '2', 
      name: 'الأزياء',
      image: '/images/fashion.jpg',
      description: 'أناقة وموضة عصرية',
      itemCount: 200
    },
    {
      _id: '3',
      name: 'المنزل والحديقة',
      image: '/images/home.jpg', 
      description: 'كل ما تحتاجه لمنزلك',
      itemCount: 120
    },
    {
      _id: '4',
      name: 'الرياضة واللياقة',
      image: '/images/sports.jpg',
      description: 'معدات رياضية عالية الجودة',
      itemCount: 80
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="modern-category-showcase" style={{
      padding: "100px 0",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      position: "relative"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: "none"
      }} />

      <Container style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h2 style={{
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
          <p style={{
            fontSize: "1.1rem",
            color: "#64748b",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.8"
          }}>
            {subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <Row className="g-4">
          {displayCategories.slice(0, 4).map((category, index) => (
            <Col key={category._id} lg={6} md={6} sm={12} className="category-item">
              <Link 
                to={`/products/category/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="category-card" style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  height: index < 2 ? "300px" : "250px"
                }}>
                  {/* Category Image */}
                  <div style={{
                    height: "60%",
                    background: `linear-gradient(135deg, ${
                      index % 4 === 0 ? '#667eea, #764ba2' :
                      index % 4 === 1 ? '#f093fb, #f5576c' :
                      index % 4 === 2 ? '#4facfe, #00f2fe' :
                      '#43e97b, #38f9d7'
                    })`,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {/* Icon */}
                    <div style={{
                      fontSize: "3rem",
                      color: "white",
                      opacity: 0.9
                    }}>
                      {index % 4 === 0 ? '📱' :
                       index % 4 === 1 ? '👕' :
                       index % 4 === 2 ? '🏠' : '⚽'}
                    </div>
                    
                    {/* Overlay */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,0.2)",
                      opacity: 0,
                      transition: "opacity 0.3s ease"
                    }} className="category-overlay" />
                  </div>

                  {/* Category Info */}
                  <div style={{
                    padding: "25px",
                    height: "40%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}>
                    <h4 style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#1a202c",
                      marginBottom: "8px",
                      transition: "color 0.3s ease"
                    }}>
                      {category.name}
                    </h4>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      marginBottom: "10px",
                      lineHeight: "1.5"
                    }}>
                      {category.description || 'اكتشف مجموعة متنوعة من المنتجات'}
                    </p>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      fontWeight: "500"
                    }}>
                      {category.itemCount || Math.floor(Math.random() * 200) + 50} منتج
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="category-arrow" style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    transform: "translateX(10px)",
                    opacity: 0,
                    transition: "all 0.3s ease"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {/* View All Categories */}
        <div className="text-center mt-5">
          <Link 
            to="/categories"
            className="btn btn-lg"
            style={{
              background: "transparent",
              border: "2px solid #667eea",
              borderRadius: "50px",
              padding: "15px 40px",
              color: "#667eea",
              fontWeight: "600",
              fontSize: "1.1rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease"
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
            <span>عرض جميع الفئات</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </Container>

      <style jsx>{`
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .category-card:hover .category-overlay {
          opacity: 1 !important;
        }
        
        .category-card:hover .category-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        
        .category-item {
          opacity: 0;
          transform: translateY(30px);
          animation: categoryFadeIn 0.6s ease-out forwards;
        }
        
        .category-item:nth-child(1) { animation-delay: 0.1s; }
        .category-item:nth-child(2) { animation-delay: 0.2s; }
        .category-item:nth-child(3) { animation-delay: 0.3s; }
        .category-item:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes categoryFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .modern-category-showcase {
            padding: 60px 0 !important;
          }
          
          .category-card {
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernCategoryShowcase;
