// API Client with token headers, error handling, and AbortController support

const BASE_URL =
  process.env.REACT_APP_API_URL || "https://www.zuhall.com/api/v1";

// Build URL with query parameters
function buildUrl(baseUrl, params = {}) {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

// Get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Handle API errors
function handleApiError(error, response) {
  if (error.name === "AbortError") {
    throw new Error("Request was cancelled");
  }

  if (!response) {
    throw new Error("Network error - please check your connection");
  }

  // Try to parse error response
  return response.json().catch(() => ({
    message: `Request failed with status ${response.status}`,
    status: response.status,
  }));
}

// Generic API request function
async function apiRequest(method, path, options = {}) {
  const { params, data, signal, headers: customHeaders = {} } = options;

  const url = buildUrl(`${BASE_URL}${path}`, params);
  const headers = { ...getAuthHeaders(), ...customHeaders };

  const config = {
    method,
    headers,
    signal,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await handleApiError(null, response);
      const error = new Error(errorData.message || "Request failed");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request was cancelled");
    }
    throw error;
  }
}

// Exported API methods
export const apiClient = {
  get: (path, options = {}) => apiRequest("GET", path, options),
  post: (path, data, options = {}) =>
    apiRequest("POST", path, { ...options, data }),
  put: (path, data, options = {}) =>
    apiRequest("PUT", path, { ...options, data }),
  patch: (path, data, options = {}) =>
    apiRequest("PATCH", path, { ...options, data }),
  delete: (path, options = {}) => apiRequest("DELETE", path, options),
};

// Convenience methods for common operations
export const api = {
  // Products
  getProducts: (params = {}, signal) =>
    apiClient.get("/products", { params, signal }),

  getProduct: (id, signal) => apiClient.get(`/products/${id}`, { signal }),

  // Categories
  getCategories: (params = {}, signal) =>
    apiClient.get("/categories", { params, signal }),

  getCategory: (id, signal) => apiClient.get(`/categories/${id}`, { signal }),

  // Subcategories
  getSubcategories: (params = {}, signal) =>
    apiClient.get("/subcategories", { params, signal }),

  // Secondary categories
  getSecondaryCategories: (params = {}, signal) =>
    apiClient.get("/secondary-categories", { params, signal }),

  // Brands
  getBrands: (params = {}, signal) =>
    apiClient.get("/brands", { params, signal }),

  getBrand: (id, signal) => apiClient.get(`/brands/${id}`, { signal }),

  // Offers
  getOffers: (params = {}, signal) =>
    apiClient.get("/offers", { params, signal }),

  getActiveOffers: (params = {}, signal) =>
    apiClient.get("/offers/active", { params, signal }),

  // Exchange rates
  getCurrentExchangeRate: (signal) =>
    apiClient.get("/exchange-rates/current", { signal }),

  convertPrice: (params = {}, signal) =>
    apiClient.get("/exchange-rates/convert", { params, signal }),

  // Cart operations (require auth)
  getCart: (signal) => apiClient.get("/cart", { signal }),

  addToCart: (data, signal) => apiClient.post("/cart", data, { signal }),

  updateCartItem: (itemId, data, signal) =>
    apiClient.put(`/cart/${itemId}`, data, { signal }),

  removeFromCart: (itemId, signal) =>
    apiClient.delete(`/cart/${itemId}`, { signal }),

  clearCart: (signal) => apiClient.delete("/cart", { signal }),

  applyCoupon: (data, signal) =>
    apiClient.put("/cart/applyCoupon", data, { signal }),

  // Orders (require auth)
  getOrders: (params = {}, signal) =>
    apiClient.get("/orders", { params, signal }),

  getOrder: (id, signal) => apiClient.get(`/orders/${id}`, { signal }),

  createCashOrder: (cartId, data, signal) =>
    apiClient.post(`/orders/${cartId}`, data, { signal }),

  createShamCashOrder: (cartId, data, signal) =>
    apiClient.post(`/orders/shamcash/${cartId}`, data, { signal }),

  createWalletOrder: (cartId, data, signal) =>
    apiClient.post(`/orders/wallet/${cartId}`, data, { signal }),

  // Reviews
  getReviews: (params = {}, signal) =>
    apiClient.get("/reviews", { params, signal }),

  createReview: (data, signal) => apiClient.post("/reviews", data, { signal }),

  // Wallet (require auth)
  getWallet: (signal) => apiClient.get("/wallet", { signal }),

  rechargeWallet: (data, signal) =>
    apiClient.post("/wallet/recharge", data, { signal }),

  getWalletTransactions: (params = {}, signal) =>
    apiClient.get("/wallet/transactions", { params, signal }),

  // Health check
  healthCheck: (signal) => apiClient.get("/healthz", { signal }),
};

export default api;
