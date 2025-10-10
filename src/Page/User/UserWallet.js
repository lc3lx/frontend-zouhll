import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import { ToastContainer } from "react-toastify";
import GetUserWalletHook from "../../hook/wallet/get-user-wallet-hook";
import RechargeWalletHook from "../../hook/wallet/recharge-wallet-hook";

const UserWallet = () => {
  const [userWallet, loading] = GetUserWalletHook();
  const [recharge] = RechargeWalletHook();

  const [show, setShow] = useState(false);
  const [rechargeCode, setRechargeCode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRecharge = () => {
    recharge(rechargeCode);
    handleClose();
    setRechargeCode("");
  };

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <UserSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <div className="admin-content-text">المحفظة الإلكترونية</div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : userWallet && userWallet.data ? (
            <>
              {/* Wallet Balance Card */}
              <div className="user-address-card my-3 px-3">
                <Row className="d-flex justify-content-between pt-2">
                  <Col xs="6">
                    <div className="p-2">
                      <div className="fs-5 fw-bold">الرصيد الحالي</div>
                      <div className="fs-3 text-success fw-bold">
                        {userWallet.data.balance} {userWallet.data.currency}
                      </div>
                    </div>
                  </Col>
                  <Col xs="6" className="d-flex justify-content-end">
                    <Button
                      variant="outline-success"
                      onClick={handleShow}
                      className="mt-2"
                    >
                      شحن المحفظة
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* Transaction History */}
              <div className="user-address-card my-3 px-3">
                <div className="admin-content-text pt-3">سجل المعاملات</div>
                {userWallet.data.transactions &&
                userWallet.data.transactions.length > 0 ? (
                  userWallet.data.transactions.map((transaction, index) => (
                    <div key={index} className="border-bottom py-2">
                      <Row>
                        <Col xs="8">
                          <div className="d-flex">
                            <div className="fs-6">
                              <strong>{transaction.description}</strong>
                            </div>
                          </div>
                          <div className="fs-7 text-muted">
                            {new Date(transaction.createdAt).toLocaleDateString(
                              "ar-EG"
                            )}
                          </div>
                        </Col>
                        <Col xs="4" className="text-end">
                          <div
                            className={`fs-6 fw-bold ${
                              transaction.type === "credit" ||
                              transaction.type === "recharge"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {transaction.type === "credit" ||
                            transaction.type === "recharge"
                              ? "+"
                              : "-"}
                            {transaction.amount} {userWallet.data.currency}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted">
                    لا توجد معاملات حتى الآن
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="alert alert-info">
                لم يتم العثور على محفظة. يرجى المحاولة لاحقاً.
              </div>
            </div>
          )}

          {/* Recharge Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>شحن المحفظة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="rechargeCode">كود الشحن</label>
                <input
                  type="text"
                  className="form-control"
                  id="rechargeCode"
                  value={rechargeCode}
                  onChange={(e) => setRechargeCode(e.target.value)}
                  placeholder="أدخل كود الشحن"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="success" onClick={handleRecharge}>
                شحن
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default UserWallet;
