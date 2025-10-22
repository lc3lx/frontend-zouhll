import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubcategories } from "../../redux/actions/subcategoryAction";
import { getAllCategory } from "../../redux/actions/categoryAction";

// Hook to manage admin filters, fetching, and pagination for subcategories
const useAdminSubcategories = () => {
  const dispatch = useDispatch();

  // Filters and pagination state
  const [categoryId, setCategoryId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("-createdAt");

  // Data selectors
  const subcategoriesState = useSelector(
    (state) => state.subCategory.subcategories
  );
  const loading = useSelector((state) => state.subCategory.loading);

  const categoriesState = useSelector((state) => state.allCategory.category);

  const categories = categoriesState?.data || [];

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId);
    if (keyword) params.set("keyword", keyword);
    params.set("limit", String(limit));
    params.set("page", String(page));
    params.set("sort", sort);
    return params.toString();
  }, [categoryId, keyword, limit, page, sort]);

  // Initial data
  useEffect(() => {
    dispatch(getAllCategory(200));
  }, [dispatch]);

  // Fetch subcategories when filters/pagination change
  useEffect(() => {
    dispatch(getAllSubcategories(queryString));
  }, [dispatch, queryString]);

  const refetch = useCallback(() => {
    dispatch(getAllSubcategories(queryString));
  }, [dispatch, queryString]);

  // Handlers
  const handleCategoryChange = useCallback((id) => {
    setCategoryId(id);
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

  const pagination = subcategoriesState?.paginationResult || {};
  const rows = subcategoriesState?.data || [];

  return {
    rows,
    loading,
    pagination,
    // filters
    categories,
    categoryId,
    keyword,
    limit,
    sort,
    page,
    // handlers
    setPage,
    handleCategoryChange,
    handleKeywordChange,
    handleLimitChange,
    handleSortChange,
    refetch,
  };
};

export default useAdminSubcategories;
