import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import EditCategoryHook from "../../hook/category/edit-category-hook";

const AdminEditCategory = () => {
  const { id } = useParams();
  const [
    img,
    name,
    loading,
    isPress,
    handleSubmit,
    onImageChange,
    onChangeName,
  ] = EditCategoryHook(id);

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">تعديل التصنيف</div>
        <Col sm="8">
          <div className="text-form pb-2">صورة التصنيف</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="category"
                height="100px"
                width="120px"
                style={{ cursor: "pointer", objectFit: "cover" }}
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
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            حفظ التعديلات
          </button>
        </Col>
      </Row>

      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AdminEditCategory;
