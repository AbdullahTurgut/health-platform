import { useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { tr } from "@/i18n/tr";

import { documentTypeLabels, documentTypes } from "@/lib/documentType";

import type {
  DocumentType,
  MedicalDocumentFilters as MedicalDocumentFilterValues,
  MedicalDocumentFormOptions,
} from "@/types/medicalDocument";

type MedicalDocumentFiltersProps = {
  value: MedicalDocumentFilterValues;
  options: MedicalDocumentFormOptions;
  disabled?: boolean;

  onApply: (filters: MedicalDocumentFilterValues) => void;

  onClear: () => void;
};

export default function MedicalDocumentFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: MedicalDocumentFiltersProps) {
  const [diseaseId, setDiseaseId] = useState(value.diseaseId ?? "");

  const [visitId, setVisitId] = useState(value.visitId ?? "");

  const [medicalTestId, setMedicalTestId] = useState(value.medicalTestId ?? "");

  const [imagingId, setImagingId] = useState(value.imagingId ?? "");

  const [documentType, setDocumentType] = useState<DocumentType | "">(
    value.documentType ?? "",
  );

  const [name, setName] = useState(value.name ?? "");

  const normalizedName = name.trim();

  const currentFilters: MedicalDocumentFilterValues = {
    ...(diseaseId ? { diseaseId } : {}),

    ...(visitId ? { visitId } : {}),

    ...(medicalTestId ? { medicalTestId } : {}),

    ...(imagingId ? { imagingId } : {}),

    ...(documentType ? { documentType } : {}),

    ...(normalizedName
      ? {
          name: normalizedName,
        }
      : {}),
  };

  const hasDraftFilter = Boolean(
    diseaseId ||
    visitId ||
    medicalTestId ||
    imagingId ||
    documentType ||
    normalizedName,
  );

  const hasAppliedFilter = Boolean(
    value.diseaseId ||
    value.visitId ||
    value.medicalTestId ||
    value.imagingId ||
    value.documentType ||
    value.name,
  );

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.visitId ?? "") === visitId &&
    (value.medicalTestId ?? "") === medicalTestId &&
    (value.imagingId ?? "") === imagingId &&
    (value.documentType ?? "") === documentType &&
    (value.name ?? "") === normalizedName;

  function clearOtherFilters(
    keep:
      | "disease"
      | "visit"
      | "medicalTest"
      | "imaging"
      | "documentType"
      | "name",
  ) {
    if (keep !== "disease") {
      setDiseaseId("");
    }

    if (keep !== "visit") {
      setVisitId("");
    }

    if (keep !== "medicalTest") {
      setMedicalTestId("");
    }

    if (keep !== "imaging") {
      setImagingId("");
    }

    if (keep !== "documentType") {
      setDocumentType("");
    }

    if (keep !== "name") {
      setName("");
    }
  }

  function handleClear() {
    setDiseaseId("");
    setVisitId("");
    setMedicalTestId("");
    setImagingId("");
    setDocumentType("");
    setName("");

    onClear();
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div>
        <h2 className="font-semibold">{tr.documents.filtersTitle}</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {tr.documents.filterHint}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="document-filter-disease">
            {tr.documents.disease}
          </Label>

          <select
            id="document-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("disease");

              setDiseaseId(event.target.value);
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.documents.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-filter-visit">{tr.documents.visit}</Label>

          <select
            id="document-filter-visit"
            value={visitId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("visit");

              setVisitId(event.target.value);
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.documents.allVisits}</option>

            {options.visits.map((visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-filter-test">
            {tr.documents.medicalTest}
          </Label>

          <select
            id="document-filter-test"
            value={medicalTestId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("medicalTest");

              setMedicalTestId(event.target.value);
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.documents.allMedicalTests}</option>

            {options.medicalTests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-filter-imaging">
            {tr.documents.imaging}
          </Label>

          <select
            id="document-filter-imaging"
            value={imagingId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("imaging");

              setImagingId(event.target.value);
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.documents.allImaging}</option>

            {options.imaging.map((record) => (
              <option key={record.id} value={record.id}>
                {record.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-filter-type">
            {tr.documents.documentType}
          </Label>

          <select
            id="document-filter-type"
            value={documentType}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("documentType");

              setDocumentType(event.target.value as DocumentType | "");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.documents.allDocumentTypes}</option>

            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {documentTypeLabels[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-filter-name">
            {tr.documents.nameFilter}
          </Label>

          <Input
            id="document-filter-name"
            value={name}
            maxLength={255}
            disabled={disabled}
            placeholder={tr.documents.nameFilterPlaceholder}
            onChange={(event) => {
              clearOtherFilters("name");

              setName(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          disabled={disabled || !hasDraftFilter || isSameFilter}
          onClick={() => onApply(currentFilters)}
        >
          {tr.documents.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.documents.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
