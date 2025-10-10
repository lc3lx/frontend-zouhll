import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import AddToCartHook from "./../../hook/cart/add-to-cart-hook";

const ProductText = () => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, item);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "25px",
        padding: "30px",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        border: "2px solid rgba(102, 126, 234, 0.1)",
      }}
    >
      {/* Category Badge */}
      <Row className="mb-3">
        <Col>
          <span
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "700",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              display: "inline-block",
            }}
          >
            {cat.name}
          </span>
        </Col>
      </Row>

      {/* Product Title & Rating */}
      <Row className="mb-3">
        <Col>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#2d3748",
              marginBottom: "15px",
              lineHeight: "1.4",
            }}
          >
            {item.title}
          </h2>
          <div
            style={{
              background: "linear-gradient(135deg, #ffeaa7, #fdcb6e)",
              padding: "8px 16px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(253, 203, 110, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                marginLeft: "5px",
              }}
            >
              ⭐
            </span>
            <span
              style={{
                color: "#d63031",
                fontWeight: "800",
                fontSize: "16px",
              }}
            >
              {item.ratingsAverage || 0}
            </span>
          </div>
        </Col>
      </Row>

      {/* Brand */}
      <Row className="mb-4">
        <Col>
          <div
            style={{
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              padding: "15px 20px",
              borderRadius: "15px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                color: "#4a5568",
                fontSize: "15px",
                fontWeight: "600",
                marginLeft: "8px",
              }}
            >
              الماركة:
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "17px",
                fontWeight: "800",
              }}
            >
              {brand.name}
            </span>
          </div>
        </Col>
      </Row>

      {/* Colors & Quantity */}
      <Row className="mb-4">
        <Col>
          {item.availableColors && item.availableColors.length > 0 && (
            <div className="mb-3">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: "12px",
                }}
              >
                الألوان المتاحة:
              </div>
              <div className="d-flex flex-wrap gap-2">
                {item.availableColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => colorClick(index, color)}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border:
                        indexColor === index
                          ? "4px solid #667eea"
                          : "2px solid rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow:
                        indexColor === index
                          ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      transform:
                        indexColor === index ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
              padding: "12px 20px",
              borderRadius: "15px",
              display: "inline-block",
              boxShadow: "0 2px 8px rgba(150, 230, 161, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "#2d3748",
              }}
            >
              الكمية المتاحة:
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "900",
                color: "#27ae60",
                marginRight: "8px",
              }}
            >
              {item.quantity}
            </span>
          </div>
        </Col>
      </Row>

      {/* Description */}
      <Row className="mb-4">
        <Col>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "12px",
            }}
          >
            المواصفات:
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#4a5568",
              lineHeight: "1.8",
              padding: "20px",
              background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
              borderRadius: "15px",
              borderRight: "4px solid #667eea",
            }}
          >
            {item.description}
          </div>
        </Col>
      </Row>

      {/* Price & Add to Cart */}
      <Row className="mt-4">
        <Col md="12" className="d-flex flex-wrap align-items-center gap-3">
          {item.priceAfterDiscount >= 1 ? (
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "15px 30px",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              <span
                style={{
                  textDecoration: "line-through",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                {item.price}
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "900",
                }}
              >
                {item.priceAfterDiscount}
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginRight: "5px",
                }}
              >
                usd
              </span>
            </div>
          ) : (
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "15px 30px",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "900",
                }}
              >
                {item.price}
              </span>
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginRight: "5px",
                }}
              >
                usd
              </span>
            </div>
          )}

          <button
            onClick={addToCartHandel}
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              border: "none",
              padding: "15px 40px",
              borderRadius: "20px",
              color: "white",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px) scale(1.05)";
              e.target.style.boxShadow = "0 8px 25px rgba(245, 87, 108, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(245, 87, 108, 0.4)";
            }}
          >
            🛒 أضف للعربة
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default ProductText;
