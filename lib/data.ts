import outfitsData from "@/data/outfits.json";
import creatorsData from "@/data/creators.json";
import rentalsData from "@/data/rentals.json";
import messagesData from "@/data/messages.json";
import closetData from "@/data/closet.json";
import type { Outfit, Creator, Rental, Thread, ClosetItem, Category } from "./types";

export const outfits = outfitsData as Outfit[];
export const creators = creatorsData as Creator[];
export const rentals = rentalsData as Rental[];
export const threads = messagesData as Thread[];
export const closetItems = closetData as ClosetItem[];

export const categories: Category[] = [
  "All",
  "Campus",
  "Streetwear",
  "Party",
  "Date Night",
  "Traditional",
  "Casual",
];

export function getCreator(id: string): Creator | undefined {
  return creators.find((c) => c.id === id);
}

export function getOutfit(id: string): Outfit | undefined {
  return outfits.find((o) => o.id === id);
}

export function getOutfitsByCreator(creatorId: string): Outfit[] {
  return outfits.filter((o) => o.creatorId === creatorId);
}

export function formatCurrency(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export function formatCompact(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  }
  return String(n);
}
