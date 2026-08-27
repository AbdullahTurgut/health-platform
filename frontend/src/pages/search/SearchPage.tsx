import { useEffect, useState } from "react";

import { getApiErrorMessage } from "@/api/apiError";

import SearchFilters, {
  type SearchFilterDraft,
} from "@/components/search/SearchFilters";

import SearchPagination from "@/components/search/SearchPagination";
import SearchResultsList from "@/components/search/SearchResultsList";

import { tr } from "@/i18n/tr";

import { buildSearchQuery, SEARCH_DEFAULT_PAGE_SIZE } from "@/lib/search";

import { getDiseases } from "@/services/diseaseService";

import { searchGlobal } from "@/services/searchService";

import type { SearchFilterOptions, SearchPageResponse } from "@/types/search";

const EMPTY_SEARCH: SearchFilterDraft = {
  query: "",
  type: "",
  diseaseId: "",
};

const EMPTY_RESPONSE: SearchPageResponse = {
  query: "",
  content: [],
  page: 0,
  size: SEARCH_DEFAULT_PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true,
};

export default function SearchPage() {
  const [searchFilters, setSearchFilters] =
    useState<SearchFilterDraft>(EMPTY_SEARCH);

  const [page, setPage] = useState(0);

  const [searchResult, setSearchResult] =
    useState<SearchPageResponse>(EMPTY_RESPONSE);

  const [filterOptions, setFilterOptions] = useState<SearchFilterOptions>({
    diseases: [],
  });

  const [hasSearched, setHasSearched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchDiseases() {
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
         * Search yine de Disease
         * filtresi olmadan çalışabilir.
         */
      }
    }

    fetchDiseases();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    let isCancelled = false;

    async function fetchResults() {
      try {
        const query = buildSearchQuery({
          query: searchFilters.query,

          type: searchFilters.type || undefined,

          diseaseId: searchFilters.diseaseId || undefined,

          page,

          size: SEARCH_DEFAULT_PAGE_SIZE,
        });

        const response = await searchGlobal(query);

        if (!isCancelled) {
          setSearchResult(response);
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

    fetchResults();

    return () => {
      isCancelled = true;
    };
  }, [hasSearched, searchFilters, page]);

  function handleSearch(nextFilters: SearchFilterDraft) {
    const isSame =
      nextFilters.query === searchFilters.query &&
      nextFilters.type === searchFilters.type &&
      nextFilters.diseaseId === searchFilters.diseaseId;

    if (hasSearched && isSame && page === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    setPage(0);
    setSearchFilters(nextFilters);

    if (!hasSearched) {
      setHasSearched(true);
    }
  }

  function handleClear() {
    if (
      !hasSearched &&
      !searchFilters.query &&
      !searchFilters.type &&
      !searchFilters.diseaseId
    ) {
      return;
    }

    setSearchFilters({
      ...EMPTY_SEARCH,
    });

    setPage(0);

    setSearchResult({
      ...EMPTY_RESPONSE,
    });

    setHasSearched(false);
    setIsLoading(false);
    setError(null);
  }

  function handlePageChange(nextPage: number) {
    if (
      nextPage === page ||
      nextPage < 0 ||
      nextPage >= searchResult.totalPages
    ) {
      return;
    }

    setIsLoading(true);
    setPage(nextPage);
  }

  return (
    <section className="space-y-6">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold tracking-tight text-primary">
          {tr.search.eyebrow}
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
          {tr.search.title}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          {tr.search.description}
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
        <SearchFilters
          value={searchFilters}
          options={filterOptions}
          disabled={isLoading}
          onSearch={handleSearch}
          onClear={handleClear}
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
            {tr.search.loadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      ) : isLoading ? (
        <SearchSkeleton />
      ) : (
        <div className="space-y-6">
          <SearchResultsList
            results={searchResult.content}
            hasSearched={hasSearched}
            totalElements={searchResult.totalElements}
          />

          {hasSearched && (
            <SearchPagination
              page={searchResult.page}
              totalPages={searchResult.totalPages}
              first={searchResult.first}
              last={searchResult.last}
              disabled={isLoading}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </section>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="
            rounded-xl
            border
            border-border
            bg-card
            p-5
            sm:p-6
          "
        >
          <div className="flex items-start gap-3">
            <div className="size-10 animate-pulse rounded-xl bg-muted" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-5 w-48 max-w-full animate-pulse rounded-md bg-muted" />

              <div className="h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

              <div className="h-14 animate-pulse rounded-xl bg-muted/60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
