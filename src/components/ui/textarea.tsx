import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn("min-h-28 w-full rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-6 text-white shadow-inner shadow-black/20 outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-200/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-300/15", className)}
      {...props}
    />
  );
}
