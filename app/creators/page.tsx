import SectionHeading from "@/components/ui/SectionHeading";
import CreatorCard from "@/components/CreatorCard";
import { creators } from "@/lib/data";

export default function CreatorsPage() {
  return (
    <section className="container-page py-12 lg:py-16">
      <SectionHeading
        eyebrow="Creator marketplace"
        title="Fashion creators to follow."
        description="Discover the people lending out their best pieces. Follow them and rent their looks."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </section>
  );
}
