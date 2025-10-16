import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FiArrowRight, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import laptops from '../../images/laptops.png'

const DiscountSection = () => {
    return (
        <Container>
            <div
                style={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: "25px",
                    padding: "60px 40px",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(240, 147, 251, 0.3)"
                }}
            >
                {/* Background decoration */}
                <div
                    style={{
                        position: "absolute",
                        top: "-50px",
                        right: "-50px",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        opacity: 0.6,
                    }}
                />

                <Row className="align-items-center">
                    <Col lg={6} className="text-center text-lg-start">
                        {/* Badge */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50px",
                                padding: "8px 20px",
                                marginBottom: "25px",
                                fontSize: "14px",
                                fontWeight: "600",
                            }}
                        >
                            <FiTag className="me-2" />
                            عرض محدود
                        </div>

                        <h2
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: "900",
                                marginBottom: "20px",
                                lineHeight: "1.2"
                            }}
                        >
                            خصم يصل إلى
                            <br />
                            <span style={{ color: "#ffd93d", fontSize: "1.2em" }}>30%</span>
                        </h2>

                        <p
                            style={{
                                fontSize: "1.2rem",
                                marginBottom: "30px",
                                opacity: 0.95,
                                lineHeight: "1.6"
                            }}
                        >
                            على جميع أجهزة اللابتوب والإلكترونيات
                            <br />
                            عرض لفترة محدودة فقط!
                        </p>

                        <Button
                            as={Link}
                            to="/products"
                            size="lg"
                            style={{
                                background: "white",
                                color: "#f5576c",
                                border: "none",
                                borderRadius: "50px",
                                padding: "15px 35px",
                                fontWeight: "700",
                                fontSize: "1.1rem",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-3px)";
                                e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                            }}
                        >
                            تسوق الآن
                            <FiArrowRight className="ms-2" />
                        </Button>
                    </Col>

                    <Col lg={6} className="text-center mt-4 mt-lg-0">
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={laptops}
                                alt="لابتوب"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                                    position: "relative",
                                    zIndex: 1
                                }}
                            />
                            
                            {/* Floating discount badge */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "20px",
                                    right: "20px",
                                    background: "#ffd93d",
                                    color: "#333",
                                    borderRadius: "50%",
                                    width: "80px",
                                    height: "80px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "900",
                                    fontSize: "1.2rem",
                                    boxShadow: "0 10px 25px rgba(255, 217, 61, 0.5)",
                                    animation: "bounce 2s infinite"
                                }}
                            >
                                30%
                                <br />
                                OFF
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default DiscountSection
