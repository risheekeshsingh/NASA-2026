"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface UseFetchOptions<T> {
  initialData?: T;
  fallbackData?: T;
  autoFetch?: boolean;
}

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
  source: string;
  retry: () => void;
}

interface CacheEntry<T> {
  data: T;
  isFallback: boolean;
  source: string;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 60 * 1000; // 60s in-memory cache

export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const { initialData = null, fallbackData = null, autoFetch = true } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(Boolean(url && autoFetch));
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [source, setSource] = useState<string>("Local Cache");
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retry = useCallback(() => {
    if (url) {
      memoryCache.delete(url);
    }
    setRetryTrigger((prev) => prev + 1);
  }, [url]);

  useEffect(() => {
    if (!url || !autoFetch) {
      setLoading(false);
      return;
    }

    // Check 60-second in-memory cache if not an explicit retry
    if (retryTrigger === 0) {
      const cached = memoryCache.get(url) as CacheEntry<T> | undefined;
      if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        setData(cached.data);
        setIsFallback(cached.isFallback);
        setSource(cached.source);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Abort previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second rule

    setLoading(true);
    setError(null);

    async function executeFetch() {
      try {
        const response = await fetch(url as string, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();

        // Extract payload conforming to standard { data, isFallback, source }
        let payload: T;
        let isFb = false;
        let src = "API Telemetry";

        if (json && typeof json === "object") {
          payload = "data" in json ? (json.data as T) : (json as T);
          isFb = Boolean(json.isFallback);
          src = typeof json.source === "string" ? json.source : "API Telemetry";
        } else {
          payload = json as T;
        }

        setData(payload);
        setIsFallback(isFb);
        setSource(src);
        setError(null);

        // Store in 60s memory cache
        memoryCache.set(url as string, {
          data: payload,
          isFallback: isFb,
          source: src,
          timestamp: Date.now(),
        });
      } catch (err: unknown) {
        clearTimeout(timeoutId);

        if (err instanceof DOMException && err.name === "AbortError") {
          // Aborted or timed out
          setError("Request timed out after 8 seconds. Loaded offline backup telemetry.");
        } else {
          const message = err instanceof Error ? err.message : "Failed to load telemetry stream";
          setError(message);
        }

        // Apply fallback data if supplied
        if (fallbackData !== null) {
          setData(fallbackData);
          setIsFallback(true);
          setSource("Offline Backup Cache");
        }
      } finally {
        setLoading(false);
      }
    }

    executeFetch();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [url, autoFetch, retryTrigger, fallbackData]);

  return {
    data,
    loading,
    error,
    isFallback,
    source,
    retry,
  };
}
