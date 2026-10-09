"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  onClose,
  children,
  size = "md",
  label,
}: {
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg";
  label?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center overflow-y-auto bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full animate-slide-up rounded-t-4xl bg-cream-50 shadow-float sm:animate-scale-in sm:rounded-4xl ${
          size === "lg" ? "sm:max-w-4xl" : "sm:max-w-lg"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white hover:shadow-md"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
