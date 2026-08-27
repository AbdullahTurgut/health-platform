import {
  Activity,
  Building2,
  CalendarDays,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  Pill,
  Search,
  Stethoscope,
  TestTube2,
} from "lucide-react";

import { tr } from "@/i18n/tr";

import { searchResultTypeLabels } from "@/lib/search";
import { formatSearchResultDate } from "@/lib/searchDate";
import { getSearchResultPresentation } from "@/lib/searchPresentation";

import type { SearchResultItem, SearchResultType } from "@/types/search";

type SearchResultsListProps = {
  results: SearchResultItem[];
  hasSearched: boolean;
  totalElements: number;
};

export default function SearchResultsList({
  results,
  hasSearched,
  totalElements,
}: SearchResultsListProps) {
  if (!hasSearched) {
    return (
      <SearchEmptyState
        title={tr.search.initialTitle}
        description={tr.search.initialDescription}
        primary
      />
    );
  }

  if (results.length === 0) {
    return (
      <SearchEmptyState
        title={tr.search.emptyTitle}
        description={tr.search.emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="
          flex
          flex-col
          gap-1
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {tr.search.resultsTitle}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {totalElements} {tr.search.results}
          </p>
        </div>
      </div>

      <div
        className="
          divide-y
          divide-border
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-card
          shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        "
      >
        {results.map((result) => {
          const presentation = getSearchResultPresentation(result);

          const formattedDate = formatSearchResultDate(result);

          return (
            <article
              key={`${result.type}-${result.id}`}
              className="
                group
                p-5
                transition-colors
                duration-150
                hover:bg-muted/20
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                <div className="flex min-w-0 items-start gap-3">
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
                      transition-colors
                      duration-150
                      group-hover:bg-primary/15
                    "
                  >
                    <SearchResultIcon type={result.type} />
                  </div>

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

                      <SearchResultTypeBadge type={result.type} />
                    </div>

                    {presentation.subtitle && (
                      <p className="mt-1.5 break-words text-sm leading-5 text-muted-foreground">
                        {presentation.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {formattedDate && (
                  <time
                    dateTime={result.eventDate ?? undefined}
                    className="
                      shrink-0
                      text-xs
                      font-medium
                      text-muted-foreground
                      sm:pt-1
                    "
                  >
                    {formattedDate}
                  </time>
                )}
              </div>

              {result.diseaseName && (
                <div className="mt-3 pl-0 sm:pl-[52px]">
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
                      {tr.search.disease}:
                    </span>

                    <span className="truncate">{result.diseaseName}</span>
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
                    sm:ml-[52px]
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

function SearchEmptyState({
  title,
  description,
  primary = false,
}: {
  title: string;
  description: string;
  primary?: boolean;
}) {
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
        className={[
          "mx-auto flex size-11 items-center justify-center rounded-xl",
          primary
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        <Search className="size-5" />
      </div>

      <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function SearchResultTypeBadge({ type }: { type: SearchResultType }) {
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
      {searchResultTypeLabels[type]}
    </span>
  );
}

function SearchResultIcon({ type }: { type: SearchResultType }) {
  switch (type) {
    case "DISEASE":
      return <Activity className="size-5" />;

    case "DOCTOR":
      return <Stethoscope className="size-5" />;

    case "HOSPITAL":
      return <Building2 className="size-5" />;

    case "VISIT":
      return <CalendarDays className="size-5" />;

    case "MEDICAL_TEST":
      return <FlaskConical className="size-5" />;

    case "TEST_RESULT":
      return <TestTube2 className="size-5" />;

    case "IMAGING":
      return <ImageIcon className="size-5" />;

    case "DOCUMENT":
      return <FileText className="size-5" />;

    case "MEDICATION":
      return <Pill className="size-5" />;
  }
}
