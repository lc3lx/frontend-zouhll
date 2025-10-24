import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useActiveOffers } from "../../hook/offers/useOffers";
import { formatDateGregorian } from "../../utils/dateHelper";

const OffersSlider = () => {
  const { offers, loading, error } = useActiveOffers();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!offers || offers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [offers]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري تحميل العروض...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">حدث خطأ في تحميل العروض</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        padding: "60px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="90" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              color: "#2c3e50",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: "bounce 2s infinite",
                margin: "0 15px",
              }}
            >
              🎯
            </span>
            عروض حصرية
            <span
              style={{
                display: "inline-block",
                animation: "bounce 2s infinite",
                margin: "0 15px",
              }}
            >
              🎯
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "300",
              color: "#6c757d",
              marginBottom: "0",
            }}
          >
            استفد من أفضل العروض والخصومات المحدودة الوقت
          </p>
        </div>

        {/* Slider Container */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "25px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Slides */}
          <div
            style={{
              display: "flex",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(${currentSlide * 100}%)`,
            }}
          >
            {offers.map((offer, index) => (
              <div
                key={offer._id}
                style={{
                  minWidth: "100%",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${
                      offer.color?.primary || "#ff6b6b"
                    }, ${offer.color?.secondary || "#ee5a24"})`,
                    padding: "60px 40px",
                    borderRadius: "25px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Background Decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-20%",
                      width: "300px",
                      height: "300px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      transform: "rotate(45deg)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-30%",
                      left: "-10%",
                      width: "200px",
                      height: "200px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "50%",
                      transform: "rotate(-30deg)",
                    }}
                  />

                  <Row className="align-items-center">
                    {/* Content */}
                    <Col md={6}>
                      <div className="text-white">
                        <h1
                          style={{
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                          }}
                        >
                          {offer.title}
                        </h1>
                        <p
                          style={{
                            fontSize: "1.4rem",
                            marginBottom: "30px",
                            opacity: 0.95,
                            lineHeight: "1.6",
                          }}
                        >
                          {offer.description}
                        </p>

                        <div className="d-flex align-items-center mb-4">
                          <Badge
                            bg="light"
                            text="dark"
                            style={{
                              fontSize: "2rem",
                              fontWeight: "bold",
                              padding: "15px 25px",
                              borderRadius: "20px",
                              marginRight: "20px",
                              animation: "pulse 2s infinite",
                            }}
                          >
                            {offer.discount}
                          </Badge>
                          {offer.icon && (
                            <span style={{ fontSize: "3rem" }}>
                              {offer.icon}
                            </span>
                          )}
                        </div>

                        <div className="d-flex align-items-center mb-4">
                          <div className="me-4">
                            <small
                              style={{
                                opacity: 0.9,
                                fontSize: "1.1rem",
                                display: "block",
                              }}
                            >
                              <i className="fas fa-calendar-alt me-2"></i>
                              من: {formatDateGregorian(offer.startDate)}
                            </small>
                          </div>
                          <div>
                            <small
                              style={{
                                opacity: 0.9,
                                fontSize: "1.1rem",
                                display: "block",
                              }}
                            >
                              <i className="fas fa-calendar-alt me-2"></i>
                              إلى: {formatDateGregorian(offer.endDate)}
                            </small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <Badge
                            bg={offer.isActive ? "success" : "secondary"}
                            style={{
                              fontSize: "1.2rem",
                              padding: "12px 24px",
                              borderRadius: "25px",
                              marginRight: "20px",
                            }}
                          >
                            <i
                              className={`fas fa-${
                                offer.isActive ? "check-circle" : "pause-circle"
                              } me-2`}
                            ></i>
                            {offer.isActive ? "نشط الآن" : "غير نشط"}
                          </Badge>
                          <Link
                            to="/offers"
                            className="btn btn-light btn-lg"
                            style={{
                              borderRadius: "25px",
                              fontWeight: "bold",
                              padding: "12px 30px",
                              fontSize: "1.1rem",
                            }}
                          >
                            <i className="fas fa-gift me-2"></i>
                            عرض التفاصيل
                          </Link>
                        </div>
                      </div>
                    </Col>

                    {/* Image */}
                    <Col md={6}>
                      <div
                        style={{
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          src={offer.image}
                          alt={offer.title}
                          style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "400px",
                            objectFit: "cover",
                            borderRadius: "20px",
                            boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                            transform: "perspective(1000px) rotateY(-5deg)",
                            transition: "transform 0.3s ease",
                          }}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-offer.png";
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform =
                              "perspective(1000px) rotateY(0deg) scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform =
                              "perspective(1000px) rotateY(-5deg) scale(1)";
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {offers.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#333",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.9)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#333",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.9)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {offers.length > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
                zIndex: 10,
              }}
            >
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      currentSlide === index
                        ? "white"
                        : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "white";
                    e.target.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      currentSlide === index
                        ? "white"
                        : "rgba(255,255,255,0.5)";
                    e.target.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Offers Button */}
        <div className="text-center mt-4">
          <Link
            to="/offers"
            className="btn btn-outline-primary btn-lg px-5 py-3"
            style={{
              borderRadius: "30px",
              fontWeight: "bold",
              border: "2px solid #007bff",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              fontSize: "1.1rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#007bff";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 10px 20px rgba(0,123,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.9)";
              e.target.style.color = "#007bff";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            <i className="fas fa-gift me-2"></i>
            عرض جميع العروض ({offers.length})
          </Link>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.2rem !important;
          }

          h1 {
            font-size: 2.5rem !important;
          }

          .btn-lg {
            padding: 10px 20px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OffersSlider;
