import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HomeCategoryHook from '../../hook/category/home-category-hook';

const AmazonStyleCategories = () => {
  const [category, loading] = HomeCategoryHook();
  
  // Default image for categories without images
  const defaultImages = [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop'
  ];

  return (
    <div style={{
      background: '#ffffff',
      padding: '30px 0',
      borderBottom: '1px solid #e7e7e7'
    }}>
      <Container>
        <Row>
          <Col>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0f1111',
              marginBottom: '25px',
              textAlign: 'right',
              borderBottom: '3px solid #ff9900',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              تسوق حسب الفئة
            </h2>
          </Col>
        </Row>
        
        <Row className="g-3">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12}>
                <Card style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  background: '#fff',
                  height: '280px'
                }}>
                  <div style={{
                    height: '150px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'amazonShimmer 1.5s infinite'
                  }} />
                  <Card.Body style={{ padding: '15px' }}>
                    <div style={{
                      height: '20px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'amazonShimmer 1.5s infinite',
                      marginBottom: '10px',
                      borderRadius: '4px'
                    }} />
                    <div style={{
                      height: '15px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'amazonShimmer 1.5s infinite',
                      marginBottom: '5px',
                      borderRadius: '4px',
                      width: '80%'
                    }} />
                    <div style={{
                      height: '15px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'amazonShimmer 1.5s infinite',
                      borderRadius: '4px',
                      width: '60%'
                    }} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : category.data && category.data.length > 0 ? (
            category.data.slice(0, 8).map((cat, index) => (
              <Col key={cat._id} lg={3} md={4} sm={6} xs={12}>
                <Card 
                  className="h-100 amazon-category-card"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Link to={`/products/category/${cat._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img 
                      variant="top" 
                      src={cat.image || defaultImages[index % defaultImages.length]}
                      style={{
                        height: '150px',
                        objectFit: 'cover'
                      }}
                    />
                    <Card.Body style={{ padding: '15px' }}>
                      <Card.Title style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#0f1111',
                        marginBottom: '10px',
                        textAlign: 'right'
                      }}>
                        {cat.name}
                      </Card.Title>
                      
                      <div style={{ textAlign: 'right' }}>
                        {cat.subcategories && cat.subcategories.length > 0 ? (
                          <>
                            {cat.subcategories.slice(0, 4).map((sub, subIndex) => (
                              <div key={subIndex} style={{
                                fontSize: '0.85rem',
                                color: '#565959',
                                marginBottom: '3px',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = '#007185';
                                e.target.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = '#565959';
                                e.target.style.textDecoration = 'none';
                              }}
                              >
                                {sub.name}
                              </div>
                            ))}
                            
                            {cat.subcategories.length > 4 && (
                              <div style={{
                                fontSize: '0.85rem',
                                color: '#007185',
                                marginTop: '8px',
                                fontWeight: '500'
                              }}>
                                عرض المزيد ({cat.subcategories.length - 4}+) ←
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={{
                            fontSize: '0.85rem',
                            color: '#565959',
                            fontStyle: 'italic',
                            textAlign: 'center',
                            padding: '20px 0'
                          }}>
                            قريباً ستُضاف الفئات الفرعية
                          </div>
                        )}
                        
                        <div style={{
                          fontSize: '0.85rem',
                          color: '#007185',
                          marginTop: '8px',
                          fontWeight: '500'
                        }}>
                          تسوق الآن ←
                        </div>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))
          ) : (
            // No categories message
            <Col xs={12}>
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
                <h3 style={{ color: '#565959', marginBottom: '15px' }}>
                  لا توجد فئات متاحة حالياً
                </h3>
                <p style={{ color: '#565959' }}>
                  قريباً ستُضاف فئات جديدة ومتنوعة
                </p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AmazonStyleCategories;
