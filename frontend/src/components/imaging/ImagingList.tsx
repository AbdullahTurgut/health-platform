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
          <ScanLine className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered ? tr.imaging.filteredEmptyTitle : tr.imaging.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
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
                <ScanLine className="size-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {imagingTypeLabels[record.type]}
                </h2>

                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="size-3.5 shrink-0" />

                  <span>{formatDateTime(record.imagingDate)}</span>
                </div>
              </div>
            </div>

            {record.bodyPart && (
              <span
                className="
                  w-fit
                  shrink-0
                  rounded-full
                  border
                  border-border
                  bg-muted/60
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-muted-foreground
                "
              >
                {record.bodyPart}
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <ImagingRelation
              icon={HeartPulse}
              label={tr.imaging.disease}
              value={record.diseaseName ?? tr.imaging.diseaseUnknown}
            />

            <ImagingRelation
              icon={CalendarDays}
              label={tr.imaging.visit}
              value={
                record.visitDate
                  ? formatDateTime(record.visitDate)
                  : tr.imaging.visitUnknown
              }
            />

            <ImagingRelation
              icon={Stethoscope}
              label={tr.imaging.doctor}
              value={record.doctorName ?? tr.imaging.doctorUnknown}
            />

            <ImagingRelation
              icon={Hospital}
              label={tr.imaging.hospital}
              value={record.hospitalName ?? tr.imaging.hospitalUnknown}
            />
          </div>

          {(record.report || record.notes) && (
            <div className="mt-5 space-y-4 border-t border-border pt-5">
              {record.report && (
                <ImagingTextSection
                  label={tr.imaging.report}
                  value={record.report}
                  clamp={4}
                />
              )}

              {record.notes && (
                <ImagingTextSection
                  label={tr.imaging.notes}
                  value={record.notes}
                  muted
                  clamp={3}
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

type ImagingRelationProps = {
  icon: typeof HeartPulse;
  label: string;
  value: string;
};

function ImagingRelation({ icon: Icon, label, value }: ImagingRelationProps) {
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

type ImagingTextSectionProps = {
  label: string;
  value: string;
  muted?: boolean;
  clamp?: 3 | 4;
};

function ImagingTextSection({
  label,
  value,
  muted = false,
  clamp,
}: ImagingTextSectionProps) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p
        className={[
          "mt-1.5 whitespace-pre-wrap break-words text-sm leading-6",
          muted ? "text-muted-foreground" : "text-foreground",
          clamp === 3 ? "line-clamp-3" : "",
          clamp === 4 ? "line-clamp-4" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
