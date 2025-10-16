import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getImageUrl } from "../../utils/imageHelper";

const CategoriesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const categories = category?.data || [];
  const getItemsPerSlide = () => {
    if (window.innerWidth <= 480) return 2;
    if (window.innerWidth <= 768) return 3;
    if (window.innerWidth <= 1200) return 4;
    return 6;
  };
  
  const [itemsPerSlide, setItemsPerSlide] = useState(6);
  const totalSlides = Math.ceil(categories.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return categories.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 0", background: "white" }}>
        <Container>
          <div className="text-center">
            <h2 style={{ 
              fontSize: "2.5rem", 
              fontWeight: "900", 
              color: "#2d3748",
              marginBottom: "50px"
            }}>
              تصفح التصنيفات
            </h2>
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 60px",
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    minHeight: "180px",
                    borderRadius: "24px",
                    background: "linear-gradient(90deg, #f8fafc 25%, #e2e8f0 50%, #f8fafc 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px 20px",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "20px",
                      background: "linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite 0.2s",
                      marginBottom: "16px",
                    }}
                  />
                  <div
                    style={{
                      width: "80px",
                      height: "16px",
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite 0.4s",
                      marginBottom: "8px",
                    }}
                  />
                  <div
                    style={{
                      width: "60px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "linear-gradient(90deg, #e2e8f0 25%, #cbd5e0 50%, #e2e8f0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite 0.6s",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        padding: "80px 0", 
        background: "linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)", 
        overflow: "hidden",
        position: "relative"
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea20, #764ba220)",
          animation: "float 8s ease-in-out infinite",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f093fb20, #f5576c20)",
          animation: "float 6s ease-in-out infinite reverse",
          opacity: 0.5,
        }}
      />
      
      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "linear-gradient(135deg, #667eea15, #764ba215)",
              borderRadius: "50px",
              padding: "8px 24px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#667eea",
              border: "1px solid rgba(102, 126, 234, 0.2)",
            }}
          >
            🏷️ تصنيفات المنتجات
          </div>
          
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: "900",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "15px",
              animation: "fadeInDown 1s ease-out",
              letterSpacing: "-0.02em",
            }}
          >
            اكتشف عالم التسوق
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#4a5568",
              maxWidth: "600px",
              margin: "0 auto",
              animation: "fadeInUp 1s ease-out 0.2s both",
              lineHeight: "1.6",
            }}
          >
            تصفح مجموعة واسعة من التصنيفات المختارة بعناية لتجربة تسوق مميزة
          </p>
        </div>

        {/* Slider Container */}
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Categories Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "20px",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: "slideIn 0.8s ease-out",
              padding: "0 60px",
            }}
            className="categories-grid"
          >
            {getCurrentSlideItems().map((cat, index) => (
              <Link
                key={cat._id}
                to={`/products/category/${cat._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "32px 20px",
                    textAlign: "center",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "180px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    animation: `categorySlideIn 0.6s ease-out ${index * 0.1}s both, glow 4s ease-in-out infinite ${index * 0.5}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                  }}
                >
                  {/* Background decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(102, 126, 234, 0.1)",
                      opacity: 0.5,
                    }}
                  />

                  {/* Category Image */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "20px",
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      position: "relative",
                      zIndex: 1,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <img
                      src={getImageUrl(cat.image)}
                      alt={cat.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                        e.target.parentElement.style.background = "linear-gradient(135deg, #667eea15, #764ba215)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.parentElement.style.background = "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
                      }}
                    />
                  </div>

                  {/* Category Name */}
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1a202c",
                      margin: "0 0 4px 0",
                      position: "relative",
                      zIndex: 1,
                      lineHeight: "1.4",
                    }}
                  >
                    {cat.name}
                  </h4>
                  
                  {/* Category Description */}
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#718096",
                      margin: 0,
                      opacity: 0.8,
                    }}
                  >
                    تسوق الآن
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#667eea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#667eea";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <FiChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#667eea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#667eea";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <FiChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Progress Bar for Auto-play */}
        {totalSlides > 1 && isAutoPlaying && (
          <div
            style={{
              width: "100px",
              height: "3px",
              background: "rgba(102, 126, 234, 0.2)",
              borderRadius: "2px",
              margin: "30px auto 20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "2px",
                animation: "progressBar 4s linear infinite",
                transformOrigin: "left",
              }}
            />
          </div>
        )}

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3" style={{ marginTop: totalSlides > 1 && isAutoPlaying ? "10px" : "30px" }}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === currentSlide ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  background: index === currentSlide 
                    ? "#667eea" 
                    : "rgba(102, 126, 234, 0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  opacity: index === currentSlide ? 1 : 0.6,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (index !== currentSlide) {
                    e.target.style.background = "rgba(102, 126, 234, 0.4)";
                    e.target.style.opacity = "0.8";
                    e.target.style.transform = "scale(1.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentSlide) {
                    e.target.style.background = "rgba(102, 126, 234, 0.2)";
                    e.target.style.opacity = "0.6";
                    e.target.style.transform = "scale(1)";
                  }
                }}
              />
            ))}
            
            {/* Auto-play indicator */}
            <div
              style={{
                marginLeft: "15px",
                fontSize: "12px",
                color: "#718096",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: isAutoPlaying ? "#6bcf7f" : "#cbd5e0",
                  animation: isAutoPlaying ? "pulse 2s ease-in-out infinite" : "none",
                }}
              />
              {isAutoPlaying ? "تشغيل تلقائي" : "متوقف"}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-5">
          <Link
            to="/allcategory"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "1rem",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            عرض جميع التصنيفات
            <FiChevronRight size={16} />
          </Link>
        </div>
      </Container>

      <style jsx>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        
        @media (max-width: 1200px) {
          .categories-grid {
            grid-template-columns: repeat(4, 1fr);
            padding: 0 40px !important;
          }
        }
        
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            padding: 0 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 0 10px !important;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes categorySlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          50% { box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15); }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes slideTransition {
          0% { opacity: 1; transform: translateX(0); }
          50% { opacity: 0.7; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CategoriesSlider;
