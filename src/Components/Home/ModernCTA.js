import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FiMail, FiGift, FiBell, FiArrowRight } from "react-icons/fi";
import "./ModernAnimations.css";

const ModernCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div 
      style={{ 
        padding: "100px 0", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden"
      }}
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
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0.6,
        }}
      />
      <div
        className="rotate-animation"
        style={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          opacity: 0.8,
        }}
      />
      <div
        className="pulse-animation"
        style={{
          position: "absolute",
          top: "30%",
          left: "15%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255, 217, 61, 0.2)",
          opacity: 0.7,
        }}
      />

      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-white mb-5 mb-lg-0">
            <div style={{ animation: "slideInLeft 0.8s ease-out" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "50px",
                  marginBottom: "20px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                <FiGift size={16} />
                <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                  عروض حصرية
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: "900",
                  marginBottom: "20px",
                  lineHeight: "1.2"
                }}
              >
                اشترك في النشرة الإخبارية
                <br />
                <span style={{ color: "#ffd93d" }}>واحصل على خصم 20%</span>
              </h2>

              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "30px",
                  opacity: 0.95,
                  lineHeight: "1.6",
                  maxWidth: "500px"
                }}
              >
                كن أول من يعلم بالعروض الجديدة والمنتجات الحصرية والخصومات الخاصة
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  opacity: 0.8,
                  marginBottom: "0",
                  fontStyle: "italic"
                }}
              >
                Subscribe to our newsletter and get 20% off your first order
              </p>
            </div>
          </Col>

          <Col lg={6}>
            <div
              className="glass-effect"
              style={{
                padding: "50px 40px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                animation: "slideInRight 0.8s ease-out 0.2s both"
              }}
            >
              {!isSubscribed ? (
                <>
                  <div className="text-center mb-4">
                    <div
                      className="pulse-animation"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        color: "white"
                      }}
                    >
                      <FiMail size={32} />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "white",
                        marginBottom: "10px"
                      }}
                    >
                      انضم إلى عائلتنا
                    </h3>
                    
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                      <Form.Control
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          padding: "18px 60px 18px 20px",
                          borderRadius: "50px",
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                          background: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          fontSize: "1rem",
                          backdropFilter: "blur(10px)"
                        }}
                        className="text-white"
                      />
                      <Button
                        type="submit"
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "white",
                          color: "#667eea",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#ffd93d";
                          e.target.style.transform = "translateY(-50%) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white";
                          e.target.style.transform = "translateY(-50%) scale(1)";
                        }}
                      >
                        <FiArrowRight size={20} />
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center">
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0
                      }}
                    >
                      لا تقلق، نحن نحترم خصوصيتك ولن نرسل لك رسائل مزعجة
                    </p>
                  </div>

                  {/* Benefits */}
                  <div style={{ marginTop: "30px" }}>
                    <Row className="g-3">
                      <Col xs={6}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: "0.9rem"
                          }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: "rgba(255, 255, 255, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <FiGift size={14} />
                          </div>
                          خصومات حصرية
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: "0.9rem"
                          }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: "rgba(255, 255, 255, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <FiBell size={14} />
                          </div>
                          أحدث العروض
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : (
                <div className="text-center" style={{ animation: "bounceIn 0.6s ease-out" }}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: "rgba(107, 207, 127, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 25px",
                      color: "#6bcf7f",
                      fontSize: "3rem"
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "white",
                      marginBottom: "15px"
                    }}
                  >
                    شكراً لك!
                  </h3>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      marginBottom: "10px"
                    }}
                  >
                    تم الاشتراك بنجاح في النشرة الإخبارية
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: 0
                    }}
                  >
                    ستصلك رسالة تأكيد قريباً مع كود الخصم
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .form-control:focus {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default ModernCTA;
