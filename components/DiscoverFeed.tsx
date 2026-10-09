"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/lib/types";
import { outfits as seedOutfits } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";
import CategoryFilter from "@/components/CategoryFilter";
import OutfitGrid from "@/components/OutfitGrid";

export default function DiscoverFeed({
  initialQuery = "",
  showSearchResult = false,
  limit,
}: {
  initialQuery?: string;
  showSearchResult?: boolean;
  limit?: number;
}) {
  const { userOutfits } = useApp();
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState(initialQuery);

  const all = useMemo(() => [...userOutfits, ...seedOutfits], [userOutfits]);

  const filtered = useMemo(() => {
    let list = all;
    if (active !== "All") list = list.filter((o) => o.category === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.category.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
      );
    }
    return limit ? list.slice(0, limit) : list;
  }, [all, active, query, limit]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryFilter active={active} onChange={setActive} />
        {showSearchResult && (
          <div className="relative lg:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search looks…"
              className="input"
            />
          </div>
        )}
      </div>

      {query.trim() && (
        <p className="mt-4 text-sm text-ink-muted">
          {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
          <span className="font-medium text-ink">&ldquo;{query}&rdquo;</span>
        </p>
      )}

      <div className="mt-6">
        <OutfitGrid
          outfits={filtered}
          emptyMessage={
            query
              ? `We couldn't find a look matching "${query}". Try another search or category.`
              : "No looks in this category yet. Be the first to list one."
          }
        />
      </div>
    </div>
  );
}
