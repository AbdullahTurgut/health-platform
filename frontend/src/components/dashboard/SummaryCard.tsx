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
    <article className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </div>
    </article>
  );
}
