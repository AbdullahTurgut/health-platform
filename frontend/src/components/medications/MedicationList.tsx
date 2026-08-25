import {
  CalendarDays,
  CircleDot,
  FileText,
  Pencil,
  Pill,
  Stethoscope,
} from "lucide-react";
import { tr } from "@/i18n/tr";
import {
  medicationRouteLabels,
  medicationStatusLabels,
} from "@/lib/medication";
import type { Medication } from "@/types/medication";
import { Button } from "@/components/ui/button";

type MedicationListProps = {
  medications: Medication[];
  isFiltered?: boolean;
  isPreparingEdit?: boolean;

  onEdit: (medication: Medication) => void;
};

export default function MedicationList({
  medications,
  isFiltered = false,
  isPreparingEdit,
  onEdit,
}: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Pill className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered
            ? tr.medications.filteredEmptyTitle
            : tr.medications.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.medications.filteredEmptyDescription
            : tr.medications.emptyDescription}
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {medications.map((medication) => (
        <article
          key={medication.id}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Pill className="size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words font-semibold">{medication.name}</h2>

                {medication.dosage && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {medication.dosage}
                  </p>
                )}
              </div>
            </div>

            <StatusBadge status={medication.status} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {medication.frequency && (
              <MedicationInfo
                icon={<CircleDot className="size-4" />}
                label={tr.medications.frequency}
                value={medication.frequency}
              />
            )}

            {medication.route && (
              <MedicationInfo
                icon={<Pill className="size-4" />}
                label={tr.medications.route}
                value={medicationRouteLabels[medication.route]}
              />
            )}

            {medication.diseaseName && (
              <MedicationInfo
                icon={<Stethoscope className="size-4" />}
                label={tr.medications.disease}
                value={medication.diseaseName}
              />
            )}

            {medication.startDate && (
              <MedicationInfo
                icon={<CalendarDays className="size-4" />}
                label={tr.medications.startDate}
                value={formatLocalDate(medication.startDate)}
              />
            )}

            {medication.endDate && (
              <MedicationInfo
                icon={<CalendarDays className="size-4" />}
                label={tr.medications.endDate}
                value={formatLocalDate(medication.endDate)}
              />
            )}

            {medication.prescribedBy && (
              <MedicationInfo
                icon={<Stethoscope className="size-4" />}
                label={tr.medications.prescribedBy}
                value={medication.prescribedBy}
              />
            )}
          </div>

          {medication.notes && (
            <div className="mt-4 rounded-xl bg-muted/40 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="size-4" />

                {tr.medications.notes}
              </div>

              <p className="mt-2 whitespace-pre-wrap break-words text-sm">
                {medication.notes}
              </p>
            </div>
          )}
          <div className="mt-5 flex justify-end border-t pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPreparingEdit}
              onClick={() => onEdit(medication)}
            >
              <Pencil className="size-4" />

              {tr.medications.edit}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Medication["status"] }) {
  const classes: Record<Medication["status"], string> = {
    ACTIVE: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    COMPLETED: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    DISCONTINUED: "bg-red-500/10 text-red-700 dark:text-red-400",
    PAUSED: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  };

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${classes[status]}`}
    >
      {medicationStatusLabels[status]}
    </span>
  );
}

function MedicationInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>

      <p className="mt-1 break-words text-sm font-medium">{value}</p>
    </div>
  );
}

function formatLocalDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
