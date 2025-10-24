import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import EditBrandHook from "../../hook/brand/edit-brand-hook";

const AdminEditBrand = ({ brandId }) => {
  const [
    img,
    name,
    loading,
    isPress,
    handleSubmit,
    onImageChange,
    onChangeName,
  ] = EditBrandHook(brandId);

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">تعديل الماركة</div>
        <Col sm="8">
          <div className="text-form pb-2">صورة الماركة</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="brand"
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
            type="text"
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الماركة"
            onChange={onChangeName}
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

export default AdminEditBrand;
