import React from "react";
import { Row } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";

const AdminAllProducts = ({ products }) => {
  // التأكد من أن products هو array
  const productsList = Array.isArray(products) ? products : [];

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
        إدارة جميع المنتجات
      </div>
      <Row className="justify-content-start">
        {productsList.length > 0 ? (
          productsList.map((item, index) => (
            <AdminAllProductsCard key={index} item={item} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
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
                {products === undefined
                  ? "جاري تحميل المنتجات..."
                  : "لا يوجد منتجات حتى الآن"}
              </p>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
