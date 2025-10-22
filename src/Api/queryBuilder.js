// Query Builder for consistent API parameter construction

// Default pagination settings
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const DEFAULT_SORT = "-createdAt";

// Utility to clean undefined/null values
function cleanParams(params) {
  const cleaned = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
}

// Base query builder
export function buildBaseQuery({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  sort = DEFAULT_SORT,
  fields,
  keyword,
} = {}) {
  // Ensure limit doesn't exceed maximum
  const safeLimit = Math.min(
    Math.max(1, parseInt(limit) || DEFAULT_LIMIT),
    MAX_LIMIT
  );

  return cleanParams({
    page: parseInt(page) || DEFAULT_PAGE,
    limit: safeLimit,
    sort,
    fields,
    keyword,
  });
}

// Products query builder
export function buildProductsQuery({
  page,
  limit,
  sort,
  fields = "title,price,imageCover,ratingsAverage,priceAfterDiscount,sold",
  keyword,
  category,
  subcategory,
  secondaryCategory,
  brand,
  minPrice,
  maxPrice,
  minRating,
  colors,
  sizes,
  season,
  currency,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  const productParams = {
    ...baseQuery,
    category,
    subcategory,
    secondaryCategory,
    brand,
    colors,
    sizes,
    season,
    currency,
  };

  // Handle price range
  if (minPrice !== undefined && minPrice !== null) {
    productParams["price[gte]"] = minPrice;
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    productParams["price[lte]"] = maxPrice;
  }

  // Handle rating filter
  if (minRating !== undefined && minRating !== null) {
    productParams["ratingsAverage[gte]"] = minRating;
  }

  return cleanParams(productParams);
}

// Categories query builder
export function buildCategoriesQuery({
  page,
  limit,
  sort,
  fields = "name,slug,image",
  keyword,
} = {}) {
  return buildBaseQuery({ page, limit, sort, fields, keyword });
}

// Subcategories query builder
export function buildSubcategoriesQuery({
  page,
  limit,
  sort,
  fields = "name,slug,image,category",
  keyword,
  category,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  return cleanParams({
    ...baseQuery,
    category,
  });
}

// Secondary categories query builder
export function buildSecondaryCategoriesQuery({
  page,
  limit,
  sort,
  fields = "name,slug,image,category",
  keyword,
  category,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  return cleanParams({
    ...baseQuery,
    category,
  });
}

// Brands query builder
export function buildBrandsQuery({
  page,
  limit,
  sort,
  fields = "name,slug,image",
  keyword,
} = {}) {
  return buildBaseQuery({ page, limit, sort, fields, keyword });
}

// Offers query builder
export function buildOffersQuery({
  page,
  limit,
  sort = "-priority,-createdAt",
  fields = "title,description,discount,icon,color,image,isActive,startDate,endDate,priority",
  keyword,
  isActive = true,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  return cleanParams({
    ...baseQuery,
    isActive,
  });
}

// Reviews query builder
export function buildReviewsQuery({
  page,
  limit,
  sort = "-createdAt",
  fields = "title,ratings,user,createdAt",
  keyword,
  product,
  user,
  minRating,
  maxRating,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  const reviewParams = {
    ...baseQuery,
    product,
    user,
  };

  // Handle rating range
  if (minRating !== undefined && minRating !== null) {
    reviewParams["ratings[gte]"] = minRating;
  }
  if (maxRating !== undefined && maxRating !== null) {
    reviewParams["ratings[lte]"] = maxRating;
  }

  return cleanParams(reviewParams);
}

// Orders query builder
export function buildOrdersQuery({
  page,
  limit,
  sort = "-createdAt",
  fields,
  keyword,
  status,
  paymentMethodType,
  isPaid,
  isDelivered,
  startDate,
  endDate,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields, keyword });

  const orderParams = {
    ...baseQuery,
    status,
    paymentMethodType,
    isPaid,
    isDelivered,
  };

  // Handle date range
  if (startDate) {
    orderParams["createdAt[gte]"] = startDate;
  }
  if (endDate) {
    orderParams["createdAt[lte]"] = endDate;
  }

  return cleanParams(orderParams);
}

// Wallet transactions query builder
export function buildWalletTransactionsQuery({
  page,
  limit,
  sort = "-createdAt",
  fields,
  type,
  startDate,
  endDate,
} = {}) {
  const baseQuery = buildBaseQuery({ page, limit, sort, fields });

  const transactionParams = {
    ...baseQuery,
    type,
  };

  // Handle date range
  if (startDate) {
    transactionParams["createdAt[gte]"] = startDate;
  }
  if (endDate) {
    transactionParams["createdAt[lte]"] = endDate;
  }

  return cleanParams(transactionParams);
}

// Search query builder (for global search)
export function buildSearchQuery({
  keyword,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  sort = "-createdAt",
  type = "products", // products, categories, brands
} = {}) {
  if (!keyword) {
    return {};
  }

  const baseQuery = buildBaseQuery({ page, limit, sort, keyword });

  // Add type-specific fields
  let fields;
  switch (type) {
    case "categories":
      fields = "name,slug,image";
      break;
    case "brands":
      fields = "name,slug,image";
      break;
    case "products":
    default:
      fields = "title,price,imageCover,ratingsAverage,category,brand";
      break;
  }

  return {
    ...baseQuery,
    fields,
  };
}

// Exchange rate conversion query
export function buildConversionQuery({
  amount,
  from = "USD",
  to = "SYP",
} = {}) {
  return cleanParams({
    amount,
    from,
    to,
  });
}

// Helper function to build filter URLs for frontend routing
export function buildFilterUrl(baseUrl, filters) {
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }
  });

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// Parse URL search params back to object
export function parseUrlParams(searchParams) {
  const params = {};

  for (const [key, value] of searchParams.entries()) {
    if (params[key]) {
      // Convert to array if multiple values
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }

  return params;
}

export default {
  buildBaseQuery,
  buildProductsQuery,
  buildCategoriesQuery,
  buildSubcategoriesQuery,
  buildSecondaryCategoriesQuery,
  buildBrandsQuery,
  buildOffersQuery,
  buildReviewsQuery,
  buildOrdersQuery,
  buildWalletTransactionsQuery,
  buildSearchQuery,
  buildConversionQuery,
  buildFilterUrl,
  parseUrlParams,
};
