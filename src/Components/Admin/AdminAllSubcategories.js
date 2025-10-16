import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Modal, Row, Spinner, Table, Form } from "react-bootstrap";
import { getAllSubcategories, updateSubCategory, deleteSubCategory } from "../../redux/actions/subcategoryAction";
import { getAllCategory } from "../../redux/actions/categoryAction";

const AdminAllSubcategories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const subcatsState = useSelector((state) => state.subCategory.subcategories);
  const catsState = useSelector((state) => state.allCategory.category);
  const updState = useSelector((state) => state.subCategory.updateSubcategory);
  const delState = useSelector((state) => state.subCategory.deleteSubcategory);

  const list = useMemo(() => (subcatsState?.data ? subcatsState.data : []), [subcatsState]);
  const categories = useMemo(() => (catsState?.data ? catsState.data : []), [catsState]);

  const getCategoryName = (catId) => {
    const c = categories.find((x) => x._id === catId);
    return c?.name || "-";
  };

  const refresh = async () => {
    setLoading(true);
    await Promise.all([
      dispatch(getAllSubcategories("?limit=200")),
      dispatch(getAllCategory(200)),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (updState && (updState.status === 200 || updState.status === "success")) {
      refresh();
      handleClose();
    }
  }, [updState]);

  useEffect(() => {
    if (delState && (delState.status === 200 || delState.status === "success")) {
      refresh();
    }
  }, [delState]);

  const handleOpen = (item) => {
    setEditItem(item);
    setEditName(item.name || "");
    setEditCategory(item.category || "");
    setShowEdit(true);
  };
  const handleClose = () => {
    setShowEdit(false);
    setEditItem(null);
    setEditName("");
    setEditCategory("");
  };

  const handleSave = async () => {
    if (!editItem) return;
    const body = { name: editName };
    if (editCategory) body.category = editCategory;
    await dispatch(updateSubCategory(editItem._id, body));
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التصنيف الفرعي؟")) {
      await dispatch(deleteSubCategory(id));
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-content-text">إدارة التصنيفات الفرعية</div>
      <Card className="mt-3">
        <Card.Body>
          {list.length === 0 ? (
            <div className="text-center py-4">لا توجد تصنيفات فرعية</div>
          ) : (
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>التصنيف الرئيسي</th>
                  <th style={{ width: 160 }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {list.map((sc) => (
                  <tr key={sc._id}>
                    <td>{sc.name}</td>
                    <td>{getCategoryName(sc.category)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="warning" onClick={() => handleOpen(sc)}>تعديل</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(sc._id)}>حذف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>إلغاء</Button>
          <Button variant="success" onClick={handleSave}>حفظ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAllSubcategories;
