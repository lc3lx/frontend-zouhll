import { useFetch } from "../core/useFetch";
import { api } from "../../Api/client";
import { buildOffersQuery } from "../../Api/queryBuilder";

// Hook for fetching offers
export function useOffers(filters = {}, options = {}) {
  const {
    enabled = true,
    ttl = 60000, // 1 minute cache
    onSuccess,
    onError,
  } = options;

  const params = buildOffersQuery(filters);
  const cacheKey = `offers:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.getOffers(params, signal), {
    deps: [JSON.stringify(params)],
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching active offers
export function useActiveOffers(filters = {}, options = {}) {
  const offerFilters = {
    ...filters,
    isActive: true,
  };

  return useOffers(offerFilters, {
    ttl: 30000, // 30 seconds cache for active offers
    ...options,
  });
}

// Hook for fetching featured offers (for home page/header)
export function useFeaturedOffers(limit = 5, options = {}) {
  return useActiveOffers(
    {
      limit,
      sort: "-priority,-createdAt",
    },
    {
      ttl: 60000, // 1 minute cache
      ...options,
    }
  );
}

// Hook for fetching banner offers (high priority offers for banners)
export function useBannerOffers(options = {}) {
  return useActiveOffers(
    {
      limit: 3,
      sort: "-priority",
    },
    {
      ttl: 120000, // 2 minutes cache
      ...options,
    }
  );
}

export default {
  useOffers,
  useActiveOffers,
  useFeaturedOffers,
  useBannerOffers,
};
