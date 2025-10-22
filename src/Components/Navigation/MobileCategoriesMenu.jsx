import React, { useState } from "react";
import { Offcanvas, Accordion, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCurrentCategories from "../../hook/categories/useCurrentCategories";
import LoadingSpinner from "../Common/LoadingSpinner";
import { api } from "../../Api/client";

// كاش مبسّط لمدة 60 ثانية
const subCache = new Map(); // key: categoryId => { subcategories, expireAt }
const secCache = new Map(); // key: subId => { secondaryCategories, expireAt }
const TTL_MS = 60 * 1000;

const MobileCategoriesMenu = ({ show, onHide }) => {
  const { data: categories, loading, error } = useCurrentCategories();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = async (categoryId) => {
    const next = expandedCategory === categoryId ? null : categoryId;
    setExpandedCategory(next);
    if (!next) return;

    // تحميل الفرعية والثانوية بالتوازي وحفظها في الكاش
    const cached = subCache.get(categoryId);
    if (!cached || cached.expireAt < Date.now()) {
      try {
        const [subRes, secAllRes] = await Promise.all([
          api.getSubcategories({
            category: categoryId,
            limit: 100,
            sort: "name",
          }),
          api.getSecondaryCategories({
            category: categoryId,
            limit: 1000,
            sort: "name",
          }),
        ]);
        const subcategories = subRes?.data || [];
        const allSecondary = secAllRes?.data || [];
        const secBySubId = allSecondary.reduce((acc, item) => {
          const key = item.subCategory?._id || item.subCategory;
          if (!key) return acc;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});
        const subWithSecondary = subcategories.map((sub) => ({
          ...sub,
          secondaryCategories: secBySubId[sub._id] || [],
        }));
        subCache.set(categoryId, {
          subcategories: subWithSecondary,
          expireAt: Date.now() + TTL_MS,
        });
      } catch (e) {
        subCache.set(categoryId, {
          subcategories: [],
          expireAt: Date.now() + TTL_MS,
        });
      }
    }
  };

  const handleLinkClick = () => {
    onHide(); // إغلاق القائمة عند النقر على رابط
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="mobile-categories-menu"
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>
          <i className="fas fa-th-large me-2"></i>
          تصفح الفئات
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0">
        {loading ? (
          <div className="text-center py-5">
            <LoadingSpinner text="جاري تحميل التصنيفات..." />
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <div className="text-muted">
              <i
                className="fas fa-exclamation-triangle mb-3"
                style={{ fontSize: "2rem" }}
              ></i>
              <p>خطأ في تحميل التصنيفات</p>
            </div>
          </div>
        ) : (
          <>
            {/* رابط جميع الفئات */}
            <div className="p-3 border-bottom">
              <Link
                to="/products"
                className="d-flex align-items-center text-decoration-none"
                onClick={handleLinkClick}
              >
                <div className="mobile-category-icon all-categories">
                  <i className="fas fa-th-large"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 theme-text-primary">جميع الفئات</h6>
                  <small className="theme-text-muted">تصفح جميع المنتجات</small>
                </div>
                <i className="fas fa-chevron-left theme-text-muted"></i>
              </Link>
            </div>

            {/* التصنيفات الرئيسية */}
            <Accordion flush>
              {categories.map((category) => (
                <Accordion.Item key={category._id} eventKey={category._id}>
                  <Accordion.Header>
                    <div className="d-flex align-items-center w-100">
                      <div className="mobile-category-icon">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <i className="fas fa-folder"></i>
                        )}
                      </div>
                      <div className="flex-grow-1 text-start">
                        <h6 className="mb-0">{category.name}</h6>
                        {category.subcategories &&
                          category.subcategories.length > 0 && (
                            <small className="text-muted">
                              {category.subcategories.length} فئة فرعية
                            </small>
                          )}
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body className="p-0">
                    {/* رابط التصنيف الرئيسي */}
                    <div className="p-3 border-bottom bg-light">
                      <Link
                        to={`/products/category/${category._id}`}
                        className="d-flex align-items-center text-decoration-none"
                        onClick={handleLinkClick}
                      >
                        <i className="fas fa-eye me-2 theme-text-primary"></i>
                        <span className="theme-text-primary fw-bold">
                          عرض جميع منتجات {category.name}
                        </span>
                      </Link>
                    </div>

                    {/* التصنيفات الفرعية */}
                    {(subCache.get(category._id)?.subcategories || []).length >
                    0 ? (
                      (subCache.get(category._id)?.subcategories || []).map(
                        (subcategory) => (
                          <div
                            key={subcategory._id}
                            className="subcategory-mobile"
                          >
                            {/* التصنيف الفرعي */}
                            <div className="p-3 border-bottom">
                              <Link
                                to={`/products/subcategory/${subcategory._id}`}
                                className="d-flex align-items-center text-decoration-none"
                                onClick={handleLinkClick}
                              >
                                <div className="subcategory-icon">
                                  {subcategory.image ? (
                                    <img
                                      src={subcategory.image}
                                      alt={subcategory.name}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                      }}
                                    />
                                  ) : (
                                    <i className="fas fa-tag"></i>
                                  )}
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-0 theme-text-primary">
                                    {subcategory.name}
                                  </h6>
                                  {subcategory.secondaryCategories &&
                                    subcategory.secondaryCategories.length >
                                      0 && (
                                      <small className="theme-text-muted">
                                        {subcategory.secondaryCategories.length}{" "}
                                        فئة ثانوية
                                      </small>
                                    )}
                                </div>
                                <i className="fas fa-chevron-left theme-text-muted"></i>
                              </Link>
                            </div>

                            {/* التصنيفات الثانوية */}
                            {/* تحميل الفئات الثانوية كسولاً */}
                            <SecondaryList
                              sub={subcategory}
                              categoryId={category._id}
                              onClick={handleLinkClick}
                            />
                          </div>
                        )
                      )
                    ) : (
                      <div className="p-3 text-center text-muted">
                        <small>لا توجد فئات فرعية</small>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            {/* روابط سريعة */}
            <div className="p-3 border-top mt-3">
              <h6 className="theme-text-primary mb-3">روابط سريعة</h6>
              <div className="d-grid gap-2">
                <Link
                  to="/products?sort=-createdAt"
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-star me-2"></i>
                  المنتجات الجديدة
                </Link>
                <Link
                  to="/products?sort=-sold"
                  className="btn btn-outline-success btn-sm"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-fire me-2"></i>
                  الأكثر مبيعاً
                </Link>
                <Link
                  to="/products?sort=price"
                  className="btn btn-outline-warning btn-sm"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-tag me-2"></i>
                  أفضل الأسعار
                </Link>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileCategoriesMenu;

// مكون فرعي لتحميل وإظهار الفئات الثانوية كسولاً مع كاش
function SecondaryList({ sub, categoryId, onClick }) {
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!sub?._id) return;
      const cached = secCache.get(sub._id);
      if (cached && cached.expireAt > Date.now()) {
        if (isMounted) setItems(cached.secondaryCategories);
        return;
      }
      try {
        const secRes = await api.getSecondaryCategories({
          category: categoryId,
          subCategory: sub._id,
          limit: 100,
          sort: "name",
        });
        const list = secRes?.data || [];
        secCache.set(sub._id, {
          secondaryCategories: list,
          expireAt: Date.now() + TTL_MS,
        });
        if (isMounted) setItems(list);
      } catch (e) {
        if (isMounted) setError(e);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [sub?._id, categoryId]);

  if (error) {
    return (
      <div className="p-2 text-center">
        <small className="theme-text-muted">تعذر تحميل الفئات الثانوية</small>
      </div>
    );
  }
  if (!items) {
    return (
      <div className="p-2 px-4">
        <div
          className="theme-skeleton"
          style={{ height: "12px", width: "60%" }}
        />
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="secondary-categories-mobile">
      {items.slice(0, 5).map((secondary) => (
        <Link
          key={secondary._id}
          to={`/products/secondary/${secondary._id}`}
          className="d-block p-2 px-4 text-decoration-none border-bottom secondary-link-mobile"
          onClick={onClick}
        >
          <small className="theme-text-secondary">• {secondary.name}</small>
        </Link>
      ))}
      {items.length > 5 && (
        <Link
          to={`/products/subcategory/${sub._id}`}
          className="d-block p-2 px-4 text-decoration-none border-bottom"
          onClick={onClick}
        >
          <small className="theme-text-primary fw-bold">
            عرض المزيد ({items.length - 5}+)
          </small>
        </Link>
      )}
    </div>
  );
}
