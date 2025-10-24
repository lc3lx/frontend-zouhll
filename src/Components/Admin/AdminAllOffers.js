import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  Tabs,
  Tab,
  Spinner,
} from "react-bootstrap";
import { useAdminOffers } from "../../hook/offers/admin-offers-hook";
import { useAddOffer } from "../../hook/offers/add-offer-hook";
import { useEditOffer } from "../../hook/offers/edit-offer-hook";
import { useDispatch } from "react-redux";
import { getAllOffers } from "../../redux/actions/offerAction";
import avatar from "../../images/avatar.png";

const AdminAllOffers = () => {
  const dispatch = useDispatch();
  const {
    offers,
    loading,
    searchTerm,
    statusFilter,
    editingOffer,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    offerToDelete,
    handleSearch,
    handleStatusFilter,
    handleDeleteOffer,
    handleToggleStatus,
    openEditModal,
    openDeleteModal,
    currentPage,
  } = useAdminOffers();

  const {
    formData: addFormData,
    img: addImg,
    loading: addLoading,
    isPress: addIsPress,
    handleChange: handleAddChange,
    handleImageChange: handleAddImageChange,
    handleSubmit: handleAddSubmit,
  } = useAddOffer(() => {
    // Switch to list tab and refresh
    setActiveTab("list");
    dispatch(getAllOffers({ page: currentPage, limit: 10 }));
  });

  const {
    formData: editFormData,
    img: editImg,
    loading: editLoading,
    isPress: editIsPress,
    handleChange: handleEditChange,
    handleImageChange: handleEditImageChange,
    handleSubmit: handleEditSubmit,
  } = useEditOffer(editingOffer, () => {
    // Close modal and refresh list
    setShowEditModal(false);
    dispatch(getAllOffers({ page: currentPage, limit: 10 }));
  });

  const [activeTab, setActiveTab] = useState("list");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge bg="success">نشط</Badge>
    ) : (
      <Badge bg="danger">غير نشط</Badge>
    );
  };

  const renderOffersList = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="admin-content-text">قائمة العروض</div>
        <Button
          variant="primary"
          onClick={() => setActiveTab("add")}
          className="btn-sm"
        >
          إضافة عرض جديد
        </Button>
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="البحث في العروض..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="all">جميع العروض</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </Form.Select>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p className="mt-2">جاري التحميل...</p>
            </div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>العنوان</th>
                  <th>الوصف</th>
                  <th>الخصم</th>
                  <th>تاريخ البداية</th>
                  <th>تاريخ النهاية</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer._id}>
                    <td>
                      <img
                        src={offer.image || avatar}
                        alt={offer.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.src = avatar;
                        }}
                      />
                    </td>
                    <td>{offer.title}</td>
                    <td>{offer.description}</td>
                    <td>{offer.discount}</td>
                    <td>{formatDate(offer.startDate)}</td>
                    <td>{formatDate(offer.endDate)}</td>
                    <td>{getStatusBadge(offer.isActive)}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(offer)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleToggleStatus(offer._id)}
                      >
                        {offer.isActive ? "إلغاء تفعيل" : "تفعيل"}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => openDeleteModal(offer)}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );

  const renderAddForm = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="admin-content-text">إضافة عرض جديد</div>
        <Button
          variant="outline-secondary"
          onClick={() => setActiveTab("list")}
          className="btn-sm"
        >
          العودة للقائمة
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Form onSubmit={handleAddSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>عنوان العرض *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={addFormData.title}
                    onChange={handleAddChange}
                    required
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>نسبة الخصم *</Form.Label>
                  <Form.Control
                    type="text"
                    name="discount"
                    value={addFormData.discount}
                    onChange={handleAddChange}
                    required
                    maxLength={20}
                    placeholder="مثال: 20%"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>وصف العرض *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={addFormData.description}
                onChange={handleAddChange}
                required
                maxLength={200}
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>الأيقونة</Form.Label>
                  <Form.Control
                    type="text"
                    name="icon"
                    value={addFormData.icon}
                    onChange={handleAddChange}
                    placeholder="🎯"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>اللون الأساسي</Form.Label>
                  <Form.Control
                    type="color"
                    name="color.primary"
                    value={addFormData.color.primary}
                    onChange={handleAddChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>اللون الثانوي</Form.Label>
                  <Form.Control
                    type="color"
                    name="color.secondary"
                    value={addFormData.color.secondary}
                    onChange={handleAddChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>تاريخ البداية *</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={addFormData.startDate}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>تاريخ النهاية *</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={addFormData.endDate}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <div className="text-form pb-2">صورة العرض *</div>
              <div>
                <label htmlFor="upload-photo">
                  <img
                    src={addImg || avatar}
                    alt="Preview"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleAddImageChange}
                  id="upload-photo"
                  accept="image/*"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="تفعيل العرض"
                name="isActive"
                checked={addFormData.isActive}
                onChange={handleAddChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="primary"
                disabled={addLoading || addIsPress}
              >
                {addLoading || addIsPress ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    جاري الإضافة...
                  </>
                ) : (
                  "إضافة العرض"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="admin-content-text">إدارة العروض</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة العروض">
          {renderOffersList()}
        </Tab>
        <Tab eventKey="add" title="إضافة عرض">
          {renderAddForm()}
        </Tab>
      </Tabs>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="xl"
        centered
      >
        <Modal.Header className="bg-primary text-white border-0">
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-edit me-2"></i>
            تعديل العرض
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleEditSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>عنوان العرض *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>نسبة الخصم *</Form.Label>
                  <Form.Control
                    type="text"
                    name="discount"
                    value={editFormData.discount}
                    onChange={handleEditChange}
                    required
                    maxLength={20}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>وصف العرض *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                required
                maxLength={200}
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>الأيقونة</Form.Label>
                  <Form.Control
                    type="text"
                    name="icon"
                    value={editFormData.icon}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>اللون الأساسي</Form.Label>
                  <Form.Control
                    type="color"
                    name="color.primary"
                    value={editFormData.color.primary}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>اللون الثانوي</Form.Label>
                  <Form.Control
                    type="color"
                    name="color.secondary"
                    value={editFormData.color.secondary}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>تاريخ البداية *</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>تاريخ النهاية *</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={editFormData.endDate}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <div className="text-form pb-2">صورة العرض</div>
              <div>
                <label htmlFor="upload-edit-photo">
                  <img
                    src={editImg || avatar}
                    alt="Preview"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleEditImageChange}
                  id="upload-edit-photo"
                  accept="image/*"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="تفعيل العرض"
                name="isActive"
                checked={editFormData.isActive}
                onChange={handleEditChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="primary"
                disabled={editLoading || editIsPress}
              >
                {editLoading || editIsPress ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    جاري التحديث...
                  </>
                ) : (
                  "تحديث العرض"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header className="bg-danger text-white border-0">
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            تأكيد الحذف
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <i className="fas fa-trash-alt fa-3x text-danger mb-3"></i>
          <h5 className="mb-3">هل أنت متأكد من حذف هذا العرض؟</h5>
          <p className="text-muted mb-4">
            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف العرض نهائياً من النظام.
          </p>
          {offerToDelete && (
            <div className="bg-light p-3 rounded mb-3">
              <strong>العرض المراد حذفه:</strong>
              <br />
              <span className="text-primary">{offerToDelete.title}</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
            className="px-4"
          >
            <i className="fas fa-times me-2"></i>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDeleteOffer} className="px-4">
            <i className="fas fa-trash me-2"></i>
            حذف نهائياً
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAllOffers;
