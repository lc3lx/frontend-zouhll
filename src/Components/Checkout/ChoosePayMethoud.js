import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import ViewAddressesHook from "./../../hook/user/view-addresses-hook";
import OrderPayCashHook from "./../../hook/checkout/order-pay-cash-hook";
import OrderPayWalletHook from "./../../hook/checkout/order-pay-wallet-hook";
import OrderPayShamCashHook from "./../../hook/checkout/order-pay-shamcash-hook";
import { ToastContainer } from "react-toastify";
import notify from "./../../hook/useNotifaction";
import OrderPayCardHook from "./../../hook/checkout/order-pay-card-hook";
import GetAllUserCartHook from "./../../hook/cart/get-all-user-cart-hook";

const ChoosePayMethoud = () => {
  const [res] = ViewAddressesHook();
  const [handelChooseAddress, addressDetalis, handelCreateOrderCash] =
    OrderPayCashHook();
  const [handelCreateOrderCARD] = OrderPayCardHook(addressDetalis);
  const [
    handelChooseAddressWallet,
    addressDetalisWallet,
    handelCreateOrderWallet,
  ] = OrderPayWalletHook();
  const [
    handelChooseAddressShamCash,
    addressDetalisShamCash,
    handelCreateOrderShamCashHook,
    shamCashPhone,
    setShamCashPhone,
    shamCashTransactionId,
    setShamCashTransactionId
  ] = OrderPayShamCashHook();
  const [, , totalCartPrice, , totalCartPriceAfterDiscount] =
    GetAllUserCartHook();

  const [type, setType] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // تتبع حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const changeMathoud = (e) => {
    setType(e.target.value);
  };

  // تمرير اختيار العنوان لجميع الهوكات حتى تُحفظ القيمة لكل طريقة دفع
  const handleAddressChange = (e) => {
    try { handelChooseAddress(e); } catch {}
    try { handelChooseAddressWallet(e); } catch {}
    try { handelChooseAddressShamCash(e); } catch {}
  };

  const handelPay = () => {
    if (type === "CARD") {
      console.log("order card");
      handelCreateOrderCARD();
    } else if (type === "CASH") {
      console.log("order cash");
      handelCreateOrderCash();
    } else if (type === "WALLET") {
      console.log("order wallet");
      handelCreateOrderWallet();
    } else if (type === "SHAMCASH") {
      console.log("order shamcash");
      handelCreateOrderShamCashHook();
    } else {
      notify("من فضلك اختر طريقة دفع", "warn");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      padding: '20px 0'
    }}>
      <div style={{ 
        maxWidth: screenWidth < 768 ? '100%' : '800px', 
        margin: '0 auto', 
        padding: screenWidth < 768 ? '0 10px' : '0 15px' 
      }}>
        {/* العنوان */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: screenWidth < 768 ? '1.6rem' : '2rem',
            fontWeight: '700',
            color: '#0f1111',
            marginBottom: '8px'
          }}>
            إتمام الشراء
          </h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            اختر طريقة الدفع المناسبة لك
          </p>
        </div>

        {/* طرق الدفع */}
        <Card style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Card.Header style={{
            background: '#fff',
            borderBottom: '1px solid #e7e7e7',
            padding: '20px'
          }}>
            <h4 style={{ margin: 0, color: '#0f1111', fontSize: '1.3rem' }}>
              طرق الدفع المتاحة
            </h4>
          </Card.Header>
          <Card.Body style={{ padding: '20px' }}>
            {/* البطاقة الائتمانية */}
            <div style={{
              border: type === 'CARD' ? '2px solid #ff9900' : '1px solid #e7e7e7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setType('CARD')}>
              <Form.Check
                type="radio"
                name="paymentMethod"
                id="card"
                value="CARD"
                checked={type === 'CARD'}
                onChange={changeMathoud}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '1.5rem' }}>💳</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f1111' }}>
                        البطاقة الائتمانية
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Visa, Mastercard, American Express
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* الدفع عند الاستلام */}
            <div style={{
              border: type === 'CASH' ? '2px solid #ff9900' : '1px solid #e7e7e7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setType('CASH')}>
              <Form.Check
                type="radio"
                name="paymentMethod"
                id="cash"
                value="CASH"
                checked={type === 'CASH'}
                onChange={changeMathoud}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '1.5rem' }}>💵</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f1111' }}>
                        الدفع عند الاستلام
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        رسوم التوصيل: $2
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* المحفظة */}
            <div style={{
              border: type === 'WALLET' ? '2px solid #ff9900' : '1px solid #e7e7e7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setType('WALLET')}>
              <Form.Check
                type="radio"
                name="paymentMethod"
                id="wallet"
                value="WALLET"
                checked={type === 'WALLET'}
                onChange={changeMathoud}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '1.5rem' }}>👛</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f1111' }}>
                        المحفظة الإلكترونية
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        ادفع من رصيد محفظتك
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* ShamCash */}
            <div style={{
              border: type === 'SHAMCASH' ? '2px solid #ff9900' : '1px solid #e7e7e7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setType('SHAMCASH')}>
              <Form.Check
                type="radio"
                name="paymentMethod"
                id="shamcash"
                value="SHAMCASH"
                checked={type === 'SHAMCASH'}
                onChange={changeMathoud}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '1.5rem' }}>📱</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0f1111' }}>
                        ShamCash
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        الدفع عبر تطبيق ShamCash
                      </div>
                    </div>
                  </div>
                }
              />
              
              {/* حقول ShamCash */}
              {type === 'SHAMCASH' && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e7e7e7' }}>
                  <Row>
                    <Col md={screenWidth < 768 ? 12 : 6}>
                      <Form.Group className="mb-3">
                        <Form.Label>رقم الهاتف</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="09xxxxxxxx"
                          value={shamCashPhone}
                          onChange={(e) => setShamCashPhone(e.target.value)}
                          style={{
                            padding: screenWidth < 768 ? '12px' : '10px',
                            fontSize: screenWidth < 768 ? '16px' : '14px'
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={screenWidth < 768 ? 12 : 6}>
                      <Form.Group className="mb-3">
                        <Form.Label>معرف المعاملة</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Transaction ID"
                          value={shamCashTransactionId}
                          onChange={(e) => setShamCashTransactionId(e.target.value)}
                          style={{
                            padding: screenWidth < 768 ? '12px' : '10px',
                            fontSize: screenWidth < 768 ? '16px' : '14px'
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* عنوان الشحن */}
        <Card style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Card.Header style={{
            background: '#fff',
            borderBottom: '1px solid #e7e7e7',
            padding: '20px'
          }}>
            <h4 style={{ margin: 0, color: '#0f1111', fontSize: '1.3rem' }}>
              عنوان الشحن
            </h4>
          </Card.Header>
          <Card.Body style={{ padding: '20px' }}>
            <Form.Select
              onChange={handleAddressChange}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="0">اختر عنوان للشحن</option>
              {res.data ? (
                res.data.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.alias} - {item.city}
                  </option>
                ))
              ) : (
                <option value={0}>لا يوجد عناوين مسجلة</option>
              )}
            </Form.Select>
          </Card.Body>
        </Card>

        {/* ملخص الطلب */}
        <Card style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Card.Body style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>المجموع الفرعي:</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>${totalCartPrice}</span>
            </div>
            
            {totalCartPriceAfterDiscount >= 1 && totalCartPriceAfterDiscount !== totalCartPrice && (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '1rem', color: '#007600' }}>الخصم:</span>
                  <span style={{ fontSize: '1rem', color: '#007600', fontWeight: '600' }}>
                    -${(totalCartPrice - totalCartPriceAfterDiscount).toFixed(2)}
                  </span>
                </div>
                <hr />
              </>
            )}
            
            {type === 'CASH' && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '1rem' }}>رسوم التوصيل:</span>
                <span style={{ fontSize: '1rem', fontWeight: '600' }}>$2</span>
              </div>
            )}
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '2px solid #e7e7e7'
            }}>
              <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0f1111' }}>المجموع النهائي:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#B12704' }}>
                ${totalCartPriceAfterDiscount >= 1 && totalCartPriceAfterDiscount !== totalCartPrice
                  ? (totalCartPriceAfterDiscount + (type === 'CASH' ? 2 : 0)).toFixed(2)
                  : (totalCartPrice + (type === 'CASH' ? 2 : 0)).toFixed(2)
                }
              </span>
            </div>
          </Card.Body>
        </Card>

        {/* زر إتمام الشراء */}
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={handelPay}
            style={{
              background: '#ff9900',
              border: '1px solid #e47911',
              color: '#0f1111',
              padding: screenWidth < 768 ? '12px 30px' : '15px 40px',
              fontSize: screenWidth < 768 ? '1rem' : '1.1rem',
              fontWeight: '700',
              borderRadius: '8px',
              minWidth: screenWidth < 768 ? '100%' : '200px',
              maxWidth: screenWidth < 768 ? '300px' : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e47911';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ff9900';
            }}
          >
            🛒 إتمام الشراء
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChoosePayMethoud;
