import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllBrands from '../../Components/Admin/AdminAllBrands'

const AdminAllBrandsPage = () => {
    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllBrands />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllBrandsPage
