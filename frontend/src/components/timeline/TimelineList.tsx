import {
  CalendarDays,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  Pill,
  Stethoscope,
} from "lucide-react";

import { tr } from "@/i18n/tr";

import { timelineEventTypeLabels } from "@/lib/timeline";
import { getTimelinePresentation } from "@/lib/timelinePresentation";

import type { TimelineEvent, TimelineEventType } from "@/types/timeline";

type TimelineListProps = {
  events: TimelineEvent[];
  isFiltered: boolean;
};

export default function TimelineList({
  events,
  isFiltered,
}: TimelineListProps) {
  if (events.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-border
          bg-card
          px-6
          py-12
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            size-11
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <CalendarDays className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.timeline.filteredEmptyTitle : tr.timeline.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {isFiltered
            ? tr.timeline.filteredEmptyDescription
            : tr.timeline.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        rounded-xl
        border
        border-border
        bg-card
        px-5
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        sm:px-6
      "
    >
      <div
        className="
          absolute
          top-8
          bottom-8
          left-[31px]
          w-px
          bg-border
          sm:left-[35px]
        "
        aria-hidden="true"
      />

      <div>
        {events.map((event, index) => {
          const presentation = getTimelinePresentation(event);

          return (
            <article
              key={`${event.type}-${event.id}`}
              className={[
                "relative pl-9 py-6 sm:pl-11",
                index !== events.length - 1 ? "border-b border-border" : "",
              ].join(" ")}
            >
              <div
                className="
                  absolute
                  top-6
                  left-0
                  z-10
                  flex
                  size-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-primary/20
                  bg-card
                  text-primary
                  shadow-sm
                "
              >
                <TimelineIcon type={event.type} />
              </div>

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
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      className="
                        break-words
                        text-base
                        font-semibold
                        tracking-tight
                        text-foreground
                      "
                    >
                      {presentation.title}
                    </h2>

                    <EventTypeBadge type={event.type} />
                  </div>

                  {presentation.subtitle && (
                    <p className="mt-1.5 break-words text-sm leading-5 text-muted-foreground">
                      {presentation.subtitle}
                    </p>
                  )}
                </div>

                <time
                  dateTime={event.eventDate}
                  className="
                    shrink-0
                    text-xs
                    font-medium
                    text-muted-foreground
                    sm:pt-1
                  "
                >
                  {formatTimelineEventDate(event)}
                </time>
              </div>

              {event.diseaseName && (
                <div className="mt-3">
                  <span
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      rounded-full
                      border
                      border-border
                      bg-muted/50
                      px-2.5
                      py-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    <span className="mr-1 font-medium text-foreground">
                      {tr.timeline.disease}:
                    </span>

                    <span className="truncate">{event.diseaseName}</span>
                  </span>
                </div>
              )}

              {presentation.description && (
                <div
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-border/70
                    bg-muted/30
                    p-4
                  "
                >
                  <p
                    className="
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-6
                      text-muted-foreground
                    "
                  >
                    {presentation.description}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function EventTypeBadge({ type }: { type: TimelineEventType }) {
  return (
    <span
      className="
        inline-flex
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
      {timelineEventTypeLabels[type]}
    </span>
  );
}

function formatTimelineEventDate(event: TimelineEvent) {
  if (event.type === "MEDICATION") {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(event.eventDate));
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(event.eventDate));
}

function TimelineIcon({ type }: { type: TimelineEventType }) {
  switch (type) {
    case "VISIT":
      return <Stethoscope className="size-3.5" />;

    case "MEDICAL_TEST":
      return <FlaskConical className="size-3.5" />;

    case "IMAGING":
      return <ImageIcon className="size-3.5" />;

    case "DOCUMENT":
      return <FileText className="size-3.5" />;

    case "MEDICATION":
      return <Pill className="size-3.5" />;
  }
}
