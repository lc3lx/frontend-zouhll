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
import { getAllStore, deleteStore } from "../../redux/actions/storeAction";
import { getStoreImage } from "../../utils/imageHelper";
import AdminAddStore from "./AdminAddStore";
import AdminEditStore from "./AdminEditStore";
import { ToastContainer } from "react-toastify";

const AdminAllStores = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [editingStore, setEditingStore] = useState(null);

  useEffect(() => {
    dispatch(getAllStore(100));
  }, [dispatch]);

  const stores = useSelector((state) => state.allStore.store);
  const loading = useSelector((state) => state.allStore.loading);

  const handleDeleteClick = (store) => {
    setSelectedStore(store);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedStore) {
      await dispatch(deleteStore(selectedStore._id));
      setShowDeleteModal(false);
      setSelectedStore(null);
      // إعادة تحميل المتاجر
      dispatch(getAllStore(100));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedStore(null);
  };

  const handleEditClick = (store) => {
    setEditingStore(store);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingStore(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingStore(null);
    dispatch(getAllStore(100)); // إعادة تحميل القائمة
  };

  return (
    <div>
      <div className="admin-content-text">إدارة المتاجر</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة المتاجر">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع المتاجر</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة متجر جديد
            </Button>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              {stores?.data?.length > 0 ? (
                stores.data.map((store) => (
                  <Col key={store._id} md={6} lg={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={getStoreImage(store)}
                        style={{
                          height: "200px",
                          objectFit: "contain",
                          padding: "20px",
                        }}
                        onError={(e) => {
                          e.target.src = "/images/store.png";
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-center">
                          {store.name}
                        </Card.Title>
                        <div className="mt-auto d-flex justify-content-between">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditClick(store)}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(store)}
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
                    <h4>لا توجد متاجر</h4>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Tab>

        <Tab eventKey="add" title="إضافة متجر">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة متجر جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          <AdminAddStore />
        </Tab>

        <Tab eventKey="edit" title="تعديل المتجر">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل المتجر: {editingStore?.name}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          {editingStore && <AdminEditStore storeId={editingStore._id} />}
        </Tab>
      </Tabs>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل أنت متأكد من حذف المتجر "{selectedStore?.name}"؟
          <br />
          <strong>تحذير:</strong> سيتم حذف جميع المنتجات المرتبطة بهذا المتجر!
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

export default AdminAllStores;
