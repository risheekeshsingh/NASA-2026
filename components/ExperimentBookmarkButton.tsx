"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/context/BookmarkContext";

export function ExperimentBookmarkButton({
  experimentId,
  showLabel = true,
  className = "",
}: {
  experimentId: string;
  showLabel?: boolean;
  className?: string;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(experimentId);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(experimentId)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        bookmarked
          ? "bg-ember-500/20 text-ember-400 border border-ember-500/40 shadow-ember-glow"
          : "bg-space-900 text-slate-400 hover:text-white border border-space-800"
      } ${className}`}
      aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      title={bookmarked ? "Remove from shortlisted experiments" : "Shortlist this experiment"}
    >
      <Bookmark
        className={`w-3.5 h-3.5 ${bookmarked ? "fill-ember-400 text-ember-400" : "text-slate-400"}`}
      />
      {showLabel && (
        <span>{bookmarked ? "Shortlisted" : "Shortlist"}</span>
      )}
    </button>
  );
}
