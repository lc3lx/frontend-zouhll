import React from "react";

const LoadingSpinner = ({ size = "md", className = "", text = "" }) => {
  const sizeClasses = {
    sm: "theme-loading-dots",
    md: "theme-loading-dots",
    lg: "theme-loading-dots",
  };

  return (
    <div className={`loading-container ${className}`}>
      <div className={sizeClasses[size]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && (
        <p
          className="theme-text-muted mt-3 mb-0"
          style={{ fontSize: "0.9rem" }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
