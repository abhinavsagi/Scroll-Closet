import Link from "next/link";
import { ArrowRight, Leaf, Wallet, Recycle } from "lucide-react";
import DiscoverFeed from "@/components/DiscoverFeed";
import CreatorCard from "@/components/CreatorCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ListOutfitButton from "@/components/ListOutfitButton";
import { creators, formatCompact } from "@/lib/data";

const stats = [
  { value: "2.4K+", label: "Outfits" },
  { value: "860+", label: "Creators" },
  { value: "68%", label: "Less Waste" },
];

const steps = [
  {
    num: "01",
    tag: "Discover",
    title: "Find a look",
    body: "Browse real outfits from creators and people around you.",
  },
  {
    num: "02",
    tag: "Rent",
    title: "Wear it",
    body: "Choose your size, rental dates and delivery option.",
  },
  {
    num: "03",
    tag: "Share",
    title: "Keep it moving",
    body: "Return the outfit or list your own clothes and earn from your closet.",
  },
];

const sustainabilityMetrics = [
  { icon: Recycle, value: "41,200", label: "Clothes reused" },
  { icon: Wallet, value: "₹2.1 Cr", label: "Money saved" },
  { icon: Leaf, value: "128 T", label: "Estimated waste avoided" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 pb-10 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-16 lg:pt-16">
          <div className="animate-fade-in">
            <p className="eyebrow">Social Fashion · Peer-to-Peer Rental</p>
            <h1 className="mt-5 font-display text-[3.25rem] font-medium leading-[0.95] text-ink sm:text-7xl lg:text-[5.25rem]">
              Wear more.
              <br />
              <span className="text-cobalt">Buy less.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-muted">
              Discover outfits from real people, rent the looks you love, wear
              them, and put fashion back into circulation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/discover" className="btn-primary px-6 py-3 text-base">
                Explore Looks
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ListOutfitButton className="btn-outline px-6 py-3 text-base">
                List Your Outfit
              </ListOutfitButton>
            </div>

            {/* Stats */}
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-7">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-ink">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-cream-200 shadow-float">
              <img
                src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1100&q=80"
                alt="Editorial fashion portrait"
                className="h-full w-full object-cover"
              />
            </div>
            {/* floating price tag */}
            <div className="absolute -left-3 bottom-10 hidden animate-fade-in rounded-2xl bg-white p-4 shadow-float sm:block">
              <p className="text-xs font-medium text-ink-muted">Now renting</p>
              <p className="font-display text-lg text-ink">After Dark</p>
              <p className="text-sm font-semibold text-cobalt">₹599 / day</p>
            </div>
            {/* floating badge */}
            <div className="absolute -right-2 top-8 hidden rotate-3 animate-fade-in items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream shadow-float sm:flex">
              <span className="text-ember">△</span>
              Fashion in circulation
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE strip */}
      <section className="border-y border-ink/[0.08] bg-ink py-3.5 text-cream">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium">
          <span>Your closet can be someone else&apos;s next look</span>
          <span className="text-ember">△</span>
          <span>Discover → Rent → Wear → Share → Return → Repeat</span>
          <span className="text-ember">△</span>
          <span>Wear more. Buy less.</span>
        </div>
      </section>

      {/* DISCOVER FEED */}
      <section id="discover" className="container-page scroll-mt-24 py-16 lg:py-20">
        <SectionHeading
          eyebrow="The feed"
          title="Looks worth renting."
          description="Real outfits from real people. Filter by occasion and rent the ones you love."
          action={
            <Link href="/discover" className="btn-ghost hidden sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8">
          <DiscoverFeed limit={6} />
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/discover" className="btn-outline">
            View all looks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container-page scroll-mt-24 py-16 lg:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to a fuller wardrobe."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group card flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-semibold text-cobalt/20 transition group-hover:text-cobalt/40">
                  {s.num}
                </span>
                <span className="eyebrow">{s.tag}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section id="sustainability" className="scroll-mt-24 bg-cobalt py-20 text-white lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Why Scroll Closet
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
              Fashion in circulation.
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Instead of buying something new for every occasion, give great
              clothes more lives. Scroll Closet helps people earn from their
              wardrobes while reducing unnecessary fashion consumption.
            </p>
            <Link
              href="/discover"
              className="btn mt-8 bg-white px-6 py-3 text-base text-cobalt hover:bg-cream"
            >
              Start renting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {sustainabilityMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur"
              >
                <m.icon className="h-6 w-6 text-ember" />
                <p className="mt-4 font-display text-3xl font-semibold">
                  {m.value}
                </p>
                <p className="mt-1 text-sm text-white/70">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATORS */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Creator marketplace"
          title="Rent from people with taste."
          description="Follow creators, borrow their best pieces, and build a wardrobe that keeps moving."
          action={
            <Link href="/creators" className="btn-ghost hidden sm:inline-flex">
              All creators
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center text-cream sm:px-12 lg:py-20">
          <p className="eyebrow text-cream/60">Join the rotation</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.05] sm:text-5xl">
            Your closet can be someone else&apos;s next look.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/70">
            List the pieces you don&apos;t wear every day and earn while keeping
            fashion in circulation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ListOutfitButton className="btn-primary px-6 py-3 text-base">
              List an Outfit
            </ListOutfitButton>
            <Link
              href="/discover"
              className="btn border border-white/20 px-6 py-3 text-base text-cream hover:bg-white/10"
            >
              Explore Looks
            </Link>
          </div>
          <p className="mt-8 text-2xl text-cream/80">
            {formatCompact(49800)}+ items already in rotation
          </p>
        </div>
      </section>
    </>
  );
}
