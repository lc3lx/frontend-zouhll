import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../Uitily/ProductCardSkeleton";
import CardContainerHook from "./../../hook/products/card-container-hook";

const CardProductsContainer = ({
  title,
  btntitle,
  pathText,
  products,
  loading = false,
}) => {
  const [favProd] = CardContainerHook();

  // التأكد من أن products هو array
  const productList = Array.isArray(products) ? products : [];

  return (
    <div style={{ marginTop: "24px" }}>
      {productList.length > 0 && title && (
        <div style={{ marginBottom: "20px" }}>
          <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        </div>
      )}
      <Row className="g-3">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : productList.length > 0 ? (
          productList.map((item, index) => (
            <ProductCard
              key={item._id || index}
              favProd={favProd}
              item={item}
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
              }}
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div
              style={{
                color: "#666",
                fontSize: "16px",
                padding: "40px 20px",
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #e7e7e7",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",
                  fontSize: "18px",
                }}
              >
                لا توجد منتجات
              </div>
              <div style={{ fontSize: "14px", color: "#999" }}>
                جرب تغيير معايير البحث أو الفلترة
              </div>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default CardProductsContainer;
