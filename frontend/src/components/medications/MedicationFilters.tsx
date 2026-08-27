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

const selectClassName = `
  h-10
  w-full
  rounded-lg
  border
  border-input
  bg-card
  px-3
  text-sm
  text-foreground
  outline-none
  transition-[color,background-color,border-color,box-shadow]
  duration-150
  focus-visible:border-primary
  focus-visible:ring-3
  focus-visible:ring-primary/10
  disabled:cursor-not-allowed
  disabled:bg-muted
  disabled:opacity-70
`;

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
    ...(normalizedName ? { name: normalizedName } : {}),
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
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.medications.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.medications.filterHint}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
            className={selectClassName}
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
            className={selectClassName}
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

      {hasDraftFilter && (
        <p className="text-xs text-muted-foreground">
          {tr.medications.singleFilterHint}
        </p>
      )}

      <div
        className="
          flex
          flex-col
          gap-2
          border-t
          border-border
          pt-4
          sm:flex-row
          sm:justify-end
        "
      >
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={disabled || !hasDraftFilter || isSameFilter}
          onClick={() => onApply(currentFilters)}
        >
          {tr.medications.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
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
