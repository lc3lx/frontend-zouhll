import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

// Hook يستخدم النظام الحالي مباشرة
const useCurrentCategories = () => {
  const dispatch = useDispatch();

  // جلب البيانات من Redux store
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // جلب التصنيفات عند تحميل المكون
  useEffect(() => {
    dispatch(getAllCategory(50));
  }, [dispatch]);

  // تحويل البيانات إلى الشكل المطلوب
  const categories = category?.data || [];

  return {
    data: categories,
    loading: loading,
    error: null,
    refetch: () => {
      dispatch(getAllCategory(50));
    },
    count: categories.length,
  };
};

export default useCurrentCategories;
