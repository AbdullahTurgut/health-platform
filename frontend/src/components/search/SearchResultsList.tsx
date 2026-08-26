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
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Search className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">{tr.search.initialTitle}</h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {tr.search.initialDescription}
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Search className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">{tr.search.emptyTitle}</h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {tr.search.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {totalElements} {tr.search.results}
      </p>

      <div className="space-y-4">
        {results.map((result) => {
          const presentation = getSearchResultPresentation(result);

          const formattedDate = formatSearchResultDate(result);

          return (
            <article
              key={`${result.type}-${result.id}`}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <SearchResultIcon type={result.type} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="break-words font-semibold">
                        {presentation.title}
                      </h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getSearchResultBadgeClass(
                          result.type,
                        )}`}
                      >
                        {searchResultTypeLabels[result.type]}
                      </span>
                    </div>

                    {presentation.subtitle && (
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {presentation.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {formattedDate && (
                  <time
                    dateTime={result.eventDate ?? undefined}
                    className="shrink-0 text-sm text-muted-foreground"
                  >
                    {formattedDate}
                  </time>
                )}
              </div>

              {result.diseaseName && (
                <div className="mt-4">
                  <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {tr.search.disease}: {result.diseaseName}
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
    </div>
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

function getSearchResultBadgeClass(type: SearchResultType) {
  const classes: Record<SearchResultType, string> = {
    DISEASE: "bg-rose-500/10 text-rose-700 dark:text-rose-400",

    DOCTOR: "bg-blue-500/10 text-blue-700 dark:text-blue-400",

    HOSPITAL: "bg-slate-500/10 text-slate-700 dark:text-slate-400",

    VISIT: "bg-sky-500/10 text-sky-700 dark:text-sky-400",

    MEDICAL_TEST: "bg-violet-500/10 text-violet-700 dark:text-violet-400",

    TEST_RESULT: "bg-purple-500/10 text-purple-700 dark:text-purple-400",

    IMAGING: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",

    DOCUMENT: "bg-amber-500/10 text-amber-700 dark:text-amber-400",

    MEDICATION: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };

  return classes[type];
}
