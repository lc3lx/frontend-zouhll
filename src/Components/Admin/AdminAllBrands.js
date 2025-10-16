import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBrand } from '../../redux/actions/brandAction';
import { getBrandImage } from '../../utils/imageHelper';

const AdminAllBrands = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllBrand(100));
    }, [dispatch]);

    const brands = useSelector(state => state.allBrand.brand);
    const loading = useSelector(state => state.allBrand.loading);

    return (
        <div>
            <div className="admin-content-text">إدارة الماركات</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>جميع الماركات</h5>
                <Link to="/admin/addbrand">
                    <Button variant="primary">إضافة ماركة جديدة</Button>
                </Link>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row>
                    {brands?.data?.length > 0 ? (
                        brands.data.map((brand) => (
                            <Col key={brand._id} md={6} lg={4} className="mb-3">
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={getBrandImage(brand)}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-center">
                                            {brand.name}
                                        </Card.Title>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link to={`/admin/editbrand/${brand._id}`}>
                                                <Button variant="warning" size="sm">
                                                    تعديل
                                                </Button>
                                            </Link>
                                            <Button variant="danger" size="sm">
                                                حذف
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <div className="text-center">
                                <h4>لا توجد ماركات</h4>
                            </div>
                        </Col>
                    )}
                </Row>
            )}
        </div>
    );
};

export default AdminAllBrands;
