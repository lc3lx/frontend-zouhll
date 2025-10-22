import { useFetch } from "../core/useFetch";
import { api } from "../../Api/client";
import { buildBrandsQuery } from "../../Api/queryBuilder";

// Hook for fetching brands
export function useBrands(filters = {}, options = {}) {
  const {
    enabled = true,
    ttl = 60000, // 1 minute cache
    onSuccess,
    onError,
  } = options;

  const params = buildBrandsQuery(filters);
  const cacheKey = `brands:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.getBrands(params, signal), {
    deps: [JSON.stringify(params)],
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching all brands (for navigation/filters)
export function useAllBrands(options = {}) {
  return useBrands(
    {
      limit: 100, // Get all brands
      sort: "name",
    },
    {
      ttl: 300000, // 5 minutes cache
      ...options,
    }
  );
}

// Hook for fetching featured brands (for home page)
export function useFeaturedBrands(limit = 8, options = {}) {
  return useBrands(
    {
      limit,
      sort: "name",
    },
    {
      ttl: 300000, // 5 minutes cache
      ...options,
    }
  );
}

// Hook for fetching single brand
export function useBrandDetails(brandId, options = {}) {
  const { enabled = true, ttl = 60000, onSuccess, onError } = options;

  const cacheKey = `brand:${brandId}`;

  return useFetch(cacheKey, (signal) => api.getBrand(brandId, signal), {
    deps: [brandId],
    enabled: enabled && !!brandId,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for brand search
export function useBrandSearch(keyword, options = {}) {
  return useBrands(
    {
      keyword,
      limit: 20,
    },
    {
      enabled: !!keyword && keyword.length >= 2,
      ttl: 15000, // 15 seconds cache for search results
      ...options,
    }
  );
}

export default {
  useBrands,
  useAllBrands,
  useFeaturedBrands,
  useBrandDetails,
  useBrandSearch,
};
