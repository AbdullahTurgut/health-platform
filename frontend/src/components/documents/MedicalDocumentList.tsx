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
      <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="size-5" />
        </div>

        <h2 className="mt-4 font-semibold">
          {isFiltered
            ? tr.documents.filteredEmptyTitle
            : tr.documents.emptyTitle}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
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
            className="rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <DocumentIcon mimeType={document.mimeType} />
                </div>

                <div className="min-w-0">
                  <h2 className="break-words font-semibold">{document.name}</h2>

                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {document.fileName}
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">
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

            <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
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
    <div className="rounded-xl bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 break-words text-sm font-medium">{value}</p>
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
