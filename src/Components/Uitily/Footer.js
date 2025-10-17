import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import phone from "../../images/phone.png";
const Footer = () => {
  return (
    <footer
      className="modern-footer mt-5"
      style={{
        background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5
        }}
      />
      
      {/* Main Footer Content */}
      <div className="py-5" style={{ position: "relative", zIndex: 1 }}>
        <Container>
          <Row className="g-4">
            {/* Company Info */}
            <Col lg="4" md="6">
              <div className="mb-4">
                <h5 style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  متجر زوحل
                </h5>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: "1.6",
                  fontSize: "14px"
                }}>
                  متجركم الموثوق للتسوق الإلكتروني. نقدم لكم أفضل المنتجات بأعلى جودة وأفضل الأسعار.
                </p>
              </div>
            </Col>
            
            {/* Quick Links */}
            <Col lg="2" md="6">
              <h6 style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "white"
              }}>
                روابط سريعة
              </h6>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  { text: "الرئيسية", href: "/" },
                  { text: "المنتجات", href: "/products" },
                  { text: "التصنيفات", href: "/categories" },
                  { text: "الماركات", href: "/allbrand" }
                ].map((link, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <a
                      href={link.href}
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "white";
                        e.target.style.paddingRight = "8px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgba(255,255,255,0.7)";
                        e.target.style.paddingRight = "0";
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            
            {/* Legal */}
            <Col lg="3" md="6">
              <h6 style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "white"
              }}>
                القوانين
              </h6>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "الشروط والأحكام",
                  "سياسة الخصوصية",
                  "سياسة الإرجاع",
                  "اتصل بنا"
                ].map((item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "white";
                        e.target.style.paddingRight = "8px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgba(255,255,255,0.7)";
                        e.target.style.paddingRight = "0";
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            {/* Contact & Social */}
            <Col lg="3" md="6">
              <h6 style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "white"
              }}>
                تواصل معنا
              </h6>
              
              {/* Phone */}
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  padding: "8px",
                  marginLeft: "12px"
                }}>
                  <img
                    width="16px"
                    height="16px"
                    src={phone}
                    alt="phone"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <span style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px"
                }}>
                  +963997278481
                </span>
              </div>
              
              {/* Social Media */}
              <div>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}>
                  تابعنا على:
                </p>
                <div className="d-flex gap-2">
                  {[
                    { icon: facebook, name: "Facebook", color: "#1877f2" },
                    { icon: instagram, name: "Instagram", color: "#e4405f" },
                    { icon: twitter, name: "Twitter", color: "#1da1f2" }
                  ].map((social, index) => (
                    <div
                      key={index}
                      className="social-icon"
                      style={{
                        cursor: "pointer",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "50%",
                        padding: "12px",
                        transition: "all 0.3s ease",
                        border: "2px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = social.color;
                        e.target.style.transform = "translateY(-3px) scale(1.1)";
                        e.target.style.boxShadow = `0 8px 20px ${social.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.1)";
                        e.target.style.transform = "translateY(0) scale(1)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <img
                        width="20px"
                        height="20px"
                        src={social.icon}
                        alt={social.name}
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Bottom Bar */}
          <Row className="mt-5 pt-4" style={{
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}>
            <Col md="6">
              <p style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                margin: "0"
              }}>
                © 2025 جميع الحقوق محفوظة - متجر زوحل
              </p>
            </Col>
            <Col md="6" className="text-md-end">
              <p style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                margin: "0"
              }}>
                صنع بـ ❤️ في سوريا
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
