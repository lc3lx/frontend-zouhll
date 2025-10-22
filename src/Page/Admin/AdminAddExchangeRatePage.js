import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAddExchangeRate from "../../Components/Admin/AdminAddExchangeRate";

const AdminAddExchangeRatePage = () => {
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminAddExchangeRate />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddExchangeRatePage;
