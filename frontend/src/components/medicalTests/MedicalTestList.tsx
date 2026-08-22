import {
  BarChart3,
  CalendarDays,
  FlaskConical,
  HeartPulse,
  Pencil,
  TestTube2,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { testCategoryLabels } from "@/lib/testCategory";
import type { MedicalTest } from "@/types/medicalTest";

type MedicalTestListProps = {
  tests: MedicalTest[];
  isFiltered?: boolean;
  onEdit: (test: MedicalTest) => void;
  onDelete: (test: MedicalTest) => void;
  onShowResults: (test: MedicalTest) => void;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function MedicalTestList({
  tests,
  isFiltered = false,
  onEdit,
  onDelete,
  onShowResults,
}: MedicalTestListProps) {
  if (tests.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <TestTube2 className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered ? tr.tests.filteredEmptyTitle : tr.tests.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.tests.filteredEmptyDescription
            : tr.tests.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <article
          key={test.id}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FlaskConical className="size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words font-semibold">{test.name}</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDateTime(test.testDate)}
                </p>
              </div>
            </div>

            <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {testCategoryLabels[test.category]}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <HeartPulse className="size-4" />
                {tr.tests.disease}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {test.diseaseName ?? tr.tests.diseaseUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <CalendarDays className="size-4" />
                {tr.tests.visit}
              </div>

              <p className="mt-2 text-sm font-medium">
                {test.visitDate
                  ? formatDateTime(test.visitDate)
                  : tr.tests.visitUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <FlaskConical className="size-4" />
                {tr.tests.laboratory}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {test.laboratory ?? tr.tests.laboratoryUnknown}
              </p>
            </div>
          </div>

          {test.notes && (
            <div className="mt-5 border-t pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.tests.notes}
              </p>

              <p className="mt-1 line-clamp-3 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {test.notes}
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onShowResults(test)}
            >
              <BarChart3 className="size-4" />
              {tr.testResults.showResults}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(test)}
            >
              <Pencil className="size-4" />
              {tr.tests.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(test)}
            >
              <Trash2 className="size-4" />
              {tr.tests.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
