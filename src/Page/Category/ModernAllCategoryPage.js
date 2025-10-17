import React from 'react';
import { Container } from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import CategoryWithSubcategories from '../../Components/Category/CategoryWithSubcategories';
import '../Products/ShopProductsPage.js'; // Import for CSS
import '../../Components/Products/AmazonStyle.css';

const ModernAllCategoryPage = () => {
    return (
        <div className="amazon-products-page" style={{ minHeight: '100vh', background: '#f3f3f3' }}>
            <CategoryHeader />
            
            {/* Breadcrumb */}
            <div className="amazon-breadcrumb">
                <Container>
                    <div style={{ padding: '4px 0' }}>
                        <a href="/" style={{ textDecoration: 'none' }}>الرئيسية</a>
                        <span className="mx-2">›</span>
                        <span>التصنيفات</span>
                    </div>
                </Container>
            </div>

            <Container fluid style={{ maxWidth: '1500px', padding: '16px' }}>
                {/* Page Title */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: '400', 
                        color: '#0f1111', 
                        marginBottom: '8px' 
                    }}>
                        تصفح التصنيفات
                    </h1>
                    <p style={{ 
                        fontSize: '16px', 
                        color: '#565959', 
                        margin: 0 
                    }}>
                        اكتشف منتجاتنا المتنوعة عبر التصنيفات والأقسام الفرعية
                    </p>
                </div>

                <CategoryWithSubcategories />
            </Container>
        </div>
    );
};

export default ModernAllCategoryPage;
