import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllOrders from '../../Components/Admin/AdminAllOrders'
import '../../Components/Products/AmazonStyle.css'

const AdminAllOrdersPage = () => {
    return (
        <div className="amazon-products-page" style={{ minHeight: '100vh', background: '#f3f3f3' }}>
            <Container fluid style={{ maxWidth: '1500px', padding: '16px' }}>
                {/* Page Title */}
                <div className="amazon-page-title">
                    <h1>إدارة الطلبات</h1>
                    <p>عرض وإدارة جميع طلبات العملاء</p>
                </div>

                <Row className='g-3'>
                    <Col lg="3" md="4" className="d-none d-md-block">
                        <div style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            position: 'sticky',
                            top: '16px'
                        }}>
                            <AdminSideBar />
                        </div>
                    </Col>

                    <Col lg="9" md="8">
                        <AdminAllOrders />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default AdminAllOrdersPage
