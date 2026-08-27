import { Download, FileImage, FileText, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { documentTypeLabels } from "@/lib/documentType";
import { formatFileSize } from "@/lib/file";
import { imagingTypeLabels } from "@/lib/imagingType";

import type { ImagingType } from "@/types/imaging";
import type { MedicalDocument } from "@/types/medicalDocument";

type MedicalDocumentListProps = {
  documents: MedicalDocument[];
  isFiltered?: boolean;
  downloadingId?: string | null;
  onDownload: (document: MedicalDocument) => void;
  onDelete: (document: MedicalDocument) => void;
};

function DocumentIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("image/")) {
    return <FileImage className="size-5" />;
  }

  return <FileText className="size-5" />;
}

export default function MedicalDocumentList({
  documents,
  isFiltered = false,
  downloadingId = null,
  onDownload,
  onDelete,
}: MedicalDocumentListProps) {
  if (documents.length === 0) {
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
          <FileText className="size-5" />
        </div>

        <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
          {isFiltered
            ? tr.documents.filteredEmptyTitle
            : tr.documents.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {isFiltered
            ? tr.documents.filteredEmptyDescription
            : tr.documents.emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => {
        const isDownloading = downloadingId === document.id;

        return (
          <article
            key={document.id}
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
                  <DocumentIcon mimeType={document.mimeType} />
                </div>

                <div className="min-w-0">
                  <h2
                    className="
                      break-words
                      text-base
                      font-semibold
                      tracking-tight
                      text-foreground
                    "
                  >
                    {document.name}
                  </h2>

                  <p
                    className="
                      mt-1.5
                      break-all
                      text-sm
                      leading-5
                      text-muted-foreground
                    "
                  >
                    {document.fileName}
                  </p>
                </div>
              </div>

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
                {documentTypeLabels[document.documentType]}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DocumentInfo
                label={tr.documents.fileSize}
                value={formatFileSize(document.fileSize)}
              />

              <DocumentInfo
                label={tr.documents.uploadedAt}
                value={formatDateTime(document.uploadedAt)}
              />

              <DocumentInfo
                label={tr.documents.mimeType}
                value={document.mimeType}
              />

              {document.diseaseName && (
                <DocumentInfo
                  label={tr.documents.disease}
                  value={document.diseaseName}
                />
              )}

              {document.visitDate && (
                <DocumentInfo
                  label={tr.documents.visit}
                  value={formatDateTime(document.visitDate)}
                />
              )}

              {document.medicalTestName && (
                <DocumentInfo
                  label={tr.documents.medicalTest}
                  value={document.medicalTestName}
                />
              )}

              {document.imagingType && (
                <DocumentInfo
                  label={tr.documents.imaging}
                  value={formatImagingType(document.imagingType)}
                />
              )}
            </div>

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
                variant="secondary"
                size="sm"
                disabled={isDownloading}
                onClick={() => onDownload(document)}
                aria-label={`${document.name} belgesini indir`}
              >
                <Download className="size-4" />

                {isDownloading
                  ? tr.documents.downloading
                  : tr.documents.download}
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={isDownloading}
                onClick={() => onDelete(document)}
                aria-label={`${document.name} belgesini sil`}
              >
                <Trash2 className="size-4" />

                {tr.documents.delete}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function DocumentInfo({ label, value }: { label: string; value: string }) {
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
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-2 break-words text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatImagingType(value: string) {
  if (value in imagingTypeLabels) {
    return imagingTypeLabels[value as ImagingType];
  }

  return value;
}
