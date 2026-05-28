import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-[-0.01em] transition duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#efffff,#67e8f9_40%,#8fffd2)] text-slate-950 shadow-[0_14px_40px_rgba(103,232,249,0.22)] hover:scale-[1.02] hover:shadow-[0_18px_55px_rgba(103,232,249,0.34)]",
        secondary:
          "border border-white/15 bg-white/[0.08] text-white shadow-inner shadow-white/5 backdrop-blur-xl hover:scale-[1.02] hover:bg-white/[0.13]",
        ghost: "text-slate-300 hover:bg-white/[0.08] hover:text-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
