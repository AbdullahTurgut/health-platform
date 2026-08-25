import { useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { tr } from "@/i18n/tr";

import { medicationStatusLabels, medicationStatuses } from "@/lib/medication";

import type {
  MedicationFilters as MedicationFilterValues,
  MedicationFormOptions,
  MedicationStatus,
} from "@/types/medication";

type MedicationFiltersProps = {
  value: MedicationFilterValues;
  options: MedicationFormOptions;
  disabled?: boolean;

  onApply: (filters: MedicationFilterValues) => void;

  onClear: () => void;
};

export default function MedicationFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: MedicationFiltersProps) {
  const [diseaseId, setDiseaseId] = useState(value.diseaseId ?? "");

  const [status, setStatus] = useState<MedicationStatus | "">(
    value.status ?? "",
  );

  const [name, setName] = useState(value.name ?? "");

  const normalizedName = name.trim();

  const currentFilters: MedicationFilterValues = {
    ...(diseaseId ? { diseaseId } : {}),

    ...(status ? { status } : {}),

    ...(normalizedName
      ? {
          name: normalizedName,
        }
      : {}),
  };

  const hasDraftFilter = Boolean(diseaseId || status || normalizedName);

  const hasAppliedFilter = Boolean(
    value.diseaseId || value.status || value.name,
  );

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.status ?? "") === status &&
    (value.name ?? "") === normalizedName;

  function clearOtherFilters(keep: "disease" | "status" | "name") {
    if (keep !== "disease") {
      setDiseaseId("");
    }

    if (keep !== "status") {
      setStatus("");
    }

    if (keep !== "name") {
      setName("");
    }
  }

  function handleClear() {
    setDiseaseId("");
    setStatus("");
    setName("");

    onClear();
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div>
        <h2 className="font-semibold">{tr.medications.filtersTitle}</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {tr.medications.filterHint}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="medication-filter-disease">
            {tr.medications.disease}
          </Label>

          <select
            id="medication-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("disease");

              setDiseaseId(event.target.value);
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.medications.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medication-filter-status">
            {tr.medications.status}
          </Label>

          <select
            id="medication-filter-status"
            value={status}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("status");

              setStatus(event.target.value as MedicationStatus | "");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.medications.allStatuses}</option>

            {medicationStatuses.map((statusValue) => (
              <option key={statusValue} value={statusValue}>
                {medicationStatusLabels[statusValue]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medication-filter-name">
            {tr.medications.nameFilter}
          </Label>

          <Input
            id="medication-filter-name"
            value={name}
            maxLength={200}
            disabled={disabled}
            placeholder={tr.medications.nameFilterPlaceholder}
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
          {tr.medications.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.medications.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
