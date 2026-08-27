import { CalendarDays, HeartPulse, Pencil, Trash2 } from "lucide-react";

import DiseaseStatusBadge from "@/components/diseases/DiseaseStatusBadge";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { Disease } from "@/types/disease";

type DiseaseListProps = {
  diseases: Disease[];
  isFiltered?: boolean;
  onEdit: (disease: Disease) => void;
  onDelete: (disease: Disease) => void;
};

function formatDate(value: string | null) {
  if (!value) {
    return tr.diseases.unknownDiagnosisDate;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function DiseaseList({
  diseases,
  isFiltered = false,
  onEdit,
  onDelete,
}: DiseaseListProps) {
  if (diseases.length === 0) {
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
          <HeartPulse className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.diseases.filteredEmptyTitle : tr.diseases.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {isFiltered
            ? tr.diseases.filteredEmptyDescription
            : tr.diseases.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {diseases.map((disease) => (
        <article
          key={disease.id}
          className="
            group
            flex
            min-h-56
            flex-col
            rounded-xl
            border
            border-border
            bg-card
            p-5
            shadow-[0_1px_2px_rgba(15,23,42,0.03)]
            transition-[border-color,box-shadow,transform]
            duration-150
            hover:-translate-y-0.5
            hover:border-primary/20
            hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
            sm:p-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-base
                  font-semibold
                  tracking-tight
                  text-foreground
                "
              >
                {disease.name}
              </h2>

              <div className="mt-2">
                <DiseaseStatusBadge status={disease.status} />
              </div>
            </div>

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
              <HeartPulse className="size-5" />
            </div>
          </div>

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-sm
              text-muted-foreground
            "
          >
            <CalendarDays className="size-4 shrink-0" />

            <span>{formatDate(disease.diagnosisDate)}</span>
          </div>

          {disease.description && (
            <p
              className="
                mt-4
                line-clamp-3
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              {disease.description}
            </p>
          )}

          <div
            className="
              mt-auto
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
              onClick={() => onEdit(disease)}
              aria-label={`${disease.name} kaydını düzenle`}
            >
              <Pencil className="size-4" />

              {tr.diseases.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(disease)}
              aria-label={`${disease.name} kaydını sil`}
            >
              <Trash2 className="size-4" />

              {tr.diseases.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
