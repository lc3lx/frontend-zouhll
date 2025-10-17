import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModernPromoSection = () => {
  return (
    <section className="modern-promo-section" style={{
      padding: "100px 0",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Elements */}
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-20%",
        width: "40%",
        height: "200%",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        transform: "rotate(15deg)"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "-10%",
        width: "30%",
        height: "150%",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "50%",
        transform: "rotate(-10deg)"
      }} />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} md={6} className="text-white">
            <div className="promo-content">
              {/* Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50px",
                padding: "8px 20px",
                marginBottom: "20px",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                🔥 عرض محدود
              </div>

              {/* Main Title */}
              <h2 style={{
                fontSize: "3rem",
                fontWeight: "800",
                lineHeight: "1.2",
                marginBottom: "20px",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)"
              }}>
                خصم يصل إلى
                <span style={{
                  display: "block",
                  fontSize: "4rem",
                  background: "linear-gradient(45deg, #fff, #f0f8ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  50%
                </span>
              </h2>

              {/* Subtitle */}
              <p style={{
                fontSize: "1.2rem",
                opacity: 0.9,
                marginBottom: "30px",
                lineHeight: "1.6"
              }}>
                على مجموعة مختارة من أفضل المنتجات. عرض لفترة محدودة فقط!
              </p>

              {/* CTA Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <Link 
                  to="/products"
                  className="btn btn-lg"
                  style={{
                    background: "#ffffff",
                    color: "#667eea",
                    border: "none",
                    borderRadius: "50px",
                    padding: "15px 35px",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 25px rgba(255,255,255,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 12px 35px rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 25px rgba(255,255,255,0.3)";
                  }}
                >
                  <span>تسوق الآن</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                <Link 
                  to="/offers"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "15px 25px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.borderColor = "rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                >
                  <span>عرض العروض</span>
                </Link>
              </div>

              {/* Timer */}
              <div className="mt-4">
                <div style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  marginBottom: "10px"
                }}>
                  ينتهي العرض خلال:
                </div>
                <div className="d-flex gap-3">
                  {['23', '14', '35', '42'].map((time, index) => (
                    <div key={index} style={{
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      padding: "10px 15px",
                      textAlign: "center",
                      minWidth: "60px"
                    }}>
                      <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        lineHeight: "1"
                      }}>
                        {time}
                      </div>
                      <div style={{
                        fontSize: "0.7rem",
                        opacity: 0.8,
                        marginTop: "2px"
                      }}>
                        {index === 0 ? 'يوم' : index === 1 ? 'ساعة' : index === 2 ? 'دقيقة' : 'ثانية'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* Right Visual */}
          <Col lg={6} md={6} className="text-center">
            <div className="promo-visual" style={{
              position: "relative",
              padding: "40px"
            }}>
              {/* Main Circle */}
              <div style={{
                width: "300px",
                height: "300px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.2)"
              }}>
                {/* Inner Content */}
                <div className="text-center">
                  <div style={{
                    fontSize: "4rem",
                    marginBottom: "10px"
                  }}>
                    🛍️
                  </div>
                  <div style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "white"
                  }}>
                    عروض حصرية
                  </div>
                </div>

                {/* Floating Elements */}
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "60px",
                  height: "60px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  animation: "float 3s ease-in-out infinite"
                }}>
                  💎
                </div>

                <div style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "30px",
                  width: "50px",
                  height: "50px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  animation: "float 3s ease-in-out infinite 1s"
                }}>
                  ⭐
                </div>

                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "-20px",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  animation: "float 3s ease-in-out infinite 2s"
                }}>
                  🎯
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .promo-content {
          animation: slideInLeft 1s ease-out;
        }
        
        .promo-visual {
          animation: slideInRight 1s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .modern-promo-section {
            padding: 60px 0 !important;
          }
          
          .promo-content h2 {
            font-size: 2rem !important;
          }
          
          .promo-content h2 span {
            font-size: 2.5rem !important;
          }
          
          .promo-visual > div {
            width: 250px !important;
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernPromoSection;
