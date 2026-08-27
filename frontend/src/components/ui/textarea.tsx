import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
          flex
          field-sizing-content
          min-h-24
          w-full
          resize-y
          rounded-lg
          border
          border-input
          bg-card
          px-3
          py-2.5
          text-base
          text-foreground
          outline-none
          transition-[color,background-color,border-color,box-shadow]
          duration-150

          placeholder:text-muted-foreground/70

          focus-visible:border-primary
          focus-visible:ring-3
          focus-visible:ring-primary/10

          disabled:cursor-not-allowed
          disabled:bg-muted
          disabled:text-muted-foreground
          disabled:opacity-70

          aria-invalid:border-destructive
          aria-invalid:ring-3
          aria-invalid:ring-destructive/10

          md:text-sm
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
