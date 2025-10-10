import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";

const BrandCard = ({ img, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  // الحصول على رابط الصورة الصحيح
  const brandImage = getImageUrl(img);

  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-3 d-flex justify-content-center fade-in"
    >
      <Link
        to={`/products/brand/${id}`}
        style={{ textDecoration: "none", width: "100%", maxWidth: "180px" }}
      >
        <Card
          className="brand-card-modern"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            height: "170px",
            borderRadius: "25px",
            border: `2px solid ${
              isHovered
                ? "rgba(102, 126, 234, 0.5)"
                : "rgba(102, 126, 234, 0.1)"
            }`,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: isHovered
              ? "0 20px 60px rgba(102, 126, 234, 0.3)"
              : "0 8px 32px rgba(102, 126, 234, 0.15)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: isHovered
              ? "translateY(-12px) scale(1.05)"
              : "translateY(0) scale(1)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.4s ease",
            }}
          />

          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea22, #764ba222)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #764ba222, #667eea22)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          <Card.Img
            src={brandImage}
            style={{
              width: "100%",
              height: "130px",
              objectFit: "contain",
              transition: "all 0.4s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              filter: isHovered
                ? "drop-shadow(0 8px 16px rgba(102, 126, 234, 0.3))"
                : "none",
              position: "relative",
              zIndex: 1,
            }}
          />
        </Card>
      </Link>
    </Col>
  );
};

export default BrandCard;
