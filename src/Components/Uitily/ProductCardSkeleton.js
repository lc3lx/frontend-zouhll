import React from "react";
import { Card, Col } from "react-bootstrap";
import "./ProductCardSkeleton.css";

const ProductCardSkeleton = () => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex fade-in">
      <Card
        className="product-card-skeleton my-2"
        style={{
          width: "100%",
          height: "380px",
          borderRadius: "25px",
          border: "2px solid rgba(102, 126, 234, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Image skeleton */}
        <div
          style={{
            height: "240px",
            width: "100%",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: "25px 25px 0 0",
          }}
        />

        {/* Heart icon skeleton */}
        <div
          className="d-flex justify-content-end mx-2"
          style={{ marginTop: "-20px", position: "relative", zIndex: 2 }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.2)",
              border: "2px solid rgba(102, 126, 234, 0.1)",
              width: "44px",
              height: "44px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <Card.Body style={{ padding: "15px 20px 20px" }}>
          {/* Title skeleton */}
          <div
            style={{
              height: "20px",
              background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
          <div
            style={{
              height: "16px",
              width: "70%",
              background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />

          {/* Rating and price skeleton */}
          <div className="d-flex justify-content-between align-items-center">
            <div
              style={{
                width: "80px",
                height: "28px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "20px",
              }}
            />
            <div
              style={{
                width: "60px",
                height: "24px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "4px",
              }}
            />
          </div>
        </Card.Body>

      </Card>
    </Col>
  );
};

export default ProductCardSkeleton;
