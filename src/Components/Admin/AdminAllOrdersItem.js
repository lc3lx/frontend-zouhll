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
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            transition: "all 0.2s ease",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
          }}
        >

          {/* Order Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#0f1111",
                marginBottom: "4px",
              }}>
                طلب رقم #{orderItem.id}
              </div>
              <div style={{
                fontSize: "14px",
                color: "#565959",
              }}>
                العميل: {orderItem.user?.name || "غير معروف"}
              </div>
              <div style={{
                fontSize: "12px",
                color: "#999",
              }}>
                {orderItem.user?.email || ""}
              </div>
            </div>
            
            {/* Price */}
            <div style={{
              background: "#B12704",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "700",
            }}>
              ${orderItem.totalOrderPrice || 0}
            </div>
          </div>

          {/* Status Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {/* Delivery Status */}
            <div style={{
              background: orderItem.isDelivered ? "#d4edda" : "#fff3cd",
              color: orderItem.isDelivered ? "#155724" : "#856404",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              border: `1px solid ${orderItem.isDelivered ? "#c3e6cb" : "#ffeaa7"}`
            }}>
              {orderItem.isDelivered ? "✅ تم التوصيل" : "📦 في الانتظار"}
            </div>

            {/* Payment Status */}
            <div style={{
              background: orderItem.isPaid ? "#d4edda" : "#f8d7da",
              color: orderItem.isPaid ? "#155724" : "#721c24",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              border: `1px solid ${orderItem.isPaid ? "#c3e6cb" : "#f5c6cb"}`
            }}>
              {orderItem.isPaid ? "💳 تم الدفع" : "❌ لم يتم الدفع"}
            </div>

            {/* Payment Method */}
            <div style={{
              background: "#e2e3e5",
              color: "#383d41",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid #d6d8db"
            }}>
              {orderItem.paymentMethodType === "cash" ? "💰 كاش" : "💳 بطاقة ائتمانية"}
            </div>

            {/* Order Date */}
            <div style={{
              background: "#f8f9fa",
              color: "#6c757d",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid #dee2e6"
            }}>
              📅 {new Date(orderItem.createdAt).toLocaleDateString('ar-EG')}
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default AdminAllOrdersItem;
