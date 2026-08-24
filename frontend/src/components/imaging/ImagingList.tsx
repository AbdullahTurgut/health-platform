import {
  CalendarDays,
  HeartPulse,
  Hospital,
  Pencil,
  ScanLine,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { imagingTypeLabels } from "@/lib/imagingType";

import type { Imaging } from "@/types/imaging";

type ImagingListProps = {
  records: Imaging[];
  isFiltered?: boolean;
  isPreparingEdit?: boolean;

  onEdit: (imaging: Imaging) => void;

  onDelete: (imaging: Imaging) => void;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ImagingList({
  records,
  isFiltered = false,
  isPreparingEdit = false,
  onEdit,
  onDelete,
}: ImagingListProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ScanLine className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered ? tr.imaging.filteredEmptyTitle : tr.imaging.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {isFiltered
            ? tr.imaging.filteredEmptyDescription
            : tr.imaging.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <article
          key={record.id}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ScanLine className="size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold">
                  {imagingTypeLabels[record.type]}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDateTime(record.imagingDate)}
                </p>
              </div>
            </div>

            {record.bodyPart && (
              <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {record.bodyPart}
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <HeartPulse className="size-4" />

                {tr.imaging.disease}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {record.diseaseName ?? tr.imaging.diseaseUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <CalendarDays className="size-4" />

                {tr.imaging.visit}
              </div>

              <p className="mt-2 text-sm font-medium">
                {record.visitDate
                  ? formatDateTime(record.visitDate)
                  : tr.imaging.visitUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Stethoscope className="size-4" />

                {tr.imaging.doctor}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {record.doctorName ?? tr.imaging.doctorUnknown}
              </p>
            </div>

            <div className="rounded-xl bg-muted/40 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Hospital className="size-4" />

                {tr.imaging.hospital}
              </div>

              <p className="mt-2 break-words text-sm font-medium">
                {record.hospitalName ?? tr.imaging.hospitalUnknown}
              </p>
            </div>
          </div>

          {record.report && (
            <div className="mt-5 border-t pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.imaging.report}
              </p>

              <p className="mt-2 line-clamp-4 whitespace-pre-wrap break-words text-sm">
                {record.report}
              </p>
            </div>
          )}

          {record.notes && (
            <div className={record.report ? "mt-4" : "mt-5 border-t pt-4"}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tr.imaging.notes}
              </p>

              <p className="mt-2 line-clamp-3 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {record.notes}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPreparingEdit}
              onClick={() => onEdit(record)}
              aria-label={`${imagingTypeLabels[record.type]} görüntüleme kaydını düzenle`}
            >
              <Pencil className="size-4" />
              {tr.imaging.edit}
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(record)}
              aria-label={`${imagingTypeLabels[record.type]} görüntüleme kaydını sil`}
            >
              <Trash2 className="size-4" />
              {tr.imaging.delete}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
