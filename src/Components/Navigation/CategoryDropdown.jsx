import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../Api/client";
import LoadingSpinner from "../Common/LoadingSpinner";

// بسيط: كاش بالذاكرة لمدة 60 ثانية لكل فئة رئيسية + إمكانية تعبئته مسبقاً
export const categoryTreeCache = new Map(); // key: categoryId => { data, expireAt }
const TREE_TTL_MS = 60 * 1000;

const CategoryDropdown = ({
  category,
  onMouseEnter,
  onMouseLeave,
  onClose,
}) => {
  const [fullCategory, setFullCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    async function fetchTree() {
      if (!category?._id) return;
      setLoading(true);
      setError(null);

      // الكاش
      const cached = categoryTreeCache.get(category._id);
      if (cached && cached.expireAt > Date.now()) {
        if (!isActive) return;
        setFullCategory(cached.data);
        setLoading(false);
        return;
      }

      try {
        // جلب الفرعية والثانوية بالتوازي
        const [subRes, secAllRes] = await Promise.all([
          api.getSubcategories({
            category: category._id,
            limit: 100,
            sort: "name",
          }),
          // محاولة جلب كل الثانوية لهذه الفئة دفعة واحدة
          api.getSecondaryCategories({
            category: category._id,
            limit: 1000,
            sort: "name",
          }),
        ]);

        const subcategories = subRes?.data || [];
        const allSecondary = secAllRes?.data || [];

        // تجميع الثانوية حسب subCategory
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

        const merged = { ...category, subcategories: subWithSecondary };
        if (!isActive) return;
        setFullCategory(merged);
        setLoading(false);
        categoryTreeCache.set(category._id, {
          data: merged,
          expireAt: Date.now() + TREE_TTL_MS,
        });
      } catch (e) {
        // في حال فشل جلب جميع الثانوية، نجلبها بالتوازي لكل فرعي لتقليل الزمن الإجمالي
        try {
          const subRes = await api.getSubcategories({
            category: category._id,
            limit: 100,
            sort: "name",
          });
          const subcategories = subRes?.data || [];
          const secLists = await Promise.all(
            subcategories.map((sub) =>
              api
                .getSecondaryCategories({
                  category: category._id,
                  subCategory: sub._id,
                  limit: 100,
                  sort: "name",
                })
                .then((r) => r?.data || [])
                .catch(() => [])
            )
          );
          const subWithSecondary = subcategories.map((sub, idx) => ({
            ...sub,
            secondaryCategories: secLists[idx] || [],
          }));
          const merged = { ...category, subcategories: subWithSecondary };
          if (!isActive) return;
          setFullCategory(merged);
          setLoading(false);
          categoryTreeCache.set(category._id, {
            data: merged,
            expireAt: Date.now() + TREE_TTL_MS,
          });
        } catch (err) {
          if (!isActive) return;
          setError(err);
          setFullCategory({ ...category, subcategories: [] });
          setLoading(false);
        }
      }
    }

    if (category) {
      fetchTree();
    }
    return () => {
      isActive = false;
    };
  }, [category]);

  if (!category) return null;

  return (
    <div
      className="category-dropdown"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container>
        <div className="dropdown-content">
          {loading ? (
            <div className="text-center py-4">
              <LoadingSpinner size="sm" />
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <small className="theme-text-muted">
                تعذر تحميل الفئات الفرعية
              </small>
            </div>
          ) : (
            <>
              {/* عنوان التصنيف الرئيسي */}
              <div className="dropdown-header">
                <h4 className="category-title">
                  <Link
                    to={`/products/category/${category._id}`}
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                </h4>
                <p className="category-description">
                  تصفح جميع منتجات {category.name}
                </p>
              </div>

              {/* محتوى القائمة */}
              {fullCategory?.subcategories &&
              fullCategory.subcategories.length > 0 ? (
                <Row className="subcategories-grid">
                  {fullCategory.subcategories.map((subcategory) => (
                    <Col
                      key={subcategory._id}
                      lg={3}
                      md={4}
                      sm={6}
                      className="subcategory-column"
                    >
                      <div className="subcategory-section">
                        {/* التصنيف الفرعي */}
                        <h5 className="subcategory-title">
                          <Link
                            to={`/products/subcategory/${subcategory._id}`}
                            onClick={onClose}
                          >
                            {subcategory.name}
                          </Link>
                        </h5>

                        {/* التصنيفات الثانوية */}
                        {subcategory.secondaryCategories &&
                        subcategory.secondaryCategories.length > 0 ? (
                          <ul className="secondary-categories-list">
                            {subcategory.secondaryCategories
                              .slice(0, 8)
                              .map((secondary) => (
                                <li key={secondary._id}>
                                  <Link
                                    to={`/products/secondary/${secondary._id}`}
                                    onClick={onClose}
                                    className="secondary-link"
                                  >
                                    {secondary.name}
                                  </Link>
                                </li>
                              ))}
                            {subcategory.secondaryCategories.length > 8 && (
                              <li className="more-link">
                                <Link
                                  to={`/products/subcategory/${subcategory._id}`}
                                  onClick={onClose}
                                >
                                  عرض المزيد (
                                  {subcategory.secondaryCategories.length - 8}+)
                                </Link>
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="no-secondary">
                            <Link
                              to={`/products/subcategory/${subcategory._id}`}
                              onClick={onClose}
                            >
                              عرض جميع المنتجات
                            </Link>
                          </p>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                // إذا لم توجد فرعية
                <div className="no-subcategories">
                  <p className="text-center py-4">
                    <Link
                      to={`/products/category/${category._id}`}
                      onClick={onClose}
                      className="theme-btn theme-btn-primary"
                    >
                      عرض جميع منتجات {category.name}
                    </Link>
                  </p>
                </div>
              )}

              {/* روابط سريعة */}
              <div className="dropdown-footer">
                <div className="quick-links">
                  <Link
                    to={`/products/category/${category._id}?sort=-createdAt`}
                    onClick={onClose}
                    className="quick-link"
                  >
                    <i className="fas fa-star me-1"></i>
                    الجديد في {category.name}
                  </Link>
                  <Link
                    to={`/products/category/${category._id}?sort=-sold`}
                    onClick={onClose}
                    className="quick-link"
                  >
                    <i className="fas fa-fire me-1"></i>
                    الأكثر مبيعاً
                  </Link>
                  <Link
                    to={`/products/category/${category._id}?sort=price`}
                    onClick={onClose}
                    className="quick-link"
                  >
                    <i className="fas fa-tag me-1"></i>
                    أفضل الأسعار
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoryDropdown;
