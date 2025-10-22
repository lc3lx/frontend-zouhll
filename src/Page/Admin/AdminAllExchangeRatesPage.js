import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAllExchangeRates from "../../Components/Admin/AdminAllExchangeRates";

const AdminAllExchangeRatesPage = () => {
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminAllExchangeRates />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllExchangeRatesPage;
