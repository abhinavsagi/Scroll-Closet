"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Creator } from "@/lib/types";
import { formatCompact } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

export default function CreatorCard({ creator }: { creator: Creator }) {
  const { isFollowing, toggleFollow } = useApp();
  const following = isFollowing(creator.id);

  return (
    <div className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative h-28 overflow-hidden bg-cream-200">
        <img
          src={creator.cover}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
      </div>
      <div className="px-5 pb-5">
        <Link href={`/creators/${creator.id}`} className="block">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="-mt-9 h-16 w-16 rounded-full border-4 border-white object-cover shadow-sm"
          />
        </Link>
        <div className="mt-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/creators/${creator.id}`}
              className="font-display text-lg font-medium text-ink hover:text-cobalt"
            >
              {creator.name}
            </Link>
            <p className="text-sm text-ink-muted">@{creator.username}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-cream-200 px-2 py-1 text-xs font-semibold text-ink">
            <Star className="h-3 w-3 fill-ember text-ember" />
            {creator.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{creator.bio}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <span className="font-semibold text-ink">
              {formatCompact(creator.followers)}
            </span>{" "}
            <span className="text-ink-muted">followers</span>
          </div>
          <div>
            <span className="font-semibold text-ink">
              {creator.totalOutfits}
            </span>{" "}
            <span className="text-ink-muted">looks</span>
          </div>
        </div>

        <button
          onClick={() => toggleFollow(creator.id)}
          className={`mt-4 w-full ${following ? "btn-outline" : "btn-primary"}`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}
