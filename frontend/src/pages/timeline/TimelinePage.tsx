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
    <section className="space-y-6">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold tracking-tight text-primary">
          {tr.timeline.eyebrow}
        </p>

        <h1
          className="
          mt-2
          text-3xl
          font-semibold
          tracking-tight
          text-foreground
          sm:text-[2rem]
        "
        >
          {tr.timeline.title}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          {tr.timeline.description}
        </p>
      </header>

      <div
        className="
        rounded-xl
        border
        border-border
        bg-card
        p-4
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        sm:p-5
      "
      >
        <TimelineFilters
          value={filters}
          options={filterOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      {error ? (
        <div
          role="alert"
          className="
          rounded-xl
          border
          border-destructive/20
          bg-destructive/5
          p-5
        "
        >
          <p className="text-sm font-medium text-destructive">
            {tr.timeline.loadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      ) : isLoading ? (
        <TimelineSkeleton />
      ) : (
        <div className="space-y-6">
          <TimelineList events={timeline.content} isFiltered={isFiltered} />

          <TimelinePagination
            page={timeline.page}
            totalPages={timeline.totalPages}
            first={timeline.first}
            last={timeline.last}
            disabled={isLoading}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}

function TimelineSkeleton() {
  return (
    <div className="relative space-y-0 pl-7 sm:pl-9">
      <div
        className="
          absolute
          top-5
          bottom-5
          left-[11px]
          w-px
          bg-border
          sm:left-[15px]
        "
      />

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="
            relative
            border-b
            border-border
            py-5
            first:pt-0
            last:border-b-0
          "
        >
          <div
            className="
              absolute
              top-6
              -left-[27px]
              size-3
              animate-pulse
              rounded-full
              bg-muted
              sm:-left-[31px]
            "
          />

          <div className="space-y-3">
            <div className="h-5 w-52 animate-pulse rounded-md bg-muted" />

            <div className="h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

            <div className="h-16 animate-pulse rounded-xl bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  );
}
