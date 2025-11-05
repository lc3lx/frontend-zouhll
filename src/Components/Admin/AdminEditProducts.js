import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import add from "../../images/add.png";
import MultiImageInput from "react-multiple-image-input";

import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import AdminEditProductsHook from "./../../hook/products/edit-products-hook";

const AdminEditProducts = ({ productId }) => {
  const [
    CatID,
    BrandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    onChangeProductUrl,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    productUrl,
    // variants controls
    variants,
    addVariant,
    removeVariant,
    setVariantField,
    setVariantImages,
    addVariantSize,
    removeVariantSize,
    // New fields
    season,
    fabricType,
    deliveryTime,
    currency,
    sizes,
    onChangeSeason,
    onChangeFabricType,
    onChangeDeliveryTime,
    onChangeCurrency,
    addSize,
    removeSize,
    secondaryCatID,
    onSelectSecondary,
    onRemoveSecondary,
    secondaryOptions,
  ] = AdminEditProductsHook(productId);

  // State for new size inputs
  const [newSizeLabel, setNewSizeLabel] = useState("");
  const [newSizeStock, setNewSizeStock] = useState("");

  // تحويل الصور من array إلى object للتوافق مع MultiImageInput
  const convertImagesToObject = (imageArray) => {
    if (!Array.isArray(imageArray)) return {};
    const imageObj = {};
    imageArray.forEach((img, index) => {
      imageObj[index] = img;
    });
    return imageObj;
  };

  // تحويل الصور من object إلى array
  const convertImagesToArray = (imageObj) => {
    if (!imageObj || typeof imageObj !== "object") return [];
    return Object.values(imageObj);
  };

  // إضافة حالة التحميل
  if (!prodName && !prodDescription) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#666",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
        <div
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
        >
          جاري تحميل بيانات المنتج...
        </div>
        <div style={{ fontSize: "14px", color: "#999" }}>يرجى الانتظار</div>
      </div>
    );
  }

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">تعديل المنتج - {prodName}</div>
        <Col sm="8">
          <div className="text-form pb-2">صور للمنتج</div>

          <MultiImageInput
            images={convertImagesToObject(images)}
            setImages={(imageObj) => setImages(convertImagesToArray(imageObj))}
            theme={"light"}
            allowCrop={false}
            max={4}
          />

          <input
            value={prodName}
            onChange={onChangeProdName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
            value={prodDescription}
            onChange={onChangeDesName}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم (بالدولار)"
            value={priceBefore || ""}
            onChange={onChangePriceBefor}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر بعد الخصم (بالدولار)"
            value={priceAftr || ""}
            onChange={onChangePriceAfter}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة"
            value={qty || ""}
            onChange={onChangeQty}
          />
          <input
            type="url"
            className="input-form d-block mt-3 px-3"
            placeholder="رابط المنتج (للطلب من المتجر الخارجي)"
            value={productUrl}
            onChange={onChangeProductUrl}
          />

          {/* New fields */}
          <select
            name="season"
            value={season}
            onChange={onChangeSeason}
            className="select input-form-area mt-3 px-2"
          >
            <option value="">اختر الفصل (اختياري)</option>
            <option value="summer">صيف</option>
            <option value="autumn">خريف</option>
            <option value="spring">ربيع</option>
            <option value="winter">شتاء</option>
          </select>

          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="نوع القماش (اختياري)"
            value={fabricType}
            onChange={onChangeFabricType}
          />

          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="مدة التوصيل (اختياري)"
            value={deliveryTime}
            onChange={onChangeDeliveryTime}
          />

          <select
            name="currency"
            value={currency}
            onChange={onChangeCurrency}
            className="select input-form-area mt-3 px-2"
          >
            <option value="USD">دولار أمريكي (USD)</option>
            <option value="SYP">ليرة سورية (SYP)</option>
          </select>

          <select
            name="cat"
            value={CatID}
            onChange={onSeletCategory}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">التصنيف الرئيسي</option>
            {category && category.data
              ? category.data.map((item, index) => {
                  return (
                    <option key={item._id || index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />
          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الثانوي"
            options={secondaryOptions}
            selectedValues={secondaryCatID}
            onSelect={onSelectSecondary}
            onRemove={onRemoveSecondary}
            displayValue="name"
            style={{ color: "red" }}
          />
          <select
            name="brand"
            value={BrandID}
            onChange={onSeletBrand}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر ماركة</option>
            {brand && brand.data
              ? brand.data.map((item, index) => {
                  return (
                    <option key={item._id || index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="text-form mt-3">الألوان المتاحة للمنتج</div>
          <div className="mt-1 d-flex">
            {colors && colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="color ms-2 border mt-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })
              : null}

            <img
              onClick={onChangeColor}
              src={add}
              alt=""
              width="30px"
              height="35px"
              style={{ cursor: "pointer" }}
            />
            {showColor === true ? (
              <CompactPicker onChangeComplete={handelChangeComplete} />
            ) : null}
          </div>

          {/* Sizes Management for products without variants */}
          <div className="text-form mt-3">
            القياسات (للمنتجات بدون ألوان متعددة)
          </div>
          <div className="mt-2">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <input
                type="text"
                className="input-form d-block px-3"
                placeholder="قياس (مثل S أو 38)"
                value={newSizeLabel || ""}
                onChange={(e) => setNewSizeLabel(e.target.value)}
              />
              <input
                type="number"
                className="input-form d-block px-3"
                placeholder="المخزون"
                value={newSizeStock || ""}
                onChange={(e) => setNewSizeStock(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={() => {
                  addSize(newSizeLabel, newSizeStock);
                  setNewSizeLabel("");
                  setNewSizeStock("");
                }}
              >
                إضافة قياس
              </button>
            </div>
            {sizes && sizes.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <span key={i} className="badge bg-light text-dark border">
                    {s.label} - {Number(s.stock) || 0}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => removeSize(i)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Variants Builder */}
          <div className="text-form mt-4">
            {" "}
            متغيرات المنتج (ألوان/صور/قياسات)
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={addVariant}
              className="btn btn-outline-primary"
            >
              إضافة لون/متغير
            </button>
            {Array.isArray(variants) && variants.length > 0 && (
              <div className="mt-3">
                {variants.map((v, i) => (
                  <div key={i} className="border rounded p-3 my-3">
                    <div className="d-flex flex-column gap-2">
                      <div>
                        <label
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          اللون
                        </label>

                        {/* لوحة الألوان المحددة مسبقاً */}
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#999",
                              marginBottom: "6px",
                            }}
                          >
                            اختر من الألوان الشائعة:
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                              padding: "12px",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              backgroundColor: "#f8f9fa",
                              maxHeight: "200px",
                              overflowY: "auto",
                              justifyContent: "flex-start",
                            }}
                          >
                            {[
                              // الألوان الأساسية
                              "#000000",
                              "#FFFFFF",
                              "#FF0000",
                              "#00FF00",
                              "#0000FF",
                              "#FFFF00",
                              "#FF00FF",
                              "#00FFFF",
                              "#FFA500",
                              "#800080",
                              // ألوان إضافية
                              "#FFC0CB",
                              "#A52A2A",
                              "#808080",
                              "#008000",
                              "#000080",
                              "#FFD700",
                              "#FF6347",
                              "#40E0D0",
                              "#EE82EE",
                              "#90EE90",
                              "#FF4500",
                              "#FF1493",
                              "#00CED1",
                              "#FF69B4",
                              "#32CD32",
                              "#8B4513",
                              "#FF8C00",
                              "#2E8B57",
                              "#4169E1",
                              "#DC143C",
                              // ألوان إضافية أكثر
                              "#C0C0C0",
                              "#FFD700",
                              "#FF1493",
                              "#00CED1",
                              "#FF69B4",
                              "#8A2BE2",
                              "#A0522D",
                              "#CD5C5C",
                              "#4B0082",
                              "#32CD32",
                              "#FF7F50",
                              "#6495ED",
                              "#DC143C",
                              "#00FA9A",
                              "#FF00FF",
                              "#B8860B",
                              "#008B8B",
                              "#556B2F",
                              "#8B008B",
                              "#9932CC",
                            ].map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  setVariantField(i, "colorHex", color)
                                }
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  minWidth: "36px",
                                  minHeight: "36px",
                                  backgroundColor: color,
                                  border:
                                    v.colorHex === color
                                      ? "3px solid #007bff"
                                      : "2px solid #ddd",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  padding: 0,
                                  boxShadow:
                                    v.colorHex === color
                                      ? "0 0 0 3px rgba(0,123,255,0.3)"
                                      : "0 1px 3px rgba(0,0,0,0.1)",
                                  transition: "all 0.2s",
                                  flexShrink: 0,
                                }}
                                title={color}
                                onMouseEnter={(e) => {
                                  if (v.colorHex !== color) {
                                    e.target.style.transform = "scale(1.1)";
                                    e.target.style.boxShadow =
                                      "0 2px 8px rgba(0,0,0,0.2)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (v.colorHex !== color) {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.boxShadow = "none";
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Color Picker + Preview */}
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <label
                              style={{
                                fontSize: "11px",
                                color: "#666",
                                whiteSpace: "nowrap",
                              }}
                            >
                              أو اختر لون مخصص:
                            </label>
                            <input
                              type="color"
                              value={v.colorHex || "#000000"}
                              onChange={(e) =>
                                setVariantField(i, "colorHex", e.target.value)
                              }
                              style={{
                                width: "50px",
                                height: "40px",
                                cursor: "pointer",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                padding: "2px",
                              }}
                            />
                          </div>

                          {/* عرض اللون المختار */}
                          {v.colorHex && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 12px",
                                backgroundColor: "#f8f9fa",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                              }}
                            >
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  backgroundColor: v.colorHex,
                                  border: "2px solid #ddd",
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#666",
                                  fontFamily: "monospace",
                                  fontWeight: "500",
                                }}
                              >
                                {v.colorHex.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <input
                        type="number"
                        className="input-form d-block px-3"
                        placeholder="سعر هذا المتغير (اختياري)"
                        value={v.price || ""}
                        onChange={(e) =>
                          setVariantField(i, "price", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="input-form d-block px-3"
                        placeholder="SKU (اختياري)"
                        value={v.sku || ""}
                        onChange={(e) =>
                          setVariantField(i, "sku", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        حذف
                      </button>
                    </div>

                    <div className="text-form pb-2 mt-3"> صور هذا اللون</div>
                    <MultiImageInput
                      images={v.images || {}}
                      setImages={(imgs) => setVariantImages(i, imgs)}
                      theme={"light"}
                      allowCrop={false}
                      max={5}
                    />

                    <div className="mt-3">
                      <div className="d-flex flex-wrap gap-2 align-items-center">
                        <input
                          type="text"
                          className="input-form d-block px-3"
                          placeholder="قياس (مثل S أو 38)"
                          value={v.newSizeLabel || ""}
                          onChange={(e) =>
                            setVariantField(i, "newSizeLabel", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          className="input-form d-block px-3"
                          placeholder="المخزون"
                          value={v.newSizeStock || ""}
                          onChange={(e) =>
                            setVariantField(i, "newSizeStock", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          onClick={() => {
                            addVariantSize(i, v.newSizeLabel, v.newSizeStock);
                            setVariantField(i, "newSizeLabel", "");
                            setVariantField(i, "newSizeStock", "");
                          }}
                        >
                          إضافة قياس
                        </button>
                      </div>
                      {v.sizes && v.sizes.length > 0 && (
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {v.sizes.map((s, si) => (
                            <span
                              key={si}
                              className="badge bg-light text-dark border"
                            >
                              {s.label} - {Number(s.stock) || 0}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => removeVariantSize(i, si)}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminEditProducts;
