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
    <div>
      <div>
        <p className="text-sm font-medium text-primary">{tr.search.eyebrow}</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {tr.search.title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {tr.search.description}
        </p>
      </div>

      <div className="mt-8">
        <SearchFilters
          value={searchFilters}
          options={filterOptions}
          disabled={isLoading}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <SearchSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error || tr.search.loadError}
          </div>
        ) : (
          <>
            <SearchResultsList
              results={searchResult.content}
              hasSearched={hasSearched}
              totalElements={searchResult.totalElements}
            />

            {hasSearched && (
              <div className="mt-6">
                <SearchPagination
                  page={searchResult.page}
                  totalPages={searchResult.totalPages}
                  first={searchResult.first}
                  last={searchResult.last}
                  disabled={isLoading}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SearchSkeleton() {
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
