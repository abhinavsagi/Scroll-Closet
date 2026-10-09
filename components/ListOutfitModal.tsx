"use client";

import { useState } from "react";
import { ImagePlus, Check, Upload } from "lucide-react";
import type { Outfit, Category } from "@/lib/types";
import { categories, formatCurrency } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";
import Modal from "@/components/ui/Modal";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
];

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export default function ListOutfitModal() {
  const { closeList, publishOutfit } = useApp();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<Exclude<Category, "All">>("Casual");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>(["M", "L"]);
  const [price, setPrice] = useState("299");
  const [available, setAvailable] = useState(true);
  const [pickup, setPickup] = useState<"Pickup" | "Delivery" | "Both">("Both");
  const [image, setImage] = useState(SAMPLE_IMAGES[0]);
  const [published, setPublished] = useState(false);

  const toggleSize = (s: string) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handlePublish = () => {
    const outfit: Outfit = {
      id: "user-" + Date.now(),
      name: name.trim() || "Untitled Look",
      category,
      pricePerDay: Number(price) || 0,
      image,
      creatorId: "me",
      available,
      sizes: sizes.length ? sizes : ["M"],
      likes: 0,
      rentals: 0,
      description: description.trim() || "A fresh look, ready to rent.",
      pickup,
      comments: [],
    };
    publishOutfit(outfit);
    setPublished(true);
    setTimeout(closeList, 1400);
  };

  return (
    <Modal onClose={closeList} size="lg" label="List an outfit">
      {published ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <span className="flex h-20 w-20 animate-scale-in items-center justify-center rounded-full bg-cobalt text-white">
            <Check className="h-9 w-9" strokeWidth={2.5} />
          </span>
          <h2 className="mt-6 font-display text-3xl text-ink">
            Your outfit is live!
          </h2>
          <p className="mt-2 max-w-sm text-ink-muted">
            {name || "Your look"} is now listed for rent on Discover. Someone
            could be wearing it this weekend.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-[1fr_300px]">
          {/* Form */}
          <div className="max-h-[85vh] overflow-y-auto p-6 sm:max-h-[640px] sm:p-7">
            <p className="eyebrow">Earn from your closet</p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              List an Outfit
            </h2>

            {/* Image */}
            <div className="mt-5">
              <span className="label">Outfit photo</span>
              <div className="flex gap-3">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-ink/10 bg-cream-200">
                  <img
                    src={image}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_IMAGES.map((src) => (
                      <button
                        key={src}
                        onClick={() => setImage(src)}
                        className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition ${
                          image === src
                            ? "border-cobalt"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <button className="mt-2 flex items-center gap-1.5 text-xs font-medium text-cobalt hover:underline">
                    <Upload className="h-3.5 w-3.5" />
                    Upload your own
                  </button>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="mt-5">
              <span className="label">Outfit name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Weekend Linen Set"
                className="input"
              />
            </div>

            {/* Category */}
            <div className="mt-4">
              <span className="label">Category</span>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c as Exclude<Category, "All">)}
                      className={`chip border px-3 py-1.5 ${
                        category === c
                          ? "border-ink bg-ink text-cream"
                          : "border-ink/15 bg-white text-ink-muted hover:text-ink"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <span className="label">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the fit, fabric and best occasions…"
                className="input resize-none"
              />
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <span className="label">Available sizes</span>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`flex h-10 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                      sizes.includes(s)
                        ? "border-cobalt bg-cobalt text-white"
                        : "border-ink/15 bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price + availability */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <span className="label">Rental price / day</span>
                <div className="flex items-center rounded-2xl border border-ink/15 bg-white px-4 focus-within:border-cobalt focus-within:ring-2 focus-within:ring-cobalt/15">
                  <span className="text-ink-muted">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-transparent py-3 pl-1 text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <span className="label">Pickup / delivery</span>
                <select
                  value={pickup}
                  onChange={(e) =>
                    setPickup(e.target.value as "Pickup" | "Delivery" | "Both")
                  }
                  className="input"
                >
                  <option value="Both">Pickup & Delivery</option>
                  <option value="Pickup">Pickup only</option>
                  <option value="Delivery">Delivery only</option>
                </select>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3.5">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="h-4 w-4 accent-cobalt"
              />
              <span className="text-sm text-ink">
                Available to rent immediately
              </span>
            </label>

            <button
              onClick={handlePublish}
              disabled={!name.trim()}
              className="btn-primary mt-6 w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" />
              Publish Outfit
            </button>
          </div>

          {/* Live preview */}
          <div className="hidden flex-col gap-3 border-l border-ink/[0.06] bg-cream p-6 sm:flex">
            <p className="eyebrow">Live preview</p>
            <article className="card overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="chip absolute left-3 top-3 bg-white/90 text-ink">
                  {category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="truncate font-display text-lg text-ink">
                  {name || "Untitled Look"}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-muted">
                  <img
                    src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=80&q=80"
                    alt=""
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  @you
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="font-display text-lg font-semibold text-ink">
                    {formatCurrency(Number(price) || 0)}
                    <span className="text-xs font-normal text-ink-muted">
                      {" "}
                      /day
                    </span>
                  </p>
                  <span className="chip bg-cream-200 text-ink">
                    {sizes.join(" · ") || "—"}
                  </span>
                </div>
              </div>
            </article>
            <p className="text-xs leading-relaxed text-ink-muted">
              This is how renters will see your outfit in the Discover feed.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
