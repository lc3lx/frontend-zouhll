import React, { useState } from 'react'
import { Row, Col, Nav, Tab, Badge, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook'
import './ProductDetails.css'

const ProductDetalis = () => {
    const { id } = useParams();
    const [item, images, cat, brand] = ViewProductsDetalisHook(id);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    
    return (
        <div>
            {/* Breadcrumb */}
            <div style={{ 
                padding: '12px 20px', 
                background: '#f8f9fa', 
                borderBottom: '1px solid #e7e7e7',
                fontSize: '14px', 
                color: '#565959'
            }}>
                <nav>
                    <span style={{ cursor: 'pointer' }}>الرئيسية</span>
                    <span className="mx-2" style={{ color: '#ccc' }}>›</span>
                    <span style={{ cursor: 'pointer' }}>{cat?.name || 'التصنيف'}</span>
                    <span className="mx-2" style={{ color: '#ccc' }}>›</span>
                    <span style={{ color: '#0f1111', fontWeight: '400' }}>{item?.title || 'المنتج'}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <Row className='g-0'>
                <Col lg="5" xl="5">
                    <div style={{ padding: '20px' }}>
                        <ProductGallery selectedVariantIndex={selectedVariantIndex} />
                    </div>
                </Col>

                <Col lg="7" xl="7">
                    <div style={{ padding: '20px', borderLeft: '1px solid #e7e7e7' }}>
                        <ProductText 
                          selectedVariantIndex={selectedVariantIndex}
                          setSelectedVariantIndex={setSelectedVariantIndex}
                          selectedSize={selectedSize}
                          setSelectedSize={setSelectedSize}
                        />
                    </div>
                </Col>
            </Row>

            {/* Product Information Tabs */}
            <div style={{ 
                borderTop: '1px solid #e7e7e7',
                marginTop: '20px',
                paddingTop: '20px'
            }}>
                <Tab.Container defaultActiveKey="description">
                    <Nav variant="tabs" className="mb-3" style={{ 
                        borderBottom: '1px solid #e7e7e7',
                        background: '#fff'
                    }}>
                        <Nav.Item>
                            <Nav.Link 
                                eventKey="description"
                                style={{
                                    border: 'none',
                                    borderBottom: '2px solid transparent',
                                    borderRadius: '0',
                                    fontWeight: '500',
                                    color: '#565959',
                                    fontSize: '14px',
                                    padding: '12px 16px',
                                    background: 'transparent'
                                }}
                                className="amazon-tab"
                            >
                                تفاصيل المنتج
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                eventKey="specifications"
                                style={{
                                    border: 'none',
                                    borderBottom: '2px solid transparent',
                                    borderRadius: '0',
                                    fontWeight: '500',
                                    color: '#565959',
                                    fontSize: '14px',
                                    padding: '12px 16px',
                                    background: 'transparent'
                                }}
                                className="amazon-tab"
                            >
                                المواصفات
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                eventKey="shipping"
                                style={{
                                    border: 'none',
                                    borderBottom: '2px solid transparent',
                                    borderRadius: '0',
                                    fontWeight: '500',
                                    color: '#565959',
                                    fontSize: '14px',
                                    padding: '12px 16px',
                                    background: 'transparent'
                                }}
                                className="amazon-tab"
                            >
                                الشحن والإرجاع
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                        
                    <Tab.Content style={{ padding: '20px 0' }}>
                        <Tab.Pane eventKey="description">
                            <div style={{ padding: '0' }}>
                                <h6 style={{ 
                                    color: '#0f1111', 
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    marginBottom: '16px'
                                }}>
                                    حول هذا المنتج
                                </h6>
                                <div style={{ 
                                    lineHeight: '1.6', 
                                    color: '#0f1111',
                                    fontSize: '14px',
                                    marginBottom: '20px'
                                }}>
                                    {item?.description || 'لا يوجد وصف متاح للمنتج حالياً.'}
                                </div>
                                        
                                {/* Product Features */}
                                <div>
                                    <h6 style={{ 
                                        color: '#0f1111', 
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        marginBottom: '12px'
                                    }}>
                                        المميزات الرئيسية
                                    </h6>
                                    <ul style={{ 
                                        listStyle: 'none', 
                                        padding: 0, 
                                        margin: 0,
                                        fontSize: '14px',
                                        color: '#0f1111'
                                    }}>
                                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#007185', marginRight: '8px', fontSize: '12px' }}>•</span>
                                            جودة عالية ومواد متينة
                                        </li>
                                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#007185', marginRight: '8px', fontSize: '12px' }}>•</span>
                                            ضمان الجودة لمدة سنة كاملة
                                        </li>
                                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#007185', marginRight: '8px', fontSize: '12px' }}>•</span>
                                            شحن سريع وآمن
                                        </li>
                                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#007185', marginRight: '8px', fontSize: '12px' }}>•</span>
                                            خدمة عملاء ممتازة على مدار الساعة
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="specifications">
                            <div style={{ padding: '0' }}>
                                <h6 style={{ 
                                    color: '#0f1111', 
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    marginBottom: '16px'
                                }}>
                                    المواصفات التقنية
                                </h6>
                                <table style={{ 
                                    width: '100%', 
                                    borderCollapse: 'collapse',
                                    fontSize: '14px'
                                }}>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #e7e7e7' }}>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                fontWeight: '600', 
                                                color: '#0f1111',
                                                width: '30%'
                                            }}>الماركة</td>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                color: '#565959'
                                            }}>{brand?.name || 'غير محدد'}</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e7e7e7' }}>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                fontWeight: '600', 
                                                color: '#0f1111'
                                            }}>التصنيف</td>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                color: '#565959'
                                            }}>{cat?.name || 'غير محدد'}</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e7e7e7' }}>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                fontWeight: '600', 
                                                color: '#0f1111'
                                            }}>الكمية المتاحة</td>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                color: '#007600',
                                                fontWeight: '500'
                                            }}>{item?.quantity || 0} قطعة متوفرة</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e7e7e7' }}>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                fontWeight: '600', 
                                                color: '#0f1111'
                                            }}>التقييم</td>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                color: '#565959'
                                            }}>
                                                {item?.ratingsAverage || 0} من 5 ({item?.ratingsQuantity || 0} تقييم)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                fontWeight: '600', 
                                                color: '#0f1111'
                                            }}>المبيعات</td>
                                            <td style={{ 
                                                padding: '12px 0', 
                                                color: '#565959'
                                            }}>{item?.sold || 0} قطعة مباعة</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="shipping">
                            <div style={{ padding: '0' }}>
                                <h6 style={{ 
                                    color: '#0f1111', 
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    marginBottom: '16px'
                                }}>
                                    الشحن والإرجاع
                                </h6>
                                
                                <div style={{ fontSize: '14px', color: '#0f1111' }}>
                                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e7e7e7' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#007185' }}>
                                            🚚 الشحن المجاني
                                        </div>
                                        <div style={{ color: '#565959', lineHeight: '1.5' }}>
                                            شحن مجاني للطلبات أكثر من $50. التوصيل خلال 2-3 أيام عمل.
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e7e7e7' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#007185' }}>
                                            🔄 سياسة الإرجاع
                                        </div>
                                        <div style={{ color: '#565959', lineHeight: '1.5' }}>
                                            إرجاع مجاني خلال 30 يوم من تاريخ الشراء. يجب أن يكون المنتج في حالته الأصلية.
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e7e7e7' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#007185' }}>
                                            🛡️ الضمان
                                        </div>
                                        <div style={{ color: '#565959', lineHeight: '1.5' }}>
                                            ضمان الجودة لمدة سنة كاملة من تاريخ الشراء.
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#007185' }}>
                                            📞 خدمة العملاء
                                        </div>
                                        <div style={{ color: '#565959', lineHeight: '1.5' }}>
                                            خدمة عملاء متاحة على مدار الساعة لمساعدتك في أي استفسار.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    )
}

export default ProductDetalis
