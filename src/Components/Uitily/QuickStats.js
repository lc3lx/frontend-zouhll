import React from "react";
import { Row, Col } from "react-bootstrap";
import { FiPackage, FiTrendingUp, FiStar, FiUsers } from "react-icons/fi";

const QuickStats = ({ stats = [] }) => {
  const defaultStats = [
    { icon: <FiPackage size={24} />, label: "إجمالي المنتجات", value: "1,234", color: "#667eea" },
    { icon: <FiTrendingUp size={24} />, label: "الأكثر مبيعاً", value: "89", color: "#f093fb" },
    { icon: <FiStar size={24} />, label: "متوسط التقييم", value: "4.8", color: "#ffd93d" },
    { icon: <FiUsers size={24} />, label: "العملاء", value: "2,567", color: "#6bcf7f" },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "25px",
        padding: "30px",
        marginBottom: "30px",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        border: "2px solid rgba(102, 126, 234, 0.1)",
      }}
    >
      <Row>
        {displayStats.map((stat, index) => (
          <Col key={index} xs={6} md={3} className="mb-3 mb-md-0">
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                border: `2px solid ${stat.color}20`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  color: "white",
                }}
              >
                {stat.icon}
              </div>
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "900",
                  color: stat.color,
                  marginBottom: "5px",
                }}
              >
                {stat.value}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4a5568",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuickStats;
