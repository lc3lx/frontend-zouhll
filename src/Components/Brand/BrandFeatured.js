import React from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import BrandCard from "./BrandCard";
import brand1 from "../../images/brand1.png";
import HomeBrandHook from "../../hook/brand/home-brand-hook";

const BrandFeatured = ({ title, btntitle }) => {
  const [brand, loading] = HomeBrandHook();

  return (
    <Container>
      <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
      <Row className="my-1 d-flex justify-content-between">
        {loading === false ? (
          brand &&
          brand.data &&
          Array.isArray(brand.data) &&
          brand.data.length > 0 ? (
            brand.data.slice(0, 5).map((item, index) => {
              return <BrandCard id={item._id} key={index} img={item.image} />;
            })
          ) : (
            <div className="col-12 text-center py-4">
              <p style={{ color: "#888" }}>لا يوجد ماركات حالياً</p>
            </div>
          )
        ) : (
          <div className="col-12 text-center py-4">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
