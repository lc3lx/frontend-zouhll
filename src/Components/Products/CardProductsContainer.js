import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductWishList } from "../../redux/actions/wishListAction";
import CardContainerHook from "./../../hook/products/card-container-hook";

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  const [favProd] = CardContainerHook();

  // التأكد من أن products هو array
  const productList = Array.isArray(products) ? products : [];

  return (
    <Container>
      {productList.length > 0 && (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      )}
      <Row className="my-2 d-flex justify-content-between">
        {productList.length > 0 ? (
          productList.map((item, index) => (
            <div key={item._id || index} className="stagger-item">
              <ProductCard favProd={favProd} item={item} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="loading-container">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p
                className="loading-text"
                style={{ marginTop: "20px", color: "#555" }}
              >
                جاري تحميل المنتجات...
              </p>
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CardProductsContainer;
