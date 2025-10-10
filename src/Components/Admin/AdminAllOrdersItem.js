import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import mobile from "../../images/mobile.png";
const AdminAllOrdersItem = ({ orderItem }) => {
  if (!orderItem) return null;

  return (
    <Col sm="12" className="mb-3">
      <Link
        to={`/admin/orders/${orderItem._id}`}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.1)",
            border: "2px solid rgba(102, 126, 234, 0.1)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(102, 126, 234, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(102, 126, 234, 0.1)";
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
            }}
          />

          <Row className="align-items-center mb-3">
            <Col sm="12">
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "700",
                  display: "inline-block",
                }}
              >
                طلب رقم #{orderItem.id}
              </span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm="12">
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: "5px",
                }}
              >
                طلب من: {orderItem.user?.name || "غير معروف"}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#718096",
                  fontWeight: "600",
                }}
              >
                {orderItem.user?.email || ""}
              </div>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col xs="12" md="8" className="d-flex flex-wrap gap-2 mb-3 mb-md-0">
              <div
                style={{
                  background: orderItem.isDelivered
                    ? "linear-gradient(135deg, #d4fc79, #96e6a1)"
                    : "linear-gradient(135deg, #ffeaa7, #fdcb6e)",
                  padding: "8px 16px",
                  borderRadius: "15px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: orderItem.isDelivered ? "#27ae60" : "#d63031",
                  display: "inline-block",
                }}
              >
                🚚 التوصيل: {orderItem.isDelivered ? "تم التوصيل" : "لم يتم"}
              </div>

              <div
                style={{
                  background: orderItem.isPaid
                    ? "linear-gradient(135deg, #d4fc79, #96e6a1)"
                    : "linear-gradient(135deg, #ffeaa7, #fdcb6e)",
                  padding: "8px 16px",
                  borderRadius: "15px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: orderItem.isPaid ? "#27ae60" : "#d63031",
                  display: "inline-block",
                }}
              >
                💳 الدفع: {orderItem.isPaid ? "تم الدفع" : "لم يتم"}
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                  padding: "8px 16px",
                  borderRadius: "15px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#4a5568",
                  display: "inline-block",
                }}
              >
                💰{" "}
                {orderItem.paymentMethodType === "cash"
                  ? "كاش"
                  : "بطاقة ائتمانية"}
              </div>
            </Col>

            <Col xs="12" md="4" className="text-end">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "12px 24px",
                  borderRadius: "15px",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "900",
                  }}
                >
                  {orderItem.totalOrderPrice || 0}
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginRight: "5px",
                  }}
                >
                  جنيه
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Link>
    </Col>
  );
};

export default AdminAllOrdersItem;
