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
    <section className="rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="font-semibold">{title}</h2>

        <ChevronRight className="size-4 text-muted-foreground" />
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-muted-foreground">{tr.common.noRecords}</p>
        </div>
      ) : (
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id}
              className="px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-medium">{item.title}</p>

              {item.subtitle && (
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              )}

              {item.eventDate && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />

                  {formatDate(item.eventDate)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
