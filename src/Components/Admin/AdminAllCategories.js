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
  getAllCategory,
  deleteCategory,
} from "../../redux/actions/categoryAction";
import { getCategoryImage } from "../../utils/imageHelper";
import AddCategoryHook from "../../hook/category/add-category-hook";
import EditCategoryHook from "../../hook/category/edit-category-hook";
import { ToastContainer } from "react-toastify";

const AdminAllCategories = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllCategory(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // Add Category Hook
  const [
    img,
    name,
    addLoading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeName,
  ] = AddCategoryHook();

  // Edit Category Hook
  const [
    editImg,
    editName,
    editLoading,
    editIsPress,
    handleEditSubmit,
    onEditImageChange,
    onChangeEditName,
  ] = EditCategoryHook(editingCategory?._id);

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

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingCategory(null);
    dispatch(getAllCategory(100)); // إعادة تحميل القائمة
  };

  return (
    <div>
      <div className="admin-content-text">إدارة التصنيفات</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة التصنيفات">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع التصنيفات</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة تصنيف جديد
            </Button>
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
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-center">
                          {category.name}
                        </Card.Title>
                        <div className="mt-auto d-flex justify-content-between">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditClick(category)}
                          >
                            تعديل
                          </Button>
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
        </Tab>

        <Tab eventKey="add" title="إضافة تصنيف">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة تصنيف جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">صورة التصنيف</div>
              <div>
                <label htmlFor="upload-photo">
                  <img
                    src={img}
                    alt="category"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={onImageChange}
                  id="upload-photo"
                  style={{ display: "none" }}
                />
              </div>

              <input
                onChange={onChangeName}
                value={name}
                type="text"
                className="input-form d-block mt-3 px-3"
                placeholder="اسم التصنيف"
              />
            </Col>
          </Row>
          <Row>
            <Col sm="8" className="d-flex justify-content-end">
              <button onClick={handelSubmit} className="btn-save d-inline mt-2">
                حفظ التصنيف
              </button>
            </Col>
          </Row>

          {isPress ? (
            addLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <h4>تم الانتهاء</h4>
            )
          ) : null}
        </Tab>

        <Tab eventKey="edit" title="تعديل التصنيف">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل التصنيف: {editingCategory?.name}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">صورة التصنيف</div>
              <div>
                <label htmlFor="upload-edit-photo">
                  <img
                    src={editImg}
                    alt="category"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer", objectFit: "cover" }}
                  />
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={onEditImageChange}
                  id="upload-edit-photo"
                  style={{ display: "none" }}
                />
              </div>

              <input
                onChange={onChangeEditName}
                value={editName}
                type="text"
                className="input-form d-block mt-3 px-3"
                placeholder="اسم التصنيف"
              />
            </Col>
          </Row>
          <Row>
            <Col sm="8" className="d-flex justify-content-end">
              <button
                onClick={handleEditSubmit}
                className="btn-save d-inline mt-2"
              >
                حفظ التعديلات
              </button>
            </Col>
          </Row>

          {editIsPress ? (
            editLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <h4>تم الانتهاء</h4>
            )
          ) : null}
        </Tab>
      </Tabs>
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
      <ToastContainer />
    </div>
  );
};

export default AdminAllCategories;
