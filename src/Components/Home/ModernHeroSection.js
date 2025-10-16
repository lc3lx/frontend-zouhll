import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag, FiTrendingUp, FiStar } from 'react-icons/fi';
import './ModernHeroSection.css';

const ModernHeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            title: "مرحباً بك في متجر زوحل",
            subtitle: "اكتشف أحدث المنتجات والعروض الحصرية",
            description: "تسوق من مجموعة واسعة من المنتجات عالية الجودة بأفضل الأسعار",
            buttonText: "تسوق الآن",
            buttonLink: "/products",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            title: "عروض خاصة لفترة محدودة",
            subtitle: "خصومات تصل إلى 50% على منتجات مختارة",
            description: "لا تفوت الفرصة واحصل على أفضل الصفقات اليوم",
            buttonText: "اكتشف العروض",
            buttonLink: "/products",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            title: "منتجات جديدة كل يوم",
            subtitle: "كن أول من يحصل على أحدث المنتجات",
            description: "تابع أحدث الإضافات واكتشف منتجات جديدة يومياً",
            buttonText: "المنتجات الجديدة",
            buttonLink: "/products",
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const features = [
        {
            icon: <FiShoppingBag size={24} />,
            title: "تسوق آمن",
            description: "دفع آمن ومضمون"
        },
        {
            icon: <FiTrendingUp size={24} />,
            title: "أفضل الأسعار",
            description: "أسعار تنافسية ومناسبة"
        },
        {
            icon: <FiStar size={24} />,
            title: "جودة عالية",
            description: "منتجات مضمونة الجودة"
        }
    ];

    return (
        <div className="modern-hero-section">
            {/* Hero Slider */}
            <div className="hero-slider">
                <div 
                    className="hero-slide active"
                    style={{ background: heroSlides[currentSlide].background }}
                >
                    <Container>
                        <Row className="align-items-center min-vh-60">
                            <Col lg={6}>
                                <div className="hero-content">
                                    <h1 className="hero-title">
                                        {heroSlides[currentSlide].title}
                                    </h1>
                                    <h3 className="hero-subtitle">
                                        {heroSlides[currentSlide].subtitle}
                                    </h3>
                                    <p className="hero-description">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    <Link to={heroSlides[currentSlide].buttonLink}>
                                        <Button className="hero-cta-btn">
                                            {heroSlides[currentSlide].buttonText}
                                            <FiArrowLeft className="ms-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="hero-visual">
                                    <div className="floating-cards">
                                        <div className="floating-card card-1">
                                            <FiShoppingBag size={30} />
                                        </div>
                                        <div className="floating-card card-2">
                                            <FiStar size={25} />
                                        </div>
                                        <div className="floating-card card-3">
                                            <FiTrendingUp size={28} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Slide Indicators */}
                <div className="slide-indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <Container className="features-section">
                <Row>
                    {features.map((feature, index) => (
                        <Col key={index} md={4} className="mb-4">
                            <Card className="feature-card h-100">
                                <Card.Body className="text-center">
                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>
                                    <h5 className="feature-title">{feature.title}</h5>
                                    <p className="feature-description">{feature.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
};

export default ModernHeroSection;
