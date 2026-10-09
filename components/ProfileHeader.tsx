"use client";

import { Star, MapPin, Users, Shirt, Wallet, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Creator } from "@/lib/types";
import { formatCompact, formatCurrency } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

export default function ProfileHeader({
  creator,
  isOwn = false,
}: {
  creator: Creator;
  isOwn?: boolean;
}) {
  const { isFollowing, toggleFollow } = useApp();
  const following = isFollowing(creator.id);

  const stats = [
    { icon: Users, value: formatCompact(creator.followers), label: "Followers" },
    { icon: Shirt, value: String(creator.totalOutfits), label: "Outfits" },
    { icon: Star, value: creator.rating.toFixed(1), label: "Rating" },
    {
      icon: Wallet,
      value: formatCurrency(creator.earnings),
      label: "Earnings",
    },
  ];

  return (
    <div className="overflow-hidden rounded-4xl border border-ink/[0.06] bg-white shadow-card">
      <div className="relative h-44 overflow-hidden bg-cream-200 sm:h-56">
        <img src={creator.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
      </div>

      <div className="px-6 pb-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="-mt-14 h-28 w-28 rounded-full border-4 border-white object-cover shadow-float"
            />
            <div className="pb-1">
              <h1 className="font-display text-2xl text-ink sm:text-3xl">
                {creator.name}
              </h1>
              <p className="text-sm text-ink-muted">@{creator.username}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
                <MapPin className="h-3.5 w-3.5" />
                {creator.location}
              </p>
            </div>
          </div>

          {!isOwn && (
            <div className="flex gap-2">
              <Link href="/messages" className="btn-outline">
                <MessageCircle className="h-4 w-4" />
                Message
              </Link>
              <button
                onClick={() => toggleFollow(creator.id)}
                className={following ? "btn-outline" : "btn-primary"}
              >
                {following ? "Following" : "Follow"}
              </button>
            </div>
          )}
          {isOwn && (
            <Link href="/closet" className="btn-dark">
              Manage closet
            </Link>
          )}
        </div>

        <p className="mt-5 max-w-xl text-ink-muted">{creator.bio}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/[0.06] pt-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-cobalt">
                <s.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-none text-ink">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
