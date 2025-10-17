import React from 'react'
import { Row, Col } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
import UserAllOrderCard from './UserAllOrderCard'
const UserAllOrderItem = ({ orderItem }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'غير محدد';
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    // التأكد من وجود orderItem
    if (!orderItem) {
        return (
            <div className="user-order mt-2">
                <div className="text-center p-4">
                    <p>لم يتم العثور على بيانات الطلب</p>
                </div>
            </div>
        )
    }
    
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e7e7e7',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
            <Row>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '4px 0',
                    color: '#0f1111',
                    fontWeight: 600
                }}>
                    <span>طلب رقم #{orderItem.id || orderItem._id || 0}</span>
                    <span style={{ color: '#666', fontWeight: 400 }}>بتاريخ {formatDate(orderItem.createdAt)}</span>
                </div>
            </Row>
            {
                orderItem.cartItems ? (orderItem.cartItems.map((item, index) => {
                    return <UserAllOrderCard key={index} item={item} />
                })) : null
            }

            <Row className="d-flex justify-content-between" style={{ marginTop: '8px' }}>
                <Col xs="8" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                        background: orderItem.isDelivered ? '#e6f7e6' : '#fff2e6',
                        color: orderItem.isDelivered ? '#0a7a0a' : '#a55b00',
                        padding: '4px 8px', borderRadius: '16px', fontSize: '0.85rem'
                    }}>
                        {orderItem.isDelivered === true ? 'تم التوصيل' : 'قيد التوصيل'}
                    </span>
                    <span style={{
                        background: (orderItem.paymentMethodType === 'shamcash' && orderItem.paymentStatus === 'pending') ? '#fff9db' : (orderItem.isPaid ? '#e6f7e6' : '#fff2e6'),
                        color: (orderItem.paymentMethodType === 'shamcash' && orderItem.paymentStatus === 'pending') ? '#8a6d3b' : (orderItem.isPaid ? '#0a7a0a' : '#a55b00'),
                        padding: '4px 8px', borderRadius: '16px', fontSize: '0.85rem'
                    }}>
                        {(orderItem.paymentMethodType === 'shamcash' && orderItem.paymentStatus === 'pending') ? 'بانتظار الموافقة' : (orderItem.isPaid === true ? 'تم الدفع' : 'غير مدفوع')}
                    </span>
                    <span style={{
                        background: '#e8f4fd', color: '#0066cc', padding: '4px 8px', borderRadius: '16px', fontSize: '0.85rem'
                    }}>
                        طريقة الدفع: {orderItem.paymentMethodType === 'cash' ? 'كاش' : orderItem.paymentMethodType === 'wallet' ? 'المحفظة' : orderItem.paymentMethodType === 'shamcash' ? 'شام كاش' : 'بطاقة ائتمانية'}
                    </span>
                </Col>
                <Col xs="4" className="d-flex justify-content-end" style={{ alignItems: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#B12704' }}>
                        ${Number(orderItem.totalOrderPrice || 0).toFixed(2)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderItem
