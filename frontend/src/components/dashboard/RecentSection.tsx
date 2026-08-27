import { CalendarDays, ChevronRight } from "lucide-react";

import { tr } from "@/i18n/tr";
import type { DashboardRecentItem } from "@/types/dashboard";

type RecentSectionProps = {
  title: string;
  items: DashboardRecentItem[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function RecentSection({ title, items }: RecentSectionProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-card
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-border
          px-5
          py-4
          sm:px-6
        "
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {tr.dashboard.recentActivity}
          </p>

          <h2 className="mt-1 text-base font-semibold tracking-tight">
            {title}
          </h2>
        </div>

        <div
          className="
            flex
            size-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-muted
            text-muted-foreground
          "
          aria-hidden="true"
        >
          <ChevronRight className="size-4" />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center sm:px-6">
          <p className="text-sm text-muted-foreground">{tr.common.noRecords}</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                group
                px-5
                py-4
                transition-colors
                duration-150
                hover:bg-muted/30
                sm:px-6
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    mt-1
                    size-2
                    shrink-0
                    rounded-full
                    bg-primary/70
                    transition-colors
                    group-hover:bg-primary
                  "
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}

                  {item.eventDate && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      <span>{formatDate(item.eventDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
