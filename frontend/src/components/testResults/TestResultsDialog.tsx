import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tr } from "@/i18n/tr";

import TestResultList from "./TestResultList";

import type { MedicalTest } from "@/types/medicalTest";
import type { TestResult } from "@/types/testResult";

type TestResultsDialogProps = {
  test: MedicalTest | null;
  results: TestResult[];
  open: boolean;
  isLoading: boolean;
  error: string | null;

  onOpenChange: (open: boolean) => void;

  onCreate: () => void;

  onEdit: (result: TestResult) => void;

  onDelete: (result: TestResult) => void;

  onHistory: (result: TestResult) => void;
};

export default function TestResultsDialog({
  test,
  results,
  open,
  isLoading,
  error,
  onOpenChange,
  onCreate,
  onEdit,
  onDelete,
  onHistory,
}: TestResultsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{tr.testResults.title}</DialogTitle>

          <DialogDescription>
            {test
              ? `${test.name} — ${tr.testResults.description}`
              : tr.testResults.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onCreate}
            disabled={!test || isLoading}
          >
            <Plus className="size-4" />
            {tr.testResults.add}
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-xl border bg-muted/40"
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
        ) : (
          <TestResultList
            results={results}
            onEdit={onEdit}
            onDelete={onDelete}
            onHistory={onHistory}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
