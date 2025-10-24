import React, { useEffect, useState } from "react";
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
import {
  getAllExchangeRates,
  deleteExchangeRate,
} from "../../redux/actions/exchangeRateAction";
import AdminAddExchangeRate from "./AdminAddExchangeRate";
import { ToastContainer } from "react-toastify";

const AdminAllExchangeRates = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExchangeRate, setSelectedExchangeRate] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    dispatch(getAllExchangeRates());
  }, [dispatch]);

  const exchangeRates = useSelector(
    (state) => state.exchangeRateReducer.exchangeRates
  );
  const loading = useSelector((state) => state.exchangeRateReducer.loading);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (exchangeRate) => {
    setSelectedExchangeRate(exchangeRate);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedExchangeRate) {
      await dispatch(deleteExchangeRate(selectedExchangeRate._id));
      setShowDeleteModal(false);
      setSelectedExchangeRate(null);
      dispatch(getAllExchangeRates());
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedExchangeRate(null);
  };

  const handleAddNew = () => {
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    dispatch(getAllExchangeRates());
  };

  return (
    <div>
      <div className="admin-content-text">إدارة أسعار الصرف</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة أسعار الصرف">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع أسعار الصرف</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة سعر صرف جديد
            </Button>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row className="justify-content-start">
              {exchangeRates?.data?.length > 0 ? (
                exchangeRates.data.map((item, index) => (
                  <Col key={index} sm="6" md="4" lg="3" className="d-flex">
                    <Card
                      className="my-2"
                      style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                      }}
                    >
                      <Card.Body className="d-flex flex-column">
                        <Card.Title
                          style={{
                            fontFamily: "Almarai",
                            fontSize: "16px",
                            color: "#1C1C1C",
                            marginBottom: "10px",
                          }}
                        >
                          {item.fromCurrency} → {item.toCurrency}
                        </Card.Title>
                        <Card.Text
                          style={{
                            fontFamily: "Almarai",
                            fontSize: "18px",
                            color: "#007185",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          {item.rate.toLocaleString()}
                        </Card.Text>
                        <Card.Text
                          style={{
                            fontFamily: "Almarai",
                            fontSize: "12px",
                            color: "#6C757D",
                            marginBottom: "10px",
                          }}
                        >
                          آخر تحديث: {formatDate(item.lastUpdated)}
                        </Card.Text>
                        <Card.Text
                          style={{
                            fontFamily: "Almarai",
                            fontSize: "12px",
                            color: item.isActive ? "#28a745" : "#dc3545",
                            marginBottom: "10px",
                          }}
                        >
                          الحالة: {item.isActive ? "نشط" : "غير نشط"}
                        </Card.Text>
                        <div className="d-flex justify-content-between mt-auto">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            style={{ color: "#0D6EFD", fontSize: "13px" }}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClick(item)}
                            style={{ color: "#DC3545", fontSize: "13px" }}
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
                    <h4>لا يوجد أسعار صرف</h4>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Tab>

        <Tab eventKey="add" title="إضافة سعر صرف">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة سعر صرف جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          <AdminAddExchangeRate />
        </Tab>
      </Tabs>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل أنت متأكد من حذف سعر الصرف "{selectedExchangeRate?.fromCurrency} →{" "}
          {selectedExchangeRate?.toCurrency}"؟
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

export default AdminAllExchangeRates;
