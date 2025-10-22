import { useFetch } from "../core/useFetch";
import { api } from "../../Api/client";
import { buildConversionQuery } from "../../Api/queryBuilder";

// Hook for fetching current exchange rate
export function useCurrentExchangeRate(options = {}) {
  const {
    enabled = true,
    ttl = 30000, // 30 seconds cache
    onSuccess,
    onError,
  } = options;

  const cacheKey = "exchange-rate:current";

  return useFetch(cacheKey, (signal) => api.getCurrentExchangeRate(signal), {
    enabled,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for price conversion
export function usePriceConversion(
  amount,
  from = "USD",
  to = "SYP",
  options = {}
) {
  const {
    enabled = true,
    ttl = 30000, // 30 seconds cache
    onSuccess,
    onError,
  } = options;

  const params = buildConversionQuery({ amount, from, to });
  const cacheKey = `conversion:${JSON.stringify(params)}`;

  return useFetch(cacheKey, (signal) => api.convertPrice(params, signal), {
    deps: [amount, from, to],
    enabled: enabled && !!amount && amount > 0,
    ttl,
    onSuccess,
    onError,
  });
}

// Hook for converting multiple prices
export function useMultiplePriceConversion(
  prices = [],
  from = "USD",
  to = "SYP",
  options = {}
) {
  const exchangeRateQuery = useCurrentExchangeRate(options);

  const convertedPrices = prices.map((price) => {
    if (!exchangeRateQuery.data || !exchangeRateQuery.data.rate) {
      return { original: price, converted: price, currency: from };
    }

    const rate = exchangeRateQuery.data.rate;
    const converted =
      from === "USD" && to === "SYP" ? price * rate : price / rate;

    return {
      original: price,
      converted: Math.round(converted * 100) / 100, // Round to 2 decimal places
      currency: to,
      rate,
    };
  });

  return {
    ...exchangeRateQuery,
    convertedPrices,
  };
}

// Custom hook for displaying price with conversion
export function usePriceDisplay(price, currency = "USD", options = {}) {
  const {
    showBoth = false, // Show both original and converted prices
    preferLocal = true, // Prefer local currency when available
  } = options;

  const exchangeRateQuery = useCurrentExchangeRate(options);

  const displayData = {
    originalPrice: price,
    originalCurrency: currency,
    convertedPrice: price,
    convertedCurrency: currency,
    rate: 1,
    showBoth,
    loading: exchangeRateQuery.loading,
    error: exchangeRateQuery.error,
  };

  if (exchangeRateQuery.data && exchangeRateQuery.data.rate) {
    const rate = exchangeRateQuery.data.rate;
    const targetCurrency = exchangeRateQuery.data.toCurrency || "SYP";

    if (currency === "USD" && targetCurrency === "SYP") {
      displayData.convertedPrice = Math.round(price * rate);
      displayData.convertedCurrency = targetCurrency;
      displayData.rate = rate;
    }
  }

  // Determine which price to show as primary
  if (preferLocal && displayData.convertedCurrency !== currency) {
    displayData.primaryPrice = displayData.convertedPrice;
    displayData.primaryCurrency = displayData.convertedCurrency;
    displayData.secondaryPrice = displayData.originalPrice;
    displayData.secondaryCurrency = displayData.originalCurrency;
  } else {
    displayData.primaryPrice = displayData.originalPrice;
    displayData.primaryCurrency = displayData.originalCurrency;
    displayData.secondaryPrice = displayData.convertedPrice;
    displayData.secondaryCurrency = displayData.convertedCurrency;
  }

  return displayData;
}

// Utility function to format price with currency
export function formatPrice(price, currency = "USD", locale = "ar-SY") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency === "SYP" ? "SYP" : "USD",
      minimumFractionDigits: currency === "SYP" ? 0 : 2,
      maximumFractionDigits: currency === "SYP" ? 0 : 2,
    }).format(price);
  } catch (error) {
    // Fallback formatting
    const symbol = currency === "SYP" ? "ل.س" : "$";
    const formattedPrice =
      currency === "SYP"
        ? Math.round(price).toLocaleString("ar-SY")
        : price.toFixed(2);

    return `${formattedPrice} ${symbol}`;
  }
}

export default {
  useCurrentExchangeRate,
  usePriceConversion,
  useMultiplePriceConversion,
  usePriceDisplay,
  formatPrice,
};
