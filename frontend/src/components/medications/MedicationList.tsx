import {
  CalendarDays,
  CircleDot,
  FileText,
  Pencil,
  Pill,
  Stethoscope,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import {
  medicationRouteLabels,
  medicationStatusLabels,
} from "@/lib/medication";
import type { Medication } from "@/types/medication";

type MedicationListProps = {
  medications: Medication[];
  isFiltered?: boolean;
  isPreparingEdit?: boolean;
  onEdit: (medication: Medication) => void;
  onDelete: (medication: Medication) => void;
};

export default function MedicationList({
  medications,
  isFiltered = false,
  isPreparingEdit = false,
  onEdit,
  onDelete,
}: MedicationListProps) {
  if (medications.length === 0) {
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
          <Pill className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered
            ? tr.medications.filteredEmptyTitle
            : tr.medications.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
                <Pill className="size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-base font-semibold tracking-tight text-foreground">
                  {medication.name}
                </h2>

                {medication.dosage && (
                  <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
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
                icon={CircleDot}
                label={tr.medications.frequency}
                value={medication.frequency}
              />
            )}

            {medication.route && (
              <MedicationInfo
                icon={Pill}
                label={tr.medications.route}
                value={medicationRouteLabels[medication.route]}
              />
            )}

            {medication.diseaseName && (
              <MedicationInfo
                icon={Stethoscope}
                label={tr.medications.disease}
                value={medication.diseaseName}
              />
            )}

            {medication.startDate && (
              <MedicationInfo
                icon={CalendarDays}
                label={tr.medications.startDate}
                value={formatLocalDate(medication.startDate)}
              />
            )}

            {medication.endDate && (
              <MedicationInfo
                icon={CalendarDays}
                label={tr.medications.endDate}
                value={formatLocalDate(medication.endDate)}
              />
            )}

            {medication.prescribedBy && (
              <MedicationInfo
                icon={Stethoscope}
                label={tr.medications.prescribedBy}
                value={medication.prescribedBy}
              />
            )}
          </div>

          {medication.notes && (
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <FileText className="size-4 text-primary/70" />

                {tr.medications.notes}
              </div>

              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                {medication.notes}
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
              variant="outline"
              size="sm"
              disabled={isPreparingEdit}
              onClick={() => onEdit(medication)}
            >
              <Pencil className="size-4" />

              {tr.medications.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isPreparingEdit}
              onClick={() => onDelete(medication)}
            >
              <Trash2 className="size-4" />

              {tr.medications.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Medication["status"] }) {
  const classes: Record<Medication["status"], string> = {
    ACTIVE: "border-primary/20 bg-primary/10 text-primary",
    COMPLETED: "border-border bg-muted/60 text-muted-foreground",
    DISCONTINUED: "border-destructive/20 bg-destructive/10 text-destructive",
    PAUSED:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  };

  return (
    <span
      className={`
        w-fit
        shrink-0
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        ${classes[status]}
      `}
    >
      {medicationStatusLabels[status]}
    </span>
  );
}

type MedicationInfoProps = {
  icon: typeof Pill;
  label: string;
  value: string;
};

function MedicationInfo({ icon: Icon, label, value }: MedicationInfoProps) {
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

function formatLocalDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
