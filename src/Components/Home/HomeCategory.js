import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import CategoryCard from "./../Category/CategoryCard";
import HomeCategoryHook from "../../hook/category/home-category-hook";

const HomeCategory = () => {
  const [category, loading, colors] = HomeCategoryHook();

  return (
    <Container>
      <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          category &&
          category.data &&
          Array.isArray(category.data) &&
          category.data.length > 0 ? (
            category.data.slice(0, 5).map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  id={item._id}
                  title={item.name}
                  img={item.image}
                  background={colors[index]}
                />
              );
            })
          ) : (
            <div className="col-12 text-center py-4">
              <p style={{ color: "#888" }}>لا يوجد تصنيفات حالياً</p>
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

export default HomeCategory;
