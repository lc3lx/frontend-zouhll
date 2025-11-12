import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import MultiImageInput from "react-multiple-image-input";

import { ToastContainer } from "react-toastify";
import AdminEditProductsHook from "./../../hook/products/edit-products-hook";

const AdminEditProducts = ({ productId }) => {
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
    onChangeSeason,
    onChangeFabricType,
    onChangeDeliveryStartDate,
    onChangeDeliveryEndDate,
    onChangeDeliveryDays,
    onChangeCurrency,
    // Secondary categories
    secondaryCatID,
    onSelectSecondary,
    onRemoveSecondary,
    secondaryOptions,
    // Cover image
    imageCover,
    setImageCover,
    seletedSubID, // إضافة seletedSubID للعرض في Multiselect
    // IDs for selects
    CatID,
    BrandID,
    StoreID,
    // Main category Multiselect
    selectedMainCategory,
    onSelectMainCategory,
    onRemoveMainCategory,
    // Sizes
    availableSizes,
    addVariantSizeFromList,
    addAllAvailableSizes,
    // Colors
    availableColors,
    addVariantFromColor,
  ] = AdminEditProductsHook(productId);

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
                        : imageCover instanceof File ||
                          imageCover instanceof Blob
                        ? URL.createObjectURL(imageCover)
                        : imageCover
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

          {(() => {
            const categoryOptions =
              category && category.data && Array.isArray(category.data)
                ? category.data
                : [];
            const selectedValues = Array.isArray(selectedMainCategory)
              ? selectedMainCategory
              : [];

            console.log("=== Main Category Multiselect Debug ===");
            console.log("Category options count:", categoryOptions.length);
            console.log(
              "Category options:",
              categoryOptions.map((c) => ({ id: c._id, name: c.name }))
            );
            console.log("Selected main category:", selectedValues);
            console.log("CatID:", CatID);

            return (
              <Multiselect
                className="mt-3 text-end"
                placeholder="التصنيف الرئيسي"
                singleSelect
                options={categoryOptions}
                selectedValues={selectedValues}
                onSelect={onSelectMainCategory}
                onRemove={onRemoveMainCategory}
                displayValue="name"
                style={{ color: "red" }}
              />
            );
          })()}

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={Array.isArray(options) ? options : []}
            selectedValues={Array.isArray(seletedSubID) ? seletedSubID : []}
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
            style={{ color: "red" }}
          />
          <select
            name="brand"
            value={BrandID || "0"}
            onChange={onSeletBrand}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر ماركة (اختياري)</option>
            {brand && brand.data && Array.isArray(brand.data)
              ? brand.data.map((item, index) => {
                  return (
                    <option key={item._id || index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
          <select
            name="store"
            value={StoreID || "0"}
            onChange={onSeletStore}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر متجر (اختياري)</option>
            {store && store.data && Array.isArray(store.data)
              ? store.data.map((item, index) => {
                  return (
                    <option key={item._id || index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          {/* Variants Builder */}
          <div className="text-form mt-4">
            {" "}
            متغيرات المنتج (ألوان/صور/قياسات)
          </div>
          <div className="mt-2">
            {/* إضافة من القائمة الجاهزة */}
            {availableColors && availableColors.length > 0 && (
              <div
                className="mb-3 p-2"
                style={{ background: "#e3f2fd", borderRadius: "4px" }}
              >
                <small className="text-muted d-block mb-2">
                  الألوان الجاهزة للتصنيف المحدد:
                </small>
                <div className="d-flex gap-2 align-items-end flex-wrap">
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <select
                      className="input-form d-block px-3"
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          addVariantFromColor(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    >
                      <option value="">اختر لون من القائمة</option>
                      {availableColors
                        .filter(
                          (color) =>
                            !variants.some((v) => v.colorId === color._id)
                        )
                        .map((color) => (
                          <option key={color._id} value={color._id}>
                            {color.name} ({color.hex})
                          </option>
                        ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    disabled={true}
                    style={{ opacity: 0.6 }}
                  >
                    سيتم الإضافة تلقائياً
                  </button>
                </div>
              </div>
            )}

            {/* إضافة يدوي */}
            <div className="mb-2">
              <small className="text-muted d-block mb-2">
                أو أضف لون يدوي:
              </small>
              <button
                type="button"
                onClick={addVariant}
                className="btn btn-outline-primary"
              >
                + إضافة لون/متغير يدوي
              </button>
            </div>
            {Array.isArray(variants) && variants.length > 0 && (
              <div className="mt-3">
                {variants.map((v, i) => {
                  const isDefault = i === 0;
                  return (
                    <div key={i} className="border rounded p-3 my-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">
                          {isDefault ? "اللون الافتراضي" : `لون ${i + 1}`}
                          {v.colorName && (
                            <span
                              className="ms-2"
                              style={{ fontSize: "14px", fontWeight: "normal" }}
                            >
                              ({v.colorName})
                            </span>
                          )}
                        </h6>
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          حذف
                        </button>
                      </div>
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
                                // ألوان إضافية أكثر (بدون تكرار)
                                "#C0C0C0",
                                "#8A2BE2",
                                "#A0522D",
                                "#CD5C5C",
                                "#4B0082",
                                "#FF7F50",
                                "#6495ED",
                                "#00FA9A",
                                "#B8860B",
                                "#008B8B",
                                "#556B2F",
                                "#8B008B",
                                "#9932CC",
                              ].map((color, colorIndex) => (
                                <button
                                  key={`${i}-color-${colorIndex}-${color}`}
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
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="text-form pb-2">
                            المقاسات والمخزون
                          </label>
                          {availableSizes && availableSizes.length > 0 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => addAllAvailableSizes(i)}
                              title="إضافة جميع المقاسات المتاحة"
                            >
                              إضافة جميع المقاسات
                            </button>
                          )}
                        </div>

                        {/* إضافة من القائمة الجاهزة */}
                        {availableSizes && availableSizes.length > 0 ? (
                          <div
                            className="mb-3 p-2"
                            style={{
                              background: "#e3f2fd",
                              borderRadius: "4px",
                            }}
                          >
                            <small className="text-muted d-block mb-2">
                              المقاسات الجاهزة للتصنيف المحدد:
                            </small>
                            <div className="d-flex gap-2 align-items-end flex-wrap">
                              <div style={{ flex: 1, minWidth: "200px" }}>
                                <select
                                  className="input-form d-block px-3"
                                  value=""
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      const selectedSize = availableSizes.find(
                                        (s) => s._id === e.target.value
                                      );
                                      if (selectedSize) {
                                        addVariantSizeFromList(
                                          i,
                                          selectedSize._id,
                                          0
                                        );
                                      }
                                      e.target.value = "";
                                    }
                                  }}
                                >
                                  <option value="">اختر مقاس من القائمة</option>
                                  {availableSizes
                                    .filter(
                                      (size) =>
                                        !v.sizes?.some(
                                          (s) => s.sizeId === size._id
                                        )
                                    )
                                    .map((size) => (
                                      <option key={size._id} value={size._id}>
                                        {size.name} ({size.type})
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                disabled={true}
                                style={{ opacity: 0.6 }}
                              >
                                سيتم الإضافة تلقائياً
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="mb-3 p-2"
                            style={{
                              background: "#fff3cd",
                              borderRadius: "4px",
                            }}
                          >
                            <small className="text-muted">
                              لا توجد مقاسات جاهزة لهذا التصنيف. يمكنك إضافة
                              مقاسات من صفحة إدارة المقاسات.
                            </small>
                          </div>
                        )}
                        {v.sizes && v.sizes.length > 0 && (
                          <div className="mt-2">
                            <small className="text-muted d-block mb-2">
                              المقاسات المضافة:
                            </small>
                            <div className="d-flex flex-wrap gap-2">
                              {v.sizes.map((s, si) => (
                                <div
                                  key={si}
                                  className="badge bg-light text-dark border"
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <span>{s.label}</span>
                                  <input
                                    type="number"
                                    value={Number(s.stock) || 0}
                                    onChange={(e) => {
                                      const newStock =
                                        Number(e.target.value) || 0;
                                      // Update the specific size stock in the variant
                                      const updatedSizes = v.sizes.map(
                                        (size, sizeIdx) =>
                                          sizeIdx === si
                                            ? { ...size, stock: newStock }
                                            : size
                                      );
                                      setVariantField(i, "sizes", updatedSizes);
                                    }}
                                    min="0"
                                    style={{
                                      width: "60px",
                                      padding: "2px 4px",
                                      border: "1px solid #ddd",
                                      borderRadius: "4px",
                                      textAlign: "center",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeVariantSize(i, si)}
                                    style={{
                                      padding: "2px 6px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
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

export default AdminEditProducts;
