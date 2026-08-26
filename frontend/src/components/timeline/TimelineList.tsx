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
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered ? tr.timeline.filteredEmptyTitle : tr.timeline.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.timeline.filteredEmptyDescription
            : tr.timeline.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const presentation = getTimelinePresentation(event);

        return (
          <article
            key={`${event.type}-${event.id}`}
            className="rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TimelineIcon type={event.type} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="break-words font-semibold">
                      {presentation.title}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getEventTypeBadgeClass(
                        event.type,
                      )}`}
                    >
                      {timelineEventTypeLabels[event.type]}
                    </span>
                  </div>

                  {presentation.subtitle && (
                    <p className="mt-1 break-words text-sm text-muted-foreground">
                      {presentation.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <time
                dateTime={event.eventDate}
                className="shrink-0 text-sm text-muted-foreground"
              >
                {formatTimelineEventDate(event)}
              </time>
            </div>

            {event.diseaseName && (
              <div className="mt-4">
                <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {tr.timeline.disease}: {event.diseaseName}
                </span>
              </div>
            )}

            {presentation.description && (
              <div className="mt-4 rounded-xl bg-muted/40 p-4">
                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                  {presentation.description}
                </p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function getEventTypeBadgeClass(type: TimelineEventType) {
  const classes: Record<TimelineEventType, string> = {
    VISIT: "bg-blue-500/10 text-blue-700 dark:text-blue-400",

    MEDICAL_TEST: "bg-violet-500/10 text-violet-700 dark:text-violet-400",

    IMAGING: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",

    DOCUMENT: "bg-amber-500/10 text-amber-700 dark:text-amber-400",

    MEDICATION: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };

  return classes[type];
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
      return <Stethoscope className="size-5" />;

    case "MEDICAL_TEST":
      return <FlaskConical className="size-5" />;

    case "IMAGING":
      return <ImageIcon className="size-5" />;

    case "DOCUMENT":
      return <FileText className="size-5" />;

    case "MEDICATION":
      return <Pill className="size-5" />;
  }
}
