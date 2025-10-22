import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
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
    getFilteredSubcategories,
  ] = useAddSecondaryCategoryHook();

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">إضافة تصنيف ثانوي جديد</div>
        <Col sm="8">
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف الثانوي"
          />
          <select
            name="category"
            value={categoryId}
            onChange={handleCategoryChange}
            className="select input-form-area px-2 py-3 mt-3 text-center"
          >
            <option value="0">اختر التصنيف الرئيسي</option>
            {categories?.data
              ? categories.data.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <select
            name="subcategory"
            value={subCategoryId}
            onChange={handleSubCategoryChange}
            className="select input-form-area px-2 py-3 mt-3 text-center"
          >
            <option value="0">اختر التصنيف الفرعي</option>
            {getFilteredSubcategories().map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button
            type="submit"
            className="btn-save d-inline mt-2 "
            onClick={handleSubmit}
          >
            حفظ التعديلات
          </button>
          {loading === true ? (
            <Spinner animation="border" variant="primary" />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddSecondaryCategory;
