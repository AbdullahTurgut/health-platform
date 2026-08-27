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
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-border
          bg-card
          px-6
          py-12
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            size-11
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <TestTube2 className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.tests.filteredEmptyTitle : tr.tests.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
          className="
            group
            rounded-xl
            border
            border-border
            bg-card
            p-5
            shadow-[0_1px_2px_rgba(15,23,42,0.03)]
            transition-[border-color,box-shadow]
            duration-150
            hover:border-primary/20
            hover:shadow-[0_8px_24px_rgba(15,23,42,0.05)]
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="
                  flex
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  transition-colors
                  duration-150
                  group-hover:bg-primary/15
                "
              >
                <FlaskConical className="size-5" />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    break-words
                    text-base
                    font-semibold
                    tracking-tight
                    text-foreground
                  "
                >
                  {test.name}
                </h2>

                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="size-3.5 shrink-0" />

                  <span>{formatDateTime(test.testDate)}</span>
                </div>
              </div>
            </div>

            <span
              className="
                w-fit
                shrink-0
                rounded-full
                border
                border-border
                bg-muted/60
                px-2.5
                py-1
                text-xs
                font-medium
                text-muted-foreground
              "
            >
              {testCategoryLabels[test.category]}
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <TestRelation
              icon={HeartPulse}
              label={tr.tests.disease}
              value={test.diseaseName ?? tr.tests.diseaseUnknown}
            />

            <TestRelation
              icon={CalendarDays}
              label={tr.tests.visit}
              value={
                test.visitDate
                  ? formatDateTime(test.visitDate)
                  : tr.tests.visitUnknown
              }
            />

            <TestRelation
              icon={FlaskConical}
              label={tr.tests.laboratory}
              value={test.laboratory ?? tr.tests.laboratoryUnknown}
            />
          </div>

          {test.notes && (
            <div className="mt-5 border-t border-border pt-5">
              <p className="text-xs font-medium text-muted-foreground">
                {tr.tests.notes}
              </p>

              <p
                className="
                  mt-1.5
                  line-clamp-3
                  whitespace-pre-wrap
                  break-words
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                {test.notes}
              </p>
            </div>
          )}

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              justify-end
              gap-2
              border-t
              border-border
              pt-4
            "
          >
            <Button
              type="button"
              variant="secondary"
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

type TestRelationProps = {
  icon: typeof HeartPulse;
  label: string;
  value: string;
};

function TestRelation({ icon: Icon, label, value }: TestRelationProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border/70
        bg-muted/30
        p-3.5
      "
    >
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="size-4 shrink-0 text-primary/70" />

        {label}
      </div>

      <p className="mt-2 break-words text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}
