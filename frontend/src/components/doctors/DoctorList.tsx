import { Mail, Pencil, Phone, Stethoscope, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { Doctor } from "@/types/doctor";

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
          <Stethoscope className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.doctors.filteredEmptyTitle : tr.doctors.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {isFiltered
            ? tr.doctors.filteredEmptyDescription
            : tr.doctors.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => {
        const doctorName = `${doctor.firstName} ${doctor.lastName}`;

        return (
          <article
            key={doctor.id}
            className="
              group
              flex
              min-h-64
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
                  {doctorName}
                </h2>

                <p className="mt-1.5 text-sm text-muted-foreground">
                  {doctor.specialization ?? tr.doctors.specializationUnknown}
                </p>
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
                <Stethoscope className="size-5" />
              </div>
            </div>

            {(doctor.phone || doctor.email) && (
              <div
                className="
                  mt-5
                  space-y-2.5
                  border-t
                  border-border
                  pt-4
                "
              >
                {doctor.phone && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-sm
                      text-muted-foreground
                    "
                  >
                    <Phone className="size-4 shrink-0 text-primary/70" />

                    <span className="truncate">{doctor.phone}</span>
                  </div>
                )}

                {doctor.email && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-sm
                      text-muted-foreground
                    "
                  >
                    <Mail className="size-4 shrink-0 text-primary/70" />

                    <span className="truncate">{doctor.email}</span>
                  </div>
                )}
              </div>
            )}

            {doctor.notes && (
              <p
                className="
                  mt-4
                  line-clamp-3
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                {doctor.notes}
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
                onClick={() => onEdit(doctor)}
                aria-label={`${doctorName} kaydını düzenle`}
              >
                <Pencil className="size-4" />

                {tr.doctors.edit}
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onDelete(doctor)}
                aria-label={`${doctorName} kaydını sil`}
              >
                <Trash2 className="size-4" />

                {tr.doctors.delete}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
