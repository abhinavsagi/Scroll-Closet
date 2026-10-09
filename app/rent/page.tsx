import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RentalHistory from "@/components/RentalHistory";
import DiscoverFeed from "@/components/DiscoverFeed";

export default function RentPage() {
  return (
    <>
      <section className="container-page py-12 lg:py-16">
        <SectionHeading
          eyebrow="Your rentals"
          title="Everything you're wearing."
          description="Track current, upcoming and completed rentals in one place."
        />
        <div className="mt-8">
          <RentalHistory />
        </div>
      </section>

      <section className="container-page py-10 lg:py-14">
        <SectionHeading
          eyebrow="Keep going"
          title="Rent your next look."
          action={
            <Link href="/discover" className="btn-ghost hidden sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8">
          <DiscoverFeed limit={3} />
        </div>
      </section>
    </>
  );
}
