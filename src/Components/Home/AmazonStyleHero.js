import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AmazonStyleHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: 'عروض حصرية على الإلكترونيات',
      subtitle: 'وفر حتى 70% على أحدث الأجهزة - أسعار بالدولار',
      cta: 'تسوق الآن',
      link: '/electronics'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
      title: 'أزياء العصر بأفضل الأسعار',
      subtitle: 'مجموعة جديدة من الملابس العصرية - شحن مجاني لسوريا',
      cta: 'اكتشف المزيد',
      link: '/fashion'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop',
      title: 'منتجات المنزل والحديقة',
      subtitle: 'كل ما تحتاجه لمنزل مثالي - توصيل سريع في دمشق',
      cta: 'تسوق المنزل',
      link: '/home'
    }
  ];

  return (
    <div className="amazon-hero" style={{
      background: '#232f3e',
      paddingBottom: '20px'
    }}>
      <Container fluid>
        <Row>
          <Col>
            <Carousel 
              activeIndex={activeSlide}
              onSelect={setActiveSlide}
              interval={5000}
              fade
              controls={true}
              indicators={true}
              style={{
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              {heroSlides.map((slide) => (
                <Carousel.Item key={slide.id}>
                  <div 
                    style={{
                      height: '400px',
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <div className="text-center text-white">
                      <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                      }}>
                        {slide.title}
                      </h1>
                      <p style={{
                        fontSize: '1.3rem',
                        marginBottom: '2rem',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                      }}>
                        {slide.subtitle}
                      </p>
                      <div style={{
                        position: 'relative'
                      }}>
                        <Link
                          to={slide.link}
                          className="btn btn-warning btn-lg"
                          style={{
                            padding: '12px 30px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            borderRadius: '4px',
                            border: 'none',
                            color: '#0f1111',
                            textDecoration: 'none'
                          }}
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            
            {/* Gradient overlay at bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(transparent, #ffffff)',
              pointerEvents: 'none',
              zIndex: 1
            }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AmazonStyleHero;
