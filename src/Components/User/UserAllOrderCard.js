import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mobile from '../../images/mobile.png'
const UserAllOrderCard = ({ item }) => {
    
    // التأكد من وجود البيانات
    if (!item || !item.product) {
        return (
            <div className="mb-2 p-3 text-center">
                <p>لا توجد بيانات للمنتج</p>
            </div>
        )
    }
    
    return (
        <div style={{ padding: '8px 0' }}>
            <Row className="align-items-center" style={{ margin: 0 }}>
                <Col xs="3" md="2" className="d-flex">
                    <Link to={`/products/${item.product._id}`} style={{ textDecoration: 'none' }}>
                        <img
                            width="80px"
                            height="80px"
                            src={item.product.imageCover || mobile}
                            alt={item.product.title || 'منتج'}
                            style={{ objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee', background: '#f8f8f8' }}
                        />
                    </Link>
                </Col>
                <Col xs="6" md="7" style={{ minWidth: 0 }}>
                    <div style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#0f1111',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {item.product.title || ''}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', color: '#666', fontSize: '0.85rem' }}>
                        <span>الكمية: {item.quantity || item.count || 1}</span>
                        {item.color && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                اللون:
                                <span style={{
                                    display: 'inline-block', width: 12, height: 12, borderRadius: '50%',
                                    backgroundColor: item.color, border: '1px solid #ddd'
                                }}></span>
                            </span>
                        )}
                        {item.size && (
                            <span>المقاس: {item.size}</span>
                        )}
                    </div>
                </Col>
                <Col xs="3" md="3" className="text-end">
                    <div style={{ fontSize: '0.95rem', color: '#666' }}>
                        ${Number(item.price || 0).toFixed(2)}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#B12704' }}>
                        ${Number((item.price || 0) * (item.quantity || item.count || 1)).toFixed(2)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderCard
