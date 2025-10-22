import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

// Hook مبسط يستخدم النظام الحالي (Redux) مع تحسينات
export function useSimpleCategoryHierarchy() {
  const dispatch = useDispatch();
  const [hierarchyData, setHierarchyData] = useState(null);

  // جلب البيانات من Redux store
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // جلب التصنيفات عند تحميل المكون
  useEffect(() => {
    if (!category || !category.data || category.data.length === 0) {
      dispatch(getAllCategory(100)); // جلب 100 تصنيف
    }
  }, [dispatch, category]);

  // بناء الهيكل الهرمي من البيانات المتاحة
  useEffect(() => {
    if (category && category.data && category.data.length > 0) {
      const processedCategories = category.data.map((cat) => ({
        ...cat,
        subcategories: [], // سنملأها لاحقاً إذا كانت متوفرة
        secondaryCategories: [], // سنملأها لاحقاً إذا كانت متوفرة
      }));

      setHierarchyData({
        categories: processedCategories,
        totalCategories: processedCategories.length,
        totalSubcategories: 0,
        totalSecondaryCategories: 0,
      });
    }
  }, [category]);

  return {
    data: hierarchyData,
    loading: loading,
    error: null,
    refetch: () => {
      dispatch(getAllCategory(100));
    },
  };
}

// Hook للتصنيفات الرئيسية فقط (متوافق مع النظام الجديد)
export function useMainCategories() {
  const { data, loading, error, refetch } = useSimpleCategoryHierarchy();

  return {
    data: data?.categories || [],
    loading,
    error,
    refetch,
    count: data?.totalCategories || 0,
  };
}

export default useSimpleCategoryHierarchy;
