import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export default function SummaryCard({
  label,
  value,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <article
      className="
        group
        rounded-xl
        border
        border-border
        bg-card
        p-5
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        transition-[border-color,box-shadow,transform]
        duration-150
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
              transition-colors
              duration-150
              group-hover:bg-primary/15
            "
          >
            <Icon className="size-5" />
          </div>

          <p
            className="
              mt-6
              text-3xl
              font-semibold
              tracking-tight
              text-foreground
            "
          >
            {value}
          </p>

          <p
            className="
              mt-1.5
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            {label}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            mt-1
            h-8
            w-px
            shrink-0
            bg-border
            opacity-70
          "
        />
      </div>
    </article>
  );
}
