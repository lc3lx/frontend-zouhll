import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import sliderimg from "../../images/slider1.png";
import slider4 from "../../images/slider4.png";
import prod3 from "../../images/prod3.png";
import prod4 from "../../images/prod4.png";

const Silder = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="modern-slider"
    >
      <Carousel.Item
        className="slider-background modern-slider-item"
        interval={2000}
      >
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ padding: "40px 20px" }}
        >
          <img
            style={{
              height: "320px",
              width: "340px",
              borderRadius: "20px",
              boxShadow: "0 15px 50px rgba(102, 126, 234, 0.3)",
            }}
            className="slider-image"
            src={slider4}
            alt="First slide"
          />
          <div className="slider-content" style={{ marginRight: "40px" }}>
            <h3
              className="slider-title"
              style={{
                fontSize: "42px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              هناك خصم كبير
            </h3>
            <p
              className="slider-text"
              style={{ fontSize: "24px", fontWeight: "600" }}
            >
              خصم يصل ٥٠٪ عند شرائك
            </p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item
        className="slider-background2 modern-slider-item"
        interval={2000}
      >
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ padding: "40px 20px" }}
        >
          <img
            style={{
              height: "320px",
              width: "340px",
              borderRadius: "20px",
              boxShadow: "0 15px 50px rgba(102, 126, 234, 0.3)",
            }}
            className="slider-image"
            src={sliderimg}
            alt="Second slide"
          />
          <div className="slider-content" style={{ marginRight: "40px" }}>
            <h3
              className="slider-title"
              style={{
                fontSize: "42px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              هناك خصم كبير
            </h3>
            <p
              className="slider-text"
              style={{ fontSize: "24px", fontWeight: "600" }}
            >
              خصم يصل ٥٠٪ عند شرائك
            </p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item
        className="slider-background3 modern-slider-item"
        interval={2000}
      >
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ padding: "40px 20px" }}
        >
          <img
            style={{
              height: "320px",
              width: "380px",
              borderRadius: "20px",
              boxShadow: "0 15px 50px rgba(102, 126, 234, 0.3)",
            }}
            className="slider-image"
            src={prod3}
            alt="Third slide"
          />
          <div className="slider-content" style={{ marginRight: "40px" }}>
            <h3
              className="slider-title"
              style={{
                fontSize: "42px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              هناك خصم كبير
            </h3>
            <p
              className="slider-text"
              style={{ fontSize: "24px", fontWeight: "600" }}
            >
              خصم يصل ٥٠٪ عند شرائك
            </p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item
        className="slider-background4 modern-slider-item"
        interval={2000}
      >
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ padding: "40px 20px" }}
        >
          <img
            style={{
              height: "320px",
              width: "380px",
              borderRadius: "20px",
              boxShadow: "0 15px 50px rgba(102, 126, 234, 0.3)",
            }}
            className="slider-image"
            src={prod4}
            alt="Fourth slide"
          />
          <div className="slider-content" style={{ marginRight: "40px" }}>
            <h3
              className="slider-title"
              style={{
                fontSize: "42px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              هناك خصم كبير
            </h3>
            <p
              className="slider-text"
              style={{ fontSize: "24px", fontWeight: "600" }}
            >
              خصم يصل ٥٠٪ عند شرائك
            </p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Silder;
