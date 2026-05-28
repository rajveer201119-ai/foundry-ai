import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn("h-11 w-full rounded-xl border border-white/10 bg-white/[0.07] px-4 text-sm text-white shadow-inner shadow-black/20 outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-200/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-300/15", className)}
      {...props}
    />
  );
}
