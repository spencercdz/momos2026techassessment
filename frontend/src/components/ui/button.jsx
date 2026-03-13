import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "bg-ember-500 text-white shadow-sm hover:bg-ember-600 hover:shadow-md active:translate-y-px",
        ghost:
          "bg-transparent text-ink-700 hover:bg-sand-100/80 hover:text-ink-900",
        outline:
          "border border-ink-500/20 bg-white/70 text-ink-800 hover:bg-sand-50/80"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const Button = React.forwardRef(
  (
    { className, variant, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50",
          "disabled:pointer-events-none disabled:opacity-60",
          buttonVariants({ variant, size }),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
