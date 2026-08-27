import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { getApiErrorMessage } from "@/api/apiError";
import UploadMedicalDocumentDialog from "@/components/documents/UploadMedicalDocumentDialog";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { imagingTypeLabels } from "@/lib/imagingType";
import { getDiseases } from "@/services/diseaseService";
import { getImagingRecords } from "@/services/imagingService";
import { getMedicalTests } from "@/services/medicalTestService";
import { getVisits } from "@/services/visitService";
import type { ImagingType } from "@/types/imaging";
import type {
  MedicalDocument,
  MedicalDocumentFilters as MedicalDocumentFilterValues,
  MedicalDocumentFormOptions,
} from "@/types/medicalDocument";
import { getMedicalDocuments } from "@/services/medicalDocumentService";
import MedicalDocumentFilters from "@/components/documents/MedicalDocumentFilters";
import { downloadMedicalDocument } from "@/services/medicalDocumentService";
import MedicalDocumentList from "@/components/documents/MedicalDocumentList";
import { downloadBlob } from "@/lib/download";
import DeleteMedicalDocumentDialog from "@/components/documents/DeleteMedicalDocumentDialog";
export default function MedicalDocumentsPage() {
  const [formOptions, setFormOptions] = useState<MedicalDocumentFormOptions>({
    diseases: [],
    visits: [],
    medicalTests: [],
    imaging: [],
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [isPreparingUpload, setIsPreparingUpload] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [documents, setDocuments] = useState<MedicalDocument[]>([]);

  const [filters, setFilters] = useState<MedicalDocumentFilterValues>({});

  const [isLoading, setIsLoading] = useState(true);

  const isFiltered = Boolean(
    filters.diseaseId ||
    filters.visitId ||
    filters.medicalTestId ||
    filters.imagingId ||
    filters.documentType ||
    filters.name,
  );

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [downloadError, setDownloadError] = useState<string | null>(null);

  const [documentToDelete, setDocumentToDelete] =
    useState<MedicalDocument | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchDocuments() {
      try {
        const response = await getMedicalDocuments(filters);

        if (!isCancelled) {
          setDocuments(response);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(getApiErrorMessage(error));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchDocuments();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  async function refreshDocuments() {
    const response = await getMedicalDocuments(filters);

    setDocuments(response);
  }

  async function loadDocumentFormOptions() {
    const [diseases, visits, medicalTests, imaging] = await Promise.all([
      getDiseases(),
      getVisits(),
      getMedicalTests(),
      getImagingRecords(),
    ]);

    const options: MedicalDocumentFormOptions = {
      diseases: diseases
        .map((disease) => ({
          id: disease.id,
          name: disease.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      visits: visits
        .map((visit) => ({
          id: visit.id,
          label: formatVisitOption(visit.visitDate),
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "tr")),

      medicalTests: medicalTests
        .map((test) => ({
          id: test.id,
          name: test.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      imaging: imaging
        .map((record) => ({
          id: record.id,
          label: formatImagingOption(
            record.type,
            record.bodyPart,
            record.imagingDate,
          ),
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "tr")),
    };

    setFormOptions(options);

    return options;
  }

  async function handleOpenUpload() {
    if (isPreparingUpload) {
      return;
    }

    try {
      setIsPreparingUpload(true);
      setError(null);

      await loadDocumentFormOptions();

      setIsUploadOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingUpload(false);
    }
  }

  async function handleUploaded() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshDocuments();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isCancelled = false;

    async function fetchFilterOptions() {
      try {
        const [diseases, visits, medicalTests, imaging] = await Promise.all([
          getDiseases(),
          getVisits(),
          getMedicalTests(),
          getImagingRecords(),
        ]);

        if (isCancelled) {
          return;
        }

        setFormOptions({
          diseases: diseases
            .map((disease) => ({
              id: disease.id,
              name: disease.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "tr")),

          visits: visits
            .map((visit) => ({
              id: visit.id,
              label: formatVisitOption(visit.visitDate),
            }))
            .sort((a, b) => a.label.localeCompare(b.label, "tr")),

          medicalTests: medicalTests
            .map((test) => ({
              id: test.id,
              name: test.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "tr")),

          imaging: imaging
            .map((record) => ({
              id: record.id,
              label: formatImagingOption(
                record.type,
                record.bodyPart,
                record.imagingDate,
              ),
            }))
            .sort((a, b) => a.label.localeCompare(b.label, "tr")),
        });
      } catch {
        /*
         * Liste yine çalışabilir.
         * Filter option yüklemesi ayrı concern.
         */
      }
    }

    fetchFilterOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  function handleApplyFilters(nextFilters: MedicalDocumentFilterValues) {
    const activeFilterCount = [
      nextFilters.diseaseId,
      nextFilters.visitId,
      nextFilters.medicalTestId,
      nextFilters.imagingId,
      nextFilters.documentType,
      nextFilters.name?.trim(),
    ].filter(Boolean).length;

    if (activeFilterCount > 1) {
      return;
    }

    const isSame =
      (nextFilters.diseaseId ?? "") === (filters.diseaseId ?? "") &&
      (nextFilters.visitId ?? "") === (filters.visitId ?? "") &&
      (nextFilters.medicalTestId ?? "") === (filters.medicalTestId ?? "") &&
      (nextFilters.imagingId ?? "") === (filters.imagingId ?? "") &&
      (nextFilters.documentType ?? "") === (filters.documentType ?? "") &&
      (nextFilters.name?.trim() ?? "") === (filters.name ?? "");

    if (isSame) {
      return;
    }

    setIsLoading(true);

    setFilters({
      ...nextFilters,

      ...(nextFilters.name
        ? {
            name: nextFilters.name.trim(),
          }
        : {}),
    });
  }

  function handleClearFilters() {
    const hasFilter = Boolean(
      filters.diseaseId ||
      filters.visitId ||
      filters.medicalTestId ||
      filters.imagingId ||
      filters.documentType ||
      filters.name,
    );

    if (!hasFilter) {
      return;
    }

    setIsLoading(true);
    setFilters({});
  }

  async function handleDownload(document: MedicalDocument) {
    if (downloadingId) {
      return;
    }

    try {
      setDownloadingId(document.id);

      setDownloadError(null);

      const blob = await downloadMedicalDocument(document.id);

      downloadBlob(blob, document.fileName);
    } catch (error) {
      setDownloadError(getApiErrorMessage(error));
    } finally {
      setDownloadingId(null);
    }
  }

  function handleDelete(document: MedicalDocument) {
    setDocumentToDelete(document);

    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setDocumentToDelete(null);
    }
  }

  async function handleDeleted() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshDocuments();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <header
        className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-tight text-primary">
            {tr.documents.eyebrow}
          </p>

          <h1
            className="
            mt-2
            text-3xl
            font-semibold
            tracking-tight
            text-foreground
            sm:text-[2rem]
          "
          >
            {tr.documents.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.documents.description}
          </p>
        </div>

        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={handleOpenUpload}
          disabled={isPreparingUpload}
        >
          <Upload className="size-4" />

          {isPreparingUpload ? tr.documents.preparing : tr.documents.upload}
        </Button>
      </header>

      <div
        className="
        rounded-xl
        border
        border-border
        bg-card
        p-4
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        sm:p-5
      "
      >
        <MedicalDocumentFilters
          value={filters}
          options={formOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      {downloadError && (
        <div
          role="alert"
          className="
          rounded-xl
          border
          border-destructive/20
          bg-destructive/5
          p-4
        "
        >
          <p className="text-sm font-medium text-destructive">
            {tr.documents.downloadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {downloadError}
          </p>
        </div>
      )}

      {error ? (
        <div
          role="alert"
          className="
          rounded-xl
          border
          border-destructive/20
          bg-destructive/5
          p-5
        "
        >
          <p className="text-sm font-medium text-destructive">
            {tr.documents.loadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      ) : isLoading ? (
        <MedicalDocumentsLoading />
      ) : (
        <MedicalDocumentList
          documents={documents}
          isFiltered={isFiltered}
          downloadingId={downloadingId}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      )}

      <UploadMedicalDocumentDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        options={formOptions}
        onUploaded={handleUploaded}
      />

      <DeleteMedicalDocumentDialog
        key={documentToDelete?.id ?? "no-document-delete"}
        document={documentToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </section>
  );
}

function MedicalDocumentsLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="
            h-72
            animate-pulse
            rounded-xl
            border
            border-border
            bg-card
          "
        />
      ))}
    </div>
  );
}

function formatVisitOption(visitDate: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(visitDate));
}

function formatImagingOption(
  type: ImagingType,
  bodyPart: string | null,
  imagingDate: string,
) {
  const date = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
  }).format(new Date(imagingDate));

  const typeLabel = imagingTypeLabels[type];

  return bodyPart
    ? `${typeLabel} — ${bodyPart} — ${date}`
    : `${typeLabel} — ${date}`;
}
