import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Spinner,
  Table,
  Badge,
} from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRechargeCodes,
  createRechargeCodes,
  deleteRechargeCode,
} from "../../redux/actions/rechargeCodeAction";
import notify from "../../hook/useNotifaction";

const AdminRechargeCodes = () => {
  const dispatch = useDispatch();

  const [showCreate, setShowCreate] = useState(false);
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleCloseCreate = () => {
    setShowCreate(false);
    setAmount("");
    setCount("");
    setDescription("");
    setExpiresInDays(30);
  };
  const handleShowCreate = () => setShowCreate(true);

  const handleCreateCodes = async () => {
    if (!amount || !count) {
      notify("من فضلك أدخل المبلغ وعدد الأكواد", "warn");
      return;
    }

    setLoadingCreate(true);
    await dispatch(
      createRechargeCodes({
        amount: parseFloat(amount),
        count: parseInt(count),
        description,
        expiresInDays: parseInt(expiresInDays),
      })
    );
    setLoadingCreate(false);
    handleCloseCreate();
  };

  useEffect(() => {
    dispatch(getAllRechargeCodes());
  }, [dispatch]);

  const allRechargeCodes = useSelector(
    (state) => state.rechargeCodeReducer.allRechargeCodes
  );
  const createRechargeCodesRes = useSelector(
    (state) => state.rechargeCodeReducer.createRechargeCodes
  );
  const deleteRechargeCodeRes = useSelector(
    (state) => state.rechargeCodeReducer.deleteRechargeCode
  );

  useEffect(() => {
    if (createRechargeCodesRes && createRechargeCodesRes.status === 201) {
      notify("تم إنشاء أكواد الشحن بنجاح", "success");
      dispatch(getAllRechargeCodes());
    }
  }, [createRechargeCodesRes, dispatch]);

  useEffect(() => {
    if (deleteRechargeCodeRes && deleteRechargeCodeRes.status === "success") {
      notify("تم حذف كود الشحن بنجاح", "success");
      dispatch(getAllRechargeCodes());
    }
  }, [deleteRechargeCodeRes, dispatch]);

  const handleDeleteCode = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الكود؟")) {
      dispatch(deleteRechargeCode(id));
    }
  };

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <div className="admin-content-text">إدارة أكواد الشحن</div>

          {/* Create Codes Button */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" onClick={handleShowCreate}>
              إنشاء أكواد شحن جديدة
            </Button>
          </div>

          {/* Codes Table */}
          <div className="user-address-card my-3 px-3">
            {allRechargeCodes && allRechargeCodes.data ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>الكود</th>
                    <th>المبلغ</th>
                    <th>الحالة</th>
                    <th>تاريخ الإنشاء</th>
                    <th>تاريخ الانتهاء</th>
                    <th>المستخدم</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {allRechargeCodes.data.map((code) => (
                    <tr key={code._id}>
                      <td>
                        <code>{code.code}</code>
                      </td>
                      <td>
                        {code.amount} {code.currency}
                      </td>
                      <td>
                        <Badge bg={code.isUsed ? "secondary" : "success"}>
                          {code.isUsed ? "مستخدم" : "متاح"}
                        </Badge>
                      </td>
                      <td>
                        {new Date(code.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td>
                        {new Date(code.expiresAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td>
                        {code.usedBy
                          ? code.usedBy.name || "مستخدم غير معروف"
                          : "-"}
                      </td>
                      <td>
                        {!code.isUsed && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteCode(code._id)}
                          >
                            حذف
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            )}
          </div>

          {/* Create Codes Modal */}
          <Modal show={showCreate} onHide={handleCloseCreate}>
            <Modal.Header closeButton>
              <Modal.Title>إنشاء أكواد شحن جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group mb-3">
                <label htmlFor="amount">المبلغ لكل كود</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="count">عدد الأكواد</label>
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="أدخل عدد الأكواد"
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">الوصف (اختياري)</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف الأكواد"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="expiresInDays">مدة الصلاحية (بالأيام)</label>
                <input
                  type="number"
                  className="form-control"
                  id="expiresInDays"
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(e.target.value)}
                  min="1"
                  max="365"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCreate}>
                إلغاء
              </Button>
              <Button
                variant="success"
                onClick={handleCreateCodes}
                disabled={loadingCreate}
              >
                {loadingCreate ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "إنشاء"
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRechargeCodes;
