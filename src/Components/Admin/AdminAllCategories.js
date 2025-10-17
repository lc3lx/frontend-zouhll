import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory, deleteCategory } from '../../redux/actions/categoryAction';
import { getCategoryImage } from '../../utils/imageHelper';

const AdminAllCategories = () => {
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    useEffect(() => {
        dispatch(getAllCategory(100));
    }, [dispatch]);

    const categories = useSelector(state => state.allCategory.category);
    const loading = useSelector(state => state.allCategory.loading);

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedCategory) {
            await dispatch(deleteCategory(selectedCategory._id));
            setShowDeleteModal(false);
            setSelectedCategory(null);
            // إعادة تحميل التصنيفات
            dispatch(getAllCategory(100));
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    return (
        <div>
            <div className="admin-content-text">إدارة التصنيفات</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>جميع التصنيفات</h5>
                <Link to="/admin/addcategory">
                    <Button variant="primary">إضافة تصنيف جديد</Button>
                </Link>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row>
                    {categories?.data?.length > 0 ? (
                        categories.data.map((category) => (
                            <Col key={category._id} md={6} lg={4} className="mb-3">
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={getCategoryImage(category)}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-center">
                                            {category.name}
                                        </Card.Title>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link to={`/admin/editcategory/${category._id}`}>
                                                <Button variant="warning" size="sm">
                                                    تعديل
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="danger" 
                                                size="sm"
                                                onClick={() => handleDeleteClick(category)}
                                            >
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
                                <h4>لا توجد تصنيفات</h4>
                            </div>
                        </Col>
                    )}
                </Row>
            )}
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
                <Modal.Header>
                    <Modal.Title>تأكيد الحذف</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    هل أنت متأكد من حذف التصنيف "{selectedCategory?.name}"؟
                    <br />
                    <strong>تحذير:</strong> سيتم حذف جميع المنتجات المرتبطة بهذا التصنيف!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        تراجع
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminAllCategories;
