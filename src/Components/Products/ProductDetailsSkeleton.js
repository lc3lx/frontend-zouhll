import React from "react";
import { Row, Col } from "react-bootstrap";
import "./ProductDetails.css";

const ProductDetailsSkeleton = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Breadcrumb Skeleton */}
      <div
        style={{
          padding: "12px 20px",
          background: "#f8f9fa",
          borderBottom: "1px solid #e7e7e7",
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      >
        <div
          className="skeleton-loader"
          style={{
            height: "16px",
            width: "200px",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Main Product Section Skeleton */}
      <Row className="g-0">
        <Col lg="5" xl="5">
          <div style={{ padding: "20px" }}>
            {/* Image Gallery Skeleton */}
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e7e7e7",
                overflow: "hidden",
              }}
            >
              <div
                className="skeleton-loader"
                style={{
                  height: "450px",
                  width: "100%",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              {/* Thumbnails Skeleton */}
              <div
                style={{
                  padding: "12px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="skeleton-loader"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Col>

        <Col lg="7" xl="7">
          <div style={{ padding: "20px", borderLeft: "1px solid #e7e7e7" }}>
            {/* Title Skeleton */}
            <div
              className="skeleton-loader"
              style={{
                height: "32px",
                width: "80%",
                marginBottom: "16px",
                borderRadius: "4px",
              }}
            />

            {/* Rating Skeleton */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                className="skeleton-loader"
                style={{
                  height: "20px",
                  width: "100px",
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Price Skeleton */}
            <div
              style={{
                padding: "16px",
                background: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <div
                className="skeleton-loader"
                style={{
                  height: "36px",
                  width: "150px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                }}
              />
              <div
                className="skeleton-loader"
                style={{
                  height: "20px",
                  width: "200px",
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Colors Skeleton */}
            <div style={{ marginBottom: "20px" }}>
              <div
                className="skeleton-loader"
                style={{
                  height: "20px",
                  width: "80px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="skeleton-loader"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes Skeleton */}
            <div style={{ marginBottom: "20px" }}>
              <div
                className="skeleton-loader"
                style={{
                  height: "20px",
                  width: "80px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                  gap: "10px",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="skeleton-loader"
                    style={{
                      height: "44px",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div style={{ marginBottom: "20px" }}>
              <div
                className="skeleton-loader"
                style={{
                  height: "44px",
                  width: "100%",
                  marginBottom: "8px",
                  borderRadius: "8px",
                }}
              />
              <div
                className="skeleton-loader"
                style={{
                  height: "44px",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs Skeleton */}
      <div
        style={{
          borderTop: "1px solid #e7e7e7",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "20px",
            borderBottom: "1px solid #e7e7e7",
            paddingBottom: "12px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton-loader"
              style={{
                height: "20px",
                width: "100px",
                borderRadius: "4px",
              }}
            />
          ))}
        </div>
        <div
          className="skeleton-loader"
          style={{
            height: "200px",
            width: "100%",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
