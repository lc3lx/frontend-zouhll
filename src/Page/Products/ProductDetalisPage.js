import React from 'react'
import { Container } from 'react-bootstrap'
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
            minHeight: '670px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            paddingTop: '20px',
            paddingBottom: '40px'
        }}>
            <CategoryHeader />
            <Container>
                {/* Product Details */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "25px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        border: "2px solid rgba(102, 126, 234, 0.1)",
                        marginBottom: "30px",
                    }}
                >
                    <ProductDetalis />
                </div>

                {/* Reviews */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "25px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        border: "2px solid rgba(102, 126, 234, 0.1)",
                        marginBottom: "30px",
                    }}
                >
                    <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
                </div>

                {/* Related Products */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "25px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        border: "2px solid rgba(102, 126, 234, 0.1)",
                    }}
                >
                    <CardProductsContainer 
                        products={items} 
                        title="منتجات قد تعجبك" 
                        btntitle="المزيد"
                        pathText="/products"
                    />
                </div>
            </Container>
        </div>
    )
}

export default ProductDetalisPage
