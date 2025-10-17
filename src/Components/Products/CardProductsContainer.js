import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../Uitily/ProductCardSkeleton";
import CardContainerHook from "./../../hook/products/card-container-hook";

const CardProductsContainer = ({ title, btntitle, pathText, products, loading = false }) => {
  const [favProd] = CardContainerHook();

  // التأكد من أن products هو array
  const productList = Array.isArray(products) ? products : [];

  return (
    <div>
      {productList.length > 0 && title && (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      )}
      <Row className="g-3">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : productList.length > 0 ? (
          productList.map((item, index) => (
            <ProductCard key={item._id || index} favProd={favProd} item={item} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div style={{ 
              color: "#666", 
              fontSize: "16px",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
              <div style={{ fontWeight: "600", marginBottom: "8px" }}>لا توجد منتجات</div>
              <div style={{ fontSize: "14px", color: "#999" }}>جرب تغيير معايير البحث أو الفلترة</div>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default CardProductsContainer;
