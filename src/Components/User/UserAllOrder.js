import React from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserAllOrderItem from './UserAllOrderItem'
import UserGetAllOrderHook from './../../hook/user/user-get-all-order-hook';
import Pagination from './../Uitily/Pagination';

const UserAllOrder = () => {
    const [userName, results, paginate, orderData, onPress] = UserGetAllOrderHook()

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#0f1111',
                    margin: 0
                }}>طلباتي</h2>
                <div style={{ color: '#666', marginTop: 4 }}>عدد الطلبات: {results || 0}</div>
            </div>
            <Row className='justify-content-between'>
                {
                    orderData.length >= 1 ? (
                        orderData.map((orderItem, index) => (
                            <UserAllOrderItem key={index} orderItem={orderItem} />
                        ))
                    ) : (
                        <div style={{
                            background: '#fff',
                            border: '1px solid #e7e7e7',
                            borderRadius: '8px',
                            padding: '40px 20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>📦</div>
                            <div style={{ color: '#0f1111', fontSize: '1.1rem', marginBottom: 8 }}>لا توجد طلبات حتى الآن</div>
                            <div style={{ color: '#666', marginBottom: 16 }}>ابدأ التسوق وأضف منتجات لعربتك</div>
                            <Link to='/' style={{
                                background: '#ff9900',
                                color: '#0f1111',
                                padding: '10px 18px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                border: '1px solid #e47911'
                            }}>اذهب للتسوق</Link>
                        </div>
                    )
                }

                {
                    paginate.numberOfPages >= 2 ? (
                        <Pagination onPress={onPress} pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0} />
                    ) : null
                }


            </Row>
        </div >
    )
}

export default UserAllOrder
