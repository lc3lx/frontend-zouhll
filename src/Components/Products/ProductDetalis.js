import React, { useState } from "react";
import { Row, Col, Nav, Tab, Badge, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import ProductText from "./ProductText";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import "./ProductDetails.css";

const ProductDetalis = () => {
  const { id } = useParams();
  const [item, images, cat, brand, store] = ViewProductsDetalisHook(id);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Check if product is loading
  const isLoading = !item || !item._id || Object.keys(item).length === 0;

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div
        style={{
          padding: "12px 20px",
          background: "#f8f9fa",
          borderBottom: "1px solid #e7e7e7",
          fontSize: "14px",
          color: "#565959",
        }}
      >
        <nav>
          <span style={{ cursor: "pointer" }}>الرئيسية</span>
          <span className="mx-2" style={{ color: "#ccc" }}>
            ›
          </span>
          <span style={{ cursor: "pointer" }}>{cat?.name || "التصنيف"}</span>
          <span className="mx-2" style={{ color: "#ccc" }}>
            ›
          </span>
          <span style={{ color: "#0f1111", fontWeight: "400" }}>
            {item?.title || "المنتج"}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <Row className="g-0">
        <Col lg="5" xl="5">
          <div style={{ padding: "20px" }}>
            <ProductGallery selectedVariantIndex={selectedVariantIndex} />
          </div>
        </Col>

        <Col lg="7" xl="7">
          <div style={{ padding: "20px", borderLeft: "1px solid #e7e7e7" }}>
            <ProductText
              selectedVariantIndex={selectedVariantIndex}
              setSelectedVariantIndex={setSelectedVariantIndex}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
        </Col>
      </Row>

      {/* Product Information Tabs */}
      <div
        style={{
          borderTop: "1px solid #e7e7e7",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <Tab.Container defaultActiveKey="description">
          <Nav
            variant="tabs"
            className="mb-3"
            style={{
              borderBottom: "1px solid #e7e7e7",
              background: "#fff",
            }}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="description"
                style={{
                  border: "none",
                  borderBottom: "2px solid transparent",
                  borderRadius: "0",
                  fontWeight: "500",
                  color: "#565959",
                  fontSize: "14px",
                  padding: "12px 16px",
                  background: "transparent",
                }}
                className="amazon-tab"
              >
                تفاصيل المنتج
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="specifications"
                style={{
                  border: "none",
                  borderBottom: "2px solid transparent",
                  borderRadius: "0",
                  fontWeight: "500",
                  color: "#565959",
                  fontSize: "14px",
                  padding: "12px 16px",
                  background: "transparent",
                }}
                className="amazon-tab"
              >
                المواصفات
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="shipping"
                style={{
                  border: "none",
                  borderBottom: "2px solid transparent",
                  borderRadius: "0",
                  fontWeight: "500",
                  color: "#565959",
                  fontSize: "14px",
                  padding: "12px 16px",
                  background: "transparent",
                }}
                className="amazon-tab"
              >
                الشحن والإرجاع
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content style={{ padding: "20px 0" }}>
            <Tab.Pane eventKey="description">
              <div style={{ padding: "0" }}>
                {/* Key Features Section - Prominent at top */}
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    border: "1px solid #e7e7e7",
                  }}
                >
                  <h6
                    style={{
                      color: "#0f1111",
                      fontWeight: "700",
                      fontSize: "18px",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>✨</span>
                    <span>نقاط بارزة</span>
                  </h6>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px",
                        background: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #e7e7e7",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "10px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0f1111",
                          lineHeight: "1.5",
                        }}
                      >
                        جودة عالية ومواد متينة مصنوعة بأعلى معايير الجودة
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px",
                        background: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #e7e7e7",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "10px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0f1111",
                          lineHeight: "1.5",
                        }}
                      >
                        ضمان الجودة لمدة سنة كاملة مع خدمة ما بعد البيع
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px",
                        background: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #e7e7e7",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "10px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0f1111",
                          lineHeight: "1.5",
                        }}
                      >
                        شحن سريع وآمن مع إمكانية التتبع في الوقت الفعلي
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "12px",
                        background: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #e7e7e7",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "10px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0f1111",
                          lineHeight: "1.5",
                        }}
                      >
                        خدمة عملاء متاحة على مدار الساعة لمساعدتك
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Description */}
                <div style={{ marginBottom: "24px" }}>
                  <h6
                    style={{
                      color: "#0f1111",
                      fontWeight: "600",
                      fontSize: "18px",
                      marginBottom: "16px",
                      paddingBottom: "12px",
                      borderBottom: "2px solid #e7e7e7",
                    }}
                  >
                    حول هذا المنتج
                  </h6>
                  <div
                    style={{
                      lineHeight: "1.8",
                      color: "#0f1111",
                      fontSize: "15px",
                      marginBottom: "20px",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {item?.description || "لا يوجد وصف متاح للمنتج حالياً."}
                  </div>
                </div>

                {/* Detailed Features */}
                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    border: "1px solid #e7e7e7",
                  }}
                >
                  <h6
                    style={{
                      color: "#0f1111",
                      fontWeight: "600",
                      fontSize: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    المميزات التفصيلية
                  </h6>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      fontSize: "14px",
                      color: "#0f1111",
                    }}
                  >
                    <li
                      style={{
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "12px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ lineHeight: "1.6" }}>
                        <strong>جودة عالية:</strong> مصنوع من أفضل المواد لضمان
                        المتانة والاستمرارية
                      </span>
                    </li>
                    <li
                      style={{
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "12px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ lineHeight: "1.6" }}>
                        <strong>ضمان شامل:</strong> ضمان الجودة لمدة سنة كاملة
                        مع دعم فني متخصص
                      </span>
                    </li>
                    <li
                      style={{
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "12px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ lineHeight: "1.6" }}>
                        <strong>شحن محسّن:</strong> شحن سريع وآمن مع إمكانية
                        التتبع والاستلام في الوقت المحدد
                      </span>
                    </li>
                    <li
                      style={{
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: "#007185",
                          marginRight: "12px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ lineHeight: "1.6" }}>
                        <strong>دعم ممتاز:</strong> فريق خدمة عملاء متاح على
                        مدار الساعة للإجابة على استفساراتك
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="specifications">
              <div style={{ padding: "0" }}>
                <h6
                  style={{
                    color: "#0f1111",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginBottom: "16px",
                  }}
                >
                  المواصفات التقنية
                </h6>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e7e7e7" }}>
                      <td
                        style={{
                          padding: "12px 0",
                          fontWeight: "600",
                          color: "#0f1111",
                          width: "30%",
                        }}
                      >
                        الماركة
                      </td>
                      <td
                        style={{
                          padding: "12px 0",
                          color: "#565959",
                        }}
                      >
                        {brand?.name || "غير محدد"}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e7e7e7" }}>
                      <td
                        style={{
                          padding: "12px 0",
                          fontWeight: "600",
                          color: "#0f1111",
                        }}
                      >
                        التصنيف
                      </td>
                      <td
                        style={{
                          padding: "12px 0",
                          color: "#565959",
                        }}
                      >
                        {cat?.name || "غير محدد"}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e7e7e7" }}>
                      <td
                        style={{
                          padding: "12px 0",
                          fontWeight: "600",
                          color: "#0f1111",
                        }}
                      >
                        الكمية المتاحة
                      </td>
                      <td
                        style={{
                          padding: "12px 0",
                          color: "#007600",
                          fontWeight: "500",
                        }}
                      >
                        {item?.quantity || 0} قطعة متوفرة
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e7e7e7" }}>
                      <td
                        style={{
                          padding: "12px 0",
                          fontWeight: "600",
                          color: "#0f1111",
                        }}
                      >
                        التقييم
                      </td>
                      <td
                        style={{
                          padding: "12px 0",
                          color: "#565959",
                        }}
                      >
                        {item?.ratingsAverage || 0} من 5 (
                        {item?.ratingsQuantity || 0} تقييم)
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "12px 0",
                          fontWeight: "600",
                          color: "#0f1111",
                        }}
                      >
                        المبيعات
                      </td>
                      <td
                        style={{
                          padding: "12px 0",
                          color: "#565959",
                        }}
                      >
                        {item?.sold || 0} قطعة مباعة
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="shipping">
              <div style={{ padding: "0" }}>
                <h6
                  style={{
                    color: "#0f1111",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginBottom: "16px",
                  }}
                >
                  الشحن والإرجاع
                </h6>

                <div style={{ fontSize: "14px", color: "#0f1111" }}>
                  <div
                    style={{
                      marginBottom: "16px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid #e7e7e7",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "#007185",
                      }}
                    >
                      🚚 الشحن المجاني
                    </div>
                    <div style={{ color: "#565959", lineHeight: "1.5" }}>
                      شحن مجاني للطلبات أكثر من $50. التوصيل خلال 2-3 أيام عمل.
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid #e7e7e7",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "#007185",
                      }}
                    >
                      🔄 سياسة الإرجاع
                    </div>
                    <div style={{ color: "#565959", lineHeight: "1.5" }}>
                      إرجاع مجاني خلال 30 يوم من تاريخ الشراء. يجب أن يكون
                      المنتج في حالته الأصلية.
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid #e7e7e7",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "#007185",
                      }}
                    >
                      🛡️ الضمان
                    </div>
                    <div style={{ color: "#565959", lineHeight: "1.5" }}>
                      ضمان الجودة لمدة سنة كاملة من تاريخ الشراء.
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "#007185",
                      }}
                    >
                      📞 خدمة العملاء
                    </div>
                    <div style={{ color: "#565959", lineHeight: "1.5" }}>
                      خدمة عملاء متاحة على مدار الساعة لمساعدتك في أي استفسار.
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ProductDetalis;
