import React from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import add from "../../images/add.png";
import MultiImageInput from "react-multiple-image-input";

import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import AdminAddProductsHook from "./../../hook/products/add-products-hook";

const AdminAddProducts = () => {
  const [
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
  ] = AdminAddProductsHook();

  return (
    <div
      style={{ backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}
    >
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>

          <MultiImageInput
            images={images}
            setImages={setImages}
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
            placeholder="الكمية المتاحة"
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
          />
          <select
            name="brand"
            onChange={onSeletBrand}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">اختر ماركة</option>
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
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
          <div className="mt-1 d-flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="color ms-2 border  mt-1"
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

          {/* Sizes without colors */}
          <div className="text-form mt-4">المقاسات (للمنتجات بدون ألوان)</div>
          <div className="mt-2">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <input
                type="text"
                className="input-form d-block px-3"
                placeholder="قياس (مثل S أو 38)"
                id="newSizeLabel"
              />
              <input
                type="number"
                className="input-form d-block px-3"
                placeholder="المخزون"
                id="newSizeStock"
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
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
                إضافة قياس
              </button>
            </div>
            {sizes && sizes.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <span
                    key={i}
                    className="badge bg-light text-dark border d-flex align-items-center"
                  >
                    {s.label} - {Number(s.stock) || 0}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: "10px" }}
                      onClick={() => removeSize(i)}
                    ></button>
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
                {variants.map((v, i) => (
                  <div key={i} className="border rounded p-3 my-3">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <input
                        type="text"
                        className="input-form d-block px-3"
                        placeholder="اسم اللون"
                        value={v.colorName || ""}
                        onChange={(e) =>
                          setVariantField(i, "colorName", e.target.value)
                        }
                      />
                      <input
                        type="color"
                        className="ms-2"
                        value={v.colorHex || "#000000"}
                        onChange={(e) =>
                          setVariantField(i, "colorHex", e.target.value)
                        }
                      />
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
                              className="badge bg-light text-dark border d-flex align-items-center"
                            >
                              {s.label} - {Number(s.stock) || 0}
                              <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                style={{ fontSize: "10px" }}
                                onClick={() => removeVariantSize(i, si)}
                              ></button>
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

export default AdminAddProducts;
