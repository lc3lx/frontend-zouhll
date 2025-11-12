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
  Table,
  Badge,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllSizes, deleteSize } from "../../redux/actions/sizeAction";
import Multiselect from "multiselect-react-dropdown";
import AddSizeHook from "../../hook/size/add-size-hook";
import EditSizeHook from "../../hook/size/edit-size-hook";
import { ToastContainer } from "react-toastify";

const AdminAllSizes = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [editingSize, setEditingSize] = useState(null);

  useEffect(() => {
    dispatch(getAllSizes(100));
  }, [dispatch]);

  const sizes = useSelector((state) => state.allSizes.sizes);
  const loading = useSelector((state) => state.allSizes.loading);

  // Add Size Hook
  const [
    name,
    type,
    categoryIds,
    addLoading,
    isPress,
    handelSubmit,
    onChangeName,
    onChangeType,
    onCategoryChange,
    categories,
  ] = AddSizeHook();

  // Edit Size Hook
  const [
    editName,
    editType,
    editCategoryIds,
    editLoading,
    editIsPress,
    handleEditSubmit,
    onChangeEditName,
    onChangeEditType,
    onEditCategoryChange,
    editCategories,
    editSizeData,
  ] = EditSizeHook(editingSize?._id);

  const handleDeleteClick = (size) => {
    setSelectedSize(size);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSize) {
      await dispatch(deleteSize(selectedSize._id));
      setShowDeleteModal(false);
      setSelectedSize(null);
      dispatch(getAllSizes(100));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedSize(null);
  };

  const handleEditClick = (size) => {
    setEditingSize(size);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingSize(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingSize(null);
    dispatch(getAllSizes(100));
  };

  // Size type labels in Arabic
  const getTypeLabel = (type) => {
    const labels = {
      Clothing: "ملابس",
      Shoes: "أحذية",
      Rings: "خواتم",
      Watches: "ساعات",
      Bags: "حقائب",
      Accessories: "إكسسوارات",
      Other: "أخرى",
    };
    return labels[type] || type;
  };

  // Get selected categories for display
  const getSelectedCategoriesForEdit = () => {
    if (!editingSize || !editCategories?.data) return [];
    const sizeCategoryIds =
      editingSize.categoryIds?.map((cat) =>
        typeof cat === "object" ? cat._id : cat
      ) || [];
    return editCategories.data.filter((cat) =>
      sizeCategoryIds.includes(cat._id)
    );
  };

  return (
    <div>
      <div className="admin-content-text">إدارة المقاسات</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة المقاسات">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع المقاسات</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة مقاس جديد
            </Button>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>اسم المقاس</th>
                    <th>النوع</th>
                    <th>التصنيفات المرتبطة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes?.data?.length > 0 ? (
                    sizes.data.map((size) => (
                      <tr key={size._id}>
                        <td>
                          <strong>{size.name}</strong>
                        </td>
                        <td>
                          <Badge bg="info">{getTypeLabel(size.type)}</Badge>
                        </td>
                        <td>
                          {size.categoryIds && size.categoryIds.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {size.categoryIds.map((cat, idx) => (
                                <Badge
                                  key={idx}
                                  bg="secondary"
                                  className="me-1"
                                >
                                  {typeof cat === "object" ? cat.name : cat}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">جميع التصنيفات</span>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEditClick(size)}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(size)}
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <h4>لا توجد مقاسات</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Tab>

        <Tab eventKey="add" title="إضافة مقاس">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة مقاس جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">اسم المقاس</div>
              <input
                onChange={onChangeName}
                value={name}
                type="text"
                className="input-form d-block mt-2 px-3"
                placeholder="مثل: S, M, L, XL, 38, 40..."
              />

              <div className="text-form pb-2 mt-3">نوع المقاس</div>
              <select
                value={type}
                onChange={onChangeType}
                className="select input-form-area mt-2 px-2"
              >
                <option value="Clothing">ملابس</option>
                <option value="Shoes">أحذية</option>
                <option value="Rings">خواتم</option>
                <option value="Watches">ساعات</option>
                <option value="Bags">حقائب</option>
                <option value="Accessories">إكسسوارات</option>
                <option value="Other">أخرى</option>
              </select>

              <div className="text-form pb-2 mt-3">
                التصنيفات المرتبطة (اختياري)
              </div>
              <Multiselect
                className="mt-2 text-end"
                placeholder="اختر التصنيفات"
                options={categories?.data || []}
                onSelect={onCategoryChange}
                onRemove={onCategoryChange}
                displayValue="name"
                selectedValues={[]}
                style={{ color: "red" }}
              />
              <small className="text-muted">
                إذا لم تختر تصنيفات، سيكون المقاس متاحًا لجميع التصنيفات
              </small>
            </Col>
          </Row>
          <Row>
            <Col sm="8" className="d-flex justify-content-end">
              <button onClick={handelSubmit} className="btn-save d-inline mt-2">
                حفظ المقاس
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

        <Tab eventKey="edit" title="تعديل المقاس">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل المقاس: {editingSize?.name}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">اسم المقاس</div>
              <input
                onChange={onChangeEditName}
                value={editName}
                type="text"
                className="input-form d-block mt-2 px-3"
                placeholder="مثل: S, M, L, XL, 38, 40..."
              />

              <div className="text-form pb-2 mt-3">نوع المقاس</div>
              <select
                value={editType}
                onChange={onChangeEditType}
                className="select input-form-area mt-2 px-2"
              >
                <option value="Clothing">ملابس</option>
                <option value="Shoes">أحذية</option>
                <option value="Rings">خواتم</option>
                <option value="Watches">ساعات</option>
                <option value="Bags">حقائب</option>
                <option value="Accessories">إكسسوارات</option>
                <option value="Other">أخرى</option>
              </select>

              <div className="text-form pb-2 mt-3">
                التصنيفات المرتبطة (اختياري)
              </div>
              <Multiselect
                className="mt-2 text-end"
                placeholder="اختر التصنيفات"
                options={editCategories?.data || []}
                onSelect={onEditCategoryChange}
                onRemove={onEditCategoryChange}
                displayValue="name"
                selectedValues={getSelectedCategoriesForEdit()}
                style={{ color: "red" }}
              />
              <small className="text-muted">
                إذا لم تختر تصنيفات، سيكون المقاس متاحًا لجميع التصنيفات
              </small>
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
          هل أنت متأكد من حذف المقاس "{selectedSize?.name}"؟
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

export default AdminAllSizes;
