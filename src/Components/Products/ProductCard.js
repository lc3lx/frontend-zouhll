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
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex fade-in">
      <Card
        className="product-card-modern my-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          height: "380px",
          borderRadius: "25px",
          border: "2px solid rgba(102, 126, 234, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: isHovered
            ? "0 20px 60px rgba(102, 126, 234, 0.3)"
            : "0 8px 32px rgba(102, 126, 234, 0.15)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isHovered
            ? "translateY(-15px) scale(1.02)"
            : "translateY(0) scale(1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient overlay on top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.4s ease",
            transformOrigin: "left",
          }}
        />

        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "25px 25px 0 0",
            }}
          >
            <Card.Img
              style={{
                height: "240px",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              src={productImage}
            />
            {/* Dark overlay on hover */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(102, 126, 234, 0.1)",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {item.priceAfterDiscount && (
              <div
                className="discount-badge"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "25px",
                  fontSize: "13px",
                  fontWeight: "800",
                  boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
                  animation: "pulse 2s infinite",
                }}
              >
                خصم{" "}
                {Math.round(
                  ((item.price - item.priceAfterDiscount) / item.price) * 100
                )}
                %
              </div>
            )}
          </div>
        </Link>

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
            }}
          >
            <img
              src={favImg}
              alt="المفضلة"
              onClick={handelFav}
              className="text-center"
              style={{
                height: "24px",
                width: "26px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                filter: isHovered
                  ? "drop-shadow(0 2px 4px rgba(227, 6, 19, 0.3))"
                  : "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "scale(1.3) rotate(10deg)")
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = "scale(1) rotate(0deg)")
              }
            />
          </div>
        </div>
        <Card.Body style={{ padding: "15px 20px 20px" }}>
          <Card.Title>
            <div
              className="card-title"
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#2d3748",
                marginBottom: "12px",
                lineHeight: "1.5",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "48px",
              }}
            >
              {item.title}
            </div>
          </Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div
                className="d-flex align-items-center"
                style={{
                  background: "linear-gradient(135deg, #ffeaa7, #fdcb6e)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  boxShadow: "0 2px 8px rgba(253, 203, 110, 0.3)",
                }}
              >
                <img src={rate} alt="التقييم" height="14px" width="14px" />
                <div
                  className="card-rate mx-2"
                  style={{
                    color: "#d63031",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  {item.ratingsAverage ? item.ratingsAverage.toFixed(1) : 0}
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap justify-content-end">
                <div className="price-container d-flex align-items-baseline">
                  {item.priceAfterDiscount >= 1 ? (
                    <>
                      <div
                        className="old-price"
                        style={{
                          textDecoration: "line-through",
                          color: "#a0a0a0",
                          fontSize: "13px",
                          marginLeft: "8px",
                          fontWeight: "500",
                        }}
                      >
                        {item.price}
                      </div>
                      <div
                        className="card-price"
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "900",
                          fontSize: "20px",
                        }}
                      >
                        {item.priceAfterDiscount}
                      </div>
                    </>
                  ) : (
                    <div
                      className="card-price"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "900",
                        fontSize: "20px",
                      }}
                    >
                      {item.price}
                    </div>
                  )}
                  <div
                    className="card-currency mx-1"
                    style={{
                      color: "#718096",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    usd
                  </div>
                </div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
