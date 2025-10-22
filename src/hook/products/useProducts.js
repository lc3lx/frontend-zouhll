import { useFetch, useMutation } from "../core/useFetch";
import { api } from "../../Api/client";
import { buildProductsQuery } from "../../Api/queryBuilder";
import { cacheUtils } from "../core/useFetch";

// Hook for fetching products list
export function useProductsList(filters = {}, options = {}) {
  const {
    enabled = true,
    ttl = 30000, // 30 seconds cache
    onSuccess,
    onError,
  } = options;

  const params = buildProductsQuery(filters);
  const cacheKey = `products:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.getProducts(params, signal), {
    deps: [JSON.stringify(params)],
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for fetching home products (featured/best sellers)
export function useHomeProducts(limit = 8, options = {}) {
  const filters = {
    limit,
    sort: "-sold,-ratingsAverage",
    fields:
      "title,price,imageCover,ratingsAverage,priceAfterDiscount,sold,slug",
  };

  return useProductsList(filters, {
    ttl: 60000, // 1 minute cache for home products
    ...options,
  });
}

// Hook for fetching products by category
export function useProductsByCategory(categoryId, filters = {}, options = {}) {
  const productFilters = {
    ...filters,
    category: categoryId,
  };

  return useProductsList(productFilters, {
    enabled: !!categoryId,
    ...options,
  });
}

// Hook for fetching products by subcategory
export function useProductsBySubcategory(
  subcategoryId,
  filters = {},
  options = {}
) {
  const productFilters = {
    ...filters,
    subcategory: subcategoryId,
  };

  return useProductsList(productFilters, {
    enabled: !!subcategoryId,
    ...options,
  });
}

// Hook for fetching products by secondary category
export function useProductsBySecondaryCategory(
  secondaryCategoryId,
  filters = {},
  options = {}
) {
  const productFilters = {
    ...filters,
    secondaryCategory: secondaryCategoryId,
  };

  return useProductsList(productFilters, {
    enabled: !!secondaryCategoryId,
    ...options,
  });
}

// Hook for fetching products by brand
export function useProductsByBrand(brandId, filters = {}, options = {}) {
  const productFilters = {
    ...filters,
    brand: brandId,
  };

  return useProductsList(productFilters, {
    enabled: !!brandId,
    ...options,
  });
}

// Hook for product search
export function useProductSearch(keyword, filters = {}, options = {}) {
  const productFilters = {
    ...filters,
    keyword,
  };

  return useProductsList(productFilters, {
    enabled: !!keyword && keyword.length >= 2,
    ttl: 15000, // 15 seconds cache for search results
    ...options,
  });
}

// Hook for fetching single product details
export function useProductDetails(productId, options = {}) {
  const {
    enabled = true,
    ttl = 60000, // 1 minute cache
    onSuccess,
    onError,
  } = options;

  const cacheKey = `product:${productId}`;

  return useFetch(cacheKey, (signal) => api.getProduct(productId, signal), {
    deps: [productId],
    enabled: enabled && !!productId,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for adding product to cart
export function useAddToCart(options = {}) {
  const { onSuccess, onError, onMutate } = options;

  return useMutation((data, signal) => api.addToCart(data, signal), {
    onSuccess: (result, variables) => {
      // Clear cart cache to force refetch
      cacheUtils.clearCache("cart");
      if (onSuccess) onSuccess(result, variables);
    },
    onError,
    onMutate,
  });
}

// Hook for updating cart item
export function useUpdateCartItem(options = {}) {
  const { onSuccess, onError, onMutate } = options;

  return useMutation(
    ({ itemId, data }, signal) => api.updateCartItem(itemId, data, signal),
    {
      onSuccess: (result, variables) => {
        // Clear cart cache to force refetch
        cacheUtils.clearCache("cart");
        if (onSuccess) onSuccess(result, variables);
      },
      onError,
      onMutate,
    }
  );
}

// Hook for removing item from cart
export function useRemoveFromCart(options = {}) {
  const { onSuccess, onError, onMutate } = options;

  return useMutation((itemId, signal) => api.removeFromCart(itemId, signal), {
    onSuccess: (result, variables) => {
      // Clear cart cache to force refetch
      cacheUtils.clearCache("cart");
      if (onSuccess) onSuccess(result, variables);
    },
    onError,
    onMutate,
  });
}

// Hook for clearing cart
export function useClearCart(options = {}) {
  const { onSuccess, onError, onMutate } = options;

  return useMutation((_, signal) => api.clearCart(signal), {
    onSuccess: (result, variables) => {
      // Clear cart cache to force refetch
      cacheUtils.clearCache("cart");
      if (onSuccess) onSuccess(result, variables);
    },
    onError,
    onMutate,
  });
}

// Hook for applying coupon
export function useApplyCoupon(options = {}) {
  const { onSuccess, onError, onMutate } = options;

  return useMutation((data, signal) => api.applyCoupon(data, signal), {
    onSuccess: (result, variables) => {
      // Clear cart cache to force refetch
      cacheUtils.clearCache("cart");
      if (onSuccess) onSuccess(result, variables);
    },
    onError,
    onMutate,
  });
}

// Utility function to invalidate product-related caches
export function invalidateProductCaches(productId) {
  if (productId) {
    cacheUtils.clearCache(`product:${productId}`);
  }
  cacheUtils.clearCache("products:");
}

const productHooks = {
  useProductsList,
  useHomeProducts,
  useProductsByCategory,
  useProductsBySubcategory,
  useProductsBySecondaryCategory,
  useProductsByBrand,
  useProductSearch,
  useProductDetails,
  useAddToCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
  useApplyCoupon,
  invalidateProductCaches,
};

export default productHooks;
