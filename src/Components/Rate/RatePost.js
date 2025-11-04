import React from "react";
import { Col, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import AddRateHook from "../../hook/review/add-rate-hook";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const RatePost = () => {
  const { id } = useParams();
  const [
    OnChangeRateText,
    OnChangeRateValue,
    rateText,
    rateValue,
    user,
    onSubmit,
  ] = AddRateHook(id);

  var name = "";
  if (user && user.name) {
    name = user.name;
  } else {
    name = "يرجى تسجيل الدخول للتقييم";
  }

  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: rateValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      OnChangeRateValue(newValue);
    },
  };
  return (
    <div>
      <Row className="mt-3">
        <Col sm="12">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#0f1111",
                fontWeight: "500",
              }}
            >
              {name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ReactStars {...setting} />
              <span style={{ fontSize: "13px", color: "#565959" }}>
                {rateValue > 0 ? `(${rateValue} نجوم)` : "(اختر التقييم)"}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#0f1111",
                marginBottom: "8px",
                display: "block",
              }}
            >
              عنوان التقييم (اختياري)
            </label>
            <input
              type="text"
              placeholder="مثال: منتج رائع!"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#0f1111",
                marginBottom: "8px",
                display: "block",
              }}
            >
              تعليقك
            </label>
            <textarea
              value={rateText}
              onChange={OnChangeRateText}
              rows="4"
              placeholder="شاركنا بتجربتك مع هذا المنتج..."
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: "100px",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                marginTop: "4px",
                textAlign: "right",
              }}
            >
              {rateText.length} / 500 حرف
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <button
              onClick={onSubmit}
              disabled={!rateValue || rateText.trim().length === 0}
              style={{
                background:
                  rateValue && rateText.trim().length > 0 ? "#ff9900" : "#ddd",
                color:
                  rateValue && rateText.trim().length > 0 ? "#0f1111" : "#999",
                border: "none",
                borderRadius: "6px",
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor:
                  rateValue && rateText.trim().length > 0
                    ? "pointer"
                    : "not-allowed",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (rateValue && rateText.trim().length > 0) {
                  e.currentTarget.style.background = "#e47911";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (rateValue && rateText.trim().length > 0) {
                  e.currentTarget.style.background = "#ff9900";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              إضافة التقييم
            </button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default RatePost;
