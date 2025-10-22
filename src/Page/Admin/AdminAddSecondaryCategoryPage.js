import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAddSecondaryCategory from "../../Components/Admin/AdminAddSecondaryCategory";

const AdminAddSecondaryCategoryPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminAddSecondaryCategory />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddSecondaryCategoryPage;
