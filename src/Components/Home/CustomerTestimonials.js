import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageCircle } from "react-icons/fi";

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "مهندس برمجيات",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "تجربة تسوق رائعة! المنتجات عالية الجودة والتوصيل سريع جداً. أنصح الجميع بالتسوق من هنا.",
      location: "الرياض، السعودية"
    },
    {
      name: "فاطمة العلي",
      role: "طبيبة",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "خدمة عملاء ممتازة ومنتجات أصلية. تم حل مشكلتي بسرعة ومهنية عالية.",
      location: "دبي، الإمارات"
    },
    {
      name: "محمد الخالد",
      role: "رجل أعمال",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "أسعار تنافسية وجودة ممتازة. أصبح موقعي المفضل للتسوق الإلكتروني.",
      location: "الكويت"
    },
    {
      name: "نور الدين",
      role: "مصممة جرافيك",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "التصميم رائع والموقع سهل الاستخدام. وجدت كل ما أحتاجه بسهولة.",
      location: "بيروت، لبنان"
    },
    {
      name: "عبدالله السالم",
      role: "مدرس",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      text: "شحن مجاني وسريع، والمنتجات تطابق الوصف تماماً. تجربة ممتازة!",
      location: "عمان، الأردن"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={20}
        style={{
          color: i < rating ? "#ffd93d" : "#e2e8f0",
          fill: i < rating ? "#ffd93d" : "none",
        }}
      />
    ));
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "900",
              color: "white",
              marginBottom: "20px",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            ماذا يقول عملاؤنا؟
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.9)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            تقييمات حقيقية من عملاء سعداء حول العالم
          </p>
        </div>

        {/* Main Testimonial */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "30px",
                padding: "50px",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.2)",
                position: "relative",
                animation: "fadeIn 0.8s ease-out",
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <FiMessageCircle size={24} />
              </div>

              {/* Avatar */}
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "25px",
                  border: "4px solid #667eea",
                  objectFit: "cover",
                }}
              />

              {/* Rating */}
              <div className="d-flex justify-content-center mb-3">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Testimonial text */}
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#2d3748",
                  lineHeight: "1.8",
                  marginBottom: "30px",
                  fontStyle: "italic",
                }}
              >
                "{testimonials[currentTestimonial].text}"
              </p>

              {/* Customer info */}
              <div>
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#2d3748",
                    marginBottom: "5px",
                  }}
                >
                  {testimonials[currentTestimonial].name}
                </h4>
                <p
                  style={{
                    color: "#667eea",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  {testimonials[currentTestimonial].role}
                </p>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Navigation */}
        <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
          <button
            onClick={prevTestimonial}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Dots indicator */}
          <div className="d-flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: index === currentTestimonial ? "30px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  border: "none",
                  background: index === currentTestimonial 
                    ? "white" 
                    : "rgba(255,255,255,0.5)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Bottom stats */}
        <Row className="mt-5 text-center text-white">
          <Col md={4}>
            <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "10px" }}>
              50K+
            </div>
            <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>عميل سعيد</div>
          </Col>
          <Col md={4}>
            <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "10px" }}>
              4.9★
            </div>
            <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>متوسط التقييم</div>
          </Col>
          <Col md={4}>
            <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "10px" }}>
              99%
            </div>
            <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>نسبة الرضا</div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CustomerTestimonials;
