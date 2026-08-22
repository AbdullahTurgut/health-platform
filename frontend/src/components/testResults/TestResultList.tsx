import { FlaskConical, History, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";

import ResultFlagBadge from "./ResultFlagBadge";

import type { TestResult } from "@/types/testResult";

type TestResultListProps = {
  results: TestResult[];

  onEdit: (result: TestResult) => void;

  onDelete: (result: TestResult) => void;

  onHistory: (result: TestResult) => void;
};

export default function TestResultList({
  results,
  onEdit,
  onDelete,
  onHistory,
}: TestResultListProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FlaskConical className="size-5" />
        </div>

        <h3 className="mt-3 font-medium">{tr.testResults.emptyTitle}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {tr.testResults.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result) => (
        <article key={result.id} className="rounded-xl border bg-muted/20 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="break-words font-medium">
                {result.parameterName}
              </h3>

              <p className="mt-1 break-words text-lg font-semibold">
                {result.valueText}
                {result.unit ? ` ${result.unit}` : ""}
              </p>
            </div>

            {result.flag && <ResultFlagBadge flag={result.flag} />}
          </div>

          {result.referenceRange && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                {tr.testResults.referenceRange}
              </p>

              <p className="mt-1 break-words text-sm font-medium">
                {result.referenceRange}
              </p>
            </div>
          )}

          {result.notes && (
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-muted-foreground">
                {tr.testResults.notes}
              </p>

              <p className="mt-1 whitespace-pre-wrap break-words text-sm">
                {result.notes}
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 border-t pt-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onHistory(result)}
              aria-label={`${result.parameterName} geçmişini görüntüle`}
            >
              <History className="size-4" />
              {tr.testResults.history}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(result)}
              aria-label={`${result.parameterName} sonucunu düzenle`}
            >
              <Pencil className="size-4" />
              {tr.testResults.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(result)}
              aria-label={`${result.parameterName} sonucunu sil`}
            >
              <Trash2 className="size-4" />
              {tr.testResults.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
