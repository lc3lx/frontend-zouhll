import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllExchangeRates } from "../../redux/actions/exchangeRateAction";

const AdminAllExchangeRates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExchangeRates());
  }, [dispatch]);

  const exchangeRates = useSelector(
    (state) => state.exchangeRateReducer.exchangeRates
  );
  const loading = useSelector((state) => state.exchangeRateReducer.loading);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="admin-content-text">كل أسعار الصرف</div>
      <Row className="justify-content-start">
        {!loading && exchangeRates?.data ? (
          exchangeRates.data.map((item, index) => {
            return (
              <Col key={index} sm="6" md="4" lg="3" className="d-flex">
                <Card
                  className="my-2"
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                  }}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      style={{
                        fontFamily: "Almarai",
                        fontSize: "16px",
                        color: "#1C1C1C",
                        marginBottom: "10px",
                      }}
                    >
                      {item.fromCurrency} → {item.toCurrency}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontFamily: "Almarai",
                        fontSize: "18px",
                        color: "#007185",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {item.rate.toLocaleString()}
                    </Card.Text>
                    <Card.Text
                      style={{
                        fontFamily: "Almarai",
                        fontSize: "12px",
                        color: "#6C757D",
                        marginBottom: "10px",
                      }}
                    >
                      آخر تحديث: {formatDate(item.lastUpdated)}
                    </Card.Text>
                    <Card.Text
                      style={{
                        fontFamily: "Almarai",
                        fontSize: "12px",
                        color: item.isActive ? "#28a745" : "#dc3545",
                        marginBottom: "10px",
                      }}
                    >
                      الحالة: {item.isActive ? "نشط" : "غير نشط"}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-auto">
                      <Button
                        className="btn btn-outline-success"
                        style={{ color: "#0D6EFD", fontSize: "13px" }}
                      >
                        تعديل
                      </Button>
                      <Button
                        className="btn btn-outline-dark"
                        style={{ color: "#DC3545", fontSize: "13px" }}
                      >
                        مسح
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <h4>لا يوجد أسعار صرف</h4>
        )}
      </Row>
    </div>
  );
};

export default AdminAllExchangeRates;
