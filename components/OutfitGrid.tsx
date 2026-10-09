import { Search } from "lucide-react";
import type { Outfit } from "@/lib/types";
import OutfitCard from "@/components/OutfitCard";

export default function OutfitGrid({
  outfits,
  emptyMessage = "No looks match your filters yet.",
}: {
  outfits: Outfit[];
  emptyMessage?: string;
}) {
  if (outfits.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-200 text-ink-muted">
          <Search className="h-6 w-6" />
        </span>
        <p className="font-display text-xl text-ink">Nothing here yet</p>
        <p className="max-w-sm text-sm text-ink-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {outfits.map((o) => (
        <OutfitCard key={o.id} outfit={o} />
      ))}
    </div>
  );
}
