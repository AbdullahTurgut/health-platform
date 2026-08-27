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

const selectClassName = `
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.search.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.search.filterHint}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="global-search-query">{tr.search.searchLabel}</Label>

        <div className="relative">
          <Search
            className="
              pointer-events-none
              absolute
              top-1/2
              left-3.5
              size-5
              -translate-y-1/2
              text-muted-foreground
            "
            aria-hidden="true"
          />

          <input
            id="global-search-query"
            type="search"
            value={query}
            maxLength={SEARCH_MAX_QUERY_LENGTH}
            disabled={disabled}
            placeholder={tr.search.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-input
              bg-card
              pr-4
              pl-11
              text-base
              text-foreground
              outline-none
              transition-[border-color,box-shadow]
              duration-150
              placeholder:text-muted-foreground
              focus-visible:border-primary
              focus-visible:ring-3
              focus-visible:ring-primary/10
              disabled:cursor-not-allowed
              disabled:bg-muted
              disabled:opacity-70
            "
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="global-search-type">{tr.search.type}</Label>

          <select
            id="global-search-type"
            value={type}
            disabled={disabled}
            onChange={(event) =>
              setType(event.target.value as SearchResultType | "")
            }
            className={selectClassName}
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
            className={selectClassName}
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

      {(type || diseaseId) && (
        <p className="text-xs leading-5 text-muted-foreground">
          {tr.search.combinedFilterHint}
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
          type="submit"
          className="w-full sm:w-auto"
          disabled={disabled || !isQueryValid || isSameSearch}
        >
          <Search className="size-4" />

          {tr.search.searchButton}
        </Button>

        {hasAppliedSearch && (
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
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
