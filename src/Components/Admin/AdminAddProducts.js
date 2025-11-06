import React from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import MultiImageInput from "react-multiple-image-input";

import { ToastContainer } from "react-toastify";
import AdminAddProductsHook from "./../../hook/products/add-products-hook";

const AdminAddProducts = () => {
  const [
    onChangeDesName,
    onChangeQty,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    onChangeProductUrl,
    category,
    brand,
    store,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    onSeletStore,
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
    deliveryStartDate,
    deliveryEndDate,
    deliveryDays,
    currency,
    sizes,
    onChangeSeason,
    onChangeFabricType,
    onChangeDeliveryStartDate,
    onChangeDeliveryEndDate,
    onChangeDeliveryDays,
    onChangeCurrency,
    addSize,
    removeSize,
    // Secondary categories
    secondaryCatID,
    onSelectSecondary,
    onRemoveSecondary,
    secondaryOptions,
    // Cover image
    imageCover,
    setImageCover,
  ] = AdminAddProductsHook();

  return (
    <div
      className="admin-add-products-container"
      style={{ backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}
    >
      <Row className="justify-content-start g-3">
        <div className="admin-content-text pb-4 admin-page-title-responsive">
          {" "}
          اضافه منتج جديد
        </div>
        <Col xs="12" sm="12" md="12" lg="8">
          <div
            style={{
              padding: "16px",
              background: "#fff9e6",
              borderRadius: "8px",
              border: "1px solid #ff9900",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f1111",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>💡</span>
              <span>ملاحظة مهمة</span>
            </div>
            <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
              يجب إضافة صور مرتبطة بألوان فقط. أول لون يتم إضافته هو اللون
              الافتراضي الذي سيتم عرضه للمنتج.
              <br />
              <strong>يجب إضافة لون واحد على الأقل مع صوره.</strong>
            </div>
          </div>

          <input
            value={prodName}
            onChange={onChangeProdName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
          />
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              className="input-form-area p-2 mt-3"
              rows="6"
              cols="50"
              placeholder="وصف المنتج - اكتب وصفاً مفصلاً للمنتج يتضمن المميزات والفوائد..."
              value={prodDescription}
              onChange={onChangeDesName}
              style={{
                width: "100%",
                minHeight: "120px",
                resize: "vertical",
              }}
              maxLength={2000}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              <span>{prodDescription.length} / 2000 حرف</span>
              <span
                style={{
                  color: prodDescription.length >= 100 ? "#007600" : "#ff6f00",
                  fontWeight: "500",
                }}
              >
                {prodDescription.length >= 100
                  ? "✓ جيد"
                  : "⚠ يجب أن يكون الوصف على الأقل 100 حرف"}
              </span>
            </div>

            {/* SEO Helper */}
            <div
              style={{
                background: "#f8f9fa",
                border: "1px solid #e7e7e7",
                borderRadius: "6px",
                padding: "12px",
                marginTop: "12px",
                fontSize: "13px",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  color: "#0f1111",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>💡</span>
                <span>نصائح لكتابة وصف محسّن للبحث (SEO)</span>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingRight: "20px",
                  color: "#565959",
                  lineHeight: "1.6",
                }}
              >
                <li>ابدأ بذكر الفوائد الرئيسية للمنتج</li>
                <li>استخدم كلمات مفتاحية طبيعية ومرتبطة بالمنتج</li>
                <li>اذكر المواصفات والتفاصيل المهمة</li>
                <li>أضف معلومات عن الاستخدام والفوائد</li>
                <li>استخدم عناوين فرعية وبنقاط منظمة</li>
                <li>الحد الأدنى: 100 حرف، الموصى به: 200-500 حرف</li>
              </ul>
            </div>
          </div>
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
            value={priceBefore}
            onChange={onChangePriceBefor}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر بعد الخصم"
            value={priceAftr}
            onChange={onChangePriceAfter}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة (اختياري)"
            value={qty}
            onChange={onChangeQty}
          />
          <input
            type="url"
            className="input-form d-block mt-3 px-3"
            placeholder="رابط المنتج (للطلب من المتجر الخارجي)"
            value={productUrl}
            onChange={onChangeProductUrl}
          />

          {/* Cover Image - Separate field */}
          <div className="mt-3">
            <label className="text-form pb-2" style={{ display: "block" }}>
              صورة الغلاف للمنتج <span style={{ color: "red" }}>*</span>
            </label>
            <div
              style={{
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                background: "#f9f9f9",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#007bff";
                e.currentTarget.style.background = "#f0f8ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.background = "#f9f9f9";
              }}
            >
              {imageCover ? (
                <div>
                  <img
                    src={
                      typeof imageCover === "string"
                        ? imageCover
                        : URL.createObjectURL(imageCover)
                    }
                    alt="Cover"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <div>
                    <button
                      type="button"
                      onClick={() => setImageCover(null)}
                      className="btn btn-sm btn-danger"
                      style={{ marginRight: "10px" }}
                    >
                      حذف الصورة
                    </button>
                    <label
                      className="btn btn-sm btn-primary"
                      style={{ cursor: "pointer" }}
                    >
                      تغيير الصورة
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImageCover(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                    📷
                  </div>
                  <div style={{ color: "#666", marginBottom: "10px" }}>
                    اضغط لرفع صورة الغلاف
                  </div>
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    PNG, JPG, GIF حتى 5MB
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert("حجم الصورة يجب أن يكون أقل من 5MB");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageCover(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

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

          <div className="mt-3">
            <label className="text-form pb-2">مدة التوصيل</label>
            <div className="row g-2">
              <div className="col-md-4">
                <label style={{ fontSize: "12px", color: "#666" }}>
                  من تاريخ
                </label>
                <input
                  type="date"
                  className="input-form d-block px-3"
                  value={deliveryStartDate || ""}
                  onChange={onChangeDeliveryStartDate}
                />
              </div>
              <div className="col-md-4">
                <label style={{ fontSize: "12px", color: "#666" }}>
                  إلى تاريخ
                </label>
                <input
                  type="date"
                  className="input-form d-block px-3"
                  value={deliveryEndDate || ""}
                  onChange={onChangeDeliveryEndDate}
                />
              </div>
              <div className="col-md-4">
                <label style={{ fontSize: "12px", color: "#666" }}>
                  عدد الأيام (للعروض)
                </label>
                <input
                  type="number"
                  className="input-form d-block px-3"
                  placeholder="عدد الأيام"
                  value={deliveryDays || ""}
                  onChange={onChangeDeliveryDays}
                  min="0"
                />
              </div>
            </div>
            {deliveryDays > 0 && (
              <div
                className="mt-2"
                style={{
                  fontSize: "13px",
                  color: "#007600",
                  fontWeight: "500",
                }}
              >
                مدة التوصيل: {deliveryDays} يوم
              </div>
            )}
          </div>

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
            onChange={onSeletCategory}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">التصنيف الرئيسي</option>
            {category.data
              ? category.data.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={Array.isArray(options) ? options : []}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />
          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الثانوي"
            options={Array.isArray(secondaryOptions) ? secondaryOptions : []}
            selectedValues={Array.isArray(secondaryCatID) ? secondaryCatID : []}
            onSelect={onSelectSecondary}
            onRemove={onRemoveSecondary}
            displayValue="name"
          />
          <select
            name="brand"
            onChange={onSeletBrand}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر ماركة (اختياري)</option>
            {brand.data
              ? brand.data.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
          <select
            name="store"
            onChange={onSeletStore}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر متجر (اختياري)</option>
            {store.data
              ? store.data.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          {/* Sizes without colors */}
          <div className="text-form mt-4">المقاسات (للمنتجات بدون ألوان)</div>
          <div className="mt-2">
            <div className="d-flex gap-2 align-items-end">
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="input-form d-block px-3"
                  placeholder="قياس (مثل S, M, L)"
                  id="newSizeLabel"
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="number"
                  className="input-form d-block px-3"
                  placeholder="المخزون"
                  id="newSizeStock"
                  min="0"
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => {
                  const label = document.getElementById("newSizeLabel").value;
                  const stock = document.getElementById("newSizeStock").value;
                  if (label) {
                    addSize(label, stock);
                    document.getElementById("newSizeLabel").value = "";
                    document.getElementById("newSizeStock").value = "";
                  }
                }}
              >
                إضافة
              </button>
            </div>
            {sizes && sizes.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <span
                    key={i}
                    className="badge bg-light text-dark border d-flex align-items-center gap-2"
                    style={{ fontSize: "13px", padding: "8px 12px" }}
                  >
                    <strong>{s.label}</strong>
                    <span style={{ color: "#666" }}>
                      المخزون: {Number(s.stock) || 0}
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      style={{ fontSize: "8px" }}
                      onClick={() => removeSize(i)}
                    ></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Variants Builder */}
          <div
            className="text-form mt-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>متغيرات المنتج (ألوان/صور/قياسات)</span>
            {variants && variants.length > 0 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#666",
                  fontWeight: "normal",
                }}
              >
                (أول لون هو الافتراضي)
              </span>
            )}
          </div>

          {/* Variants Helper Guide */}
          <div
            style={{
              background: "#e3f2fd",
              border: "1px solid #90caf9",
              borderRadius: "6px",
              padding: "12px",
              marginTop: "12px",
              marginBottom: "16px",
              fontSize: "13px",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#1565c0",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>📋</span>
              <span>دليل إضافة المتغيرات (الألوان والمقاسات)</span>
            </div>
            <ul
              style={{
                margin: 0,
                paddingRight: "20px",
                color: "#424242",
                lineHeight: "1.6",
              }}
            >
              <li>
                المتغيرات تسمح لك بإضافة ألوان مختلفة مع صور ومقاسات خاصة لكل
                لون
              </li>
              <li>لكل لون يمكنك إضافة صور مختلفة ومقاسات مختلفة مع المخزون</li>
              <li>
                إذا كان المنتج له لون واحد فقط، استخدم قسم "المقاسات" السابق
              </li>
              <li>يمكنك إضافة سعر مختلف لكل متغير (اختياري)</li>
              <li>يمكنك إضافة SKU خاص بكل متغير لتسهيل إدارة المخزون</li>
            </ul>
          </div>

          <div className="mt-2">
            <button
              type="button"
              onClick={addVariant}
              className="btn btn-outline-primary"
              style={{
                fontWeight: "500",
                padding: "8px 16px",
              }}
            >
              + إضافة لون/متغير
            </button>
            {Array.isArray(variants) && variants.length > 0 && (
              <div className="mt-3">
                {variants.map((v, i) => {
                  const isDefault = i === 0;
                  return (
                    <div
                      key={i}
                      className="border rounded p-3 my-3"
                      style={{
                        backgroundColor: isDefault ? "#fff9e6" : "#fafafa",
                        border: isDefault
                          ? "2px solid #ff9900"
                          : "1px solid #ddd",
                        position: "relative",
                      }}
                    >
                      {isDefault && (
                        <div
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                            background: "#ff9900",
                            color: "#fff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          افتراضي
                        </div>
                      )}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6
                          className="mb-0"
                          style={{ color: isDefault ? "#ff9900" : "#1565c0" }}
                        >
                          {isDefault ? "اللون الافتراضي" : `لون ${i + 1}`}
                        </h6>
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          حذف
                        </button>
                      </div>

                      <div className="row g-2 mb-3">
                        <div className="col-md-12">
                          <label
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              marginBottom: "8px",
                              display: "block",
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
                      </div>

                      {/* السعر و SKU في صف منفصل */}
                      <div className="row g-2 mb-3">
                        <div className="col-md-6">
                          <label style={{ fontSize: "12px", color: "#666" }}>
                            السعر (اختياري)
                          </label>
                          <input
                            type="number"
                            className="input-form d-block px-3"
                            placeholder="السعر"
                            value={v.price || ""}
                            onChange={(e) =>
                              setVariantField(i, "price", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: "12px", color: "#666" }}>
                            SKU (اختياري)
                          </label>
                          <input
                            type="text"
                            className="input-form d-block px-3"
                            placeholder="SKU"
                            value={v.sku || ""}
                            onChange={(e) =>
                              setVariantField(i, "sku", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="text-form pb-2 mt-3">
                        صور هذا اللون (حتى 10 صور)
                      </div>
                      <MultiImageInput
                        images={v.images || {}}
                        setImages={(imgs) => setVariantImages(i, imgs)}
                        theme={"light"}
                        allowCrop={false}
                        max={10}
                      />

                      <div className="mt-3">
                        <label className="text-form pb-2">
                          المقاسات والمخزون
                        </label>
                        <div className="d-flex gap-2 align-items-end">
                          <div style={{ flex: 1 }}>
                            <input
                              type="text"
                              className="input-form d-block px-3"
                              placeholder="قياس (مثل S, M, L)"
                              value={v.newSizeLabel || ""}
                              onChange={(e) =>
                                setVariantField(
                                  i,
                                  "newSizeLabel",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="number"
                              className="input-form d-block px-3"
                              placeholder="المخزون"
                              value={v.newSizeStock || ""}
                              onChange={(e) =>
                                setVariantField(
                                  i,
                                  "newSizeStock",
                                  e.target.value
                                )
                              }
                              min="0"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              if (v.newSizeLabel) {
                                addVariantSize(
                                  i,
                                  v.newSizeLabel,
                                  v.newSizeStock
                                );
                                setVariantField(i, "newSizeLabel", "");
                                setVariantField(i, "newSizeStock", "");
                              }
                            }}
                          >
                            إضافة
                          </button>
                        </div>
                        {v.sizes && v.sizes.length > 0 && (
                          <div className="mt-2 d-flex flex-wrap gap-2">
                            {v.sizes.map((s, si) => (
                              <span
                                key={si}
                                className="badge bg-light text-dark border d-flex align-items-center gap-2"
                                style={{
                                  fontSize: "13px",
                                  padding: "8px 12px",
                                }}
                              >
                                <strong>{s.label}</strong>
                                <span style={{ color: "#666" }}>
                                  المخزون: {Number(s.stock) || 0}
                                </span>
                                <button
                                  type="button"
                                  className="btn-close"
                                  style={{ fontSize: "8px" }}
                                  onClick={() => removeVariantSize(i, si)}
                                ></button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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

export default AdminAddProducts;
