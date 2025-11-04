import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import avatar from "../../images/avatar.png";
import AddStoreHook from "./../../hook/store/add-store-hook";
const AdminAddStore = () => {
  const [
    img,
    name,
    loading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeName,
  ] = AddStoreHook();
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">إضافة متجر جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">شعار المتجر</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="store logo"
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
            type="text"
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المتجر"
            onChange={onChangeName}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
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

export default AdminAddStore;
