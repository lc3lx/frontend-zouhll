import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ProductDetalis from '../../Components/Products/ProductDetalis'
import RateContainer from '../../Components/Rate/RateContainer'
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';

const ProductDetalisPage = () => {
    const { id } = useParams();
    const [item, images, cat, brand, prod] = ViewProductsDetalisHook(id);
    try {
        if (prod)
            var items = prod.slice(0, 4)
    } catch (e) { }
    try {
        if (item) {
            var rateAvg = item.ratingsAverage
            var rateQty = item.ratingsQuantity
        }
    } catch (e) { }
    
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#f8f9fa',
            paddingTop: '20px',
            paddingBottom: '40px'
        }}>
            <CategoryHeader />
            <Container fluid style={{ maxWidth: '1400px' }}>
                {/* Main Product Section */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "0",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        border: "1px solid #e7e7e7",
                        marginBottom: "20px",
                        overflow: "hidden"
                    }}
                >
                    <ProductDetalis />
                </div>

                <Row className="g-3">
                    {/* Reviews Section */}
                    <Col lg={8}>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "8px",
                                padding: "20px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                border: "1px solid #e7e7e7",
                                marginBottom: "20px"
                            }}
                        >
                            <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
                        </div>
                    </Col>
                    
                    {/* Product Info Sidebar */}
                    <Col lg={4}>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "8px",
                                padding: "20px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                border: "1px solid #e7e7e7",
                                marginBottom: "20px",
                                position: "sticky",
                                top: "20px"
                            }}
                        >
                            <h5 style={{ color: '#0f1111', fontWeight: 600, marginBottom: '16px' }}>معلومات إضافية</h5>
                            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                                    <strong>الماركة:</strong> {brand?.name || 'غير محدد'}
                                </div>
                                <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                                    <strong>التصنيف:</strong> {cat?.name || 'غير محدد'}
                                </div>
                                <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                                    <strong>الكمية المتاحة:</strong> {item?.quantity || 0} قطعة
                                </div>
                                <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                                    <strong>المبيعات:</strong> {item?.sold || 0} قطعة
                                </div>
                                <div style={{ color: '#10b981', fontWeight: 600 }}>
                                    ✓ شحن مجاني للطلبات أكثر من $50
                                </div>
                                <div style={{ color: '#10b981', fontWeight: 600, marginTop: '8px' }}>
                                    ✓ إرجاع مجاني خلال 30 يوم
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Related Products */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "20px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        border: "1px solid #e7e7e7"
                    }}
                >
                    <CardProductsContainer 
                        products={items} 
                        title="منتجات ذات صلة" 
                        btntitle="عرض المزيد"
                        pathText="/products"
                    />
                </div>
            </Container>
        </div>
    )
}

export default ProductDetalisPage
