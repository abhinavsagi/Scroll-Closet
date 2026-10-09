import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl text-cobalt">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">
        This look is out of circulation.
      </h1>
      <p className="mt-2 max-w-sm text-ink-muted">
        The page you&apos;re after doesn&apos;t exist — but there are plenty more
        outfits to discover.
      </p>
      <Link href="/" className="btn-primary mt-6">
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </section>
  );
}
