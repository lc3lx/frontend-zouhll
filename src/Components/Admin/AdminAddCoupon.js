import React, { useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddCouponHook from "../../hook/coupon/add-coupon-hook";
import AdminCoupnCard from "./AdminCoupnCard";

const AdminAddCoupon = () => {
  const dateRef = useRef();
  const [
    coupnName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    coupons,
  ] = AddCouponHook();

  // التأكد من أن coupons هو array
  const couponsList = Array.isArray(coupons) ? coupons : [];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "25px",
        padding: "30px",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        border: "2px solid rgba(102, 126, 234, 0.1)",
        minHeight: "400px",
      }}
    >
      <Row className="justify-content-start">
        <div
          style={{
            fontSize: "24px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "25px",
          }}
        >
          إضافة كوبون جديد
        </div>
        <Col sm="8">
          <input
            value={coupnName}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الكوبون"
            style={{
              borderRadius: "15px",
              border: "2px solid rgba(102, 126, 234, 0.2)",
              padding: "12px 20px",
            }}
          />
          <input
            ref={dateRef}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الانتهاء"
            onChange={onChangeDate}
            value={couponDate}
            onFocus={() => (dateRef.current.type = "date")}
            onBlur={() => (dateRef.current.type = "text")}
            style={{
              borderRadius: "15px",
              border: "2px solid rgba(102, 126, 234, 0.2)",
              padding: "12px 20px",
            }}
          />
          <input
            value={couponValue}
            onChange={onChangeValue}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="نسبة خصم الكوبون"
            style={{
              borderRadius: "15px",
              border: "2px solid rgba(102, 126, 234, 0.2)",
              padding: "12px 20px",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button
            onClick={onSubmit}
            className="btn-modern d-inline mt-3"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "50px",
              padding: "12px 30px",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            حفظ الكوبون
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col sm="12">
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "20px",
            }}
          >
            الكوبونات الحالية:
          </div>
        </Col>
        <Col sm="12">
          {couponsList.length > 0 ? (
            couponsList.map((item, index) => (
              <AdminCoupnCard key={index} coupon={item} />
            ))
          ) : (
            <div className="text-center py-5">
              <div className="loading-container">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p
                  className="loading-text"
                  style={{ marginTop: "20px", color: "#555" }}
                >
                  {coupons === undefined
                    ? "جاري تحميل الكوبونات..."
                    : "لا يوجد كوبونات حتى الآن"}
                </p>
              </div>
            </div>
          )}
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCoupon;
