import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { tr } from "@/i18n/tr";

type SearchPaginationProps = {
  page: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  disabled?: boolean;

  onPageChange: (page: number) => void;
};

export default function SearchPagination({
  page,
  totalPages,
  first,
  last,
  disabled = false,
  onPageChange,
}: SearchPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {tr.search.page} {page + 1} / {totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={disabled || first || page <= 0}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />

          {tr.search.previousPage}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={disabled || last || page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
        >
          {tr.search.nextPage}

          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
