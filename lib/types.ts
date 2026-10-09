export type Category =
  | "All"
  | "Campus"
  | "Streetwear"
  | "Party"
  | "Date Night"
  | "Traditional"
  | "Casual";

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Outfit {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  pricePerDay: number;
  image: string;
  creatorId: string;
  available: boolean;
  sizes: string[];
  likes: number;
  rentals: number;
  description: string;
  pickup: "Pickup" | "Delivery" | "Both";
  comments: Comment[];
}

export interface Creator {
  id: string;
  username: string;
  name: string;
  avatar: string;
  cover: string;
  bio: string;
  followers: number;
  totalOutfits: number;
  rating: number;
  earnings: number;
  location: string;
}

export interface Rental {
  id: string;
  outfitId: string;
  outfitName: string;
  image: string;
  creatorId: string;
  creator: string;
  startDate: string;
  endDate: string;
  returnDate: string;
  amount: number;
  status: "Current" | "Upcoming" | "Completed";
}

export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  creatorId: string;
  name: string;
  username: string;
  avatar: string;
  outfit: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

export interface ClosetItem {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  image: string;
  status: "Available" | "Listed" | "Rented";
  pricePerDay: number;
  rentals: number;
  earnings: number;
}
