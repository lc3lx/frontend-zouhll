import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getOneCategory as getSubCategory } from "../../redux/actions/subcategoryAction";
import { getSecondaryCategories } from "../../redux/actions/secondaryCategoryAction";
import { getCategoryImage } from "../../utils/imageHelper";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import "./CategoryWithSubcategories.css";

const CategoryWithSubcategories = () => {
  const dispatch = useDispatch();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllCategory(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const subcategories = useSelector((state) => state.subCategory.subcategory);
  const secondaryCategories = useSelector(
    (state) => state.secondaryCategory.secondaryCategories
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));

    // Load subcategories if not already loaded
    if (!expandedCategories[categoryId]) {
      dispatch(getSubCategory(categoryId));
    }
  };

  const toggleSubcategory = (subCategoryId) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));

    // Load secondary categories if not already loaded
    if (!expandedSubcategories[subCategoryId]) {
      dispatch(getSecondaryCategories(subCategoryId));
    }
  };

  const getSubcategoriesForCategory = (categoryId) => {
    if (!subcategories || !subcategories.data) return [];
    return (
      subcategories.data.filter(
        (sub) => sub.category === categoryId || sub.category._id === categoryId
      ) || []
    );
  };

  const getSecondaryCategoriesForSubcategory = (subCategoryId) => {
    if (!secondaryCategories || !secondaryCategories.data) return [];
    return (
      secondaryCategories.data.filter(
        (secondary) =>
          secondary.subCategory === subCategoryId ||
          secondary.subCategory._id === subCategoryId
      ) || []
    );
  };

  // Filter categories based on search term
  const filteredCategories =
    categories?.data?.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      {/* Search Bar */}
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
          style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}
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
            placeholder="البحث في التصنيفات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007185")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
      </div>

      {/* Categories Count */}
      <div
        style={{
          marginBottom: "16px",
          fontSize: "14px",
          color: "#565959",
        }}
      >
        {filteredCategories.length > 0 ? (
          <>
            <span style={{ fontWeight: "600", color: "#0f1111" }}>
              {filteredCategories.length}
            </span>
            <span> تصنيف</span>
            {searchTerm && <span> من أصل {categories?.data?.length || 0}</span>}
          </>
        ) : searchTerm ? (
          "لا توجد تصنيفات تطابق البحث"
        ) : (
          "لا توجد تصنيفات"
        )}
      </div>

      {filteredCategories.length > 0 ? (
        <Row className="g-3">
          {filteredCategories.map((category) => (
            <Col key={category._id} lg={4} md={6} className="mb-3">
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                className="amazon-category-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Main Category Section */}
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "#f8f8f8",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={getCategoryImage(category)}
                        alt={category.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link
                        to={`/products/category/${category._id}`}
                        style={{
                          textDecoration: "none",
                          color: "#0f1111",
                          fontSize: "18px",
                          fontWeight: "600",
                          display: "block",
                          marginBottom: "4px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#007185";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#0f1111";
                        }}
                      >
                        {category.name}
                      </Link>
                      <button
                        onClick={() => toggleCategory(category._id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#007185",
                          fontSize: "14px",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {expandedCategories[category._id]
                          ? "إخفاء الأقسام الفرعية"
                          : "عرض الأقسام الفرعية"}
                        {expandedCategories[category._id] ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subcategories Section */}
                <Collapse in={expandedCategories[category._id]}>
                  <div
                    style={{
                      borderTop: "1px solid #e7e7e7",
                      background: "#fafafa",
                      padding: "12px 16px",
                    }}
                  >
                    {getSubcategoriesForCategory(category._id).length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {getSubcategoriesForCategory(category._id).map(
                          (subcategory) => (
                            <div key={subcategory._id}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "6px 8px",
                                  borderRadius: "4px",
                                  background: "#f8f9fa",
                                  marginBottom: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  {subcategory.image && (
                                    <img
                                      src={subcategory.image}
                                      alt={subcategory.name}
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                      }}
                                    />
                                  )}
                                  <Link
                                    to={`/products/subcategory/${subcategory._id}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "#007185",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </div>
                                <button
                                  onClick={() =>
                                    toggleSubcategory(subcategory._id)
                                  }
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#007185",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {expandedSubcategories[subcategory._id]
                                    ? "إخفاء"
                                    : "عرض"}
                                  {expandedSubcategories[subcategory._id] ? (
                                    <FiChevronUp size={12} />
                                  ) : (
                                    <FiChevronDown size={12} />
                                  )}
                                </button>
                              </div>

                              {/* Secondary Categories Section */}
                              <Collapse
                                in={expandedSubcategories[subcategory._id]}
                              >
                                <div
                                  style={{
                                    paddingLeft: "16px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  {getSecondaryCategoriesForSubcategory(
                                    subcategory._id
                                  ).length > 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                      }}
                                    >
                                      {getSecondaryCategoriesForSubcategory(
                                        subcategory._id
                                      ).map((secondaryCategory) => (
                                        <Link
                                          key={secondaryCategory._id}
                                          to={`/products/secondary-category/${secondaryCategory._id}`}
                                          style={{
                                            textDecoration: "none",
                                            color: "#6c757d",
                                            fontSize: "13px",
                                            padding: "4px 8px",
                                            borderRadius: "3px",
                                            transition: "background 0.2s ease",
                                            display: "block",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.target.style.background =
                                              "#e9ecef";
                                            e.target.style.color = "#495057";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.target.style.background =
                                              "transparent";
                                            e.target.style.color = "#6c757d";
                                          }}
                                        >
                                          • {secondaryCategory.name}
                                        </Link>
                                      ))}
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        textAlign: "center",
                                        color: "#999",
                                        fontSize: "12px",
                                        padding: "8px 0",
                                      }}
                                    >
                                      لا توجد تصنيفات ثانوية
                                    </div>
                                  )}
                                </div>
                              </Collapse>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#999",
                          fontSize: "14px",
                          padding: "12px 0",
                        }}
                      >
                        لا توجد تصنيفات فرعية
                      </div>
                    )}
                  </div>
                </Collapse>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#0f1111",
              marginBottom: "8px",
            }}
          >
            {searchTerm ? "لا توجد تصنيفات تطابق البحث" : "لا توجد تصنيفات"}
          </div>
          <div style={{ fontSize: "14px", color: "#565959" }}>
            {searchTerm
              ? "جرب البحث بكلمات مختلفة"
              : "لم يتم العثور على أي تصنيفات"}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryWithSubcategories;
