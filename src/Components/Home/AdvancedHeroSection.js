import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiArrowRight, FiPlay, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdvancedHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "اكتشف عالماً من التسوق الرقمي",
      subtitle: "تجربة تسوق استثنائية مع أحدث المنتجات وأفضل الأسعار",
      cta: "تسوق الآن",
      ctaSecondary: "شاهد الفيديو",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "/api/placeholder/600/400"
    },
    {
      title: "عروض حصرية تصل إلى 70%",
      subtitle: "وفر أكثر مع مجموعة مختارة من أفضل المنتجات",
      cta: "اكتشف العروض",
      ctaSecondary: "المزيد",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "/api/placeholder/600/400"
    },
    {
      title: "شحن مجاني لجميع أنحاء العالم",
      subtitle: "استمتع بالتسوق بدون قيود مع خدمة الشحن المجاني",
      cta: "ابدأ التسوق",
      ctaSecondary: "تعرف أكثر",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/api/placeholder/600/400"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        minHeight: "90vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="text-white">
            <div
              style={{
                animation: "slideInLeft 1s ease-out",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  marginBottom: "30px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <FiTrendingUp className="me-2" />
                الأكثر مبيعاً هذا الأسبوع
              </div>

              {/* Main Title */}
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: "900",
                  lineHeight: "1.2",
                  marginBottom: "25px",
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "40px",
                  opacity: 0.9,
                  lineHeight: "1.6",
                }}
              >
                {currentSlideData.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to="/products"
                  size="lg"
                  style={{
                    background: "white",
                    color: "#667eea",
                    border: "none",
                    borderRadius: "50px",
                    padding: "15px 35px",
                    fontWeight: "700",
                    fontSize: "16px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                  }}
                >
                  <FiShoppingBag className="me-2" />
                  {currentSlideData.cta}
                  <FiArrowRight className="ms-2" />
                </Button>

                <Button
                  variant="outline-light"
                  size="lg"
                  style={{
                    borderRadius: "50px",
                    padding: "15px 35px",
                    fontWeight: "600",
                    fontSize: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <FiPlay className="me-2" />
                  {currentSlideData.ctaSecondary}
                </Button>
              </div>

              {/* Stats */}
              <div
                className="d-flex flex-wrap gap-4 mt-5"
                style={{ opacity: 0.9 }}
              >
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: "900" }}>10K+</div>
                  <div style={{ fontSize: "0.9rem" }}>منتج متاح</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: "900" }}>50K+</div>
                  <div style={{ fontSize: "0.9rem" }}>عميل سعيد</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: "900" }}>4.9★</div>
                  <div style={{ fontSize: "0.9rem" }}>تقييم العملاء</div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div
              style={{
                animation: "slideInRight 1s ease-out",
                position: "relative",
              }}
            >
              {/* Hero Image */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "30px",
                  padding: "40px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <img
                  src={currentSlideData.image}
                  alt="Hero"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>

              {/* Floating elements */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  animation: "bounce 2s infinite",
                }}
              >
                <div style={{ color: "#667eea", fontWeight: "700" }}>شحن مجاني</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>للطلبات +$50</div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  animation: "bounce 2s infinite 1s",
                }}
              >
                <div style={{ color: "#f5576c", fontWeight: "700" }}>خصم 30%</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>على المجموعة الجديدة</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Slide indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? "40px" : "12px",
                height: "12px",
                borderRadius: "6px",
                border: "none",
                background: index === currentSlide 
                  ? "white" 
                  : "rgba(255,255,255,0.5)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default AdvancedHeroSection;
