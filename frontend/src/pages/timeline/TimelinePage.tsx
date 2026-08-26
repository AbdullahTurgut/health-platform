import { useEffect, useState } from "react";

import { getApiErrorMessage } from "@/api/apiError";

import TimelineFilters, {
  type TimelineFilterDraft,
} from "@/components/timeline/TimelineFilters";

import TimelineList from "@/components/timeline/TimelineList";
import TimelinePagination from "@/components/timeline/TimelinePagination";

import { tr } from "@/i18n/tr";

import { TIMELINE_DEFAULT_PAGE_SIZE } from "@/lib/timeline";

import { buildTimelineQuery } from "@/lib/timelineQuery";

import { getDiseases } from "@/services/diseaseService";

import { getTimeline } from "@/services/timelineService";

import type {
  TimelineFilterOptions,
  TimelinePageResponse,
} from "@/types/timeline";

const EMPTY_FILTERS: TimelineFilterDraft = {
  type: "",
  diseaseId: "",
  fromDate: "",
  toDate: "",
};

export default function TimelinePage() {
  const [filters, setFilters] = useState<TimelineFilterDraft>(EMPTY_FILTERS);

  const [page, setPage] = useState(0);

  const [timeline, setTimeline] = useState<TimelinePageResponse>({
    content: [],
    page: 0,
    size: TIMELINE_DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  });

  const [filterOptions, setFilterOptions] = useState<TimelineFilterOptions>({
    diseases: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const isFiltered = Boolean(
    filters.type || filters.diseaseId || filters.fromDate || filters.toDate,
  );

  useEffect(() => {
    let isCancelled = false;

    async function fetchTimeline() {
      try {
        const query = buildTimelineQuery({
          type: filters.type || undefined,

          diseaseId: filters.diseaseId || undefined,

          fromDate: filters.fromDate || undefined,

          toDate: filters.toDate || undefined,

          page,

          size: TIMELINE_DEFAULT_PAGE_SIZE,
        });

        const response = await getTimeline(query);

        if (!isCancelled) {
          setTimeline(response);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(getApiErrorMessage(error));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchTimeline();

    return () => {
      isCancelled = true;
    };
  }, [filters, page]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchFilterOptions() {
      try {
        const diseases = await getDiseases();

        if (isCancelled) {
          return;
        }

        setFilterOptions({
          diseases: diseases
            .map((disease) => ({
              id: disease.id,
              name: disease.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "tr")),
        });
      } catch {
        /*
         * Timeline kendisi Disease
         * seçeneklerinden bağımsız
         * çalışmaya devam edebilir.
         */
      }
    }

    fetchFilterOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  function handleApplyFilters(nextFilters: TimelineFilterDraft) {
    const isSame =
      nextFilters.type === filters.type &&
      nextFilters.diseaseId === filters.diseaseId &&
      nextFilters.fromDate === filters.fromDate &&
      nextFilters.toDate === filters.toDate;

    if (isSame) {
      return;
    }

    setIsLoading(true);

    /*
     * Filter değişirse page
     * mutlaka ilk sayfaya dönmeli.
     */
    setPage(0);

    setFilters(nextFilters);
  }

  function handleClearFilters() {
    if (!isFiltered) {
      return;
    }

    setIsLoading(true);
    setPage(0);
    setFilters({
      ...EMPTY_FILTERS,
    });
  }

  function handlePageChange(nextPage: number) {
    if (nextPage === page || nextPage < 0 || nextPage >= timeline.totalPages) {
      return;
    }

    setIsLoading(true);
    setPage(nextPage);
  }

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-primary">
          {tr.timeline.eyebrow}
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {tr.timeline.title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {tr.timeline.description}
        </p>
      </div>

      <div className="mt-8">
        <TimelineFilters
          value={filters}
          options={filterOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <TimelineSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error || tr.timeline.loadError}
          </div>
        ) : (
          <>
            <TimelineList events={timeline.content} isFiltered={isFiltered} />

            <div className="mt-6">
              <TimelinePagination
                page={timeline.page}
                totalPages={timeline.totalPages}
                first={timeline.first}
                last={timeline.last}
                disabled={isLoading}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-2xl border bg-muted/40"
        />
      ))}
    </div>
  );
}
