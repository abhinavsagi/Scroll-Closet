import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Creator } from "@/lib/types";
import ProfileHeader from "@/components/ProfileHeader";
import ClosetItem from "@/components/ClosetItem";
import RentalHistory from "@/components/RentalHistory";
import ListOutfitButton from "@/components/ListOutfitButton";
import { closetItems } from "@/lib/data";

const me: Creator = {
  id: "me",
  username: "you",
  name: "Zara Sheikh",
  avatar:
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=80",
  cover:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
  bio: "Student, thrifter and part-time stylist. Renting out the pieces I love so they get worn far more than I ever could alone.",
  followers: 3400,
  totalOutfits: closetItems.length,
  rating: 4.9,
  earnings: closetItems.reduce((a, i) => a + i.earnings, 0),
  location: "Bengaluru",
};

export default function ProfilePage() {
  const listed = closetItems.filter(
    (i) => i.status === "Listed" || i.status === "Available"
  );

  return (
    <section className="container-page py-10 lg:py-12">
      <ProfileHeader creator={me} isOwn />

      {/* Listed looks */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Available Looks
          </h2>
          <ListOutfitButton className="btn-ghost hidden sm:inline-flex">
            List an Outfit
          </ListOutfitButton>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {listed.map((i) => (
            <ClosetItem key={i.id} item={i} />
          ))}
        </div>
      </div>

      {/* Rental activity */}
      <div className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Rental Activity
          </h2>
          <Link href="/rent" className="btn-ghost hidden sm:inline-flex">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6">
          <RentalHistory />
        </div>
      </div>
    </section>
  );
}
