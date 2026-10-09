"use client";

import { useMemo, useState } from "react";
import { Check, Truck, Store, CalendarCheck } from "lucide-react";
import type { Outfit } from "@/lib/types";
import { getCreator, formatCurrency } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";
import Modal from "@/components/ui/Modal";

const SERVICE_FEE = 49;
const DELIVERY_FEE = 60;

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export default function RentalModal({ outfit }: { outfit: Outfit }) {
  const { closeRental, toast } = useApp();
  const creator = getCreator(outfit.creatorId);

  const [size, setSize] = useState<string>(outfit.sizes[0] ?? "M");
  const [start, setStart] = useState(todayISO(1));
  const [end, setEnd] = useState(todayISO(3));
  const [delivery, setDelivery] = useState<"Delivery" | "Pickup">(
    outfit.pickup === "Pickup" ? "Pickup" : "Delivery"
  );
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.round((e - s) / 86400000);
    return Math.max(1, diff || 1);
  }, [start, end]);

  const rentalCost = outfit.pricePerDay * days;
  const deliveryFee = delivery === "Delivery" ? DELIVERY_FEE : 0;
  const total = rentalCost + SERVICE_FEE + deliveryFee;

  const canPickup = outfit.pickup === "Pickup" || outfit.pickup === "Both";
  const canDeliver = outfit.pickup === "Delivery" || outfit.pickup === "Both";

  const invalidDates = new Date(end) <= new Date(start);

  return (
    <Modal onClose={closeRental} size="lg" label="Rent this look">
      {confirmed ? (
        <div className="flex flex-col items-center px-6 py-16 text-center sm:px-16">
          <span className="flex h-20 w-20 animate-scale-in items-center justify-center rounded-full bg-cobalt text-white">
            <Check className="h-9 w-9" strokeWidth={2.5} />
          </span>
          <h2 className="mt-6 font-display text-3xl text-ink">
            Rental request confirmed!
          </h2>
          <p className="mt-2 max-w-md text-ink-muted">
            {creator?.name} has been notified. You&apos;ll get a message to
            arrange {delivery === "Delivery" ? "delivery" : "pickup"} of{" "}
            <span className="font-medium text-ink">{outfit.name}</span>.
          </p>

          <div className="mt-7 w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-5 text-left">
            <div className="flex items-center gap-3">
              <img
                src={outfit.image}
                alt={outfit.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-ink">{outfit.name}</p>
                <p className="text-ink-muted">
                  Size {size} · {days} {days === 1 ? "day" : "days"}
                </p>
                <p className="text-ink-muted">
                  {start} → {end}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-sm">
              <span className="text-ink-muted">Total paid</span>
              <span className="font-display text-lg font-semibold text-ink">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="mt-7 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
            <button onClick={closeRental} className="btn-outline flex-1">
              Keep browsing
            </button>
            <a href="/messages" className="btn-primary flex-1">
              Message {creator?.name.split(" ")[0]}
            </a>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2">
          {/* Image side */}
          <div className="relative hidden min-h-[560px] overflow-hidden rounded-l-4xl bg-cream-200 sm:block">
            <img
              src={outfit.image}
              alt={outfit.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 text-cream">
              <p className="eyebrow text-cream/70">{outfit.category}</p>
              <h3 className="font-display text-2xl">{outfit.name}</h3>
              {creator && (
                <p className="mt-1 flex items-center gap-2 text-sm text-cream/90">
                  <img
                    src={creator.avatar}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  @{creator.username}
                </p>
              )}
            </div>
          </div>

          {/* Form side */}
          <div className="max-h-[85vh] overflow-y-auto p-6 sm:max-h-[560px] sm:p-7">
            <p className="eyebrow">Reserve this look</p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              {outfit.name}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {formatCurrency(outfit.pricePerDay)} per day
            </p>

            {/* Sizes */}
            <div className="mt-5">
              <span className="label">Available sizes</span>
              <div className="flex flex-wrap gap-2">
                {(["XS", "S", "M", "L", "XL"] as const).map((s) => {
                  const avail = outfit.sizes.includes(s);
                  return (
                    <button
                      key={s}
                      disabled={!avail}
                      onClick={() => setSize(s)}
                      className={`flex h-10 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                        size === s
                          ? "border-cobalt bg-cobalt text-white"
                          : avail
                          ? "border-ink/15 bg-white text-ink hover:border-ink/40"
                          : "cursor-not-allowed border-ink/5 bg-cream-200 text-ink-muted/40 line-through"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <span className="label">Start date</span>
                <input
                  type="date"
                  value={start}
                  min={todayISO()}
                  onChange={(e) => setStart(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <span className="label">End date</span>
                <input
                  type="date"
                  value={end}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            {invalidDates && (
              <p className="mt-2 text-xs font-medium text-ember">
                End date must be after the start date.
              </p>
            )}

            {/* Delivery */}
            <div className="mt-5">
              <span className="label">Delivery / Pickup</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={!canDeliver}
                  onClick={() => setDelivery("Delivery")}
                  className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${
                    delivery === "Delivery"
                      ? "border-cobalt bg-cobalt-soft"
                      : "border-ink/15 bg-white hover:border-ink/40"
                  } ${!canDeliver ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <Truck className="h-4 w-4 text-cobalt" />
                  <span>
                    <span className="block font-semibold text-ink">
                      Delivery
                    </span>
                    <span className="text-xs text-ink-muted">
                      +{formatCurrency(DELIVERY_FEE)}
                    </span>
                  </span>
                </button>
                <button
                  disabled={!canPickup}
                  onClick={() => setDelivery("Pickup")}
                  className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${
                    delivery === "Pickup"
                      ? "border-cobalt bg-cobalt-soft"
                      : "border-ink/15 bg-white hover:border-ink/40"
                  } ${!canPickup ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <Store className="h-4 w-4 text-cobalt" />
                  <span>
                    <span className="block font-semibold text-ink">Pickup</span>
                    <span className="text-xs text-ink-muted">Free</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 space-y-2 rounded-2xl bg-white p-4 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>
                  {formatCurrency(outfit.pricePerDay)} × {days}{" "}
                  {days === 1 ? "day" : "days"}
                </span>
                <span className="text-ink">{formatCurrency(rentalCost)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Service fee</span>
                <span className="text-ink">{formatCurrency(SERVICE_FEE)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-ink-muted">
                  <span>Delivery</span>
                  <span className="text-ink">
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-ink/10 pt-2.5 text-base font-semibold">
                <span className="text-ink">Estimated total</span>
                <span className="font-display text-ink">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <button
              disabled={invalidDates}
              onClick={() => {
                setConfirmed(true);
                toast("Rental request sent!");
              }}
              className="btn-primary mt-5 w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarCheck className="h-4 w-4" />
              Confirm Rental
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
