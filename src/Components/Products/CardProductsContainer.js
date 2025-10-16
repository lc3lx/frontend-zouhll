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
    <Container>
      {productList.length > 0 && (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      )}
      <Row className="my-2 d-flex justify-content-between">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : productList.length > 0 ? (
          productList.map((item, index) => (
            <div key={item._id || index} className="stagger-item">
              <ProductCard favProd={favProd} item={item} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p style={{ color: "#888", fontWeight: 600 }}>لا يوجد منتجات</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CardProductsContainer;
