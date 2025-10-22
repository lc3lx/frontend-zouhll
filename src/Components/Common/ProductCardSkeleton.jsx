import React from "react";

const ProductCardSkeleton = ({ count = 1, className = "" }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`theme-card p-3 ${className}`}>
          {/* Image skeleton */}
          <div
            className="theme-skeleton mb-3"
            style={{ height: "200px", borderRadius: "var(--radius-md)" }}
          ></div>

          {/* Title skeleton */}
          <div
            className="theme-skeleton mb-2"
            style={{ height: "20px", width: "80%" }}
          ></div>

          {/* Price skeleton */}
          <div
            className="theme-skeleton mb-2"
            style={{ height: "24px", width: "60%" }}
          ></div>

          {/* Rating skeleton */}
          <div
            className="theme-skeleton mb-3"
            style={{ height: "16px", width: "40%" }}
          ></div>

          {/* Button skeleton */}
          <div
            className="theme-skeleton"
            style={{ height: "40px", borderRadius: "var(--radius-md)" }}
          ></div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
