import React, { useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { addProductToCart } from "../../redux/actions/cartAction";
import notify from "../../hook/useNotifaction";

const ProductText = ({ selectedVariantIndex, setSelectedVariantIndex, selectedSize, setSelectedSize }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const dispatch = useDispatch();
  const [indexColor, setIndexColor] = useState(null);

  const variants = useMemo(() => (Array.isArray(item?.variants) ? item.variants : []), [item]);
  const currentVariant = useMemo(
    () => (variants.length > 0 && selectedVariantIndex !== null ? variants[selectedVariantIndex] : null),
    [variants, selectedVariantIndex]
  );

  const currentPrice = useMemo(() => {
    if (currentVariant && typeof currentVariant.price === "number") return currentVariant.price;
    if (typeof item?.priceAfterDiscount === "number" && item.priceAfterDiscount >= 1)
      return item.priceAfterDiscount;
    return item?.price;
  }, [currentVariant, item]);

  const onSelectVariant = (index) => {
    setSelectedVariantIndex(index);
    setIndexColor(index);
    setSelectedSize(null);
  };

  const onSelectSize = (size) => {
    setSelectedSize(size);
  };

  const onAddToCart = async () => {
    // If variants exist, enforce color/size selection
    if (variants.length > 0) {
      if (selectedVariantIndex === null) {
        notify("من فضلك اختر لون اولا للمنتج", "warn");
        return;
      }
      const v = currentVariant;
      if (v?.sizes && v.sizes.length > 0) {
        if (!selectedSize) {
          notify("من فضلك اختر القياس", "warn");
          return;
        }
        if (typeof selectedSize.stock === "number" && selectedSize.stock <= 0) {
          notify("القياس غير متوفر حالياً", "warn");
          return;
        }
      }
      const colorValue = v?.color?.name || v?.color?.hex || "";
      const body = { productId: id, color: colorValue };
      if (selectedSize?.label) body.size = selectedSize.label;
      await dispatch(addProductToCart(body));
      notify("تمت إضافة المنتج للعربة", "success");
      return;
    }

    // Fallback: old behavior based on colors (new) or availableColors (legacy) without size
    const flatColors = Array.isArray(item?.colors) ? item.colors : (Array.isArray(item?.availableColors) ? item.availableColors : []);
    if (flatColors.length > 0) {
      if (indexColor === null) {
        notify("من فضلك اختر لون اولا للمنتج", "warn");
        return;
      }
      const colorValue = flatColors[indexColor];
      await dispatch(addProductToCart({ productId: id, color: colorValue }));
    } else {
      await dispatch(addProductToCart({ productId: id }));
    }
    notify("تمت إضافة المنتج للعربة", "success");
  };

  const onBuyNow = async () => {
    // Validate product selection first (same validation as add to cart)
    if (variants.length > 0) {
      if (selectedVariantIndex === null) {
        notify("من فضلك اختر لون اولا للمنتج", "warn");
        return;
      }
      const v = currentVariant;
      if (v?.sizes && v.sizes.length > 0) {
        if (!selectedSize) {
          notify("من فضلك اختر القياس", "warn");
          return;
        }
        if (typeof selectedSize.stock === "number" && selectedSize.stock <= 0) {
          notify("القياس غير متوفر حالياً", "warn");
          return;
        }
      }
      const colorValue = v?.color?.name || v?.color?.hex || "";
      const body = { productId: id, color: colorValue };
      if (selectedSize?.label) body.size = selectedSize.label;
      await dispatch(addProductToCart(body));
      notify("تم إضافة المنتج للسلة، جاري التوجه للدفع...", "success");
      // Navigate to cart page after adding to cart
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
      return;
    }

    // Fallback: old behavior based on colors (new) or availableColors (legacy) without size
    const flatColors = Array.isArray(item?.colors) ? item.colors : (Array.isArray(item?.availableColors) ? item.availableColors : []);
    if (flatColors.length > 0) {
      if (indexColor === null) {
        notify("من فضلك اختر لون اولا للمنتج", "warn");
        return;
      }
      const colorValue = flatColors[indexColor];
      await dispatch(addProductToCart({ productId: id, color: colorValue }));
    } else {
      await dispatch(addProductToCart({ productId: id }));
    }
    notify("تم إضافة المنتج للسلة، جاري التوجه للدفع...", "success");
    // Navigate to cart page after adding to cart
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Stock Status */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{
          fontSize: '14px',
          color: (selectedSize?.stock ?? item.quantity) > 0 ? '#007600' : '#B12704',
          fontWeight: '500'
        }}>
          {(selectedSize?.stock ?? item.quantity) > 0 ? 'متوفر في المخزون' : 'غير متوفر حالياً'}
        </span>
      </div>

      {/* Product Title & Rating */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '400',
          color: '#0f1111',
          marginBottom: '8px',
          lineHeight: '1.3'
        }}>
          {item.title}
        </h1>
        
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{
                color: i < Math.floor(item.ratingsAverage || 0) ? '#ff9900' : '#ddd',
                fontSize: '14px'
              }}>★</span>
            ))}
          </div>
          <span style={{
            fontSize: '14px',
            color: '#007185',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            {item.ratingsQuantity || 0} تقييم
          </span>
        </div>
        
        {/* Brand */}
        <div style={{ fontSize: '14px', color: '#565959', marginBottom: '8px' }}>
          الماركة: <span style={{ color: '#007185', cursor: 'pointer' }}>{brand?.name || 'غير محدد'}</span>
        </div>
      </div>


      {/* Colors & Sizes */}
      <div style={{ marginBottom: '20px' }}>
        {(variants.length > 0 || (item.availableColors && item.availableColors.length > 0)) && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f1111',
              marginBottom: '8px'
            }}>
              اللون:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {variants.length > 0
                ? variants.map((v, index) => (
                    <div
                      key={index}
                      title={v?.color?.name || ""}
                      onClick={() => onSelectVariant(index)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        backgroundColor: v?.color?.hex || '#e2e8f0',
                        border: selectedVariantIndex === index
                          ? '2px solid #ff9900'
                          : '1px solid #ddd',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      className={`color-option ${selectedVariantIndex === index ? 'selected' : ''}`}
                    >
                      {selectedVariantIndex === index && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#fff',
                          fontSize: '12px'
                        }}>✓</div>
                      )}
                    </div>
                  ))
                : (Array.isArray(item?.colors) ? item.colors : (item.availableColors || [])).map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setIndexColor(index)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        backgroundColor: color,
                        border: indexColor === index
                          ? '2px solid #ff9900'
                          : '1px solid #ddd',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      className={`color-option ${indexColor === index ? 'selected' : ''}`}
                    >
                      {indexColor === index && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#fff',
                          fontSize: '12px'
                        }}>✓</div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* Sizes for selected variant */}
        {currentVariant?.sizes && currentVariant.sizes.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f1111',
              marginBottom: '8px'
            }}>
              المقاس:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentVariant.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSelectSize(s)}
                  disabled={typeof s.stock === 'number' && s.stock <= 0}
                  className="size-option"
                  style={{
                    padding: '8px 12px',
                    border: selectedSize?.label === s.label ? '2px solid #ff9900' : '1px solid #ddd',
                    background: selectedSize?.label === s.label ? '#fff3cd' : '#fff',
                    color: '#0f1111',
                    borderRadius: '4px',
                    cursor: typeof s.stock === 'number' && s.stock <= 0 ? 'not-allowed' : 'pointer',
                    opacity: typeof s.stock === 'number' && s.stock <= 0 ? 0.5 : 1,
                    fontSize: '14px'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: '14px', color: '#565959', marginBottom: '16px' }}>
          الكمية المتاحة: <span style={{ color: '#007600', fontWeight: '500' }}>{selectedSize?.stock ?? item.quantity}</span>
        </div>
      </div>


      {/* Price */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {item.priceAfterDiscount >= 1 ? (
            <>
              <span style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#B12704'
              }}>
                ${currentPrice}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#565959',
                textDecoration: 'line-through'
              }}>
                ${item.price}
              </span>
            </>
          ) : (
            <span style={{
              fontSize: '24px',
              fontWeight: '400',
              color: '#B12704'
            }}>
              ${currentPrice}
            </span>
          )}
        </div>
        
        {/* Free shipping notice */}
        <div style={{ fontSize: '14px', color: '#007185', marginTop: '4px' }}>
          شحن مجاني للطلبات أكثر من $50
        </div>
      </div>
      {/* Add to Cart */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onAddToCart}
          className="add-to-cart-btn"
          style={{
            background: '#ff9900',
            border: '1px solid #e47911',
            borderRadius: '8px',
            padding: '10px 20px',
            color: '#0f1111',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '8px'
          }}
        >
          أضف إلى السلة
        </button>
        
        <button 
          onClick={onBuyNow}
          className="buy-now-btn"
          style={{
            background: '#ffa41c',
            border: '1px solid #ff8f00',
            borderRadius: '8px',
            padding: '10px 20px',
            color: '#0f1111',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            width: '100%'
          }}>
          اشتر الآن
        </button>
      </div>
      
      {/* Additional Actions */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button 
          className="action-btn"
          style={{
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#0f1111',
            fontSize: '14px',
            cursor: 'pointer',
            flex: 1
          }}>
          ❤️ المفضلة
        </button>
        <button 
          className="action-btn"
          style={{
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#0f1111',
            fontSize: '14px',
            cursor: 'pointer',
            flex: 1
          }}>
          📤 مشاركة
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductText;
