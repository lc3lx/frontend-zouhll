import React, { useMemo, useState } from "react";
import { Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAdminSecondaryCategories from "../../hook/secondaryCategory/admin-secondary-categories-hook";
import { useDispatch } from "react-redux";
import { deleteSecondaryCategory } from "../../redux/actions/secondaryCategoryAction";
import EditSecondaryCategoryModal from "./EditSecondaryCategoryModal";

const AdminAllSecondaryCategories = () => {
  const {
    rows,
    loading,
    pagination,
    categories,
    subcategories,
    categoryId,
    subCategoryId,
    keyword,
    limit,
    sort,
    page,
    setPage,
    handleCategoryChange,
    handleSubCategoryChange,
    handleKeywordChange,
    handleLimitChange,
    handleSortChange,
  } = useAdminSecondaryCategories();

  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const allIds = useMemo(() => rows.map((r) => r._id), [rows]);
  const categoryIdToName = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      if (c && c._id) map[c._id] = c.name;
    });
    return map;
  }, [categories]);
  const subCategoryIdToName = useMemo(() => {
    const map = {};
    subcategories.forEach((s) => {
      if (s && s._id) map[s._id] = s.name;
    });
    return map;
  }, [subcategories]);
  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? allIds : []);
  };
  const toggleSelect = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)
    );
  };
  const handleDeleteOne = async (id, name) => {
    const ok = window.confirm(
      `هل أنت متأكد من حذف التصنيف الثانوي: ${name || id}?`
    );
    if (!ok) return;

    try {
      await dispatch(deleteSecondaryCategory(id));
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const ok = window.confirm(
      `حذف ${selectedIds.length} عنصر/عناصر؟ لا يمكن التراجع.`
    );
    if (!ok) return;

    try {
      for (const id of selectedIds) {
        // eslint-disable-next-line no-await-in-loop
        await dispatch(deleteSecondaryCategory(id));
      }
      setSelectedIds([]);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error("Bulk delete error:", error);
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    // Refresh data after successful edit
    window.location.reload();
  };

  // عرض حالة التحميل أثناء جلب البيانات
  if (loading) {
    return (
      <div>
        <div className="admin-content-text">إدارة التصنيفات الثانوية</div>
        <Card className="p-5 text-center">جاري التحميل...</Card>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-content-text">إدارة التصنيفات الثانوية</div>

      {/* Quick actions */}
      <div className="d-flex gap-2 mb-3">
        <Link to="/admin/add-secondary-category">
          <Button variant="primary" size="sm">
            + إضافة تصنيف ثانوي
          </Button>
        </Link>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            handleCategoryChange("");
            handleSubCategoryChange("");
            handleKeywordChange("");
            handleLimitChange(20);
            handleSortChange("-createdAt");
            setPage(1);
          }}
        >
          إعادة تعيين الفلاتر
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          disabled={selectedIds.length === 0}
          onClick={handleBulkDelete}
        >
          حذف المحدد ({selectedIds.length})
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-3 p-3">
        <Row className="g-2">
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
            <Form.Label>التصنيف الفرعي</Form.Label>
            <Form.Select
              value={subCategoryId}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              disabled={!categoryId}
            >
              <option value="">الكل</option>
              {subcategories.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
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
              placeholder="ابحث عن تصنيف ثانوي..."
            />
          </Col>
        </Row>
        <Row className="g-2 mt-2">
          <Col md={3}>
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
          <Col md={3}>
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
      </Card>

      {/* Table */}
      <Card className="p-3">
        <div className="table-responsive">
          <Table hover size="sm" className="align-middle">
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === rows.length
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th>#</th>
                <th>الاسم</th>
                <th>التصنيف الفرعي</th>
                <th>التصنيف الرئيسي</th>
                <th>تاريخ الإنشاء</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    لا توجد نتائج مطابقة
                  </td>
                </tr>
              ) : (
                rows.map((item, idx) => (
                  <tr key={item._id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={(e) =>
                          toggleSelect(item._id, e.target.checked)
                        }
                      />
                    </td>
                    <td>{(page - 1) * limit + (idx + 1)}</td>
                    <td>{item.name}</td>
                    <td>
                      {(() => {
                        const val = item.subCategory;
                        if (!val) return "—";
                        if (typeof val === "string") {
                          return subCategoryIdToName[val] || "—";
                        }
                        return val.name || "—";
                      })()}
                    </td>
                    <td>
                      {(() => {
                        const val = item.category;
                        if (!val) return "—";
                        if (typeof val === "string") {
                          return categoryIdToName[val] || "—";
                        }
                        return val.name || "—";
                      })()}
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("ar-SY")}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditClick(item._id)}
                        >
                          تعديل
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteOne(item._id, item.name)}
                        >
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination?.numberOfPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex gap-2">
              {Array.from({ length: pagination.numberOfPages }).map((_, i) => (
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
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      <EditSecondaryCategoryModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        secondaryCategoryId={editingId}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default AdminAllSecondaryCategories;
