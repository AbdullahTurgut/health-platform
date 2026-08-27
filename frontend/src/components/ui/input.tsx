import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        `
          h-10
          w-full
          min-w-0
          rounded-lg
          border
          border-input
          bg-card
          px-3
          py-2
          text-base
          text-foreground
          outline-none
          transition-[color,background-color,border-color,box-shadow]
          duration-150

          placeholder:text-muted-foreground/70

          focus-visible:border-primary
          focus-visible:ring-3
          focus-visible:ring-primary/10

          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:bg-muted
          disabled:text-muted-foreground
          disabled:opacity-70

          aria-invalid:border-destructive
          aria-invalid:ring-3
          aria-invalid:ring-destructive/10

          file:inline-flex
          file:h-6
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          file:text-foreground

          md:text-sm
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
