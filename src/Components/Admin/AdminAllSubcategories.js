import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Spinner,
  Table,
  Form,
} from "react-bootstrap";
import {
  updateSubCategory,
  deleteSubCategory,
} from "../../redux/actions/subcategoryAction";
import useAdminSubcategories from "../../hook/subcategory/admin-subcategories-hook";

const AdminAllSubcategories = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);

  const {
    rows,
    loading,
    pagination,
    categories,
    categoryId,
    keyword,
    limit,
    sort,
    page,
    setPage,
    handleCategoryChange,
    handleKeywordChange,
    handleLimitChange,
    handleSortChange,
    refetch,
  } = useAdminSubcategories();

  const refresh = async () => {
    refetch();
  };

  const handleOpen = (item) => {
    setEditItem(item);
    setEditName(item.name || "");
    setEditCategory(
      typeof item.category === "string"
        ? item.category
        : item.category?._id || ""
    );
    setEditImageFile(null);
    setShowEdit(true);
  };
  const handleClose = () => {
    setShowEdit(false);
    setEditItem(null);
    setEditName("");
    setEditCategory("");
    setEditImageFile(null);
  };

  const handleSave = async () => {
    if (!editItem) return;
    let body;
    if (editImageFile) {
      body = new FormData();
      body.append("name", editName);
      if (editCategory) body.append("category", editCategory);
      body.append("image", editImageFile);
    } else {
      body = { name: editName };
      if (editCategory) body.category = editCategory;
    }
    await dispatch(updateSubCategory(editItem._id, body));
    handleClose();
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التصنيف الفرعي؟")) {
      await dispatch(deleteSubCategory(id));
      refresh();
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: 300 }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-content-text">إدارة التصنيفات الفرعية</div>
      <Card className="mt-3">
        <Card.Body>
          {/* Filters */}
          <Row className="g-2 mb-3">
            <Col md={4}>
              <Form.Label>التصنيف الرئيسي</Form.Label>
              <Form.Select
                value={categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">الكل</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>بحث بالاسم</Form.Label>
              <Form.Control
                type="text"
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
                placeholder="ابحث عن تصنيف فرعي..."
              />
            </Col>
            <Col md={2}>
              <Form.Label>عدد العناصر</Form.Label>
              <Form.Select
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>الترتيب</Form.Label>
              <Form.Select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="-createdAt">الأحدث أولاً</option>
                <option value="name">الاسم (أ-ي)</option>
                <option value="-name">الاسم (ي-أ)</option>
              </Form.Select>
            </Col>
          </Row>
          {rows.length === 0 ? (
            <div className="text-center py-4">لا توجد تصنيفات فرعية</div>
          ) : (
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>التصنيف الرئيسي</th>
                  <th style={{ width: 160 }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((sc) => (
                  <tr key={sc._id}>
                    <td>
                      {sc.image ? (
                        <img
                          src={sc.image}
                          alt={sc.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#f8f9fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px",
                            fontSize: "12px",
                            color: "#6c757d",
                          }}
                        >
                          لا توجد صورة
                        </div>
                      )}
                    </td>
                    <td>{sc.name}</td>
                    <td>
                      {(() => {
                        const val = sc.category;
                        if (!val) return "-";
                        if (typeof val === "string") {
                          const found = categories.find((c) => c._id === val);
                          return found?.name || "-";
                        }
                        return val.name || "-";
                      })()}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleOpen(sc)}
                        >
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(sc._id)}
                        >
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {/* Pagination */}
          {pagination?.numberOfPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <div className="d-flex gap-2">
                {Array.from({ length: pagination.numberOfPages }).map(
                  (_, i) => (
                    <Button
                      key={i}
                      variant={
                        pagination.currentPage === i + 1
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>تعديل تصنيف فرعي</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>الاسم</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="اسم التصنيف الفرعي"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>التصنيف الرئيسي</Form.Label>
              <Form.Select
                value={editCategory || ""}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="">اختر تصنيف رئيسي</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>صورة التصنيف الفرعي</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <label
                  htmlFor="edit-upload-photo"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      editImageFile
                        ? URL.createObjectURL(editImageFile)
                        : editItem?.image || require("../../images/avatar.png")
                    }
                    alt="subcategory"
                    height="80"
                    width="100"
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                </label>
                <input
                  type="file"
                  id="edit-upload-photo"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditImageFile(e.target.files[0]);
                    }
                  }}
                />
                {editImageFile && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setEditImageFile(null)}
                  >
                    إزالة الصورة الجديدة
                  </Button>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إلغاء
          </Button>
          <Button variant="success" onClick={handleSave}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAllSubcategories;
