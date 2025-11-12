import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Spinner,
  Modal,
  Tabs,
  Tab,
  Table,
  Badge,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllColors, deleteColor } from "../../redux/actions/colorAction";
import Multiselect from "multiselect-react-dropdown";
import AddColorHook from "../../hook/color/add-color-hook";
import EditColorHook from "../../hook/color/edit-color-hook";
import { ToastContainer } from "react-toastify";

const AdminAllColors = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [editingColor, setEditingColor] = useState(null);

  useEffect(() => {
    dispatch(getAllColors(100));
  }, [dispatch]);

  const colors = useSelector((state) => state.allColors.colors);
  const loading = useSelector((state) => state.allColors.loading);

  // Add Color Hook
  const [
    name,
    hex,
    categoryIds,
    addLoading,
    isPress,
    handelSubmit,
    onChangeName,
    onChangeHex,
    onCategoryChange,
    categories,
  ] = AddColorHook();

  // Edit Color Hook
  const [
    editName,
    editHex,
    editCategoryIds,
    editLoading,
    editIsPress,
    handleEditSubmit,
    onChangeEditName,
    onChangeEditHex,
    onEditCategoryChange,
    editCategories,
    editColorData,
  ] = EditColorHook(editingColor?._id);

  const handleDeleteClick = (color) => {
    setSelectedColor(color);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedColor) {
      await dispatch(deleteColor(selectedColor._id));
      setShowDeleteModal(false);
      setSelectedColor(null);
      dispatch(getAllColors(100));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedColor(null);
  };

  const handleEditClick = (color) => {
    setEditingColor(color);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingColor(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingColor(null);
    dispatch(getAllColors(100));
  };

  // Get selected categories for display
  const getSelectedCategoriesForEdit = () => {
    if (!editingColor || !editCategories?.data) return [];
    const colorCategoryIds =
      editingColor.categoryIds?.map((cat) =>
        typeof cat === "object" ? cat._id : cat
      ) || [];
    return editCategories.data.filter((cat) =>
      colorCategoryIds.includes(cat._id)
    );
  };

  return (
    <div>
      <div className="admin-content-text">إدارة الألوان</div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة الألوان">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>جميع الألوان</h5>
            <Button variant="primary" onClick={handleAddNew}>
              إضافة لون جديد
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
                    <th>اسم اللون</th>
                    <th>الكود</th>
                    <th>معاينة</th>
                    <th>التصنيفات المرتبطة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {colors?.data?.length > 0 ? (
                    colors.data.map((color) => (
                      <tr key={color._id}>
                        <td>
                          <strong>{color.name}</strong>
                        </td>
                        <td>
                          <code>{color.hex}</code>
                        </td>
                        <td>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: color.hex,
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                          ></div>
                        </td>
                        <td>
                          {color.categoryIds && color.categoryIds.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {color.categoryIds.map((cat, idx) => (
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
                            onClick={() => handleEditClick(color)}
                          >
                            تعديل
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(color)}
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <h4>لا توجد ألوان</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Tab>

        <Tab eventKey="add" title="إضافة لون">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة لون جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">اسم اللون</div>
              <input
                onChange={onChangeName}
                value={name}
                type="text"
                className="input-form d-block mt-2 px-3"
                placeholder="مثل: أحمر، أزرق، أسود..."
              />

              <div className="text-form pb-2 mt-3">كود اللون (Hex)</div>
              <div className="d-flex gap-2 align-items-center">
                <input
                  onChange={onChangeHex}
                  value={hex}
                  type="color"
                  className="input-form d-block mt-2"
                  style={{ width: "80px", height: "40px", cursor: "pointer" }}
                />
                <input
                  onChange={onChangeHex}
                  value={hex}
                  type="text"
                  className="input-form d-block mt-2 px-3"
                  placeholder="#000000"
                  style={{ flex: 1 }}
                />
              </div>
              <small className="text-muted">
                اختر اللون من الأداة أو أدخل الكود يدوياً (مثل #FF0000)
              </small>

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
                إذا لم تختر تصنيفات، سيكون اللون متاحًا لجميع التصنيفات
              </small>
            </Col>
          </Row>
          <Row>
            <Col sm="8" className="d-flex justify-content-end">
              <button onClick={handelSubmit} className="btn-save d-inline mt-2">
                حفظ اللون
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

        <Tab eventKey="edit" title="تعديل اللون">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل اللون: {editingColor?.name}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>

          <Row className="justify-content-start">
            <Col sm="8">
              <div className="text-form pb-2">اسم اللون</div>
              <input
                onChange={onChangeEditName}
                value={editName}
                type="text"
                className="input-form d-block mt-2 px-3"
                placeholder="مثل: أحمر، أزرق، أسود..."
              />

              <div className="text-form pb-2 mt-3">كود اللون (Hex)</div>
              <div className="d-flex gap-2 align-items-center">
                <input
                  onChange={onChangeEditHex}
                  value={editHex}
                  type="color"
                  className="input-form d-block mt-2"
                  style={{ width: "80px", height: "40px", cursor: "pointer" }}
                />
                <input
                  onChange={onChangeEditHex}
                  value={editHex}
                  type="text"
                  className="input-form d-block mt-2 px-3"
                  placeholder="#000000"
                  style={{ flex: 1 }}
                />
              </div>
              <small className="text-muted">
                اختر اللون من الأداة أو أدخل الكود يدوياً (مثل #FF0000)
              </small>

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
                إذا لم تختر تصنيفات، سيكون اللون متاحًا لجميع التصنيفات
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
          هل أنت متأكد من حذف اللون "{selectedColor?.name}"؟
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

export default AdminAllColors;
