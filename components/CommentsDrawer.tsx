"use client";

import { useEffect, useState } from "react";
import { X, Heart, Send } from "lucide-react";
import type { Outfit, Comment } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";

export default function CommentsDrawer({ outfit }: { outfit: Outfit }) {
  const { closeComments, toast } = useApp();
  const [comments, setComments] = useState<Comment[]>(outfit.comments);
  const [text, setText] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeComments();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeComments]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments((c) => [
      ...c,
      {
        id: "new-" + Date.now(),
        user: "you",
        avatar:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&q=80",
        text: text.trim(),
        time: "now",
      },
    ]);
    setText("");
    toast("Comment posted");
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex justify-end bg-ink/40 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && closeComments()}
    >
      <aside className="flex h-full w-full max-w-md animate-slide-in-right flex-col bg-cream-50 shadow-float">
        <header className="flex items-center justify-between border-b border-ink/[0.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src={outfit.image}
              alt=""
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div>
              <p className="font-display text-base text-ink">{outfit.name}</p>
              <p className="text-xs text-ink-muted">
                {comments.length} comments
              </p>
            </div>
          </div>
          <button
            onClick={closeComments}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
            aria-label="Close comments"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {comments.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <Heart className="h-8 w-8 text-ink-muted/40" />
              <p className="font-display text-lg text-ink">No comments yet</p>
              <p className="max-w-xs text-sm text-ink-muted">
                Be the first to say something nice about this look.
              </p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img
                  src={c.avatar}
                  alt={c.user}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-ink">@{c.user}</span>{" "}
                    <span className="text-ink-muted">· {c.time}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-ink-soft">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={submit}
          className="flex items-center gap-2 border-t border-ink/[0.08] bg-cream px-4 py-3"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            className="input flex-1"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cobalt text-white transition hover:bg-cobalt-dark disabled:opacity-40"
            aria-label="Post comment"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </div>
  );
}
