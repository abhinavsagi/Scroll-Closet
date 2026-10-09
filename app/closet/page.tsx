import SectionHeading from "@/components/ui/SectionHeading";
import ClosetDashboard from "@/components/ClosetDashboard";

export default function ClosetPage() {
  return (
    <section className="container-page py-12 lg:py-16">
      <SectionHeading
        eyebrow="My Closet"
        title="Your wardrobe, working."
        description="Manage your items, track what's rented, and watch your earnings grow."
      />
      <div className="mt-8">
        <ClosetDashboard />
      </div>
    </section>
  );
}
