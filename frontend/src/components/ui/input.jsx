import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border border-ink-500/12 bg-white/90 px-4 text-sm text-ink-900 shadow-sm",
      "placeholder:text-ink-500",
      // Ensure the input itself always remains interactive and clickable
      "pointer-events-auto",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50",
      "focus:border-ember-500",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
