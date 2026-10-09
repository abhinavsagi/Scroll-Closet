"use client";

import { useMemo, useState } from "react";
import { TrendingUp, Package, Repeat, Wallet } from "lucide-react";
import type { ClosetItem as ClosetItemType } from "@/lib/types";
import { closetItems, formatCurrency } from "@/lib/data";
import ClosetItem from "@/components/ClosetItem";
import ListOutfitButton from "@/components/ListOutfitButton";

type Filter = "All" | ClosetItemType["status"];

const filters: Filter[] = ["All", "Listed", "Rented", "Available"];

export default function ClosetDashboard() {
  const [filter, setFilter] = useState<Filter>("All");

  const totals = useMemo(() => {
    const earnings = closetItems.reduce((a, i) => a + i.earnings, 0);
    const rentals = closetItems.reduce((a, i) => a + i.rentals, 0);
    const listed = closetItems.filter(
      (i) => i.status === "Listed" || i.status === "Available"
    ).length;
    return { earnings, rentals, listed, items: closetItems.length };
  }, []);

  const visible =
    filter === "All"
      ? closetItems
      : closetItems.filter((i) => i.status === filter);

  const statCards = [
    {
      icon: Wallet,
      label: "Total earnings",
      value: formatCurrency(totals.earnings),
      accent: "text-emerald-600",
    },
    {
      icon: Package,
      label: "Items in closet",
      value: String(totals.items),
      accent: "text-cobalt",
    },
    {
      icon: Repeat,
      label: "Total rentals",
      value: String(totals.rentals),
      accent: "text-ember",
    },
    {
      icon: TrendingUp,
      label: "Listed for rent",
      value: String(totals.listed),
      accent: "text-ink",
    },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="card p-5">
            <s.icon className={`h-5 w-5 ${s.accent}`} />
            <p className="mt-4 font-display text-2xl font-semibold text-ink">
              {s.value}
            </p>
            <p className="mt-0.5 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Earnings banner */}
      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-3xl bg-cobalt p-6 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
            This month
          </p>
          <p className="mt-1.5 font-display text-3xl font-semibold">
            {formatCurrency(8740)}{" "}
            <span className="text-base font-normal text-white/70">earned</span>
          </p>
          <p className="mt-1 text-sm text-white/70">
            Up 23% from last month — your closet is working.
          </p>
        </div>
        <ListOutfitButton className="btn bg-white px-6 py-3 text-base text-cobalt hover:bg-cream">
          List an Outfit
        </ListOutfitButton>
      </div>

      {/* Filters + grid */}
      <div className="mt-10 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl text-ink">My Items</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip border px-3.5 py-1.5 text-sm ${
                filter === f
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 bg-white text-ink-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((i) => (
          <ClosetItem key={i.id} item={i} />
        ))}
        {/* Add tile */}
        <ListOutfitButton
          showIcon={false}
          className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ink/15 bg-white/50 text-ink-muted transition hover:border-cobalt hover:text-cobalt"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
            +
          </span>
          <span className="text-sm font-medium">List an Outfit</span>
        </ListOutfitButton>
      </div>
    </div>
  );
}
