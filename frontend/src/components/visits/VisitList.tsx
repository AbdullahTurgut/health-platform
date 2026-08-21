import {
  Building2,
  CalendarDays,
  HeartPulse,
  Pencil,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { Visit } from "@/types/visit";

type VisitListProps = {
  visits: Visit[];
  isFiltered?: boolean;
  onEdit: (visit: Visit) => void;
  onDelete: (visit: Visit) => void;
};

function formatVisitDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function VisitList({
  visits,
  isFiltered = false,
  onEdit,
  onDelete,
}: VisitListProps) {
  if (visits.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered ? tr.visits.filteredEmptyTitle : tr.visits.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.visits.filteredEmptyDescription
            : tr.visits.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visits.map((visit) => (
        <article
          key={visit.id}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDays className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="font-semibold">
                  {formatVisitDate(visit.visitDate)}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {visit.department ?? tr.visits.departmentUnknown}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <HeartPulse className="size-4" />
                {tr.visits.disease}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {visit.diseaseName ?? tr.visits.diseaseUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Stethoscope className="size-4" />
                {tr.visits.doctor}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {visit.doctorName ?? tr.visits.doctorUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Building2 className="size-4" />
                {tr.visits.hospital}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {visit.hospitalName ?? tr.visits.hospitalUnknown}
              </p>
            </div>
          </div>

          {visit.reason && (
            <div className="mt-5 border-t pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.visits.reason}
              </p>

              <p className="mt-1 whitespace-pre-wrap break-words text-sm">
                {visit.reason}
              </p>
            </div>
          )}

          {visit.diagnosisNote && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.visits.diagnosisNote}
              </p>

              <p className="mt-1 whitespace-pre-wrap break-words text-sm">
                {visit.diagnosisNote}
              </p>
            </div>
          )}

          {visit.notes && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.visits.notes}
              </p>

              <p className="mt-1 line-clamp-3 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {visit.notes}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(visit)}
            >
              <Pencil className="size-4" />
              {tr.visits.edit}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(visit)}
            >
              <Trash2 className="size-4" />
              {tr.visits.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
