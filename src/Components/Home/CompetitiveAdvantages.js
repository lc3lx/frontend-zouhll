import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiShield, FiTruck, FiHeadphones, FiRefreshCw, FiAward, FiCreditCard } from "react-icons/fi";

const CompetitiveAdvantages = () => {
  const advantages = [
    {
      icon: <FiTruck size={32} />,
      title: "شحن سريع ومجاني",
      description: "توصيل مجاني للطلبات أكثر من $50 خلال 24 ساعة",
      color: "#667eea",
      delay: "0s"
    },
    {
      icon: <FiShield size={32} />,
      title: "ضمان الجودة",
      description: "ضمان استرداد كامل خلال 30 يوم إذا لم تكن راضياً",
      color: "#f093fb",
      delay: "0.2s"
    },
    {
      icon: <FiHeadphones size={32} />,
      title: "دعم 24/7",
      description: "فريق دعم متاح على مدار الساعة لمساعدتك",
      color: "#4facfe",
      delay: "0.4s"
    },
    {
      icon: <FiCreditCard size={32} />,
      title: "دفع آمن",
      description: "تشفير SSL وحماية كاملة لبياناتك المالية",
      color: "#6bcf7f",
      delay: "0.6s"
    },
    {
      icon: <FiRefreshCw size={32} />,
      title: "إرجاع سهل",
      description: "عملية إرجاع بسيطة وسريعة بدون تعقيدات",
      color: "#ffd93d",
      delay: "0.8s"
    },
    {
      icon: <FiAward size={32} />,
      title: "منتجات أصلية",
      description: "جميع منتجاتنا أصلية 100% من الموردين المعتمدين",
      color: "#ff6b6b",
      delay: "1s"
    }
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea20, #764ba220)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f093fb20, #f5576c20)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "900",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
            }}
          >
            لماذا نحن الأفضل؟
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#4a5568",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            نقدم لك تجربة تسوق استثنائية مع مزايا لا تجدها في أي مكان آخر
          </p>
        </div>

        {/* Advantages Grid */}
        <Row>
          {advantages.map((advantage, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "25px",
                  padding: "40px 30px",
                  height: "100%",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                  border: "2px solid rgba(102, 126, 234, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: `slideInUp 0.8s ease-out ${advantage.delay} both`,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${advantage.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.15)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${advantage.color}, ${advantage.color}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    marginBottom: "25px",
                    boxShadow: `0 8px 25px ${advantage.color}40`,
                  }}
                >
                  {advantage.icon}
                </div>

                {/* Content */}
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#2d3748",
                    marginBottom: "15px",
                  }}
                >
                  {advantage.title}
                </h4>
                <p
                  style={{
                    color: "#4a5568",
                    lineHeight: "1.6",
                    fontSize: "1rem",
                    margin: 0,
                  }}
                >
                  {advantage.description}
                </p>

                {/* Decorative element */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: `${advantage.color}10`,
                    opacity: 0.5,
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <div className="text-center mt-5">
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "25px",
              padding: "40px",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
              border: "2px solid rgba(102, 126, 234, 0.1)",
              display: "inline-block",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: "800",
                color: "#2d3748",
                marginBottom: "15px",
              }}
            >
              جاهز لتجربة الفرق؟
            </h3>
            <p style={{ color: "#4a5568", marginBottom: "25px" }}>
              انضم إلى أكثر من 50,000 عميل سعيد حول العالم
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "15px 40px",
                fontSize: "1.1rem",
                fontWeight: "700",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
              }}
            >
              ابدأ التسوق الآن
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CompetitiveAdvantages;
