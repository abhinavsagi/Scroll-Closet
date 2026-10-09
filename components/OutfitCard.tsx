"use client";

import Link from "next/link";
import { Heart, Share2, MessageCircle } from "lucide-react";
import type { Outfit } from "@/lib/types";
import { getCreator, formatCurrency } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

export default function OutfitCard({ outfit }: { outfit: Outfit }) {
  const { isLiked, toggleLike, openRental, openComments, toast } = useApp();
  const creator = getCreator(outfit.creatorId);
  const liked = isLiked(outfit.id);
  const likeCount = outfit.likes + (liked ? 1 : 0);

  return (
    <article className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
        <img
          src={outfit.image}
          alt={outfit.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* top row */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="chip bg-white/90 text-ink backdrop-blur">
            {outfit.category}
          </span>
          <button
            onClick={() => {
              toggleLike(outfit.id);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white"
            aria-label={liked ? "Unlike" : "Like"}
            aria-pressed={liked}
          >
            <Heart
              className={`h-[18px] w-[18px] transition ${
                liked ? "fill-ember text-ember" : "text-ink"
              }`}
            />
          </button>
        </div>

        {/* availability */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`chip gap-1.5 backdrop-blur ${
              outfit.available
                ? "bg-white/90 text-ink"
                : "bg-ink/80 text-cream"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                outfit.available ? "bg-emerald-500" : "bg-ember"
              }`}
            />
            {outfit.available ? "Available" : "Rented out"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-medium leading-tight text-ink">
              {outfit.name}
            </h3>
            {creator && (
              <Link
                href={`/creators/${creator.id}`}
                className="mt-1.5 flex items-center gap-2 text-sm text-ink-muted transition hover:text-cobalt"
              >
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                @{creator.username}
              </Link>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-lg font-semibold text-ink">
              {formatCurrency(outfit.pricePerDay)}
            </p>
            <p className="-mt-0.5 text-xs text-ink-muted">per day</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1">
          <button
            onClick={() => toggleLike(outfit.id)}
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-ink/5"
            aria-label="Like"
          >
            <Heart
              className={`h-4 w-4 ${liked ? "fill-ember text-ember" : ""}`}
            />
            {likeCount}
          </button>
          <button
            onClick={() => openComments(outfit)}
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-ink/5"
            aria-label="Comments"
          >
            <MessageCircle className="h-4 w-4" />
            {outfit.comments.length}
          </button>
          <button
            onClick={() => toast("Share link copied to clipboard")}
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-ink/5"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={() => openRental(outfit)}
            disabled={!outfit.available}
            className="btn-dark ml-auto px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            Rent this look
          </button>
        </div>
      </div>
    </article>
  );
}
