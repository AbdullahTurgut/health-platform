import { useState } from "react";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { tr } from "@/i18n/tr";

import {
  isValidSearchQuery,
  normalizeSearchQuery,
  searchResultTypeLabels,
  searchResultTypes,
  SEARCH_MAX_QUERY_LENGTH,
} from "@/lib/search";

import type { SearchFilterOptions, SearchResultType } from "@/types/search";

export type SearchFilterDraft = {
  query: string;
  type: SearchResultType | "";
  diseaseId: string;
};

type SearchFiltersProps = {
  value: SearchFilterDraft;
  options: SearchFilterOptions;
  disabled?: boolean;

  onSearch: (filters: SearchFilterDraft) => void;

  onClear: () => void;
};

export default function SearchFilters({
  value,
  options,
  disabled = false,
  onSearch,
  onClear,
}: SearchFiltersProps) {
  const [query, setQuery] = useState(value.query);

  const [type, setType] = useState<SearchResultType | "">(value.type);

  const [diseaseId, setDiseaseId] = useState(value.diseaseId);

  const normalizedQuery = normalizeSearchQuery(query);

  const isQueryValid = isValidSearchQuery(query);

  const hasAppliedSearch = Boolean(
    value.query || value.type || value.diseaseId,
  );

  const isSameSearch =
    normalizedQuery === normalizeSearchQuery(value.query) &&
    type === value.type &&
    diseaseId === value.diseaseId;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || !isQueryValid || isSameSearch) {
      return;
    }

    onSearch({
      query: normalizedQuery,
      type,
      diseaseId,
    });
  }

  function handleClear() {
    setQuery("");
    setType("");
    setDiseaseId("");

    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          <Label htmlFor="global-search-query">{tr.search.searchLabel}</Label>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              id="global-search-query"
              type="search"
              value={query}
              maxLength={SEARCH_MAX_QUERY_LENGTH}
              disabled={disabled}
              placeholder={tr.search.searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent py-2 pl-9 pr-3 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {normalizedQuery.length > 0 && !isQueryValid && (
            <p role="alert" className="text-sm text-destructive">
              {normalizedQuery.length < 2
                ? tr.search.minimumQueryError
                : tr.search.maximumQueryError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="global-search-type">{tr.search.type}</Label>

          <select
            id="global-search-type"
            value={type}
            disabled={disabled}
            onChange={(event) =>
              setType(event.target.value as SearchResultType | "")
            }
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.search.allTypes}</option>

            {searchResultTypes.map((resultType) => (
              <option key={resultType} value={resultType}>
                {searchResultTypeLabels[resultType]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="global-search-disease">{tr.search.disease}</Label>

          <select
            id="global-search-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => setDiseaseId(event.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.search.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={disabled || !isQueryValid || isSameSearch}
        >
          <Search className="size-4" />
          {tr.search.searchButton}
        </Button>

        {hasAppliedSearch && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />
            {tr.search.clearFilters}
          </Button>
        )}
      </div>
    </form>
  );
}
