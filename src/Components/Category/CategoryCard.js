import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";

const CategoryCard = ({ background, img, title, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  // الحصول على رابط الصورة الصحيح
  const categoryImage = getImageUrl(img);

  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around fade-in"
    >
      <Link
        to={`/products/category/${id}`}
        style={{ textDecoration: "none", width: "100%", maxWidth: "180px" }}
        className="d-block"
      >
        <div
          className="category-card-modern"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            cursor: "pointer",
            transform: isHovered
              ? "translateY(-12px) scale(1.03)"
              : "translateY(0) scale(1)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "25px",
            padding: "25px 20px",
            boxShadow: isHovered
              ? "0 20px 60px rgba(102, 126, 234, 0.3)"
              : "0 8px 32px rgba(102, 126, 234, 0.15)",
            border: `2px solid ${
              isHovered
                ? "rgba(102, 126, 234, 0.5)"
                : "rgba(255, 255, 255, 0.3)"
            }`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.4s ease",
            }}
          />

          <div
            style={{
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                margin: "0 auto 15px",
                background: `linear-gradient(135deg, ${background}ee, ${background})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isHovered
                  ? `0 10px 30px ${background}66`
                  : `0 5px 20px ${background}44`,
                transition: "all 0.4s ease",
                transform: isHovered
                  ? "scale(1.15) rotate(10deg)"
                  : "scale(1) rotate(0deg)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Shine effect */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transform: isHovered
                    ? "translate(50%, 50%)"
                    : "translate(-50%, -50%)",
                  transition: "transform 0.6s ease",
                }}
              />

              <img
                alt={title}
                src={categoryImage}
                style={{
                  width: "55px",
                  height: "55px",
                  objectFit: "contain",
                  filter:
                    "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  transition: "all 0.4s ease",
                  transform: isHovered
                    ? "scale(1.1) rotate(-10deg)"
                    : "scale(1) rotate(0deg)",
                  position: "relative",
                  zIndex: 2,
                }}
              />
            </div>

            <p
              style={{
                margin: "0",
                fontSize: "17px",
                fontWeight: "700",
                background: isHovered
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "#2d3748",
                WebkitBackgroundClip: isHovered ? "text" : "unset",
                WebkitTextFillColor: isHovered ? "transparent" : "unset",
                color: isHovered ? "transparent" : "#2d3748",
                transition: "all 0.3s ease",
                lineHeight: "1.4",
              }}
            >
              {title}
            </p>

            {/* Animated underline */}
            <div
              style={{
                height: "3px",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                width: isHovered ? "80%" : "0",
                margin: "10px auto 0",
                transition: "width 0.4s ease",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default CategoryCard;
