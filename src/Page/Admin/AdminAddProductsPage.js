import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAddProducts from "../../Components/Admin/AdminAddProducts";
const AdminAddProductsPage = () => {
  return (
    <Container fluid style={{ maxWidth: "1500px", padding: "16px" }}>
      <Row className="py-3 g-3">
        <Col xs="12" sm="12" md="4" lg="3" className="admin-sidebar-col">
          <div
            className="admin-sidebar-wrapper"
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              position: "sticky",
              top: "16px",
            }}
          >
            <AdminSideBar />
          </div>
        </Col>
        <Col xs="12" sm="12" md="8" lg="9" className="admin-content-col">
          <AdminAddProducts />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddProductsPage;
