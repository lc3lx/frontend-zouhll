import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCoupon, deleteCoupon } from "../../redux/actions/couponAction";
import AdminAddCoupon from "./AdminAddCoupon";
import AdminEditCoupon from "./AdminEditCoupon";
import { ToastContainer } from "react-toastify";

const AdminAllCoupons = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [editingCoupon, setEditingCoupon] = useState(null);

  React.useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const coupons = useSelector((state) => state.allCoupon.coupons);
  const loading = useSelector((state) => state.allCoupon.loading);

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCoupon) {
      await dispatch(deleteCoupon(selectedCoupon._id));
      setShowDeleteModal(false);
      setSelectedCoupon(null);
      // إعادة تحميل الكوبونات
      dispatch(getAllCoupon());
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedCoupon(null);
  };

  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingCoupon(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingCoupon(null);
    dispatch(getAllCoupon()); // إعادة تحميل القائمة
  };

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SY");
  };

  return (
    <div>
      <div className="admin-content-text">إدارة الكوبونات</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة الكوبونات">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع الكوبونات</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة كوبون جديد
            </Button>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              {coupons?.data?.length > 0 ? (
                coupons.data.map((coupon) => (
                  <Col key={coupon._id} md={6} lg={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-center">
                          {coupon.name}
                        </Card.Title>
                        <div className="mb-2">
                          <strong>نسبة الخصم:</strong> {coupon.discount}%
                        </div>
                        <div className="mb-2">
                          <strong>تاريخ الانتهاء:</strong>{" "}
                          {formatDate(coupon.expire)}
                        </div>
                        <div className="mt-auto d-flex justify-content-between">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditClick(coupon)}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(coupon)}
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
                    <h4>لا توجد كوبونات</h4>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Tab>

        <Tab eventKey="add" title="إضافة كوبون">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة كوبون جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          <AdminAddCoupon />
        </Tab>

        <Tab eventKey="edit" title="تعديل الكوبون">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل الكوبون: {editingCoupon?.name}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          {editingCoupon && <AdminEditCoupon couponId={editingCoupon._id} />}
        </Tab>
      </Tabs>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل أنت متأكد من حذف الكوبون "{selectedCoupon?.name}"؟
          <br />
          <strong>تحذير:</strong> لا يمكن التراجع عن هذه العملية!
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
      <ToastContainer />
    </div>
  );
};

export default AdminAllCoupons;

