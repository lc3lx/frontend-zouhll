import React, { useState } from "react";
import { Row, Tabs, Tab, Button } from "react-bootstrap";
import { FiSearch, FiPlus } from "react-icons/fi";
import AdminAllProductsCard from "./AdminAllProductsCard";
import AdminAddProducts from "./AdminAddProducts";
import AdminEditProducts from "./AdminEditProducts";

const AdminAllProducts = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [editingProduct, setEditingProduct] = useState(null);

  // التأكد من أن products هو array
  const productsList = Array.isArray(products) ? products : [];

  // Filter products based on search
  const filteredProducts = productsList.filter(
    (product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setActiveTab("edit");
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setActiveTab("add");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setEditingProduct(null);
  };

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="list" title="قائمة المنتجات">
          {/* Search and Add Product Bar */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Search */}
              <div
                style={{ position: "relative", flex: "1", minWidth: "250px" }}
              >
                <FiSearch
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="text"
                  placeholder="البحث في المنتجات (الاسم، التصنيف، الماركة)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="amazon-sort-select"
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 40px",
                    minWidth: "auto",
                  }}
                />
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleAddNew}
                style={{
                  background: "#ff9900",
                  border: "1px solid #e47911",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  color: "#0f1111",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FiPlus size={16} />
                إضافة منتج جديد
              </button>
            </div>
          </div>

          {/* Products Count */}
          <div
            style={{
              marginBottom: "16px",
              fontSize: "14px",
              color: "#565959",
            }}
          >
            {filteredProducts.length > 0 ? (
              <>
                <span style={{ fontWeight: "600", color: "#0f1111" }}>
                  {filteredProducts.length}
                </span>
                <span> منتج</span>
                {searchTerm && <span> من أصل {productsList.length}</span>}
              </>
            ) : searchTerm ? (
              "لا توجد منتجات تطابق البحث"
            ) : (
              "لا توجد منتجات"
            )}
          </div>

          {/* Products Grid */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Row className="g-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <AdminAllProductsCard
                    key={index}
                    item={item}
                    onEditClick={handleEditClick}
                  />
                ))
              ) : productsList.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      padding: "40px 20px",
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                      📦
                    </div>
                    <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                      {products === undefined
                        ? "جاري تحميل المنتجات..."
                        : "لا يوجد منتجات حتى الآن"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#999" }}>
                      {products === undefined
                        ? "يرجى الانتظار..."
                        : "ابدأ بإضافة منتجات جديدة"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12 text-center py-5">
                  <div
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      padding: "40px 20px",
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                      🔍
                    </div>
                    <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                      لا توجد منتجات تطابق البحث
                    </div>
                    <div style={{ fontSize: "14px", color: "#999" }}>
                      جرب تغيير كلمات البحث
                    </div>
                  </div>
                </div>
              )}
            </Row>
          </div>
        </Tab>

        <Tab eventKey="add" title="إضافة منتج">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>إضافة منتج جديد</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          <AdminAddProducts />
        </Tab>

        <Tab eventKey="edit" title="تعديل المنتج">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>تعديل المنتج: {editingProduct?.title}</h5>
            <Button variant="secondary" onClick={handleBackToList}>
              العودة للقائمة
            </Button>
          </div>
          {editingProduct && (
            <AdminEditProducts productId={editingProduct._id} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminAllProducts;
