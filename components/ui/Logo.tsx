import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-1 text-[19px] font-semibold tracking-tight text-ink ${className}`}
      aria-label="Scroll Closet home"
    >
      <span>SCROLL</span>
      <span
        className="inline-block text-cobalt transition-transform duration-300 group-hover:rotate-180"
        aria-hidden
      >
        △
      </span>
      <span>CLOSET</span>
    </Link>
  );
}
