import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminShamCashPaymentsHook from "../../hook/admin/admin-shamcash-payments-hook";

const AdminShamCashPayments = () => {
  const [
    pendingPayments,
    loading,
    approvePayment,
    rejectPayment,
    refreshPayments,
  ] = AdminShamCashPaymentsHook();

  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [action, setAction] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    refreshPayments();
  }, []);

  const handleShowModal = (payment, actionType) => {
    setSelectedPayment(payment);
    setAction(actionType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
    setAction("");
    setAdminNotes("");
  };

  const handleConfirmAction = async () => {
    if (action === "approve") {
      await approvePayment(selectedPayment._id, adminNotes);
    } else if (action === "reject") {
      await rejectPayment(selectedPayment._id, adminNotes);
    }
    handleCloseModal();
    refreshPayments();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="admin-content-text">طلبات الدفع عبر شام كاش</h2>
            <Button
              variant="outline-primary"
              onClick={refreshPayments}
              className="btn-refresh"
            >
              <i className="fas fa-sync-alt me-2"></i>
              تحديث
            </Button>
          </div>
        </Col>
      </Row>

      {pendingPayments.length === 0 ? (
        <Row>
          <Col>
            <Alert variant="info" className="text-center">
              <i className="fas fa-info-circle me-2"></i>
              لا توجد طلبات دفع معلقة حالياً
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          {pendingPayments.map((payment) => (
            <Col lg={6} xl={4} key={payment._id} className="mb-4">
              <Card className="payment-card h-100 shadow-sm">
                <Card.Header className="bg-warning text-dark">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <i className="fas fa-clock me-2"></i>
                      في انتظار الموافقة
                    </h6>
                    <small>{formatDate(payment.createdAt)}</small>
                  </div>
                </Card.Header>

                <Card.Body>
                  {/* معلومات العميل */}
                  <div className="customer-info mb-3">
                    <h6 className="text-primary mb-2">
                      <i className="fas fa-user me-2"></i>
                      معلومات العميل
                    </h6>
                    <p className="mb-1">
                      <strong>الاسم:</strong> {payment.user.name}
                    </p>
                    <p className="mb-1">
                      <strong>البريد الإلكتروني:</strong> {payment.user.email}
                    </p>
                    {payment.user.phone && (
                      <p className="mb-0">
                        <strong>رقم الهاتف:</strong> {payment.user.phone}
                      </p>
                    )}
                  </div>

                  {/* معلومات الدفع */}
                  <div className="payment-info mb-3">
                    <h6 className="text-success mb-2">
                      <i className="fas fa-money-bill-wave me-2"></i>
                      معلومات الدفع
                    </h6>
                    <p className="mb-1">
                      <strong>المبلغ:</strong>
                      <span className="text-success fw-bold">
                        {formatCurrency(payment.totalOrderPrice)}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong>رقم شام كاش:</strong>{" "}
                      {payment.shamCashDetails.phoneNumber}
                    </p>
                    <p className="mb-0">
                      <strong>رقم العملية:</strong>
                      <code className="ms-2">
                        {payment.shamCashDetails.transactionId}
                      </code>
                    </p>
                  </div>

                  {/* معلومات الطلب */}
                  <div className="order-info mb-3">
                    <h6 className="text-info mb-2">
                      <i className="fas fa-shopping-cart me-2"></i>
                      معلومات الطلب
                    </h6>
                    <p className="mb-1">
                      <strong>رقم الطلب:</strong>
                      <code className="ms-2">#{payment._id.slice(-8)}</code>
                    </p>
                    <p className="mb-0">
                      <strong>عدد المنتجات:</strong> {payment.cartItems.length}{" "}
                      منتج
                    </p>
                  </div>

                  {/* عنوان التوصيل */}
                  {payment.shippingAddress && (
                    <div className="shipping-info mb-3">
                      <h6 className="text-secondary mb-2">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        عنوان التوصيل
                      </h6>
                      <p className="mb-1">
                        <strong>التفاصيل:</strong>{" "}
                        {payment.shippingAddress.details}
                      </p>
                      <p className="mb-1">
                        <strong>المدينة:</strong> {payment.shippingAddress.city}
                      </p>
                      <p className="mb-0">
                        <strong>رقم الهاتف:</strong>{" "}
                        {payment.shippingAddress.phone}
                      </p>
                    </div>
                  )}
                </Card.Body>

                <Card.Footer className="bg-light">
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-fill"
                      onClick={() => handleShowModal(payment, "approve")}
                    >
                      <i className="fas fa-check me-1"></i>
                      موافقة
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex-fill"
                      onClick={() => handleShowModal(payment, "reject")}
                    >
                      <i className="fas fa-times me-1"></i>
                      رفض
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal للموافقة/الرفض */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "approve" ? (
              <>
                <i className="fas fa-check-circle text-success me-2"></i>
                موافقة على الدفع
              </>
            ) : (
              <>
                <i className="fas fa-times-circle text-danger me-2"></i>
                رفض الدفع
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <>
              <div className="mb-3">
                <p>
                  <strong>العميل:</strong> {selectedPayment.user.name}
                </p>
                <p>
                  <strong>المبلغ:</strong>{" "}
                  {formatCurrency(selectedPayment.totalOrderPrice)}
                </p>
                <p>
                  <strong>رقم العملية:</strong>{" "}
                  {selectedPayment.shamCashDetails.transactionId}
                </p>
              </div>

              <Form.Group>
                <Form.Label>ملاحظات إضافية (اختياري)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="أدخل أي ملاحظات للعميل..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إلغاء
          </Button>
          <Button
            variant={action === "approve" ? "success" : "danger"}
            onClick={handleConfirmAction}
          >
            {action === "approve" ? "تأكيد الموافقة" : "تأكيد الرفض"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />

      <style jsx>{`
        .payment-card {
          border-radius: 15px;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
        }

        .payment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
        }

        .admin-content-text {
          color: #2c3e50;
          font-weight: bold;
          margin-bottom: 0;
        }

        .btn-refresh {
          border-radius: 25px;
          padding: 8px 20px;
          font-weight: 600;
        }

        .customer-info,
        .payment-info,
        .order-info,
        .shipping-info {
          border-left: 3px solid #e74c3c;
          padding-left: 15px;
          background-color: #f8f9fa;
          border-radius: 5px;
          padding: 10px 15px;
        }

        .payment-info {
          border-left-color: #27ae60;
        }

        .order-info {
          border-left-color: #3498db;
        }

        .shipping-info {
          border-left-color: #95a5a6;
        }

        code {
          background-color: #e9ecef;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default AdminShamCashPayments;
