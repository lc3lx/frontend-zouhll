import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./ModernAnimations.css";
import { useGetData as getData } from "../../hooks/useGetData";

 

const ModernTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);

  // Fetch real reviews from backend (public endpoint)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getData(`/api/v1/reviews?limit=8&sort=-createdAt`);
        const list = Array.isArray(res?.data) ? res.data : [];
        const mapped = list
          .filter((r) => r?.title && r?.user?.name)
          .map((r) => ({
            id: r._id,
            name: r.user.name,
            rating: r.ratings,
            text: r.title,
            image: r.user?.profileImg || null,
          }));
        setDynamicTestimonials(mapped);
      } catch (e) {
        // Fallback to defaults on error
        setDynamicTestimonials([]);
      }
    };
    fetchReviews();
  }, []);

  const items = dynamicTestimonials;
  const itemsLength = items.length;
  
  useEffect(() => {
    if (isAutoPlaying && itemsLength > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === itemsLength - 1 ? 0 : prevIndex + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, itemsLength]);

  if (itemsLength === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === itemsLength - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? itemsLength - 1 : currentIndex - 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        size={16}
        style={{
          color: index < rating ? "#ffd93d" : "#e2e8f0",
          fill: index < rating ? "#ffd93d" : "transparent",
        }}
      />
    ));
  };

  return (
    <div 
      style={{ 
        padding: "100px 0", 
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background decorations */}
      <div
        className="float-animation"
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.05)",
          opacity: 0.6,
        }}
      />
      <div
        className="float-animation-delayed"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(240, 147, 251, 0.05)",
          opacity: 0.8,
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            className="gradient-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              marginBottom: "15px",
              animation: "slideInUp 0.8s ease-out"
            }}
          >
            آراء عملائنا
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#718096",
              maxWidth: "600px",
              margin: "0 auto",
              animation: "slideInUp 0.8s ease-out 0.2s both"
            }}
          >
            اكتشف تجارب عملائنا الرائعة وانضم إلى آلاف العملاء الراضين
            <br />
            <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Discover our customers' amazing experiences
            </span>
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
          <div
            className="glass-effect shadow-modern"
            style={{
              padding: "50px 40px",
              borderRadius: "24px",
              position: "relative",
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              animation: "bounceIn 1s ease-out"
            }}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "white",
                border: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#667eea";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#4a5568";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              onClick={nextTestimonial}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "white",
                border: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#667eea";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#4a5568";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <FiChevronRight size={20} />
            </button>

            {/* Testimonial Content */}
            <div className="text-center w-100">
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  margin: "0 auto 25px",
                  overflow: "hidden",
                  border: "4px solid white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  animation: "pulse 2s ease-in-out infinite"
                }}
              >
                {items[currentIndex].image ? (
                  <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "2rem",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  >
                    {(items[currentIndex].name || "?").charAt(0)}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                {renderStars(items[currentIndex].rating)}
              </div>

              <blockquote
                style={{
                  fontSize: "1.3rem",
                  fontStyle: "italic",
                  color: "#2d3748",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                  maxWidth: "600px",
                  margin: "0 auto 25px",
                  fontWeight: "500"
                }}
              >
                "{items[currentIndex].text}"
              </blockquote>

              <div>
                <h4
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#1a202c",
                    marginBottom: "5px"
                  }}
                >
                  {items[currentIndex].name}
                </h4>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginTop: "30px"
            }}
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: currentIndex === index ? "40px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  border: "none",
                  background: currentIndex === index 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                    : "#e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        </div>

        
      </Container>
    </div>
  );
};

export default ModernTestimonials;
