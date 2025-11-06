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
  const {
    enabled = true,
    ttl = 30000, // 30 seconds cache for active offers
    onSuccess,
    onError,
  } = options;

  const params = buildOffersQuery(filters);
  const cacheKey = `active-offers:${JSON.stringify(params)}`;

  console.log("=== useActiveOffers Debug ===");
  console.log("filters:", filters);
  console.log("params:", params);
  console.log("cacheKey:", cacheKey);
  console.log("enabled:", enabled);
  console.log("api.getActiveOffers:", api.getActiveOffers);

  const result = useFetch(
    cacheKey,
    (signal) => {
      console.log("=== Fetching Active Offers ===");
      console.log("params:", params);
      console.log("signal:", signal);
      return api.getActiveOffers(params, signal);
    },
    {
      deps: [JSON.stringify(params)],
      enabled,
      ttl,
      onSuccess: (data) => {
        console.log("=== onSuccess ===");
        console.log("data:", data);
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        console.log("=== onError ===");
        console.log("error:", error);
        if (onError) onError(error);
      },
    }
  );

  // Extract offers from the response
  // Backend returns: { status: "success", data: offers }
  // API client returns the full response object (result.data = { status: "success", data: offers })
  let offers = [];

  if (result.data) {
    // Check if data is an array (direct response)
    if (Array.isArray(result.data)) {
      offers = result.data;
    }
    // Check if data has a data property (nested response: { status: "success", data: offers })
    else if (result.data.data) {
      if (Array.isArray(result.data.data)) {
        offers = result.data.data;
      } else {
        // Single offer object
        offers = [result.data.data];
      }
    }
  }

  return {
    ...result,
    offers,
  };
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

const offersHooks = {
  useOffers,
  useActiveOffers,
  useFeaturedOffers,
  useBannerOffers,
};

export default offersHooks;
