import { Repeat } from "lucide-react";
import type { ClosetItem as ClosetItemType } from "@/lib/types";
import { formatCurrency } from "@/lib/data";

const statusStyles: Record<ClosetItemType["status"], string> = {
  Available: "bg-emerald-50 text-emerald-700",
  Listed: "bg-cobalt-soft text-cobalt",
  Rented: "bg-ember-soft text-ember",
};

export default function ClosetItem({ item }: { item: ClosetItemType }) {
  return (
    <article className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`chip absolute left-3 top-3 ${statusStyles[item.status]}`}
        >
          {item.status}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base text-ink">
              {item.name}
            </h3>
            <p className="text-xs text-ink-muted">{item.category}</p>
          </div>
          <p className="shrink-0 font-display text-base font-semibold text-ink">
            {formatCurrency(item.pricePerDay)}
            <span className="text-xs font-normal text-ink-muted">/day</span>
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink/[0.06] pt-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <Repeat className="h-3.5 w-3.5" />
            {item.rentals} rentals
          </span>
          <span className="font-medium text-emerald-600">
            {formatCurrency(item.earnings)} earned
          </span>
        </div>
      </div>
    </article>
  );
}
