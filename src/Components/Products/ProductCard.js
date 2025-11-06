import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";

import rate from "../../images/rate.png";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import ProductCardHook from "./../../hook/products/product-card-hook";
import { getProductImage } from "../../utils/imageHelper";

const ProductCard = ({ item, favProd }) => {
  const [removeToWishListData, addToWishListData, handelFav, favImg] =
    ProductCardHook(item, favProd);
  const [isHovered, setIsHovered] = useState(false);

  // الحصول على رابط الصورة الصحيح
  const productImage = getProductImage(item);

  return (
    <Col xs="6" sm="6" md="4" lg="3" xl="3" className="d-flex fade-in">
      <Card
        className="product-card-amazon my-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          height: "auto",
          minHeight: "380px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          boxShadow: isHovered
            ? "0 4px 8px rgba(0,0,0,0.1)"
            : "0 2px 4px rgba(0,0,0,0.05)",
          transition: "all 0.2s ease",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px 8px 0 0",
              background: "#f8f8f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "180px",
              minHeight: "150px",
              width: "100%",
            }}
          >
            <Card.Img
              style={{
                height: "auto",
                maxHeight: "180px",
                width: "auto",
                maxWidth: "100%",
                objectFit: "contain",
                transition: "transform 0.2s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              src={productImage}
              alt={item?.title || "منتج"}
              loading="lazy"
              decoding="async"
            />

            {/* Badges */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {item.priceAfterDiscount && (
                <div
                  style={{
                    background: "#B12704",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  -
                  {Math.round(
                    ((item.price - item.priceAfterDiscount) / item.price) * 100
                  )}
                  %
                </div>
              )}

              {/* New badge - show if product is less than 14 days old */}
              {(() => {
                const createdDate = new Date(item.createdAt);
                const now = new Date();
                const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);
                return daysDiff <= 14;
              })() && (
                <div
                  style={{
                    background: "#007185",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  جديد
                </div>
              )}
            </div>

            {/* Wishlist button */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handelFav();
                }}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "50%",
                  padding: "6px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                }}
              >
                <img
                  src={favImg}
                  alt="المفضلة"
                  style={{
                    height: "16px",
                    width: "16px",
                  }}
                />
              </div>
            </div>
          </div>
        </Link>

        <Card.Body
          style={{
            padding: "12px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Product Title */}
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#0f1111",
              marginBottom: "8px",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "36px",
            }}
          >
            {item.title}
          </div>

          {/* Rating */}
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "4px",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      i < Math.floor(item.ratingsAverage || 0)
                        ? "#ff9900"
                        : "#ddd",
                    fontSize: "12px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "#007185" }}>
              ({item.ratingsQuantity || 0})
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: "8px" }}>
            {item.priceAfterDiscount >= 1 ? (
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#B12704",
                  }}
                >
                  ${item.priceAfterDiscount}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#565959",
                    textDecoration: "line-through",
                    marginRight: "8px",
                  }}
                >
                  ${item.price}
                </span>
              </div>
            ) : (
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#B12704",
                }}
              >
                ${item.price}
              </span>
            )}
          </div>

          {/* Shipping Info */}
          <div
            style={{ fontSize: "12px", color: "#007185", marginBottom: "8px" }}
          >
            شحن مجاني
          </div>

          {/* Stock Status */}
          <div
            style={{ fontSize: "12px", color: "#007600", fontWeight: "600" }}
          >
            متوفر في المخزون
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
