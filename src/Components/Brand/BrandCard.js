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
      lg="3"
      className="mb-3"
    >
      <Link
        to={`/products/brand/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div
          className="amazon-brand-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            transition: "all 0.2s ease",
            cursor: "pointer",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isHovered
              ? "0 4px 8px rgba(0,0,0,0.1)"
              : "0 2px 4px rgba(0,0,0,0.05)",
            transform: isHovered
              ? "translateY(-2px)"
              : "translateY(0)",
          }}
        >
          <img
            src={brandImage}
            alt="ماركة"
            loading="lazy"
            decoding="async"
            style={{
              maxWidth: "100%",
              maxHeight: "120px",
              objectFit: "contain",
              transition: "transform 0.2s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
      </Link>
    </Col>
  );
};

export default BrandCard;
