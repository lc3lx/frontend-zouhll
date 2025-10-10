import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import phone from "../../images/phone.png";
const Footer = () => {
  return (
    <div
      className="modern-footer footer mt-5 py-4"
      style={{
        minHeight: "120px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col sm="6" className="d-flex align-items-center flex-wrap">
            <div
              className="footer-shroot"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                margin: "10px 15px 10px 0",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              الشروط والاحكام
            </div>
            <div
              className="footer-shroot"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                margin: "10px 15px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              سياسة الخصوصية
            </div>
            <div
              className="footer-shroot"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                margin: "10px 15px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              اتصل بنا
            </div>
          </Col>
          <Col
            sm="6"
            className="d-flex justify-content-end align-items-center flex-wrap"
          >
            <div
              className="d-flex align-items-center mx-3 my-2"
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 15px",
                borderRadius: "20px",
              }}
            >
              <img
                width="20px"
                height="20px"
                src={phone}
                alt="phone"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p
                className="footer-phone mb-0 mr-2"
                style={{ color: "white", fontWeight: "600", fontSize: "14px" }}
              >
                +963997278481
              </p>
            </div>
            <div
              className="social-icon"
              style={{
                cursor: "pointer",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                padding: "10px",
                margin: "5px",
                transition: "all 0.3s",
              }}
            >
              <img
                width="24px"
                height="24px"
                src={facebook}
                alt="facebook"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div
              className="social-icon"
              style={{
                cursor: "pointer",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                padding: "10px",
                margin: "5px",
                transition: "all 0.3s",
              }}
            >
              <img
                width="24px"
                height="24px"
                src={instagram}
                alt="instagram"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div
              className="social-icon"
              style={{
                cursor: "pointer",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
                padding: "10px",
                margin: "5px",
                transition: "all 0.3s",
              }}
            >
              <img
                width="24px"
                height="24px"
                src={twitter}
                alt="twitter"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                margin: "0",
              }}
            >
              © 2025 جميع الحقوق محفوظة - متجر زوحل
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
