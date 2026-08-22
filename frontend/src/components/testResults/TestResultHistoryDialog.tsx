import ResultFlagBadge from "./ResultFlagBadge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { tr } from "@/i18n/tr";

import type { TestResult } from "@/types/testResult";

type TestResultHistoryDialogProps = {
  parameterName: string | null;
  results: TestResult[];
  open: boolean;
  isLoading: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function TestResultHistoryDialog({
  parameterName,
  results,
  open,
  isLoading,
  error,
  onOpenChange,
}: TestResultHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {parameterName
              ? `${parameterName} — ${tr.testResults.historyTitle}`
              : tr.testResults.historyTitle}
          </DialogTitle>

          <DialogDescription>
            {tr.testResults.historyDescription}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl border bg-muted/40"
              />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {error}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            {tr.testResults.historyEmpty}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <article key={result.id} className="rounded-xl border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">
                      {result.valueText}
                      {result.unit ? ` ${result.unit}` : ""}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.medicalTestName}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDateTime(result.testDate)}
                    </p>
                  </div>

                  {result.flag && <ResultFlagBadge flag={result.flag} />}
                </div>

                {result.referenceRange && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {tr.testResults.referenceRange}: {result.referenceRange}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
