import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiTruck, FiGift, FiPercent, FiHeadphones, FiCreditCard, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "تتبع الطلب",
      description: "تابع حالة طلبك",
      icon: <FiTruck size={24} />,
      color: "#667eea",
      bgColor: "#667eea15",
      link: "/track-order"
    },
    {
      id: 2,
      title: "بطاقات الهدايا",
      description: "اشتري بطاقة هدية",
      icon: <FiGift size={24} />,
      color: "#f093fb",
      bgColor: "#f093fb15",
      link: "/gift-cards"
    },
    {
      id: 3,
      title: "العروض الخاصة",
      description: "خصومات حصرية",
      icon: <FiPercent size={24} />,
      color: "#ff6b6b",
      bgColor: "#ff6b6b15",
      link: "/offers"
    },
    {
      id: 4,
      title: "دعم العملاء",
      description: "نحن هنا لمساعدتك",
      icon: <FiHeadphones size={24} />,
      color: "#6bcf7f",
      bgColor: "#6bcf7f15",
      link: "/support"
    },
    {
      id: 5,
      title: "طرق الدفع",
      description: "دفع آمن ومضمون",
      icon: <FiCreditCard size={24} />,
      color: "#ffd93d",
      bgColor: "#ffd93d15",
      link: "/payment-methods"
    },
    {
      id: 6,
      title: "الضمان",
      description: "ضمان شامل",
      icon: <FiShield size={24} />,
      color: "#4ecdc4",
      bgColor: "#4ecdc415",
      link: "/warranty"
    }
  ];

  return (
    <div style={{ 
      padding: "60px 0", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
    }}>
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(102, 126, 234, 0.1)",
              borderRadius: "50px",
              padding: "8px 20px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#667eea",
            }}
          >
            ⚡ خدمات سريعة
          </div>
          
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: "900",
              color: "#1a202c",
              marginBottom: "15px",
            }}
          >
            كل ما تحتاجه في مكان واحد
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#4a5568",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            خدمات متكاملة لتجربة تسوق استثنائية
          </p>
        </div>

        {/* Actions Grid */}
        <Row>
          {actions.map((action, index) => (
            <Col key={action.id} lg={4} md={6} className="mb-4">
              <Link
                to={action.link}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "30px 25px",
                    height: "100%",
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 15px 40px ${action.color}20`;
                    e.currentTarget.style.borderColor = `${action.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                  }}
                >
                  {/* Background decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "-30px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: action.bgColor,
                      opacity: 0.6,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "18px",
                      background: action.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: action.color,
                      marginBottom: "20px",
                      position: "relative",
                      zIndex: 1,
                      transition: "all 0.3s ease",
                    }}
                    className="action-icon"
                  >
                    {action.icon}
                  </div>

                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#1a202c",
                        marginBottom: "8px",
                      }}
                    >
                      {action.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "#4a5568",
                        margin: 0,
                        lineHeight: "1.5",
                      }}
                    >
                      {action.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "25px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: action.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: action.color,
                      fontSize: "14px",
                      opacity: 0,
                      transform: "translateX(10px)",
                      transition: "all 0.3s ease",
                    }}
                    className="action-arrow"
                  >
                    ←
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <div className="text-center mt-5">
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "40px 30px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.05)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                color: "#1a202c",
                marginBottom: "15px",
              }}
            >
              هل تحتاج مساعدة؟
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#4a5568",
                marginBottom: "25px",
                lineHeight: "1.6",
              }}
            >
              فريق الدعم متاح 24/7 لمساعدتك في أي استفسار
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
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
                <FiHeadphones size={18} />
                تواصل معنا
              </Link>
              
              <Link
                to="/faq"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "transparent",
                  color: "#667eea",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "1rem",
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
                الأسئلة الشائعة
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .action-icon:hover {
          transform: scale(1.1) rotate(5deg);
        }
        
        div:hover .action-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
};

export default QuickActions;
