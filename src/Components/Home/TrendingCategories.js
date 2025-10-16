import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getImageUrl } from "../../utils/imageHelper";

const TrendingCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory(12));
  }, [dispatch]);

  const categoryState = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);
  const categories = categoryState?.data || [];

  const colorPalette = ["#667eea", "#f093fb", "#6bcf7f", "#ff6b6b", "#ffd93d", "#4ecdc4"];
  const items = categories.slice(0, 6).map((cat, idx) => ({
    ...cat,
    color: colorPalette[idx % colorPalette.length],
    size: idx === 0 ? "large" : idx < 3 ? "medium" : "small",
  }));

  if (loading) return null;
  if (!loading && items.length === 0) return null;

  const getCategoryLayout = (category, index) => {
    const baseStyle = {
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
      background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}25 100%)`,
      border: `2px solid ${category.color}20`,
    };

    const sizeStyles = {
      large: { height: "400px" },
      medium: { height: "250px" },
      small: { height: "200px" }
    };

    return {
      ...baseStyle,
      ...sizeStyles[category.size]
    };
  };

  return (
    <div style={{ padding: "80px 0", background: "white" }}>
      <Container>
        {/* Section Header */}
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #ff6b6b15, #ffa50015)",
                borderRadius: "50px",
                padding: "8px 20px",
                marginBottom: "15px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#ff6b6b",
                gap: "8px",
              }}
            >
              <FiTrendingUp size={16} />
              الأكثر رواجاً
            </div>
            
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: "900",
                color: "#1a202c",
                marginBottom: "10px",
              }}
            >
              التصنيفات الرائجة
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#4a5568",
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              اكتشف أكثر التصنيفات طلباً هذا الشهر
            </p>
          </div>
          
          <Link
            to="/allcategory"
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

        {/* Categories Grid */}
        <Row>
          {/* Large Category */}
          <Col lg={6} className="mb-4">
            <Link to={`/products/category/${items[0]._id}`} style={{ textDecoration: "none" }}>
              <div
                style={getCategoryLayout(items[0], 0)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${items[0].color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${getImageUrl(items[0].image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${items[0].color}40 0%, ${items[0].color}60 100%)`,
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "30px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <div>
                    {/* Badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50px",
                        padding: "6px 12px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        marginBottom: "20px",
                        gap: "4px",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <FiTrendingUp size={14} />
                      تصنيف
                    </div>

                    <h3
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "900",
                        marginBottom: "10px",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      }}
                    >
                      {items[0].name}
                    </h3>
                    
                  </div>

                  <div>
                    
                    
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50px",
                        padding: "12px 20px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        gap: "8px",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                      }}
                      className="cta-button"
                    >
                      تسوق الآن
                      <FiArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>

          {/* Medium and Small Categories */}
          <Col lg={6}>
            <Row>
              {/* Medium Categories */}
              {items.slice(1, 3).map((category, index) => (
                <Col key={category._id} md={6} className="mb-4">
                  <Link to={`/products/category/${category._id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={getCategoryLayout(category, index + 1)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                        e.currentTarget.style.boxShadow = `0 15px 40px ${category.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Background Image */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${getImageUrl(category.image)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.2,
                        }}
                      />

                      {/* Content */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          padding: "25px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          {/* Badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              background: `${category.color}20`,
                              borderRadius: "20px",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              color: category.color,
                              marginBottom: "15px",
                              gap: "4px",
                            }}
                          >
                            <FiTrendingUp size={12} />
                            تصنيف
                          </div>

                          <h4
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: "800",
                              color: "#1a202c",
                              marginBottom: "8px",
                            }}
                          >
                            {category.name}
                          </h4>
                          
                        </div>

                        
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}

              {/* Small Categories */}
              {items.slice(3).map((category, index) => (
                <Col key={category._id} md={4} xs={6} className="mb-4">
                  <Link to={`/products/category/${category._id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={getCategoryLayout(category, index + 3)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
                        e.currentTarget.style.boxShadow = `0 12px 30px ${category.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Background Image */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${getImageUrl(category.image)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.15,
                        }}
                      />

                      {/* Content */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          padding: "20px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          {/* Badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              background: `${category.color}20`,
                              borderRadius: "15px",
                              padding: "3px 6px",
                              fontSize: "0.7rem",
                              fontWeight: "600",
                              color: category.color,
                              marginBottom: "12px",
                              gap: "3px",
                            }}
                          >
                            <FiTrendingUp size={10} />
                            تصنيف
                          </div>

                          <h5
                            style={{
                              fontSize: "1rem",
                              fontWeight: "700",
                              color: "#1a202c",
                              marginBottom: "5px",
                            }}
                          >
                            {category.name}
                          </h5>
                        </div>

                        
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .cta-button:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

export default TrendingCategories;
