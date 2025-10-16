import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { 
  FiShield, 
  FiTruck, 
  FiHeadphones, 
  FiRotateCw, 
  FiCreditCard, 
  FiGift,
  FiStar,
  FiGlobe
} from "react-icons/fi";
import "./ModernAnimations.css";

const features = [
  {
    icon: <FiShield size={32} />,
    title: "دفع آمن",
    titleEn: "Secure Payment",
    description: "حماية كاملة لبياناتك المالية مع أحدث تقنيات التشفير",
    descriptionEn: "Complete protection with latest encryption technology",
    color: "#6bcf7f",
    gradient: "linear-gradient(135deg, #6bcf7f 0%, #4ade80 100%)"
  },
  {
    icon: <FiTruck size={32} />,
    title: "شحن سريع",
    titleEn: "Fast Shipping",
    description: "توصيل مجاني وسريع إلى جميع المحافظات خلال 24-48 ساعة",
    descriptionEn: "Free and fast delivery nationwide within 24-48 hours",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    icon: <FiHeadphones size={32} />,
    title: "دعم فني 24/7",
    titleEn: "24/7 Support",
    description: "فريق دعم متخصص متاح على مدار الساعة لمساعدتك",
    descriptionEn: "Specialized support team available around the clock",
    color: "#f093fb",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f441a5 100%)"
  },
  {
    icon: <FiRotateCw size={32} />,
    title: "إرجاع مجاني",
    titleEn: "Free Returns",
    description: "إمكانية الإرجاع والاستبدال المجاني خلال 14 يوم",
    descriptionEn: "Free return and exchange within 14 days",
    color: "#ffd93d",
    gradient: "linear-gradient(135deg, #ffd93d 0%, #f59e0b 100%)"
  },
  {
    icon: <FiCreditCard size={32} />,
    title: "طرق دفع متعددة",
    titleEn: "Multiple Payment Methods",
    description: "ادفع بالطريقة التي تناسبك - فيزا، ماستركارد، أو عند الاستلام",
    descriptionEn: "Pay your way - Visa, Mastercard, or cash on delivery",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
  },
  {
    icon: <FiGift size={32} />,
    title: "عروض حصرية",
    titleEn: "Exclusive Offers",
    description: "خصومات وعروض خاصة للعملاء المميزين وبرنامج نقاط الولاء",
    descriptionEn: "Special discounts and exclusive offers with loyalty program",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
  },
  {
    icon: <FiStar size={32} />,
    title: "جودة مضمونة",
    titleEn: "Quality Guaranteed",
    description: "منتجات أصلية 100% مع ضمان الجودة والأصالة",
    descriptionEn: "100% authentic products with quality and authenticity guarantee",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
  },
  {
    icon: <FiGlobe size={32} />,
    title: "تغطية شاملة",
    titleEn: "Nationwide Coverage",
    description: "نصل إليك في جميع أنحاء سوريا مع شبكة توزيع واسعة",
    descriptionEn: "We reach you nationwide with extensive distribution network",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
  }
];

const ModernFeatures = () => {
  return (
    <div 
      style={{ 
        padding: "100px 0", 
        background: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorations */}
      <div
        className="rotate-animation"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.05)",
          opacity: 0.6,
        }}
      />
      <div
        className="float-animation"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "80px",
          height: "80px",
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
            لماذا تختارنا؟
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
            نقدم لك تجربة تسوق استثنائية مع أفضل الخدمات والمميزات
            <br />
            <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Why Choose Us? Exceptional shopping experience with the best services
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} lg={3} md={6} className="mb-4">
              <div
                className="modern-hover glass-effect"
                style={{
                  padding: "40px 30px",
                  borderRadius: "20px",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.05)",
                  textAlign: "center",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Background gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: feature.gradient,
                    borderRadius: "20px 20px 0 0"
                  }}
                />

                {/* Icon */}
                <div
                  className="pulse-animation"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: feature.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                    color: "white",
                    boxShadow: `0 10px 30px ${feature.color}30`,
                    position: "relative"
                  }}
                >
                  {feature.icon}
                  
                  {/* Icon glow effect */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: feature.gradient,
                      opacity: 0.3,
                      filter: "blur(10px)",
                      zIndex: -1
                    }}
                  />
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#1a202c",
                    marginBottom: "8px"
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: feature.color,
                    fontWeight: "600",
                    marginBottom: "15px",
                    opacity: 0.8
                  }}
                >
                  {feature.titleEn}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#4a5568",
                    lineHeight: "1.6",
                    marginBottom: "10px"
                  }}
                >
                  {feature.description}
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#718096",
                    lineHeight: "1.5",
                    margin: 0,
                    fontStyle: "italic"
                  }}
                >
                  {feature.descriptionEn}
                </p>

                {/* Hover effect overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${feature.color}10, transparent)`,
                    borderRadius: "20px",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none"
                  }}
                  className="hover-overlay"
                />
              </div>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div
            className="glass-effect"
            style={{
              display: "inline-block",
              padding: "30px 40px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)",
              animation: "bounceIn 1s ease-out 0.5s both"
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "10px"
              }}
            >
              جاهز لبدء التسوق؟
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#718096",
                marginBottom: "20px"
              }}
            >
              انضم إلى آلاف العملاء الراضين واستمتع بتجربة تسوق فريدة
              <br />
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Ready to start shopping? Join thousands of satisfied customers
              </span>
            </p>
            <button
              className="btn-animated"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "15px 35px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              ابدأ التسوق الآن
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .modern-hover:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default ModernFeatures;
