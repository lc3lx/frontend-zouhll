import React, { useState, useEffect } from "react";
import { Col, Card, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import prod1 from "../../images/prod1.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts } from "../../redux/actions/productsAction";
import { getProductImage } from "../../utils/imageHelper";
const AdminAllProductsCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handelDelete = async () => {
    await dispatch(deleteProducts(item._id));
    setShow(false);
    window.location.reload();
  };

  return (
    <Col xs="12" sm="6" md="6" lg="4" className="mb-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تأكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل أنت متأكد من عملية حذف المنتج؟</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="secondary" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="danger" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "all 0.2s ease",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Action Buttons */}
        <div style={{ 
          padding: "8px 12px", 
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          background: "#f8f9fa"
        }}>
          <button
            onClick={handleShow}
            style={{
              background: "none",
              border: "none",
              color: "#dc3545",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              padding: "4px 8px"
            }}
          >
            حذف
          </button>
          <Link
            to={`/admin/editproduct/${item._id}`}
            style={{ 
              textDecoration: "none",
              color: "#007185",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 8px"
            }}
          >
            تعديل
          </Link>
        </div>

        {/* Product Image */}
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            height: "200px",
            background: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <img
              style={{ 
                maxHeight: "180px", 
                maxWidth: "100%",
                objectFit: "contain"
              }}
              src={getProductImage(item)}
              alt={item.title}
            />
          </div>

          {/* Product Info */}
          <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#0f1111",
              marginBottom: "8px",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "36px",
            }}>
              {item.title}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <div style={{ fontSize: "12px", color: "#666" }}>
                ⭐ {item.ratingsQuantity || 0} تقييم
              </div>
              
              <div style={{ textAlign: "right" }}>
                {item.priceAfterDiscount >= 1 ? (
                  <div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#B12704"
                    }}>
                      ${item.priceAfterDiscount}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#565959",
                      textDecoration: "line-through"
                    }}>
                      ${item.price}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#B12704"
                  }}>
                    ${item.price}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
};

export default AdminAllProductsCard;
