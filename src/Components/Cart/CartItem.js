import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import mobile from "../../images/mobile.png";
import deleteicon from "../../images/delete.png";
import DeleteCartHook from "../../hook/cart/delete-cart-hook";
import { getProductImage } from "../../utils/imageHelper";
import { getOneProduct } from "../../redux/actions/productsAction";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // تتبع حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [
    handelDeleteCart,
    show,
    handleClose,
    handleShow,
    handelDeleteItem,
    itemCount,
    onChangeCount,
    handeleUpdateCart,
  ] = DeleteCartHook(item);

  // جلب بيانات المنتج من Redux
  const oneProduct = useSelector((state) => state.allproducts.oneProduct);

  // جلب بيانات المنتج إذا كان مجرد ID
  useEffect(() => {
    if (item?.product && typeof item.product === 'string') {
      console.log('Fetching product details for ID:', item.product);
      setLoadingProduct(true);
      dispatch(getOneProduct(item.product));
    }
  }, [item?.product, dispatch]);

  // تحديث بيانات المنتج عند وصولها من Redux
  useEffect(() => {
    if (oneProduct && oneProduct.data && loadingProduct) {
      console.log('Product details received:', oneProduct.data);
      setProductDetails(oneProduct.data);
      setLoadingProduct(false);
    }
  }, [oneProduct, loadingProduct]);

  // Debug: طباعة بيانات المنتج
  console.log('CartItem - item data:', item);
  console.log('CartItem - product data:', item?.product);
  console.log('CartItem - productDetails:', productDetails);
  console.log('CartItem - loadingProduct:', loadingProduct);

  // الحصول على بيانات المنتج (قد تكون في item.product أو مباشرة في item أو من productDetails)
  const getProductData = () => {
    // إذا كان product كائن كامل
    if (item?.product && typeof item.product === 'object' && item.product.title) {
      return item.product;
    }
    // إذا كان product مجرد ID وتم جلب البيانات
    if (item?.product && typeof item.product === 'string' && productDetails) {
      return productDetails;
    }
    // إذا كانت بيانات المنتج مباشرة في item
    if (item?.title || item?.imageCover) {
      return item;
    }
    return null;
  };

  const productData = getProductData();
  console.log('CartItem - productData:', productData);
  console.log('CartItem - product type:', typeof item?.product);

  // الحصول على رابط الصورة
  const getImageSrc = () => {
    if (productData?.imageCover) {
      const imageUrl = getProductImage(productData);
      console.log('CartItem - final image URL:', imageUrl);
      return imageUrl;
    }
    console.log('CartItem - using fallback image');
    return mobile;
  };

  // إذا لم يكن هناك منتج أو كان المنتج مجرد ID
  if (!item) {
    return (
      <Col xs="12" className="cart-item-body my-2 d-flex px-2">
        <div style={{
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
          background: '#f8f9fa',
          width: '100%'
        }}>
          <div style={{ color: '#dc3545', marginBottom: '10px' }}>⚠️</div>
          <div>خطأ في تحميل بيانات المنتج</div>
        </div>
      </Col>
    );
  }

  // إذا كان المنتج مجرد ID وجاري التحميل أو لم تصل البيانات بعد
  if (!productData && typeof item?.product === 'string') {
    return (
      <Col xs="12" className="cart-item-body my-2 d-flex px-2">
        <div style={{
          display: 'flex',
          width: '100%',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          background: '#fff'
        }}>
          {/* صورة مع حالة التحميل */}
          <div style={{
            width: '160px',
            height: '197px',
            marginLeft: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: loadingProduct ? '#f8f9fa' : 'transparent'
          }}>
            {loadingProduct ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>جاري التحميل...</div>
              </div>
            ) : (
              <img
                width="160px"
                height="197px"
                src={mobile}
                alt="منتج"
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
          </div>
          
          {/* تفاصيل المنتج */}
          <div className="w-100">
            <div style={{ marginBottom: '10px' }}>
              <h5 style={{ color: '#0f1111', marginBottom: '5px' }}>
                {loadingProduct ? 'جاري تحميل بيانات المنتج...' : 'منتج من العربة'}
              </h5>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>
                معرف المنتج: {item.product}
              </div>
              {loadingProduct && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#ff9900', 
                  background: '#fff3cd', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  ⏳ جاري جلب تفاصيل المنتج...
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <div><strong>الكمية:</strong> {item.quantity || 1}</div>
              {item.color && <div><strong>اللون:</strong> {item.color}</div>}
              {item.size && <div><strong>المقاس:</strong> {item.size}</div>}
            </div>
            
            <div style={{ 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              color: '#B12704',
              marginBottom: '10px'
            }}>
              ${item.price || 0}
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span style={{ marginLeft: '10px' }}>الكمية:</span>
                <input
                  value={itemCount}
                  onChange={onChangeCount}
                  className="mx-2 text-center"
                  type="number"
                  style={{ width: "60px", height: "40px" }}
                />
                <button 
                  onClick={handeleUpdateCart} 
                  className="btn btn-sm"
                  style={{ 
                    background: '#ff9900', 
                    color: '#0f1111',
                    border: 'none',
                    marginLeft: '10px'
                  }}
                >
                  تطبيق
                </button>
              </div>
              
              <button
                onClick={handleShow}
                className="btn btn-sm btn-outline-danger"
                style={{ fontSize: '0.8rem' }}
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '20px',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Modal للحذف */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center p-4">
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🗑️</div>
          <h5 style={{ marginBottom: '12px' }}>حذف المنتج</h5>
          <p style={{ color: '#666', marginBottom: 0 }}>هل تريد حذف هذا المنتج من العربة؟</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={handleClose}>إلغاء</Button>
          <Button variant="danger" onClick={handelDeleteItem}>حذف</Button>
        </Modal.Footer>
      </Modal>

      <div style={{ 
        display: 'flex', 
        gap: screenWidth < 768 ? '12px' : '16px',
        flexDirection: screenWidth < 576 ? 'column' : 'row'
      }}>
        {/* صورة المنتج */}
        <div style={{ 
          flexShrink: 0,
          alignSelf: screenWidth < 576 ? 'center' : 'flex-start'
        }}>
          <img
            width={screenWidth < 576 ? "80px" : "100px"}
            height={screenWidth < 576 ? "80px" : "100px"}
            src={getImageSrc()}
            alt={productData?.title || "منتج"}
            style={{
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #e7e7e7',
              background: '#f8f9fa'
            }}
            onError={(e) => {
              e.target.src = mobile;
            }}
          />
        </div>

        {/* تفاصيل المنتج */}
        <div style={{ 
          flex: 1, 
          minWidth: 0,
          textAlign: screenWidth < 576 ? 'center' : 'right'
        }}>
          {/* العنوان */}
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#0f1111',
            margin: '0 0 8px 0',
            lineHeight: '1.4',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {productData?.title || "منتج من العربة"}
          </h4>

          {/* معلومات المنتج */}
          <div style={{ 
            fontSize: '0.85rem', 
            color: '#666', 
            marginBottom: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {productData?.brand?.name && (
              <span style={{
                background: '#e8f4fd',
                color: '#0066cc',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {productData.brand.name}
              </span>
            )}
            {item.color && (
              <span style={{
                background: '#fff2e6',
                color: '#cc6600',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {item.color}
              </span>
            )}
            {item.size && (
              <span style={{
                background: '#e6f7e6',
                color: '#009900',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                مقاس {item.size}
              </span>
            )}
          </div>

          {/* الكمية والسعر */}
          <div style={{ 
            display: 'flex', 
            justifyContent: screenWidth < 576 ? 'center' : 'space-between', 
            alignItems: 'center',
            flexDirection: screenWidth < 576 ? 'column' : 'row',
            gap: screenWidth < 576 ? '15px' : '0'
          }}>
            {/* تحكم الكمية */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: screenWidth < 576 ? 'center' : 'flex-start'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>الكمية:</span>
              
              {/* أزرار الكمية */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f8f8f8'
              }}>
                <button
                  onClick={() => {
                    if (itemCount > 1) {
                      setUpdating(true);
                      const newCount = itemCount - 1;
                      onChangeCount({ target: { value: newCount } });
                      handeleUpdateCart(newCount)
                        .then(() => setUpdating(false))
                        .catch(() => setUpdating(false));
                    }
                  }}
                  disabled={updating || itemCount <= 1}
                  style={{
                    background: itemCount > 1 ? '#fff' : '#f5f5f5',
                    border: 'none',
                    padding: '6px 10px',
                    cursor: itemCount > 1 ? 'pointer' : 'not-allowed',
                    fontSize: '1rem',
                    color: itemCount > 1 ? '#333' : '#999',
                    borderRight: '1px solid #ddd'
                  }}
                >
                  −
                </button>
                
                <span style={{
                  padding: '6px 12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  minWidth: '40px',
                  textAlign: 'center',
                  background: '#fff',
                  borderLeft: '1px solid #ddd',
                  borderRight: '1px solid #ddd'
                }}>
                  {itemCount}
                </span>
                
                <button
                  onClick={() => {
                    if (itemCount < 10) {
                      setUpdating(true);
                      const newCount = itemCount + 1;
                      onChangeCount({ target: { value: newCount } });
                      handeleUpdateCart(newCount)
                        .then(() => setUpdating(false))
                        .catch(() => setUpdating(false));
                    }
                  }}
                  disabled={updating || itemCount >= 10}
                  style={{
                    background: itemCount < 10 ? '#fff' : '#f5f5f5',
                    border: 'none',
                    padding: '6px 10px',
                    cursor: itemCount < 10 ? 'pointer' : 'not-allowed',
                    fontSize: '1rem',
                    color: itemCount < 10 ? '#333' : '#999',
                    borderLeft: '1px solid #ddd'
                  }}
                >
                  +
                </button>
              </div>

              {updating && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  color: '#ff9900'
                }}>
                  <div className="spinner-border spinner-border-sm" role="status" style={{
                    width: '12px',
                    height: '12px',
                    borderWidth: '1px'
                  }}></div>
                  جاري التحديث...
                </div>
              )}

              <button
                onClick={handleShow}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginLeft: '12px'
                }}
              >
                حذف
              </button>
            </div>

            {/* السعر */}
            <div style={{ 
              textAlign: screenWidth < 576 ? 'center' : 'right'
            }}>
              <div style={{
                fontSize: screenWidth < 576 ? '1.2rem' : '1.1rem',
                fontWeight: '700',
                color: '#B12704'
              }}>
                ${((item.price || 0) * (itemCount || 1)).toFixed(2)}
              </div>
              {itemCount > 1 && (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#666',
                  marginTop: '2px'
                }}>
                  ${item.price || 0} × {itemCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
