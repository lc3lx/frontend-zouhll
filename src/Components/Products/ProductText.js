import React, { useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { addProductToCart } from "../../redux/actions/cartAction";
import notify from "../../hook/useNotifaction";

const ProductText = ({
  selectedVariantIndex,
  setSelectedVariantIndex,
  selectedSize,
  setSelectedSize,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, images, cat, brand, store] = ViewProductsDetalisHook(id);
  const dispatch = useDispatch();
  const [indexColor, setIndexColor] = useState(null);

  const variants = useMemo(
    () => (Array.isArray(item?.variants) ? item.variants : []),
    [item]
  );
  const currentVariant = useMemo(
    () =>
      variants.length > 0 &&
      selectedVariantIndex !== null &&
      selectedVariantIndex !== undefined &&
      variants[selectedVariantIndex]
        ? variants[selectedVariantIndex]
        : null,
    [variants, selectedVariantIndex]
  );

  const currentPrice = useMemo(() => {
    if (currentVariant && typeof currentVariant.price === "number")
      return currentVariant.price;
    if (
      typeof item?.priceAfterDiscount === "number" &&
      item.priceAfterDiscount >= 1
    )
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
    const flatColors = Array.isArray(item?.colors)
      ? item.colors
      : Array.isArray(item?.availableColors)
      ? item.availableColors
      : [];
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
    const flatColors = Array.isArray(item?.colors)
      ? item.colors
      : Array.isArray(item?.availableColors)
      ? item.availableColors
      : [];
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
    <div style={{ padding: "0" }}>
      {/* Stock Status */}
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            fontSize: "14px",
            color:
              (selectedSize?.stock ?? item.quantity) > 0
                ? "#007600"
                : "#B12704",
            fontWeight: "500",
          }}
        >
          {(selectedSize?.stock ?? item.quantity) > 0
            ? "متوفر في المخزون"
            : "غير متوفر حالياً"}
        </span>
      </div>

      {/* Product Title & Rating */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          className="product-title"
          style={{
            fontSize: "24px",
            fontWeight: "400",
            color: "#0f1111",
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
        >
          {item.title}
        </h1>

        {/* Rating - Only show if ratings exist */}
        {(item.ratingsAverage || item.ratingsQuantity) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      i < Math.floor(item.ratingsAverage || 0)
                        ? "#ff9900"
                        : "#ddd",
                    fontSize: "14px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            {item.ratingsQuantity > 0 && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#007185",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {item.ratingsQuantity} تقييم
              </span>
            )}
          </div>
        )}

        {/* Brand and Store */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "12px",
            alignItems: "center",
          }}
        >
          {brand?.name && (
            <div style={{ fontSize: "14px", color: "#565959" }}>
              الماركة:{" "}
              <span style={{ color: "#007185", cursor: "pointer" }}>
                {brand.name}
              </span>
            </div>
          )}
          {store?.name && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#565959",
                padding: "6px 12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e7e7e7",
              }}
            >
              {store.logo && (
                <img
                  src={store.logo}
                  alt={store.name}
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
              )}
              <span>
                متجر:{" "}
                <span style={{ color: "#007185", fontWeight: "500" }}>
                  {store.name}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Price - Moved up for better visibility */}
        <div
          style={{
            marginBottom: "20px",
            padding: "16px",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e7e7e7",
          }}
        >
          {item.priceAfterDiscount >= 1 &&
          item.priceAfterDiscount < item.price ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                }}
              >
                <span
                  className="product-price"
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#B12704",
                  }}
                >
                  ${currentPrice}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "#565959",
                    textDecoration: "line-through",
                    fontWeight: "400",
                  }}
                >
                  ${item.price}
                </span>
                {(() => {
                  const discountPercent = Math.round(
                    ((item.price - currentPrice) / item.price) * 100
                  );
                  const savings = item.price - currentPrice;
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          background: "#cc0c39",
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontWeight: "600",
                        }}
                      >
                        خصم {discountPercent}%
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#007600",
                          fontWeight: "600",
                        }}
                      >
                        توفير ${savings.toFixed(2)}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </>
          ) : (
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
            >
              <span
                className="product-price"
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "#B12704",
                }}
              >
                ${currentPrice}
              </span>
            </div>
          )}

          {/* Free shipping notice - Only show if delivery info exists */}
          {(item.deliveryTime || item.deliveryDays) && (
            <div
              style={{
                fontSize: "14px",
                color: "#007600",
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "500",
              }}
            >
              <span>✓</span>
              <span>
                {item.deliveryTime ||
                  (item.deliveryDays
                    ? `مدة التوصيل: ${item.deliveryDays} يوم`
                    : "شحن مجاني للطلبات أكثر من $50")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Colors & Sizes */}
      <div style={{ marginBottom: "20px" }}>
        {(variants.length > 0 ||
          (item.availableColors && item.availableColors.length > 0)) && (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f1111",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>اللون:</span>
              {selectedVariantIndex !== null &&
                variants[selectedVariantIndex]?.color?.name && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#565959",
                      fontWeight: "400",
                    }}
                  >
                    ({variants[selectedVariantIndex].color.name})
                  </span>
                )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {variants.length > 0
                ? variants.map((v, index) => {
                    const isSelected = selectedVariantIndex === index;
                    const colorName = v?.color?.name || "";
                    const colorHex = v?.color?.hex || "#e2e8f0";
                    return (
                      <div
                        key={index}
                        title={colorName || `اللون ${index + 1}`}
                        onClick={() => onSelectVariant(index)}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: colorHex,
                          border: isSelected
                            ? "3px solid #ff9900"
                            : "2px solid #ddd",
                          cursor: "pointer",
                          position: "relative",
                          boxShadow: isSelected
                            ? "0 2px 8px rgba(255, 153, 0, 0.3)"
                            : "0 1px 3px rgba(0,0,0,0.1)",
                          transition: "all 0.2s ease",
                        }}
                        className={`color-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 12px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                              "0 1px 3px rgba(0,0,0,0.1)";
                          }
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "bold",
                              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })
                : (Array.isArray(item?.colors)
                    ? item.colors
                    : item.availableColors || []
                  ).map((color, index) => {
                    const isSelected = indexColor === index;
                    return (
                      <div
                        key={index}
                        title={`اللون ${index + 1}`}
                        onClick={() => setIndexColor(index)}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: isSelected
                            ? "3px solid #ff9900"
                            : "2px solid #ddd",
                          cursor: "pointer",
                          position: "relative",
                          boxShadow: isSelected
                            ? "0 2px 8px rgba(255, 153, 0, 0.3)"
                            : "0 1px 3px rgba(0,0,0,0.1)",
                          transition: "all 0.2s ease",
                        }}
                        className={`color-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 12px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                              "0 1px 3px rgba(0,0,0,0.1)";
                          }
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "bold",
                              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
        )}

        {/* Sizes for selected variant */}
        {currentVariant?.sizes && currentVariant.sizes.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f1111",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>المقاس:</span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#007185",
                  cursor: "pointer",
                  fontWeight: "400",
                }}
              >
                دليل المقاسات
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                gap: "10px",
              }}
            >
              {currentVariant.sizes.map((s, i) => {
                const isSelected = selectedSize?.label === s.label;
                const isOutOfStock =
                  typeof s.stock === "number" && s.stock <= 0;
                const isLowStock =
                  typeof s.stock === "number" && s.stock > 0 && s.stock <= 5;
                return (
                  <button
                    key={i}
                    onClick={() => !isOutOfStock && onSelectSize(s)}
                    disabled={isOutOfStock}
                    className="size-option"
                    title={
                      isOutOfStock
                        ? "غير متوفر"
                        : isLowStock
                        ? `متوفر ${s.stock} فقط`
                        : `متوفر ${s.stock}`
                    }
                    style={{
                      padding: "10px 8px",
                      border: isSelected
                        ? "2px solid #ff9900"
                        : "1px solid #ddd",
                      background: isSelected
                        ? "#fff3cd"
                        : isOutOfStock
                        ? "#f5f5f5"
                        : isLowStock
                        ? "#fff8e1"
                        : "#fff",
                      color: isOutOfStock ? "#999" : "#0f1111",
                      borderRadius: "6px",
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      opacity: isOutOfStock ? 0.5 : 1,
                      fontSize: "14px",
                      fontWeight: isSelected ? "600" : "400",
                      position: "relative",
                      transition: "all 0.2s ease",
                      minHeight: "44px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOutOfStock && !isSelected) {
                        e.currentTarget.style.borderColor = "#ff9900";
                        e.currentTarget.style.background = "#fff8e1";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#ddd";
                        e.currentTarget.style.background = isOutOfStock
                          ? "#f5f5f5"
                          : isLowStock
                          ? "#fff8e1"
                          : "#fff";
                      }
                    }}
                  >
                    <span>{s.label}</span>
                    {isLowStock && !isOutOfStock && (
                      <span style={{ fontSize: "10px", color: "#ff6f00" }}>
                        قليل
                      </span>
                    )}
                    {isOutOfStock && (
                      <span style={{ fontSize: "10px", color: "#999" }}>
                        نفذ
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedSize && (
              <div
                style={{
                  fontSize: "13px",
                  color:
                    selectedSize.stock > 5
                      ? "#007600"
                      : selectedSize.stock > 0
                      ? "#ff6f00"
                      : "#B12704",
                  marginTop: "8px",
                  fontWeight: "500",
                }}
              >
                {selectedSize.stock > 5
                  ? `✓ متوفر (${selectedSize.stock} قطعة متبقية)`
                  : selectedSize.stock > 0
                  ? `⚠ متبقي ${selectedSize.stock} قطعة فقط`
                  : "غير متوفر"}
              </div>
            )}
          </div>
        )}

        {(!currentVariant?.sizes || currentVariant.sizes.length === 0) &&
          item?.quantity !== undefined &&
          item?.quantity !== null && (
            <div
              style={{
                fontSize: "14px",
                color: "#565959",
                marginBottom: "16px",
                padding: "12px",
                background: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <span style={{ fontWeight: "500" }}>الكمية المتاحة: </span>
              <span style={{ color: "#007600", fontWeight: "600" }}>
                {selectedSize?.stock ?? item.quantity} قطعة
              </span>
            </div>
          )}
      </div>

      {/* Add to Cart */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={onAddToCart}
          className="add-to-cart-btn"
          style={{
            background: "#ff9900",
            border: "1px solid #e47911",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "#0f1111",
            fontSize: "14px",
            fontWeight: "400",
            cursor: "pointer",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          أضف إلى السلة
        </button>

        <button
          onClick={onBuyNow}
          className="buy-now-btn"
          style={{
            background: "#ffa41c",
            border: "1px solid #ff8f00",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "#0f1111",
            fontSize: "14px",
            fontWeight: "400",
            cursor: "pointer",
            width: "100%",
          }}
        >
          اشتر الآن
        </button>
      </div>

      {/* Additional Actions */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <button
          className="action-btn"
          style={{
            background: "transparent",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#0f1111",
            fontSize: "14px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          ❤️ المفضلة
        </button>
        <button
          className="action-btn"
          style={{
            background: "transparent",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#0f1111",
            fontSize: "14px",
            cursor: "pointer",
            flex: 1,
          }}
        >
          📤 مشاركة
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductText;
