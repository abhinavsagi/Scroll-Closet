"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Menu, X, Plus, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useApp } from "@/components/providers/AppProvider";

const links = [
  { href: "/discover", label: "Discover" },
  { href: "/rent", label: "Rent" },
  { href: "/closet", label: "My Closet" },
  { href: "/messages", label: "Messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openList } = useApp();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[90] border-b border-ink/[0.06] bg-cream/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute inset-x-3.5 -bottom-[18px] h-0.5 rounded-full bg-cobalt" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden items-center md:flex">
            {searchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) {
                    window.location.href = `/discover?q=${encodeURIComponent(
                      query.trim()
                    )}`;
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 animate-fade-in"
              >
                <Search className="h-4 w-4 text-ink-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search looks, creators…"
                  className="w-44 bg-transparent text-sm outline-none placeholder:text-ink-muted/70"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-4 w-4 text-ink-muted hover:text-ink" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-ink/5 hover:text-ink"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
            )}
          </div>

          <Link
            href="/messages"
            className="relative hidden h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-ink/5 hover:text-ink md:flex"
            aria-label="Messages"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ember ring-2 ring-cream" />
          </Link>

          <button
            onClick={openList}
            className="btn-primary hidden sm:inline-flex"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            List an Outfit
          </button>

          <Link
            href="/profile"
            className="hidden h-9 w-9 overflow-hidden rounded-full ring-2 ring-white transition hover:ring-cobalt sm:block"
            aria-label="Your profile"
          >
            <img
              src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&q=80"
              alt="Your avatar"
              className="h-full w-full object-cover"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t border-ink/[0.06] bg-cream lg:hidden">
          <div className="container-page space-y-1 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  window.location.href = `/discover?q=${encodeURIComponent(
                    query.trim()
                  )}`;
                }
              }}
              className="mb-3 flex items-center gap-2 rounded-2xl border border-ink/15 bg-white px-3.5 py-2.5"
            >
              <Search className="h-4 w-4 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search looks, creators…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                  isActive(l.href)
                    ? "bg-ink text-cream"
                    : "text-ink hover:bg-ink/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/profile"
              className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-ink/5"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                openList();
              }}
              className="btn-primary mt-2 w-full"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              List an Outfit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
