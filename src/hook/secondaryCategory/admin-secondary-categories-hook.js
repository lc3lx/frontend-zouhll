import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSecondaryCategories } from "../../redux/actions/secondaryCategoryAction";
import { getAllSubcategories } from "../../redux/actions/subcategoryAction";
import { getAllCategory } from "../../redux/actions/categoryAction";

// Hook to manage admin filters, fetching, and pagination for secondary categories
const useAdminSecondaryCategories = () => {
  const dispatch = useDispatch();

  // Filters and pagination state
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("-createdAt");

  // Data selectors
  const secondaryCategories = useSelector(
    (state) => state.secondaryCategory.allSecondaryCategories
  );
  const loading = useSelector((state) => state.secondaryCategory.loading);

  const categoriesState = useSelector((state) => state.allCategory.category);
  const subcategoriesState = useSelector(
    (state) => state.subCategory.subcategories
  );

  const categories = categoriesState?.data || [];
  const subcategories = subcategoriesState?.data || [];

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId);
    if (subCategoryId) params.set("subCategory", subCategoryId);
    if (keyword) params.set("keyword", keyword);
    params.set("limit", String(limit));
    params.set("page", String(page));
    params.set("sort", sort);
    return params.toString();
  }, [categoryId, subCategoryId, keyword, limit, page, sort]);

  // Initial data
  useEffect(() => {
    dispatch(getAllCategory("limit=200&sort=name"));
  }, [dispatch]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      dispatch(
        getAllSubcategories(`category=${categoryId}&limit=200&sort=name`)
      );
    }
  }, [dispatch, categoryId]);

  // When no category is selected, fetch all subcategories for name lookups and filter select
  useEffect(() => {
    if (!categoryId) {
      dispatch(getAllSubcategories("limit=200&sort=name"));
    }
  }, [dispatch, categoryId]);

  // Fetch secondary categories when filters/pagination change
  useEffect(() => {
    dispatch(getAllSecondaryCategories(queryString));
  }, [dispatch, queryString]);

  // Handlers
  const handleCategoryChange = useCallback((id) => {
    setCategoryId(id);
    setSubCategoryId("");
    setPage(1);
  }, []);

  const handleSubCategoryChange = useCallback((id) => {
    setSubCategoryId(id);
    setPage(1);
  }, []);

  const handleKeywordChange = useCallback((val) => {
    setKeyword(val);
    setPage(1);
  }, []);

  const handleLimitChange = useCallback((val) => {
    setLimit(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((val) => {
    setSort(val);
    setPage(1);
  }, []);

  const pagination = secondaryCategories?.paginationResult || {};
  const rows = secondaryCategories?.data || [];

  return {
    rows,
    loading,
    pagination,
    // filters
    categories,
    subcategories,
    categoryId,
    subCategoryId,
    keyword,
    limit,
    sort,
    page,
    // handlers
    setPage,
    handleCategoryChange,
    handleSubCategoryChange,
    handleKeywordChange,
    handleLimitChange,
    handleSortChange,
  };
};

export default useAdminSecondaryCategories;
