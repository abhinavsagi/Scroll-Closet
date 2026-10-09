"use client";

import type { Category } from "@/lib/types";
import { categories } from "@/lib/data";

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`chip shrink-0 border px-4 py-2 text-sm ${
              isActive
                ? "border-ink bg-ink text-cream"
                : "border-ink/15 bg-white text-ink-muted hover:border-ink/40 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
