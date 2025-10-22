import React from "react";
import { Row, Col } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import useAddSubcategoryHook from "./../../hook/subcategory/add-subcategory-hook";

const AdminAddSubCategory = () => {
  const [
    id,
    name,
    img,
    loading,
    category,
    subcategory,
    handelChange,
    handelSubmit,
    onChangeName,
    onChangeImg,
  ] = useAddSubcategoryHook();

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">صورة التصنيف الفرعي</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : require("../../images/avatar.png")
                }
                alt="subcategory"
                height="100px"
                width="120px"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              name="photo"
              onChange={onChangeImg}
              id="upload-photo"
              style={{ display: "none" }}
            />
          </div>
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف الفرعي"
          />
          <select
            name="category"
            id="cat"
            className="select mt-3 px-2 "
            onChange={handelChange}
          >
            <option value="0">اختر تصنيف رئيسي</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddSubCategory;
