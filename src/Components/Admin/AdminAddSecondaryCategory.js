import React from "react";
import { Row, Col, Spinner, Card, Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import useAddSecondaryCategoryHook from "../../hook/secondaryCategory/add-secondary-category-hook";

const AdminAddSecondaryCategory = () => {
  const [
    categoryId,
    subCategoryId,
    name,
    loading,
    handleCategoryChange,
    handleSubCategoryChange,
    onChangeName,
    handleSubmit,
    categories,
    subcategories,
    subLoading,
  ] = useAddSecondaryCategoryHook();

  return (
    <div>
      <div className="admin-content-text pb-4">إضافة تصنيف ثانوي جديد</div>
      <Row className="justify-content-start">
        <Col sm="8">
          <Card className="p-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="secondaryName">
                <Form.Label>اسم التصنيف الثانوي</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={onChangeName}
                  placeholder="اسم التصنيف الثانوي"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="mainCategory">
                <Form.Label>التصنيف الرئيسي</Form.Label>
                <Form.Select
                  name="category"
                  value={categoryId}
                  onChange={handleCategoryChange}
                >
                  <option value="0">اختر التصنيف الرئيسي</option>
                  {categories?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="subCategory">
                <Form.Label>التصنيف الفرعي</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Select
                    name="subcategory"
                    value={subCategoryId}
                    onChange={handleSubCategoryChange}
                    disabled={categoryId === "0"}
                  >
                    <option value="0">
                      {categoryId === "0"
                        ? "اختر التصنيف الرئيسي أولاً"
                        : "اختر التصنيف الفرعي"}
                    </option>
                    {subcategories?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  {subLoading ? <Spinner animation="border" size="sm" /> : null}
                </div>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" disabled={loading}>
                  حفظ التعديلات
                </Button>
                {loading ? (
                  <div className="ms-2 d-flex align-items-center">
                    <Spinner animation="border" size="sm" />
                  </div>
                ) : null}
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddSecondaryCategory;
