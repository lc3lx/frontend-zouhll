import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../core/useFetch";
import { api } from "../../Api/client";

// Hook لجلب التصنيفات الهرمية (رئيسية + فرعية + ثانوية)
export function useCategoryHierarchy(options = {}) {
  const {
    enabled = true,
    ttl = 300000, // 5 دقائق كاش
    onSuccess,
    onError,
  } = options;

  // جلب الفئات الهرمية من Redux إذا كانت موجودة
  const reduxHierarchy = useSelector(
    (state) => state.allCategory.categoryHierarchy
  );

  const [hierarchyData, setHierarchyData] = useState(reduxHierarchy || null);
  const [loading, setLoading] = useState(!reduxHierarchy);
  const [error, setError] = useState(null);

  // استخدام البيانات من Redux إذا كانت موجودة
  useEffect(() => {
    if (reduxHierarchy) {
      setHierarchyData(reduxHierarchy);
      setLoading(false);
      if (onSuccess) onSuccess(reduxHierarchy);
      return; // لا حاجة لجلب البيانات مرة أخرى
    }
  }, [reduxHierarchy, onSuccess]);

  // جلب التصنيفات الرئيسية (فقط إذا لم تكن موجودة في Redux)
  const categoriesQuery = useFetch(
    "categories-hierarchy",
    async (signal) => {
      const categories = await api.getCategories(
        { limit: 100, sort: "name" },
        signal
      );
      return categories;
    },
    {
      enabled: enabled && !reduxHierarchy, // لا تجلب إذا كانت موجودة في Redux
      ttl,
      onError,
    }
  );

  // دالة لبناء الهيكل الهرمي
  const buildHierarchy = useCallback(async () => {
    if (!categoriesQuery.data?.data) return;

    setLoading(true);
    setError(null);

    try {
      const categories = categoriesQuery.data.data;
      const hierarchyPromises = categories.map(async (category) => {
        try {
          // جلب الفرعية لكل تصنيف رئيسي
          const subcategoriesResponse = await api.getSubcategories({
            category: category._id,
            limit: 100,
            sort: "name",
          });

          const subcategories = subcategoriesResponse?.data || [];

          // جلب الثانوية لكل فرعي
          const subcategoriesWithSecondary = await Promise.all(
            subcategories.map(async (subcategory) => {
              try {
                const secondaryResponse = await api.getSecondaryCategories({
                  category: category._id,
                  subCategory: subcategory._id,
                  limit: 100,
                  sort: "name",
                });

                return {
                  ...subcategory,
                  secondaryCategories: secondaryResponse?.data || [],
                };
              } catch (err) {
                console.warn(
                  `Error fetching secondary categories for ${subcategory.name}:`,
                  err
                );
                return {
                  ...subcategory,
                  secondaryCategories: [],
                };
              }
            })
          );

          return {
            ...category,
            subcategories: subcategoriesWithSecondary,
          };
        } catch (err) {
          console.warn(
            `Error fetching subcategories for ${category.name}:`,
            err
          );
          return {
            ...category,
            subcategories: [],
          };
        }
      });

      const hierarchyResult = await Promise.all(hierarchyPromises);

      const finalData = {
        categories: hierarchyResult,
        totalCategories: hierarchyResult.length,
        totalSubcategories: hierarchyResult.reduce(
          (sum, cat) => sum + (cat.subcategories?.length || 0),
          0
        ),
        totalSecondaryCategories: hierarchyResult.reduce(
          (sum, cat) =>
            sum +
            (cat.subcategories?.reduce(
              (subSum, sub) => subSum + (sub.secondaryCategories?.length || 0),
              0
            ) || 0),
          0
        ),
      };

      setHierarchyData(finalData);
      if (onSuccess) onSuccess(finalData);
    } catch (err) {
      console.error("Error building category hierarchy:", err);
      setError(err);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  }, [categoriesQuery.data, onSuccess, onError]);

  // بناء الهيكل عند توفر البيانات (فقط إذا لم تكن موجودة في Redux)
  useEffect(() => {
    if (!reduxHierarchy && categoriesQuery.data && !categoriesQuery.loading) {
      buildHierarchy();
    }
  }, [
    categoriesQuery.data,
    categoriesQuery.loading,
    buildHierarchy,
    reduxHierarchy,
  ]);

  // دالة لإعادة التحميل
  const refetch = useCallback(() => {
    setHierarchyData(null);
    setError(null);
    categoriesQuery.refetch();
  }, [categoriesQuery]);

  // دالة للبحث في التصنيفات
  const searchCategories = useCallback(
    (searchTerm) => {
      if (!hierarchyData || !searchTerm) return hierarchyData;

      const filteredCategories = hierarchyData.categories
        .map((category) => {
          const matchesCategory = category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const filteredSubcategories = category.subcategories
            ?.map((subcategory) => {
              const matchesSubcategory = subcategory.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

              const filteredSecondary = subcategory.secondaryCategories?.filter(
                (secondary) =>
                  secondary.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              );

              if (
                matchesSubcategory ||
                (filteredSecondary && filteredSecondary.length > 0)
              ) {
                return {
                  ...subcategory,
                  secondaryCategories: filteredSecondary || [],
                };
              }
              return null;
            })
            .filter(Boolean);

          if (
            matchesCategory ||
            (filteredSubcategories && filteredSubcategories.length > 0)
          ) {
            return {
              ...category,
              subcategories: filteredSubcategories || [],
            };
          }
          return null;
        })
        .filter(Boolean);

      return {
        ...hierarchyData,
        categories: filteredCategories,
      };
    },
    [hierarchyData]
  );

  // دالة للحصول على تصنيف بالـ ID
  const getCategoryById = useCallback(
    (categoryId) => {
      if (!hierarchyData) return null;
      return hierarchyData.categories.find((cat) => cat._id === categoryId);
    },
    [hierarchyData]
  );

  // دالة للحصول على فرعي بالـ ID
  const getSubcategoryById = useCallback(
    (subcategoryId) => {
      if (!hierarchyData) return null;
      for (const category of hierarchyData.categories) {
        const subcategory = category.subcategories?.find(
          (sub) => sub._id === subcategoryId
        );
        if (subcategory) return subcategory;
      }
      return null;
    },
    [hierarchyData]
  );

  return {
    data: hierarchyData,
    loading: categoriesQuery.loading || loading,
    error: categoriesQuery.error || error,
    refetch,
    searchCategories,
    getCategoryById,
    getSubcategoryById,

    // إحصائيات مفيدة
    stats: hierarchyData
      ? {
          totalCategories: hierarchyData.totalCategories,
          totalSubcategories: hierarchyData.totalSubcategories,
          totalSecondaryCategories: hierarchyData.totalSecondaryCategories,
        }
      : null,
  };
}

// Hook مبسط لجلب التصنيفات الرئيسية فقط (للاستخدام في أماكن أخرى)
export function useMainCategories(options = {}) {
  const { data, loading, error, refetch } = useCategoryHierarchy(options);

  return {
    data: data?.categories || [],
    loading,
    error,
    refetch,
    count: data?.totalCategories || 0,
  };
}

export default useCategoryHierarchy;
