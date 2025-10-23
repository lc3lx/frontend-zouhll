import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSecondaryCategory,
  getOneSecondaryCategory,
} from "../../redux/actions/secondaryCategoryAction";
import { getAllSubcategories } from "../../redux/actions/subcategoryAction";
import { getAllCategory } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifaction";

const EditSecondaryCategoryModal = ({
  show,
  onHide,
  secondaryCategoryId,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("0");
  const [subCategoryId, setSubCategoryId] = useState("0");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  // Get data from Redux
  const categories = useSelector((state) => state.allCategory.category);
  const subcategories = useSelector((state) => state.subCategory.subcategories);
  const secondaryCategory = useSelector(
    (state) => state.secondaryCategory.oneSecondaryCategory
  );
  const updateResult = useSelector(
    (state) => state.secondaryCategory.updateSecondaryCategory
  );

  // Load data when modal opens
  useEffect(() => {
    if (show && secondaryCategoryId) {
      setInitialLoading(true);
      dispatch(getAllCategory(1000));
      dispatch(getOneSecondaryCategory(secondaryCategoryId));
    }
  }, [show, secondaryCategoryId, dispatch]);

  // Populate form when secondary category data is loaded
  useEffect(() => {
    if (secondaryCategory?.data && show) {
      const data = secondaryCategory.data;
      setName(data.name || "");
      setCategoryId(data.category?._id || data.category || "0");
      setSubCategoryId(data.subCategory?._id || data.subCategory || "0");
      setInitialLoading(false);
    }
  }, [secondaryCategory, show]);

  // Load subcategories when category changes
  useEffect(() => {
    const fetchSubs = async () => {
      if (!categoryId || categoryId === "0") return;
      setSubLoading(true);
      try {
        await dispatch(
          getAllSubcategories(`category=${categoryId}&limit=1000&sort=name`)
        );
      } finally {
        setSubLoading(false);
      }
    };
    fetchSubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Handle successful update
  useEffect(() => {
    if (loading === false && updateResult && show) {
      if (updateResult.status === 200) {
        notify("تم التحديث بنجاح", "success");
        onSuccess?.();
        onHide();
        // Force page refresh to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (updateResult.status && updateResult.status !== 200) {
        notify("هناك مشكله فى عملية التحديث", "error");
      }
    }
  }, [loading, updateResult, show, onSuccess, onHide]);

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId("0");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    if (categoryId === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
      return;
    }
    if (subCategoryId === "0") {
      notify("من فضلك اختر تصنيف فرعي", "warn");
      return;
    }
    if (name === "") {
      notify("من فضلك ادخل اسم التصنيف الثانوي", "warn");
      return;
    }

    const data = {
      name,
      category: categoryId,
      subCategory: subCategoryId,
    };

    setLoading(true);
    await dispatch(updateSecondaryCategory(secondaryCategoryId, data));
    setLoading(false);
  };

  const handleClose = () => {
    setName("");
    setCategoryId("0");
    setSubCategoryId("0");
    setLoading(false);
    setSubLoading(false);
    setInitialLoading(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>تعديل التصنيف الثانوي</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {initialLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <div className="mt-2">جاري تحميل البيانات...</div>
          </div>
        ) : (
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="secondaryName">
                  <Form.Label>اسم التصنيف الثانوي</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    placeholder="اسم التصنيف الثانوي"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
                    {subLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : null}
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إلغاء
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || initialLoading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              جاري الحفظ...
            </>
          ) : (
            "حفظ التعديلات"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSecondaryCategoryModal;
