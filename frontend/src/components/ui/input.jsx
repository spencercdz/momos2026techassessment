import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl border border-ink-500/15 bg-white px-4 text-sm text-ink-900",
      "placeholder:text-ink-500 focus:border-ember-500 focus:outline-none focus:ring-2",
      "focus:ring-ember-500/20",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
