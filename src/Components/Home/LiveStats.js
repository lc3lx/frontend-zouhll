import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiTrendingUp, FiUsers, FiPackage, FiGlobe, FiShoppingCart, FiStar } from "react-icons/fi";

const LiveStats = () => {
  const [animatedStats, setAnimatedStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    countries: 0,
    sales: 0,
    rating: 0
  });

  const finalStats = {
    products: 12547,
    customers: 89234,
    orders: 156789,
    countries: 45,
    sales: 2.4,
    rating: 4.9
  };

  useEffect(() => {
    const animateNumber = (key, target, duration = 2000) => {
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: key === 'sales' || key === 'rating' ? (target * easeOutQuart).toFixed(1) : currentValue
        }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    // Start animations with delays
    setTimeout(() => animateNumber('products', finalStats.products), 200);
    setTimeout(() => animateNumber('customers', finalStats.customers), 400);
    setTimeout(() => animateNumber('orders', finalStats.orders), 600);
    setTimeout(() => animateNumber('countries', finalStats.countries), 800);
    setTimeout(() => animateNumber('sales', finalStats.sales), 1000);
    setTimeout(() => animateNumber('rating', finalStats.rating), 1200);
  }, []);

  const stats = [
    {
      icon: <FiPackage size={40} />,
      value: animatedStats.products.toLocaleString(),
      label: "منتج متاح",
      suffix: "+",
      color: "#667eea",
      bgColor: "#667eea15"
    },
    {
      icon: <FiUsers size={40} />,
      value: animatedStats.customers.toLocaleString(),
      label: "عميل نشط",
      suffix: "+",
      color: "#f093fb",
      bgColor: "#f093fb15"
    },
    {
      icon: <FiShoppingCart size={40} />,
      value: animatedStats.orders.toLocaleString(),
      label: "طلب مكتمل",
      suffix: "+",
      color: "#4facfe",
      bgColor: "#4facfe15"
    },
    {
      icon: <FiGlobe size={40} />,
      value: animatedStats.countries,
      label: "دولة نخدمها",
      suffix: "+",
      color: "#6bcf7f",
      bgColor: "#6bcf7f15"
    },
    {
      icon: <FiTrendingUp size={40} />,
      value: animatedStats.sales,
      label: "مليون $ مبيعات",
      suffix: "M",
      color: "#ffd93d",
      bgColor: "#ffd93d15"
    },
    {
      icon: <FiStar size={40} />,
      value: animatedStats.rating,
      label: "تقييم العملاء",
      suffix: "★",
      color: "#ff6b6b",
      bgColor: "#ff6b6b15"
    }
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea10, #764ba210)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f093fb10, #f5576c10)",
          animation: "pulse 6s ease-in-out infinite reverse",
        }}
      />

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
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#6bcf7f",
                marginRight: "8px",
                animation: "blink 2s infinite",
              }}
            />
            إحصائيات مباشرة
          </div>
          
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
            }}
          >
            أرقام تتحدث عن نفسها
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
            نمو مستمر وثقة متزايدة من عملائنا حول العالم
          </p>
        </div>

        {/* Stats Grid */}
        <Row>
          {stats.map((stat, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "25px",
                  padding: "40px 30px",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                  border: "2px solid rgba(102, 126, 234, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: `slideInUp 0.8s ease-out ${index * 0.1}s both`,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.15)";
                }}
              >
                {/* Background decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: stat.bgColor,
                    opacity: 0.5,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: "0 auto 25px",
                    boxShadow: `0 8px 25px ${stat.color}40`,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.icon}
                </div>

                {/* Value */}
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: "900",
                    color: stat.color,
                    marginBottom: "10px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.value}{stat.suffix}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: "1.1rem",
                    color: "#4a5568",
                    fontWeight: "600",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.label}
                </div>

                {/* Progress bar effect */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "4px",
                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                    animation: `progressBar 2s ease-out ${index * 0.2}s both`,
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
              padding: "30px",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
              border: "2px solid rgba(102, 126, 234, 0.1)",
              display: "inline-block",
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                color: "#4a5568",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              كن جزءاً من قصة نجاحنا
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "12px 30px",
                fontSize: "1rem",
                fontWeight: "700",
                boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }}
            >
              انضم إلينا الآن
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
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
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveStats;
