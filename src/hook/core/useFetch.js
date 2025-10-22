import { useState, useEffect, useRef, useCallback } from "react";

// Simple in-memory cache
const cache = new Map();
const DEFAULT_TTL = 30000; // 30 seconds

// Cache utilities
function getCacheKey(key) {
  return typeof key === "string" ? key : JSON.stringify(key);
}

function setCache(key, data, ttl = DEFAULT_TTL) {
  const cacheKey = getCacheKey(key);
  const expireAt = Date.now() + ttl;
  cache.set(cacheKey, { data, expireAt });
}

function getCache(key) {
  const cacheKey = getCacheKey(key);
  const item = cache.get(cacheKey);

  if (!item) return null;

  if (Date.now() > item.expireAt) {
    cache.delete(cacheKey);
    return null;
  }

  return item.data;
}

function clearCache(pattern) {
  if (!pattern) {
    cache.clear();
    return;
  }

  // Clear cache entries matching pattern
  for (const [key] of cache) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

// Main useFetch hook
function useFetch(key, fetcher, options = {}) {
  const {
    deps = [],
    ttl = DEFAULT_TTL,
    enabled = true,
    onSuccess,
    onError,
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const currentRetryRef = useRef(0);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  // Execute fetch with retry logic
  const executeFetch = useCallback(
    async (isRetry = false) => {
      if (!enabled || !key || !fetcher) return;

      // Check cache first (skip cache on retry)
      if (!isRetry) {
        const cachedData = getCache(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          setError(null);
          if (onSuccess) onSuccess(cachedData);
          return;
        }
      }

      // Cleanup previous request
      cleanup();

      // Create new AbortController
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(signal);

        // Check if request was aborted
        if (signal.aborted) return;

        // Cache successful result
        setCache(key, result, ttl);
        setData(result);
        setError(null);
        currentRetryRef.current = 0;

        if (onSuccess) onSuccess(result);
      } catch (err) {
        // Check if request was aborted
        if (signal.aborted || err.message === "Request was cancelled") {
          return;
        }

        console.error("useFetch error:", err);

        // Retry logic
        if (currentRetryRef.current < retryCount) {
          currentRetryRef.current += 1;
          retryTimeoutRef.current = setTimeout(() => {
            executeFetch(true);
          }, retryDelay * currentRetryRef.current);
          return;
        }

        setError(err);
        setData(null);
        currentRetryRef.current = 0;

        if (onError) onError(err);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [
      key,
      fetcher,
      enabled,
      ttl,
      onSuccess,
      onError,
      retryCount,
      retryDelay,
      cleanup,
    ]
  );

  // Refetch function
  const refetch = useCallback(() => {
    currentRetryRef.current = 0;
    executeFetch(true); // Force refetch (skip cache)
  }, [executeFetch]);

  // Effect to trigger fetch when dependencies change
  useEffect(() => {
    executeFetch();

    // Cleanup on unmount or dependency change
    return cleanup;
  }, [executeFetch, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

// Hook for mutations (POST, PUT, DELETE)
function useMutation(mutationFn, options = {}) {
  const { onSuccess, onError, onMutate } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const mutate = useCallback(
    async (variables) => {
      // Cleanup previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      try {
        if (onMutate) {
          await onMutate(variables);
        }

        const result = await mutationFn(variables, signal);

        if (signal.aborted) return;

        setData(result);
        setError(null);

        if (onSuccess) onSuccess(result, variables);

        return result;
      } catch (err) {
        if (signal.aborted || err.message === "Request was cancelled") {
          return;
        }

        console.error("useMutation error:", err);
        setError(err);

        if (onError) onError(err, variables);

        throw err;
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [mutationFn, onSuccess, onError, onMutate]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
    reset,
  };
}

// Hook for infinite queries (pagination)
function useInfiniteQuery(key, fetcher, options = {}) {
  const {
    getNextPageParam,
    deps = [],
    ttl = DEFAULT_TTL, // eslint-disable-line no-unused-vars
    enabled = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState({ pages: [], pageParams: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const abortControllerRef = useRef(null);

  const fetchPage = useCallback(
    async (pageParam = undefined, isNextPage = false) => {
      if (!enabled || !key || !fetcher) return;

      // Cleanup previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      if (isNextPage) {
        setIsFetchingNextPage(true);
      } else {
        setLoading(true);
        setError(null);
      }

      try {
        const result = await fetcher(pageParam, signal);

        if (signal.aborted) return;

        setData((prevData) => {
          if (isNextPage) {
            return {
              pages: [...prevData.pages, result],
              pageParams: [...prevData.pageParams, pageParam],
            };
          } else {
            return {
              pages: [result],
              pageParams: [pageParam],
            };
          }
        });

        // Check if there's a next page
        if (getNextPageParam) {
          const nextPageParam = getNextPageParam(result, data.pages);
          setHasNextPage(!!nextPageParam);
        }

        setError(null);

        if (onSuccess) onSuccess(result);
      } catch (err) {
        if (signal.aborted || err.message === "Request was cancelled") {
          return;
        }

        console.error("useInfiniteQuery error:", err);
        setError(err);

        if (onError) onError(err);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
          setIsFetchingNextPage(false);
        }
      }
    },
    [key, fetcher, enabled, getNextPageParam, data.pages, onSuccess, onError]
  );

  const fetchNextPage = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const lastPage = data.pages[data.pages.length - 1];
    if (getNextPageParam && lastPage) {
      const nextPageParam = getNextPageParam(lastPage, data.pages);
      if (nextPageParam) {
        fetchPage(nextPageParam, true);
      }
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    data.pages,
    getNextPageParam,
    fetchPage,
  ]);

  const refetch = useCallback(() => {
    setData({ pages: [], pageParams: [] });
    fetchPage();
  }, [fetchPage]);

  // Effect to trigger initial fetch
  useEffect(() => {
    fetchPage();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPage, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
}

// Export cache utilities for manual cache management
export const cacheUtils = {
  setCache,
  getCache,
  clearCache,
  getCacheKey,
};

export { useFetch, useMutation, useInfiniteQuery };
export default useFetch;
