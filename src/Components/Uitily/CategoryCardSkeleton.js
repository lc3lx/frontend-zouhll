import React from "react";
import { Col } from "react-bootstrap";
import "./ProductCardSkeleton.css";

const CategoryCardSkeleton = () => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around fade-in"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "180px",
          borderRadius: "25px",
          padding: "25px 20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
          border: "2px solid rgba(102, 126, 234, 0.1)",
          textAlign: "center",
        }}
      >
        {/* Image circle skeleton */}
        <div
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            margin: "0 auto 15px",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />

        {/* Title skeleton */}
        <div
          style={{
            height: "20px",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: "4px",
            margin: "0 auto",
            width: "80%",
          }}
        />
      </div>
    </Col>
  );
};

export default CategoryCardSkeleton;
