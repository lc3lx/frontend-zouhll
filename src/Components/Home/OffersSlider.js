import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useActiveOffers } from "../../hook/offers/useOffers";
import { formatDateGregorian } from "../../utils/dateHelper";

const OffersSlider = () => {
  const { offers, loading, error, data } = useActiveOffers();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Debug: Log data to see what's coming from backend
  useEffect(() => {
    console.log("=== OffersSlider Debug ===");
    console.log("loading:", loading);
    console.log("error:", error);
    console.log("data:", data);
    console.log("offers:", offers);
    console.log("offers length:", offers?.length);
    console.log("offers type:", typeof offers);
    console.log("Is offers array?", Array.isArray(offers));
  }, [loading, error, data, offers]);

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

  // Don't hide the component if there are no offers, just show a message
  // if (!offers || offers.length === 0) {
  //   return null;
  // }

  const nextSlide = () => {
    if (!offers || offers.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    if (!offers || offers.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index) => {
    if (!offers || offers.length === 0) return;
    setCurrentSlide(index);
  };

  // If no offers, show a message instead of hiding the component
  if (!offers || offers.length === 0) {
    return (
      <div
        className="offers-slider-responsive"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          padding: "60px 20px",
          margin: "30px auto",
          maxWidth: "1500px",
          borderRadius: "25px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Container>
          <div className="text-center">
            <h2
              className="offers-title-responsive"
              style={{ marginBottom: "20px" }}
            >
              العروض الخاصة
            </h2>
            <p className="text-muted">لا توجد عروض متاحة حالياً</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="offers-slider-responsive"
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
        <div className="text-center mb-5 offers-header-responsive">
          <h2
            className="offers-title-responsive"
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              color: "#2c3e50",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              marginBottom: "15px",
            }}
          >
            <span
              className="offers-icon-responsive"
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
              className="offers-icon-responsive"
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
            className="offers-subtitle-responsive"
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
          className="offers-slider-container"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "25px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          {/* Slides */}
          <div
            className="offers-slides-container"
            style={{
              display: "flex",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${
                offers && offers.length > 0 ? offers.length * 100 : 100
              }%`,
            }}
          >
            {offers && offers.length > 0 ? (
              offers.map((offer, index) => (
                <div
                  key={offer._id || index}
                  className="offer-slide-wrapper"
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    flexShrink: 0,
                    flexGrow: 0,
                  }}
                >
                  <div
                    className="offer-slide-responsive"
                    style={{
                      background: `linear-gradient(135deg, ${
                        offer.color?.primary || "#ff6b6b"
                      }, ${offer.color?.secondary || "#ee5a24"})`,
                      padding: "60px 40px",
                      borderRadius: "25px",
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      minHeight: "400px",
                      display: "flex",
                      flexDirection: "column",
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
                      <Col xs={12} md={6}>
                        <div className="text-white offer-content-responsive">
                          <h1
                            className="offer-title-responsive"
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
                            className="offer-description-responsive"
                            style={{
                              fontSize: "1.4rem",
                              marginBottom: "30px",
                              opacity: 0.95,
                              lineHeight: "1.6",
                            }}
                          >
                            {offer.description}
                          </p>

                          <div className="d-flex align-items-center mb-4 offer-discount-responsive">
                            <Badge
                              bg="light"
                              text="dark"
                              className="offer-discount-badge-responsive"
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
                              <span
                                className="offer-icon-size-responsive"
                                style={{ fontSize: "3rem" }}
                              >
                                {offer.icon}
                              </span>
                            )}
                          </div>

                          <div className="d-flex align-items-center mb-4 offer-dates-responsive flex-wrap">
                            <div className="me-4 mb-2">
                              <small
                                className="offer-date-text-responsive"
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
                            <div className="mb-2">
                              <small
                                className="offer-date-text-responsive"
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

                          <div className="d-flex align-items-center offer-actions-responsive flex-wrap">
                            <Badge
                              bg={offer.isActive ? "success" : "secondary"}
                              className="offer-status-badge-responsive mb-2"
                              style={{
                                fontSize: "1.2rem",
                                padding: "12px 24px",
                                borderRadius: "25px",
                                marginRight: "20px",
                              }}
                            >
                              <i
                                className={`fas fa-${
                                  offer.isActive
                                    ? "check-circle"
                                    : "pause-circle"
                                } me-2`}
                              ></i>
                              {offer.isActive ? "نشط الآن" : "غير نشط"}
                            </Badge>
                            <Link
                              to="/offers"
                              className="btn btn-light btn-lg offer-details-btn-responsive mb-2"
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
                      <Col xs={12} md={6} className="order-first order-md-last">
                        <div
                          className="offer-image-container-responsive"
                          style={{
                            textAlign: "center",
                            position: "relative",
                            marginBottom: "20px",
                          }}
                        >
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="offer-image-responsive"
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
              ))
            ) : (
              <div className="text-center py-5">
                <p className="text-muted">لا توجد عروض متاحة</p>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {offers && offers.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="offer-nav-btn-responsive offer-nav-prev"
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
                className="offer-nav-btn-responsive offer-nav-next"
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
          {offers && offers.length > 1 && (
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
            className="btn btn-outline-primary btn-lg px-5 py-3 offer-view-all-btn-responsive"
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

        .offers-slider-container {
          width: 100% !important;
          overflow: hidden !important;
          position: relative !important;
        }

        .offers-slides-container {
          display: flex !important;
          flex-direction: row !important;
          will-change: transform !important;
          height: 100% !important;
          position: relative !important;
        }

        .offer-slide-wrapper {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
          position: relative !important;
          display: flex !important;
          align-items: stretch !important;
          height: 100% !important;
        }

        .offer-slide-responsive {
          width: 100% !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          position: relative !important;
          min-height: 400px !important;
        }

        @media (max-width: 992px) {
          .offers-slider-responsive {
            padding: 40px 0 !important;
          }

          .offers-title-responsive {
            font-size: 2.2rem !important;
          }

          .offers-icon-responsive {
            margin: 0 10px !important;
            font-size: 1.8rem !important;
          }

          .offers-subtitle-responsive {
            font-size: 1.1rem !important;
            padding: 0 20px !important;
          }

          .offer-slide-responsive {
            padding: 40px 30px !important;
            border-radius: 20px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            min-height: 350px !important;
          }

          .offer-title-responsive {
            font-size: 2.5rem !important;
            margin-bottom: 18px !important;
          }

          .offer-description-responsive {
            font-size: 1.1rem !important;
            margin-bottom: 25px !important;
          }

          .offer-image-responsive {
            height: 300px !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .offers-slider-responsive {
            padding: 30px 0 !important;
          }

          .offers-title-responsive {
            font-size: 1.8rem !important;
          }

          .offers-icon-responsive {
            margin: 0 8px !important;
            font-size: 1.5rem !important;
          }

          .offers-subtitle-responsive {
            font-size: 1rem !important;
            padding: 0 15px !important;
          }

          .offer-slide-responsive {
            padding: 30px 20px !important;
            border-radius: 15px !important;
            min-height: 300px !important;
          }

          .offer-title-responsive {
            font-size: 2rem !important;
            margin-bottom: 15px !important;
          }

          .offer-description-responsive {
            font-size: 1rem !important;
            margin-bottom: 20px !important;
          }

          .offer-discount-badge-responsive {
            font-size: 1.5rem !important;
            padding: 10px 20px !important;
            margin-right: 10px !important;
          }

          .offer-icon-size-responsive {
            font-size: 2rem !important;
          }

          .offer-date-text-responsive {
            font-size: 0.9rem !important;
          }

          .offer-status-badge-responsive {
            font-size: 1rem !important;
            padding: 8px 16px !important;
            margin-right: 10px !important;
          }

          .offer-details-btn-responsive {
            padding: 10px 20px !important;
            font-size: 0.95rem !important;
          }

          .offer-image-responsive {
            height: 250px !important;
            max-width: 100% !important;
            transform: none !important;
          }

          .offer-image-container-responsive {
            margin-bottom: 20px !important;
          }

          .offer-nav-btn-responsive {
            width: 45px !important;
            height: 45px !important;
            font-size: 1.2rem !important;
          }

          .offer-nav-prev {
            left: 10px !important;
          }

          .offer-nav-next {
            right: 10px !important;
          }

          .offer-view-all-btn-responsive {
            padding: 10px 25px !important;
            font-size: 0.95rem !important;
          }

          .btn-lg {
            padding: 10px 20px !important;
            font-size: 1rem !important;
          }

          .offer-content-responsive {
            text-align: center !important;
          }

          .offer-discount-responsive {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }

          .offer-dates-responsive {
            justify-content: center !important;
          }

          .offer-actions-responsive {
            justify-content: center !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .offer-actions-responsive .offer-status-badge-responsive,
          .offer-actions-responsive .offer-details-btn-responsive {
            width: 100% !important;
            margin-right: 0 !important;
            margin-bottom: 10px !important;
            text-align: center !important;
          }
        }

        @media (max-width: 576px) {
          .offers-slider-responsive {
            padding: 20px 0 !important;
          }

          .offers-header-responsive {
            margin-bottom: 20px !important;
          }

          .offers-title-responsive {
            font-size: 1.5rem !important;
            margin-bottom: 10px !important;
            line-height: 1.3 !important;
          }

          .offers-icon-responsive {
            margin: 0 5px !important;
            font-size: 1.2rem !important;
          }

          .offers-subtitle-responsive {
            font-size: 0.9rem !important;
            padding: 0 10px !important;
            line-height: 1.4 !important;
          }

          .offer-slide-responsive {
            padding: 20px 15px !important;
            border-radius: 12px !important;
            min-height: 280px !important;
          }

          .offer-title-responsive {
            font-size: 1.5rem !important;
            margin-bottom: 12px !important;
            line-height: 1.3 !important;
          }

          .offer-description-responsive {
            font-size: 0.9rem !important;
            margin-bottom: 15px !important;
            line-height: 1.5 !important;
          }

          .offer-discount-badge-responsive {
            font-size: 1.2rem !important;
            padding: 8px 15px !important;
            margin-right: 8px !important;
            margin-bottom: 8px !important;
          }

          .offer-icon-size-responsive {
            font-size: 1.5rem !important;
          }

          .offer-date-text-responsive {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }

          .offer-dates-responsive {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .offer-dates-responsive > div {
            margin-right: 0 !important;
            margin-bottom: 8px !important;
            width: 100% !important;
          }

          .offer-status-badge-responsive {
            font-size: 0.9rem !important;
            padding: 6px 12px !important;
            margin-right: 0 !important;
            margin-bottom: 10px !important;
            width: 100% !important;
            text-align: center !important;
          }

          .offer-details-btn-responsive {
            padding: 8px 16px !important;
            font-size: 0.85rem !important;
            width: 100% !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }

          .offer-image-responsive {
            height: 200px !important;
            border-radius: 15px !important;
          }

          .offer-image-container-responsive {
            margin-bottom: 15px !important;
          }

          .offer-nav-btn-responsive {
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
          }

          .offer-nav-prev {
            left: 5px !important;
          }

          .offer-nav-next {
            right: 5px !important;
          }

          .offer-view-all-btn-responsive {
            padding: 8px 20px !important;
            font-size: 0.85rem !important;
          }

          .offer-content-responsive {
            text-align: center !important;
          }

          .offer-discount-responsive {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }

          .offer-actions-responsive {
            justify-content: center !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }

        @media (max-width: 480px) {
          .offers-slider-responsive {
            padding: 15px 0 !important;
          }

          .offers-title-responsive {
            font-size: 1.3rem !important;
          }

          .offers-subtitle-responsive {
            font-size: 0.85rem !important;
          }

          .offer-slide-responsive {
            padding: 15px 12px !important;
          }

          .offer-title-responsive {
            font-size: 1.3rem !important;
          }

          .offer-description-responsive {
            font-size: 0.85rem !important;
          }

          .offer-image-responsive {
            height: 180px !important;
          }

          .offer-nav-btn-responsive {
            width: 35px !important;
            height: 35px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OffersSlider;
