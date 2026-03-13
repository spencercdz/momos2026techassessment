import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-ember-500 text-white hover:bg-ember-600",
      ghost: "bg-transparent text-ink-700 hover:bg-sand-100",
      outline: "border border-ink-500/20 text-ink-700 hover:bg-sand-100"
    };

    const sizes = {
      md: "h-11 px-5 text-sm",
      sm: "h-9 px-3 text-sm",
      lg: "h-12 px-6 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500/50",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
