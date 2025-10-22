import React from "react";

const ErrorMessage = ({
  error,
  onRetry,
  className = "",
  showRetry = true,
  title = "حدث خطأ",
}) => {
  const errorMessage =
    error?.message || error?.data?.message || "حدث خطأ غير متوقع";

  return (
    <div className={`text-center py-4 ${className}`}>
      <div className="theme-card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <i
            className="fas fa-exclamation-triangle text-warning"
            style={{ fontSize: "2rem" }}
          ></i>
        </div>

        <h5 className="theme-text-primary mb-3">{title}</h5>

        <p className="theme-text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
          {errorMessage}
        </p>

        {showRetry && onRetry && (
          <button onClick={onRetry} className="theme-btn theme-btn-primary">
            <i className="fas fa-redo-alt me-2"></i>
            إعادة المحاولة
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
