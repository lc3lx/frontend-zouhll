import React from "react";
import { Col } from "react-bootstrap";
import "./ProductCardSkeleton.css";

const BrandCardSkeleton = () => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-3 d-flex justify-content-center fade-in"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "180px",
          height: "170px",
          borderRadius: "25px",
          border: "2px solid rgba(102, 126, 234, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* Brand image skeleton */}
        <div
          style={{
            width: "100%",
            height: "130px",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: "12px",
          }}
        />
      </div>
    </Col>
  );
};

export default BrandCardSkeleton;
