import Link from "next/link";
import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/discover", label: "Discover" },
      { href: "/rent", label: "Rent" },
      { href: "/closet", label: "My Closet" },
      { href: "/messages", label: "Messages" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#sustainability", label: "Sustainability" },
      { href: "/creators", label: "Creators" },
      { href: "/#", label: "About" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#", label: "Contact" },
      { href: "/#", label: "Help Centre" },
      { href: "/#", label: "Trust & Safety" },
      { href: "/#", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/[0.08] bg-cream-50">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 font-display text-2xl leading-tight text-ink">
              Wear more. <br />
              Buy less.
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Fashion in circulation. Your closet can be someone else&apos;s
              next look.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-cobalt"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink/[0.08] pt-6 text-sm text-ink-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Scroll Closet. A prototype.</p>
          <p className="flex items-center gap-2">
            Made for a more circular wardrobe
            <span className="text-cobalt">△</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
