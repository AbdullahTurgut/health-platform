import { Mail, Phone, Pencil, Stethoscope, Trash2 } from "lucide-react";

import { tr } from "@/i18n/tr";
import type { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";

type DoctorListProps = {
  doctors: Doctor[];
  isFiltered?: boolean;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
};

export default function DoctorList({
  doctors,
  isFiltered = false,
  onEdit,
  onDelete,
}: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Stethoscope className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered ? tr.doctors.filteredEmptyTitle : tr.doctors.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.doctors.filteredEmptyDescription
            : tr.doctors.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <article
          key={doctor.id}
          className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {doctor.firstName} {doctor.lastName}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {doctor.specialization ?? tr.doctors.specializationUnknown}
              </p>
            </div>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="size-4" />
            </div>
          </div>

          {(doctor.phone || doctor.email) && (
            <div className="mt-4 space-y-2 border-t pt-4">
              {doctor.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4 shrink-0" />

                  <span className="truncate">{doctor.phone}</span>
                </div>
              )}

              {doctor.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4 shrink-0" />

                  <span className="truncate">{doctor.email}</span>
                </div>
              )}
            </div>
          )}

          {doctor.notes && (
            <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              {doctor.notes}
            </p>
          )}
          <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit(doctor)}
              aria-label={`${doctor.firstName} ${doctor.lastName} kaydını düzenle`}
            >
              <Pencil className="size-4" />
              {tr.doctors.edit}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(doctor)}
              aria-label={`${doctor.firstName} ${doctor.lastName} kaydını sil`}
            >
              <Trash2 className="size-4" />
              {tr.doctors.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
