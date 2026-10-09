import { Check } from "lucide-react";

export default function Toast({ message }: { message: string }) {
  return (
    <div className="pointer-events-auto flex animate-slide-up items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream shadow-float">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cobalt">
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
      {message}
    </div>
  );
}
