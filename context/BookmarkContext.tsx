"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
  count: number;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  clearBookmarks: () => {},
  count: 0,
});

const STORAGE_KEY = "flamelens_bookmarked_experiments";

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Safe client-side storage load wrapped in try/catch (never crashes SSR or private browsing)
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setBookmarks(parsed);
          }
        }
      }
    } catch {
      // Fall back silently to in-memory state
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];

      try {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } catch {
        // Storage unavailable; keep in memory
      }

      return updated;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const clearBookmarks = () => {
    setBookmarks([]);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        count: bookmarks.length,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
