"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { Rental } from "@/lib/types";
import { rentals, formatCurrency } from "@/lib/data";

const tabs: { key: Rental["status"]; label: string }[] = [
  { key: "Current", label: "Current" },
  { key: "Upcoming", label: "Upcoming" },
  { key: "Completed", label: "Completed" },
];

const statusStyles: Record<Rental["status"], string> = {
  Current: "bg-cobalt-soft text-cobalt",
  Upcoming: "bg-ember-soft text-ember",
  Completed: "bg-cream-200 text-ink-muted",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RentalHistory() {
  const [active, setActive] = useState<Rental["status"]>("Current");
  const list = rentals.filter((r) => r.status === active);

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((t) => {
          const count = rentals.filter((r) => r.status === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`chip border px-4 py-2 text-sm ${
                active === t.key
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 bg-white text-ink-muted hover:text-ink"
              }`}
            >
              {t.label}
              <span
                className={`ml-2 rounded-full px-1.5 text-xs ${
                  active === t.key ? "bg-cream/20" : "bg-ink/5"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {list.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Calendar className="h-8 w-8 text-ink-muted/40" />
            <p className="font-display text-xl text-ink">
              No {active.toLowerCase()} rentals
            </p>
            <p className="max-w-sm text-sm text-ink-muted">
              {active === "Current"
                ? "You're not wearing anything from the community right now."
                : active === "Upcoming"
                ? "Nothing booked yet — find your next look."
                : "Your completed rentals will appear here."}
            </p>
            <Link href="/discover" className="btn-primary mt-1">
              Explore looks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          list.map((r) => (
            <div
              key={r.id}
              className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={r.image}
                alt={r.outfitName}
                className="h-24 w-full rounded-2xl object-cover sm:h-20 sm:w-20"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-ink">
                    {r.outfitName}
                  </h3>
                  <span className={`chip ${statusStyles[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-ink-muted">
                  from{" "}
                  <Link
                    href={`/creators/${r.creatorId}`}
                    className="font-medium text-ink hover:text-cobalt"
                  >
                    @{r.creator}
                  </Link>
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(r.startDate)} – {formatDate(r.endDate)}
                  <span className="text-ink-muted/60">
                    · return by {formatDate(r.returnDate)}
                  </span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-xl font-semibold text-ink">
                  {formatCurrency(r.amount)}
                </p>
                <p className="text-xs text-ink-muted">total</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
