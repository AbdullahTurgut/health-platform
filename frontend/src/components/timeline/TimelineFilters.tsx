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
    <div className="rounded-2xl border bg-card p-4">
      <div>
        <h2 className="font-semibold">{tr.timeline.filtersTitle}</h2>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="timeline-filter-type">{tr.timeline.type}</Label>

          <select
            id="timeline-filter-type"
            value={type}
            disabled={disabled}
            onChange={(event) =>
              setType(event.target.value as TimelineEventType | "")
            }
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {!isDateRangeValid && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {tr.timeline.dateRangeError}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
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
