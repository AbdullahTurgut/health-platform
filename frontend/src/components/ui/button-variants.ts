import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `
    group/button
    inline-flex
    shrink-0
    items-center
    justify-center
    whitespace-nowrap
    rounded-lg
    border
    border-transparent
    bg-clip-padding
    text-sm
    font-medium
    outline-none
    select-none
    transition-[color,background-color,border-color,box-shadow,transform]
    duration-150

    focus-visible:border-ring
    focus-visible:ring-3
    focus-visible:ring-ring/20

    active:not-aria-[haspopup]:translate-y-px

    disabled:pointer-events-none
    disabled:opacity-50

    aria-invalid:border-destructive
    aria-invalid:ring-3
    aria-invalid:ring-destructive/15

    [&_svg]:pointer-events-none
    [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",

        outline:
          "border-border bg-card text-foreground shadow-xs hover:border-primary/20 hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75 aria-expanded:bg-secondary",

        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",

        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:border-destructive/40 focus-visible:ring-destructive/15",

        link: "text-primary underline-offset-4 shadow-none hover:underline",
      },

      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",

        xs: "h-7 gap-1.5 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",

        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",

        lg: "h-11 gap-2 px-5 text-sm",

        icon: "size-10",

        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",

        "icon-sm": "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",

        "icon-lg": "size-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
