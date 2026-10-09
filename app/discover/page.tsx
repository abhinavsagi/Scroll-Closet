"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DiscoverFeed from "@/components/DiscoverFeed";
import SectionHeading from "@/components/ui/SectionHeading";

function DiscoverContent() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  return (
    <section className="container-page py-12 lg:py-16">
      <SectionHeading
        eyebrow="Discover"
        title="Looks worth renting."
        description="Browse the full feed. Filter by occasion, search by vibe, and rent what you love."
      />
      <div className="mt-8">
        <DiscoverFeed initialQuery={q} showSearchResult />
      </div>
    </section>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="container-page py-16">Loading…</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
