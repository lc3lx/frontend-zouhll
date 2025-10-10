import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({
  size = "medium",
  type = "spinner",
  text = "جاري التحميل...",
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "loading-spinner-small";
      case "large":
        return "loading-spinner-large";
      default:
        return "loading-spinner-medium";
    }
  };

  const renderSpinner = () => (
    <div className={`loading-spinner ${getSizeClass()}`}>
      <div className="loading-spinner-circle"></div>
    </div>
  );

  const renderDots = () => (
    <div className="loading-dots">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  const renderPulse = () => (
    <div className="loading-pulse">
      <div className="loading-pulse-item"></div>
      <div className="loading-pulse-item"></div>
      <div className="loading-pulse-item"></div>
    </div>
  );

  const renderSkeleton = () => (
    <div className="skeleton-loading">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  );

  const renderLoadingType = () => {
    switch (type) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "skeleton":
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="loading-container">
      {renderLoadingType()}
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
