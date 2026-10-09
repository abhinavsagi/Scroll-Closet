import { notFound } from "next/navigation";
import { creators, getOutfitsByCreator } from "@/lib/data";
import ProfileHeader from "@/components/ProfileHeader";
import OutfitGrid from "@/components/OutfitGrid";

export function generateStaticParams() {
  return creators.map((c) => ({ id: c.id }));
}

export default function CreatorPage({ params }: { params: { id: string } }) {
  const creator = creators.find((c) => c.id === params.id);
  if (!creator) notFound();

  const looks = getOutfitsByCreator(creator.id);

  return (
    <section className="container-page py-10 lg:py-12">
      <ProfileHeader creator={creator} />

      <div className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Available Looks
          </h2>
          <p className="text-sm text-ink-muted">
            {looks.length} {looks.length === 1 ? "outfit" : "outfits"}
          </p>
        </div>
        <div className="mt-6">
          <OutfitGrid
            outfits={looks}
            emptyMessage={`${creator.name} hasn't listed any looks yet.`}
          />
        </div>
      </div>
    </section>
  );
}
