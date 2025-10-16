import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ModernAnimations.css";

const SimpleElegantHero = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background decorations */}
      <div
        className="float-animation"
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0.6,
        }}
      />
      <div
        className="float-animation-delayed"
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          opacity: 0.8,
        }}
      />
      
      {/* Additional floating elements */}
      <div
        className="rotate-animation"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(255, 217, 61, 0.3)",
          opacity: 0.7,
        }}
      />
      <div
        className="pulse-animation"
        style={{
          position: "absolute",
          bottom: "30%",
          right: "15%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(107, 207, 127, 0.2)",
          opacity: 0.6,
        }}
      />

      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-white text-center text-lg-start">
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: "800",
                marginBottom: "25px",
                lineHeight: "1.2",
              }}
            >
              تسوق بذكاء
              <br />
              <span style={{ color: "#ffd93d" }}>وفر أكثر</span>
              <br />
              <span style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.9)" }}>Shop Smart, Save More</span>
            </h1>
            
            <p
              style={{
                fontSize: "1.3rem",
                marginBottom: "40px",
                opacity: 0.95,
                lineHeight: "1.6",
                maxWidth: "500px",
              }}
            >
              اكتشف آلاف المنتجات عالية الجودة بأفضل الأسعار مع شحن مجاني وضمان الاسترداد
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button
                as={Link}
                to="/products"
                size="lg"
                className="btn-animated card-hover-lift"
                style={{
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  borderRadius: "50px",
                  padding: "18px 40px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  animation: "btnBounce 3s ease-in-out infinite 2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px) scale(1.05)";
                  e.target.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                }}
              >
                <FiShoppingBag className="me-2" />
                ابدأ التسوق الآن
                <FiArrowRight className="ms-2" />
              </Button>

              <Button
                as={Link}
                to="/allcategory"
                variant="outline-light"
                size="lg"
                className="btn-animated"
                style={{
                  borderRadius: "50px",
                  padding: "18px 40px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  border: "2px solid rgba(255,255,255,0.4)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                  e.target.style.borderColor = "white";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.borderColor = "rgba(255,255,255,0.4)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                تصفح التصنيفات
              </Button>
            </div>

            
          </Col>

          <Col lg={6} className="text-center mt-5 mt-lg-0">
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              {/* Main hero image placeholder */}
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  maxWidth: "100%",
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: "white",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-center">
                  <FiShoppingBag size={80} style={{ marginBottom: "20px", opacity: 0.8 }} />
                  <div>تجربة تسوق استثنائية</div>
                </div>
              </div>

              {/* Animated floating badges */}
              <div
                className="float-animation card-hover-lift"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "-20px",
                  background: "#ffd93d",
                  color: "#333",
                  borderRadius: "20px",
                  padding: "12px 20px",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  boxShadow: "0 10px 25px rgba(255, 217, 61, 0.4)",
                  animation: "bounce 2s infinite, pulse 3s ease-in-out infinite",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) translateY(-5px)";
                  e.target.style.boxShadow = "0 15px 35px rgba(255, 217, 61, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(255, 217, 61, 0.4)";
                }}
              >
                🚚 شحن مجاني
              </div>

              <div
                className="float-animation-delayed card-hover-lift"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "-20px",
                  background: "#6bcf7f",
                  color: "white",
                  borderRadius: "20px",
                  padding: "12px 20px",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  boxShadow: "0 10px 25px rgba(107, 207, 127, 0.4)",
                  animation: "bounce 2s infinite 1s, pulse 3s ease-in-out infinite 1.5s",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1) translateY(-5px)";
                  e.target.style.boxShadow = "0 15px 35px rgba(107, 207, 127, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1) translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(107, 207, 127, 0.4)";
                }}
              >
                ✅ ضمان الجودة
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SimpleElegantHero;
