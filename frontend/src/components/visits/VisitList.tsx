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
          <CalendarDays className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.visits.filteredEmptyTitle : tr.visits.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
          <div className="flex items-start gap-3">
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
              <CalendarDays className="size-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {formatVisitDate(visit.visitDate)}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {visit.department ?? tr.visits.departmentUnknown}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <VisitRelation
              icon={HeartPulse}
              label={tr.visits.disease}
              value={visit.diseaseName ?? tr.visits.diseaseUnknown}
            />

            <VisitRelation
              icon={Stethoscope}
              label={tr.visits.doctor}
              value={visit.doctorName ?? tr.visits.doctorUnknown}
            />

            <VisitRelation
              icon={Building2}
              label={tr.visits.hospital}
              value={visit.hospitalName ?? tr.visits.hospitalUnknown}
            />
          </div>

          {(visit.reason || visit.diagnosisNote || visit.notes) && (
            <div className="mt-5 space-y-4 border-t border-border pt-5">
              {visit.reason && (
                <VisitTextSection
                  label={tr.visits.reason}
                  value={visit.reason}
                />
              )}

              {visit.diagnosisNote && (
                <VisitTextSection
                  label={tr.visits.diagnosisNote}
                  value={visit.diagnosisNote}
                />
              )}

              {visit.notes && (
                <VisitTextSection
                  label={tr.visits.notes}
                  value={visit.notes}
                  muted
                  clamp
                />
              )}
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
              onClick={() => onEdit(visit)}
            >
              <Pencil className="size-4" />

              {tr.visits.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
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

type VisitRelationProps = {
  icon: typeof HeartPulse;
  label: string;
  value: string;
};

function VisitRelation({ icon: Icon, label, value }: VisitRelationProps) {
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

type VisitTextSectionProps = {
  label: string;
  value: string;
  muted?: boolean;
  clamp?: boolean;
};

function VisitTextSection({
  label,
  value,
  muted = false,
  clamp = false,
}: VisitTextSectionProps) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p
        className={[
          "mt-1.5 whitespace-pre-wrap break-words text-sm leading-6",
          muted ? "text-muted-foreground" : "text-foreground",
          clamp ? "line-clamp-3" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
