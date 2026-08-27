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
          gap-3
          border-b
          border-border
          px-5
          py-4
          sm:px-6
        "
      >
        <div
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <Activity className="size-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            {tr.dashboard.recentHealthActivity}
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {tr.dashboard.recentHealthActivityDescription}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-12 text-center sm:px-6">
          <div
            className="
              mx-auto
              flex
              size-10
              items-center
              justify-center
              rounded-xl
              bg-muted
              text-muted-foreground
            "
          >
            <Activity className="size-4.5" />
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            {tr.dashboard.noHealthActivity}
          </p>
        </div>
      ) : (
        <div className="px-5 py-2 sm:px-6">
          {items.map((event, index) => {
            const isLast = index === items.length - 1;

            return (
              <article
                key={`${event.type}-${event.id}`}
                className="
                  group
                  relative
                  flex
                  gap-4
                  py-5
                "
              >
                <div
                  className="
                    relative
                    flex
                    w-5
                    shrink-0
                    justify-center
                  "
                  aria-hidden="true"
                >
                  {!isLast && (
                    <span
                      className="
                        absolute
                        top-5
                        bottom-[-1.25rem]
                        w-px
                        bg-border
                      "
                    />
                  )}

                  <span
                    className="
                      relative
                      z-10
                      mt-1
                      size-2.5
                      rounded-full
                      border-2
                      border-card
                      bg-primary/70
                      ring-2
                      ring-primary/10
                      transition-colors
                      duration-150
                      group-hover:bg-primary
                    "
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                    border-b
                    border-border/70
                    pb-5
                    group-last:border-b-0
                    group-last:pb-0
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div className="min-w-0">
                      <p
                        className="
                          text-sm
                          font-medium
                          text-foreground
                        "
                      >
                        {event.title}
                      </p>

                      {event.subtitle && (
                        <p
                          className="
                            mt-1
                            line-clamp-2
                            text-sm
                            leading-5
                            text-muted-foreground
                          "
                        >
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

                    <span
                      className="
                        w-fit
                        shrink-0
                        rounded-full
                        border
                        border-border
                        bg-muted/60
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-muted-foreground
                      "
                    >
                      {formatEventType(event.type)}
                    </span>
                  </div>

                  {event.eventDate && (
                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-muted-foreground
                      "
                    >
                      <CalendarDays className="size-3.5 shrink-0" />

                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
