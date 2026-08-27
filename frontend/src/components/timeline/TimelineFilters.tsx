import { useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { tr } from "@/i18n/tr";

import { timelineEventTypeLabels, timelineEventTypes } from "@/lib/timeline";

import { isValidTimelineDateRange } from "@/lib/timelineDate";

import type {
  TimelineEventType,
  TimelineFilterOptions,
} from "@/types/timeline";

export type TimelineFilterDraft = {
  type: TimelineEventType | "";
  diseaseId: string;
  fromDate: string;
  toDate: string;
};

type TimelineFiltersProps = {
  value: TimelineFilterDraft;
  options: TimelineFilterOptions;
  disabled?: boolean;

  onApply: (filters: TimelineFilterDraft) => void;
  onClear: () => void;
};

const controlClassName = `
  h-10
  w-full
  rounded-lg
  border
  border-input
  bg-card
  px-3
  text-sm
  text-foreground
  outline-none
  transition-[color,background-color,border-color,box-shadow]
  duration-150

  focus-visible:border-primary
  focus-visible:ring-3
  focus-visible:ring-primary/10

  disabled:cursor-not-allowed
  disabled:bg-muted
  disabled:opacity-70
`;

export default function TimelineFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: TimelineFiltersProps) {
  const [type, setType] = useState<TimelineEventType | "">(value.type);

  const [diseaseId, setDiseaseId] = useState(value.diseaseId);

  const [fromDate, setFromDate] = useState(value.fromDate);

  const [toDate, setToDate] = useState(value.toDate);

  const isDateRangeValid = isValidTimelineDateRange(fromDate, toDate);

  const hasDraftFilter = Boolean(type || diseaseId || fromDate || toDate);

  const hasAppliedFilter = Boolean(
    value.type || value.diseaseId || value.fromDate || value.toDate,
  );

  const isSameFilter =
    value.type === type &&
    value.diseaseId === diseaseId &&
    value.fromDate === fromDate &&
    value.toDate === toDate;

  function handleClear() {
    setType("");
    setDiseaseId("");
    setFromDate("");
    setToDate("");

    onClear();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.timeline.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.timeline.filterHint}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="timeline-filter-type">{tr.timeline.type}</Label>

          <select
            id="timeline-filter-type"
            value={type}
            disabled={disabled}
            onChange={(event) =>
              setType(event.target.value as TimelineEventType | "")
            }
            className={controlClassName}
          >
            <option value="">{tr.timeline.allTypes}</option>

            {timelineEventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {timelineEventTypeLabels[eventType]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline-filter-disease">{tr.timeline.disease}</Label>

          <select
            id="timeline-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => setDiseaseId(event.target.value)}
            className={controlClassName}
          >
            <option value="">{tr.timeline.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline-filter-from">{tr.timeline.from}</Label>

          <input
            id="timeline-filter-from"
            type="date"
            value={fromDate}
            disabled={disabled}
            max={toDate || undefined}
            onChange={(event) => setFromDate(event.target.value)}
            className={controlClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline-filter-to">{tr.timeline.to}</Label>

          <input
            id="timeline-filter-to"
            type="date"
            value={toDate}
            disabled={disabled}
            min={fromDate || undefined}
            onChange={(event) => setToDate(event.target.value)}
            className={controlClassName}
          />
        </div>
      </div>

      {!isDateRangeValid && (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-destructive/20
            bg-destructive/5
            px-4
            py-3
            text-sm
            text-destructive
          "
        >
          {tr.timeline.dateRangeError}
        </div>
      )}

      {hasDraftFilter && (
        <p className="text-xs leading-5 text-muted-foreground">
          {tr.timeline.combinedFilterHint}
        </p>
      )}

      <div
        className="
          flex
          flex-col
          gap-2
          border-t
          border-border
          pt-4
          sm:flex-row
          sm:justify-end
        "
      >
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={
            disabled || !hasDraftFilter || !isDateRangeValid || isSameFilter
          }
          onClick={() =>
            onApply({
              type,
              diseaseId,
              fromDate,
              toDate,
            })
          }
        >
          {tr.timeline.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.timeline.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
