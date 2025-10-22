import { useFetch } from "../core/useFetch";
import { api } from "../../Api/client";
import {
  buildCategoriesQuery,
  buildSubcategoriesQuery,
  buildSecondaryCategoriesQuery,
} from "../../Api/queryBuilder";

// Hook for fetching categories
export function useCategories(filters = {}, options = {}) {
  const {
    enabled = true,
    ttl = 60000, // 1 minute cache
    onSuccess,
    onError,
  } = options;

  const params = buildCategoriesQuery(filters);
  const cacheKey = `categories:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.getCategories(params, signal), {
    deps: [JSON.stringify(params)],
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching all categories (for navigation/filters)
export function useAllCategories(options = {}) {
  return useCategories(
    {
      limit: 100, // Get all categories
      sort: "name",
    },
    {
      ttl: 300000, // 5 minutes cache
      ...options,
    }
  );
}

// Hook for fetching single category
export function useCategoryDetails(categoryId, options = {}) {
  const { enabled = true, ttl = 60000, onSuccess, onError } = options;

  const cacheKey = `category:${categoryId}`;

  return useFetch(cacheKey, (signal) => api.getCategory(categoryId, signal), {
    deps: [categoryId],
    enabled: enabled && !!categoryId,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching subcategories
export function useSubcategories(filters = {}, options = {}) {
  const { enabled = true, ttl = 60000, onSuccess, onError } = options;

  const params = buildSubcategoriesQuery(filters);
  const cacheKey = `subcategories:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.getSubcategories(params, signal), {
    deps: [JSON.stringify(params)],
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching subcategories by category
export function useSubcategoriesByCategory(categoryId, options = {}) {
  return useSubcategories(
    {
      category: categoryId,
      limit: 100,
      sort: "name",
    },
    {
      enabled: !!categoryId,
      ttl: 300000, // 5 minutes cache
      ...options,
    }
  );
}

// Hook for fetching secondary categories
export function useSecondaryCategories(filters = {}, options = {}) {
  const { enabled = true, ttl = 60000, onSuccess, onError } = options;

  const params = buildSecondaryCategoriesQuery(filters);
  const cacheKey = `secondaryCategories:${JSON.stringify(params)}`;

  return useFetch(
    cacheKey,
    (signal) => api.getSecondaryCategories(params, signal),
    {
      deps: [JSON.stringify(params)],
      enabled,
      ttl,
      onSuccess,
      onError,
    }
  );
}

// Hook for fetching secondary categories by category
export function useSecondaryCategoriesByCategory(categoryId, options = {}) {
  return useSecondaryCategories(
    {
      category: categoryId,
      limit: 100,
      sort: "name",
    },
    {
      enabled: !!categoryId,
      ttl: 300000, // 5 minutes cache
      ...options,
    }
  );
}

// Hook for category hierarchy (category with subcategories and secondary categories)
export function useCategoryHierarchy(categoryId, options = {}) {
  const categoryQuery = useCategoryDetails(categoryId, options);
  const subcategoriesQuery = useSubcategoriesByCategory(categoryId, options);
  const secondaryCategoriesQuery = useSecondaryCategoriesByCategory(
    categoryId,
    options
  );

  return {
    category: categoryQuery,
    subcategories: subcategoriesQuery,
    secondaryCategories: secondaryCategoriesQuery,
    loading:
      categoryQuery.loading ||
      subcategoriesQuery.loading ||
      secondaryCategoriesQuery.loading,
    error:
      categoryQuery.error ||
      subcategoriesQuery.error ||
      secondaryCategoriesQuery.error,
    refetch: () => {
      categoryQuery.refetch();
      subcategoriesQuery.refetch();
      secondaryCategoriesQuery.refetch();
    },
  };
}

export default {
  useCategories,
  useAllCategories,
  useCategoryDetails,
  useSubcategories,
  useSubcategoriesByCategory,
  useSecondaryCategories,
  useSecondaryCategoriesByCategory,
  useCategoryHierarchy,
};
