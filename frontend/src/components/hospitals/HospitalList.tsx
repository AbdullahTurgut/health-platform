import { Building2, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { Hospital } from "@/types/hospital";

type HospitalListProps = {
  hospitals: Hospital[];
  isFiltered?: boolean;
  onEdit: (hospital: Hospital) => void;
  onDelete: (hospital: Hospital) => void;
};

export default function HospitalList({
  hospitals,
  isFiltered = false,
  onEdit,
  onDelete,
}: HospitalListProps) {
  if (hospitals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered
            ? tr.hospitals.filteredEmptyTitle
            : tr.hospitals.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.hospitals.filteredEmptyDescription
            : tr.hospitals.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {hospitals.map((hospital) => (
        <article
          key={hospital.id}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="break-words font-semibold">{hospital.name}</h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />

                <span>{hospital.city ?? tr.hospitals.cityUnknown}</span>
              </div>
            </div>
          </div>

          {hospital.address && (
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.hospitals.address}
              </p>

              <p className="mt-1 break-words text-sm">{hospital.address}</p>
            </div>
          )}

          {hospital.phone && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Phone className="size-4 shrink-0 text-muted-foreground" />

              <span className="break-all">{hospital.phone}</span>
            </div>
          )}

          {hospital.notes && (
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.hospitals.notes}
              </p>

              <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                {hospital.notes}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(hospital)}
              aria-label={`${hospital.name} kaydını düzenle`}
            >
              <Pencil className="size-4" />
              {tr.hospitals.edit}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(hospital)}
              aria-label={`${hospital.name} kaydını sil`}
            >
              <Trash2 className="size-4" />
              {tr.hospitals.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
