"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Outfit } from "@/lib/types";
import { outfits as seedOutfits } from "@/lib/data";
import Toast from "@/components/ui/Toast";

interface ToastItem {
  id: number;
  message: string;
}

interface AppState {
  likedOutfits: Set<string>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;

  followedCreators: Set<string>;
  toggleFollow: (id: string) => void;
  isFollowing: (id: string) => boolean;

  // Rental modal
  rentalOutfit: Outfit | null;
  openRental: (outfit: Outfit) => void;
  closeRental: () => void;

  // List an outfit modal
  listOpen: boolean;
  openList: () => void;
  closeList: () => void;

  // Comments drawer
  commentsOutfit: Outfit | null;
  openComments: (outfit: Outfit) => void;
  closeComments: () => void;

  // User-published outfits (session only)
  userOutfits: Outfit[];
  publishOutfit: (outfit: Outfit) => void;

  toast: (message: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedOutfits, setLikedOutfits] = useState<Set<string>>(new Set());
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(
    new Set()
  );
  const [rentalOutfit, setRentalOutfit] = useState<Outfit | null>(null);
  const [commentsOutfit, setCommentsOutfit] = useState<Outfit | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [userOutfits, setUserOutfits] = useState<Outfit[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const toggleLike = useCallback(
    (id: string) => {
      setLikedOutfits((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const isLiked = useCallback((id: string) => likedOutfits.has(id), [likedOutfits]);

  const toggleFollow = useCallback(
    (id: string) => {
      setFollowedCreators((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          toast("Unfollowed");
        } else {
          next.add(id);
          toast("Following — you'll see their new looks first");
        }
        return next;
      });
    },
    [toast]
  );

  const isFollowing = useCallback(
    (id: string) => followedCreators.has(id),
    [followedCreators]
  );

  const openRental = useCallback((outfit: Outfit) => setRentalOutfit(outfit), []);
  const closeRental = useCallback(() => setRentalOutfit(null), []);
  const openList = useCallback(() => setListOpen(true), []);
  const closeList = useCallback(() => setListOpen(false), []);
  const openComments = useCallback((outfit: Outfit) => setCommentsOutfit(outfit), []);
  const closeComments = useCallback(() => setCommentsOutfit(null), []);

  const publishOutfit = useCallback(
    (outfit: Outfit) => {
      setUserOutfits((prev) => [outfit, ...prev]);
      toast("Outfit published to Discover 🎉");
    },
    [toast]
  );

  const value = useMemo<AppState>(
    () => ({
      likedOutfits,
      toggleLike,
      isLiked,
      followedCreators,
      toggleFollow,
      isFollowing,
      rentalOutfit,
      openRental,
      closeRental,
      listOpen,
      openList,
      closeList,
      commentsOutfit,
      openComments,
      closeComments,
      userOutfits,
      publishOutfit,
      toast,
    }),
    [
      likedOutfits,
      toggleLike,
      isLiked,
      followedCreators,
      toggleFollow,
      isFollowing,
      rentalOutfit,
      openRental,
      closeRental,
      listOpen,
      openList,
      closeList,
      commentsOutfit,
      openComments,
      closeComments,
      userOutfits,
      publishOutfit,
      toast,
    ]
  );

  // Avoid unused warning while keeping seedOutfits import meaningful for consumers
  void seedOutfits;

  return (
    <AppContext.Provider value={value}>
      {children}
      <GlobalModals />
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} />
        ))}
      </div>
    </AppContext.Provider>
  );
}

// Lazy import to keep modals mounted once at the root
import RentalModal from "@/components/RentalModal";
import ListOutfitModal from "@/components/ListOutfitModal";
import CommentsDrawer from "@/components/CommentsDrawer";

function GlobalModals() {
  const { rentalOutfit, listOpen, commentsOutfit } = useApp();
  return (
    <>
      {rentalOutfit && <RentalModal outfit={rentalOutfit} />}
      {listOpen && <ListOutfitModal />}
      {commentsOutfit && <CommentsDrawer outfit={commentsOutfit} />}
    </>
  );
}
