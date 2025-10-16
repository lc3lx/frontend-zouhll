import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiUsers, FiStar, FiShoppingBag, FiTruck, FiHeart } from "react-icons/fi";

const SocialProof = () => {
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    orders: 0,
    rating: 0,
    reviews: 0
  });

  const finalStats = {
    customers: 50000,
    orders: 125000,
    rating: 4.9,
    reviews: 15000
  };

  useEffect(() => {
    const animateNumber = (key, target, duration = 2000) => {
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = key === 'rating' 
          ? (target * easeOutQuart).toFixed(1)
          : Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: currentValue
        }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    setTimeout(() => animateNumber('customers', finalStats.customers), 200);
    setTimeout(() => animateNumber('orders', finalStats.orders), 400);
    setTimeout(() => animateNumber('rating', finalStats.rating), 600);
    setTimeout(() => animateNumber('reviews', finalStats.reviews), 800);
  }, []);

  const recentActivities = [
    { user: "أحمد من الرياض", action: "اشترى iPhone 15 Pro", time: "منذ دقيقتين", avatar: "👨" },
    { user: "فاطمة من جدة", action: "أضافت MacBook إلى السلة", time: "منذ 3 دقائق", avatar: "👩" },
    { user: "محمد من الدمام", action: "قيّم المنتج بـ 5 نجوم", time: "منذ 5 دقائق", avatar: "👨‍💼" },
    { user: "نورا من مكة", action: "اشترت AirPods Pro", time: "منذ 7 دقائق", avatar: "👩‍💻" },
    { user: "سعد من الطائف", action: "أضاف 3 منتجات للمفضلة", time: "منذ 10 دقائق", avatar: "👨‍🎓" }
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % recentActivities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toLocaleString();
  };

  return (
    <div style={{ 
      padding: "60px 0", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          opacity: 0.8,
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="align-items-center">
          {/* Stats Section */}
          <Col lg={8}>
            <div className="mb-4">
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: "900",
                  marginBottom: "15px",
                }}
              >
                ينضم إلينا آلاف العملاء يومياً
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  opacity: 0.9,
                  marginBottom: "40px",
                  lineHeight: "1.6",
                }}
              >
                كن جزءاً من مجتمع المتسوقين الذين يثقون في جودة منتجاتنا وخدماتنا
              </p>
            </div>

            {/* Stats Grid */}
            <Row>
              <Col md={3} xs={6} className="mb-4">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 15px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <FiUsers size={32} style={{ marginBottom: "10px", opacity: 0.8 }} />
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "900",
                      marginBottom: "5px",
                    }}
                  >
                    {formatNumber(animatedStats.customers)}
                  </div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    عميل سعيد
                  </div>
                </div>
              </Col>

              <Col md={3} xs={6} className="mb-4">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 15px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <FiShoppingBag size={32} style={{ marginBottom: "10px", opacity: 0.8 }} />
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "900",
                      marginBottom: "5px",
                    }}
                  >
                    {formatNumber(animatedStats.orders)}
                  </div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    طلب مكتمل
                  </div>
                </div>
              </Col>

              <Col md={3} xs={6} className="mb-4">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 15px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <FiStar size={32} style={{ marginBottom: "10px", opacity: 0.8 }} />
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "900",
                      marginBottom: "5px",
                    }}
                  >
                    {animatedStats.rating}★
                  </div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    تقييم العملاء
                  </div>
                </div>
              </Col>

              <Col md={3} xs={6} className="mb-4">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 15px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <FiHeart size={32} style={{ marginBottom: "10px", opacity: 0.8 }} />
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "900",
                      marginBottom: "5px",
                    }}
                  >
                    {formatNumber(animatedStats.reviews)}
                  </div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    مراجعة إيجابية
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Live Activity Feed */}
          <Col lg={4}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "25px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                height: "300px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#6bcf7f",
                    animation: "pulse 2s infinite",
                  }}
                />
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>
                  النشاط المباشر
                </h4>
              </div>

              <div style={{ flex: 1, overflow: "hidden" }}>
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      opacity: index === currentActivity ? 1 : 0.3,
                      transform: index === currentActivity ? "translateY(0)" : "translateY(20px)",
                      transition: "all 0.5s ease",
                      marginBottom: "15px",
                      padding: "12px",
                      borderRadius: "12px",
                      background: index === currentActivity ? "rgba(255, 255, 255, 0.1)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {activity.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "2px" }}>
                        {activity.user}
                      </div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "2px" }}>
                        {activity.action}
                      </div>
                      <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  opacity: 0.7,
                  marginTop: "10px",
                }}
              >
                يتم التحديث كل 3 ثوانٍ
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default SocialProof;
