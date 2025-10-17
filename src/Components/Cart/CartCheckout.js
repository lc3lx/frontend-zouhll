import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DeleteCartHook from "./../../hook/cart/delete-cart-hook";
import { ToastContainer, toast } from "react-toastify";
import ApplayCouponHook from "./../../hook/cart/applay-coupon-hook";
import notify from "./../../hook/useNotifaction";

const CartCheckout = ({
  totalCartPrice,
  cartItems,
  totalCartPriceAfterDiscount,
  couponNameRes,
}) => {
  const [handelDeleteCart] = DeleteCartHook();

  const [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout] =
    ApplayCouponHook(cartItems);

  useEffect(() => {
    if (couponNameRes) {
      onChangeCoupon(couponNameRes);
    }
  }, [couponNameRes]);

  return (
    <div>
      {/* كود الخصم */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            placeholder="كود الخصم"
            style={{
              flex: 1,
              padding: '8px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}
          />
          <button 
            onClick={handelSubmitCoupon}
            style={{
              background: '#007185',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            تطبيق
          </button>
        </div>
      </div>

      {/* المجموع */}
      <div style={{ 
        marginBottom: '15px',
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '4px',
        border: '1px solid #ddd'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.9rem' }}>المجموع الفرعي:</span>
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>${totalCartPrice.toFixed(2)}</span>
        </div>
        
        {totalCartPriceAfterDiscount >= 1 && totalCartPriceAfterDiscount !== totalCartPrice && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#007600' }}>الخصم:</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#007600' }}>
                -${(totalCartPrice - totalCartPriceAfterDiscount).toFixed(2)}
              </span>
            </div>
            <hr style={{ margin: '8px 0', border: '1px solid #ccc' }} />
          </>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '1rem', fontWeight: '700' }}>المجموع:</span>
          <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#B12704' }}>
            ${totalCartPriceAfterDiscount >= 1 && totalCartPriceAfterDiscount !== totalCartPrice
              ? totalCartPriceAfterDiscount.toFixed(2)
              : totalCartPrice.toFixed(2)
            }
          </span>
        </div>
      </div>

      {/* أزرار */}
      <div>
        <button
          onClick={handelCheckout}
          style={{
            background: '#ff9900',
            color: '#0f1111',
            border: 'none',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '10px'
          }}
        >
          إتمام الشراء
        </button>

        <button
          onClick={handelDeleteCart}
          style={{
            background: 'none',
            color: '#007185',
            border: 'none',
            padding: '8px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            width: '100%',
            textDecoration: 'underline'
          }}
        >
          مسح العربة
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;
