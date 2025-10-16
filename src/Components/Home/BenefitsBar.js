import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiTruck, FiShield, FiRotateCw, FiHeadphones } from "react-icons/fi";
import "./ModernAnimations.css";

const items = [
  { icon: <FiTruck size={22} />, title: "شحن سريع", desc: "إلى جميع المحافظات" },
  { icon: <FiShield size={22} />, title: "دفع آمن", desc: "حماية كاملة" },
  { icon: <FiRotateCw size={22} />, title: "إرجاع سهل", desc: "خلال 14 يوم" },
  { icon: <FiHeadphones size={22} />, title: "دعم فني", desc: "خدمة عملاء" },
];

const BenefitsBar = () => {
  return (
    <div style={{ background: "white", padding: "40px 0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <Container>
        <Row className="g-4">
          {items.map((it, idx) => (
            <Col key={idx} xs={6} md={3} className="text-center">
              <div 
                style={{ 
                  padding: "30px 20px",
                  borderRadius: "15px",
                  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  border: "1px solid rgba(102, 126, 234, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)"
                  }}
                >
                  {it.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#2d3748", marginBottom: "5px" }}>
                  {it.title}
                </div>
                <div style={{ color: "#4a5568", fontSize: "0.9rem" }}>
                  {it.desc}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BenefitsBar;
