import * as React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-500/10 bg-white/92 p-6 shadow-[0_18px_45px_rgba(12,15,20,0.14)] backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("space-y-4 text-sm text-ink-900", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
