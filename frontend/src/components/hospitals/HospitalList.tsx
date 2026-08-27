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
          <Building2 className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered
            ? tr.hospitals.filteredEmptyTitle
            : tr.hospitals.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
          className="
            group
            flex
            min-h-72
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
            <div className="min-w-0 flex-1">
              <h2
                className="
                  break-words
                  text-base
                  font-semibold
                  tracking-tight
                  text-foreground
                "
              >
                {hospital.name}
              </h2>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "
              >
                <MapPin className="size-4 shrink-0 text-primary/70" />

                <span className="truncate">
                  {hospital.city ?? tr.hospitals.cityUnknown}
                </span>
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
              <Building2 className="size-5" />
            </div>
          </div>

          {(hospital.address || hospital.phone) && (
            <div
              className="
                mt-5
                space-y-3
                border-t
                border-border
                pt-4
              "
            >
              {hospital.address && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {tr.hospitals.address}
                  </p>

                  <p className="mt-1.5 break-words text-sm leading-5 text-foreground">
                    {hospital.address}
                  </p>
                </div>
              )}

              {hospital.phone && (
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

                  <span className="break-all">{hospital.phone}</span>
                </div>
              )}
            </div>
          )}

          {hospital.notes && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground">
                {tr.hospitals.notes}
              </p>

              <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {hospital.notes}
              </p>
            </div>
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
              onClick={() => onEdit(hospital)}
              aria-label={`${hospital.name} kaydını düzenle`}
            >
              <Pencil className="size-4" />

              {tr.hospitals.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
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
