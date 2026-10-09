"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useApp } from "@/components/providers/AppProvider";

export default function ListOutfitButton({
  children,
  className = "btn-primary",
  showIcon = true,
}: {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  const { openList } = useApp();
  return (
    <button onClick={openList} className={className}>
      {showIcon && <Plus className="h-4 w-4" strokeWidth={2.5} />}
      {children}
    </button>
  );
}
