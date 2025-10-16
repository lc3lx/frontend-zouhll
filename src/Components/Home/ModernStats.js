import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiUsers, FiShoppingBag, FiStar, FiTrendingUp } from "react-icons/fi";
import "./ModernAnimations.css";
import { useGetData as getData } from "../../hooks/useGetData";

const statsConfig = [
  {
    icon: <FiUsers size={40} />,
    suffix: "+",
    title: "عميل راضي",
    titleEn: "Happy Customers",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    icon: <FiShoppingBag size={40} />,
    suffix: "+",
    title: "منتج متنوع",
    titleEn: "Products Available",
    color: "#6bcf7f",
    gradient: "linear-gradient(135deg, #6bcf7f 0%, #4ade80 100%)"
  },
  {
    icon: <FiStar size={40} />,
    suffix: "★",
    title: "تقييم العملاء",
    titleEn: "Customer Rating",
    color: "#ffd93d",
    gradient: "linear-gradient(135deg, #ffd93d 0%, #f59e0b 100%)"
  },
  {
    icon: <FiTrendingUp size={40} />,
    suffix: "%",
    title: "رضا العملاء",
    titleEn: "Satisfaction Rate",
    color: "#f093fb",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f441a5 100%)"
  }
];

const ModernStats = () => {
  // Targets fetched from backend (defaults)
  const [targets, setTargets] = useState([0, 0, 0, 0]);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const hasStats = targets.some((v) => v > 0);

  // Fetch dynamic stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Products count: limit=1 => numberOfPages equals total count
        const prodRes = await getData(`/api/v1/products?limit=1`);
        const productsCount = prodRes?.paginationResult?.numberOfPages || 0;

        // Reviews count (proxy for happy customers)
        const revCountRes = await getData(`/api/v1/reviews?limit=1`);
        const reviewsCount = revCountRes?.paginationResult?.numberOfPages || 0;

        // Recent reviews to compute avg rating and satisfaction rate
        const revSampleRes = await getData(`/api/v1/reviews?limit=50&sort=-createdAt`);
        const reviews = Array.isArray(revSampleRes?.data) ? revSampleRes.data : [];
        const ratings = reviews.map((r) => Number(r.ratings) || 0);
        const avgRating = ratings.length
          ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
          : 0;
        const satisfaction = ratings.length
          ? Math.round((ratings.filter((r) => r >= 4).length / ratings.length) * 100)
          : 0;

        setTargets([reviewsCount, productsCount, avgRating, satisfaction]);
      } catch (e) {
        // keep defaults on error
      }
    };
    fetchStats();
  }, []);

  const animateCounters = useCallback(() => {
    if (!hasStats) return;
    targets.forEach((endValue, index) => {
      let start = 0;
      const end = endValue;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(start * 10) / 10;
          return newCounters;
        });
      }, 16);
    });
  }, [targets, hasStats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible, animateCounters]);

  // Re-animate when targets change and section already visible
  useEffect(() => {
    if (isVisible) animateCounters();
  }, [targets, isVisible, animateCounters]);

  if (!hasStats) return null;

  return (
    <div 
      id="stats-section"
      style={{ 
        padding: "80px 0", 
        background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorations */}
      <div
        className="float-animation"
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.1)",
          opacity: 0.6,
        }}
      />
      <div
        className="rotate-animation"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "15%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(240, 147, 251, 0.1)",
          opacity: 0.8,
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              color: "white",
              marginBottom: "15px",
              animation: "slideInUp 0.8s ease-out"
            }}
          >
            أرقام تتحدث عن نفسها
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "600px",
              margin: "0 auto",
              animation: "slideInUp 0.8s ease-out 0.2s both"
            }}
          >
            إنجازاتنا وثقة عملائنا هي أكبر دليل على جودة خدماتنا
            <br />
            <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              Our achievements and customer trust prove our service quality
            </span>
          </p>
        </div>

        {/* Stats Grid */}
        <Row className="g-4">
          {statsConfig.map((stat, index) => (
            <Col key={index} lg={3} md={6} className="text-center">
              <div
                className="glass-effect modern-hover"
                style={{
                  padding: "50px 30px",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  animation: `bounceIn 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Background glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: stat.gradient,
                    opacity: 0.1,
                    filter: "blur(40px)",
                    zIndex: 0
                  }}
                />

                {/* Icon */}
                <div
                  className="pulse-animation"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: stat.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                    color: "white",
                    boxShadow: `0 15px 40px ${stat.color}40`,
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {stat.icon}
                </div>

                {/* Number */}
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "900",
                    color: "white",
                    marginBottom: "10px",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {stat.suffix === "★" ? counters[index].toFixed(1) : counters[index]}{stat.suffix}
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "white",
                    marginBottom: "5px",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {stat.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: 0,
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {stat.titleEn}
                </p>

                {/* Animated border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: stat.gradient,
                    borderRadius: "20px 20px 0 0",
                    animation: "shimmer 2s ease-in-out infinite"
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div
            style={{
              animation: "slideInUp 1s ease-out 0.8s both"
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "25px",
                fontWeight: "500"
              }}
            >
              انضم إلى عائلتنا الكبيرة من العملاء الراضين
              <br />
              <span style={{ fontSize: "1rem", opacity: 0.8 }}>
                Join our big family of satisfied customers
              </span>
            </p>
            <button
              className="btn-animated"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "18px 40px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.4)";
              }}
            >
              ابدأ رحلتك معنا
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ModernStats;
