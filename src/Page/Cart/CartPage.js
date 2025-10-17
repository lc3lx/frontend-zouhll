import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartCheckout from '../../Components/Cart/CartCheckout'
import CartItem from '../../Components/Cart/CartItem'
import GetAllUserCartHook from './../../hook/cart/get-all-user-cart-hook';

const CartPage = () => {
    const [itemsNum, cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount] = GetAllUserCartHook()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    // تتبع حجم الشاشة
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // حساب المجموع الكلي الحالي بناءً على الكميات المعروضة
    const calculateCurrentTotal = () => {
        if (!cartItems || cartItems.length === 0) return 0;
        
        return cartItems.reduce((total, item) => {
            const price = item.price || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
    };
    
    const currentTotal = calculateCurrentTotal();


    // التحقق من تسجيل الدخول
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // إذا لم يكن المستخدم مسجل دخول
    if (!token || !user) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                background: '#ffffff',
                fontFamily: "'Amazon Ember', Arial, sans-serif"
            }}>
                <Container style={{ padding: '50px 0', maxWidth: '800px' }}>
                    <div className="text-center">
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
                        <h2 style={{ color: '#0f1111', marginBottom: '15px' }}>
                            تسجيل الدخول مطلوب
                        </h2>
                        <p style={{ color: '#565959', marginBottom: '30px', fontSize: '1.1rem' }}>
                            يجب تسجيل الدخول لعرض سلة التسوق الخاصة بك
                        </p>
                        <Link
                            to="/login"
                            style={{
                                background: '#ff9900',
                                color: '#0f1111',
                                padding: '12px 30px',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                display: 'inline-block',
                                border: '1px solid #e47911'
                            }}
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#eaeded'
        }}>
            <Container style={{ 
                maxWidth: '1200px', 
                padding: screenWidth < 768 ? '15px 10px' : '20px 15px' 
            }}>
                {/* عنوان الصفحة */}
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{
                        fontSize: screenWidth < 768 ? '1.5rem' : '1.8rem',
                        fontWeight: '400',
                        color: '#0f1111',
                        margin: 0,
                        textAlign: screenWidth < 576 ? 'center' : 'right'
                    }}>
                        سلة التسوق
                    </h1>
                </div>

                <Row>
                    {/* Cart Items */}
                    <Col lg={9} md={12} sm={12}>
                        {cartItems && cartItems.length >= 1 ? (
                            <div>
                                {cartItems.map((item, index) => (
                                    <CartItem key={item._id || index} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '60px 20px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
                                <h3 style={{ 
                                    color: '#0f1111', 
                                    marginBottom: '12px',
                                    fontSize: '1.5rem'
                                }}>
                                    سلة التسوق فارغة
                                </h3>
                                <p style={{ 
                                    color: '#666', 
                                    marginBottom: '24px',
                                    fontSize: '1rem'
                                }}>
                                    ابدأ التسوق واكتشف منتجاتنا المميزة
                                </p>
                                <Link 
                                    to="/" 
                                    style={{
                                        background: '#ff9900',
                                        color: '#0f1111',
                                        padding: '12px 24px',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        display: 'inline-block'
                                    }}
                                >
                                    ابدأ التسوق الآن
                                </Link>
                            </div>
                        )}
                    </Col>

                    {/* Order Summary - responsive */}
                    {cartItems && cartItems.length > 0 && (
                        <Col lg={3} md={12} sm={12} style={{ marginTop: screenWidth < 992 ? '20px' : '0' }}>
                            <div style={{
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '20px',
                                position: screenWidth >= 992 ? 'sticky' : 'static',
                                top: '20px'
                            }}>
                                <CartCheckout 
                                    cartItems={cartItems} 
                                    couponNameRes={couponNameRes} 
                                    totalCartPriceAfterDiscount={totalCartPriceAfterDiscount} 
                                    totalCartPrice={currentTotal || totalCartPrice} 
                                />
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default CartPage
