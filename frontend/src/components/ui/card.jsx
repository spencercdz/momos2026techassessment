import React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn("glass-card rounded-2xl p-6", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("mb-4 space-y-2", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold text-ink-900", className)} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
