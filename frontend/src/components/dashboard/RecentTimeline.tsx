import { Activity, CalendarDays } from "lucide-react";
import { tr } from "@/i18n/tr";
import type { TimelineEvent } from "@/types/dashboard";

type RecentTimelineProps = {
  items: TimelineEvent[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatEventType(value: TimelineEvent["type"]) {
  switch (value) {
    case "VISIT":
      return "Ziyaret";

    case "MEDICAL_TEST":
      return "Tahlil";

    case "IMAGING":
      return "Görüntüleme";

    case "DOCUMENT":
      return "Belge";

    case "MEDICATION":
      return "İlaç";

    default:
      return value;
  }
}

export default function RecentTimeline({ items }: RecentTimelineProps) {
  return (
    <section className="rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Activity className="size-4" />
        </div>

        <div>
          <h2 className="font-semibold">{tr.dashboard.recentHealthActivity}</h2>

          <p className="text-xs text-muted-foreground">
            {tr.dashboard.recentHealthActivityDescription}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            {tr.dashboard.noHealthActivity}
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {items.map((event) => (
            <article
              key={`${event.type}-${event.id}`}
              className="px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{event.title}</p>

                  {event.subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.subtitle}
                    </p>
                  )}

                  {event.diseaseName && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {tr.dashboard.relatedDisease}:{" "}
                      <span className="font-medium text-foreground">
                        {event.diseaseName}
                      </span>
                    </p>
                  )}
                </div>

                <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {formatEventType(event.type)}
                </span>
              </div>

              {event.eventDate && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />

                  {formatDate(event.eventDate)}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
