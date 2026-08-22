import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { tr } from "@/i18n/tr";
import { testCategories, testCategoryLabels } from "@/lib/testCategory";

import type {
  MedicalTestFilterOptions,
  MedicalTestFilters as MedicalTestFilterValues,
  TestCategory,
} from "@/types/medicalTest";

type MedicalTestFiltersProps = {
  value: MedicalTestFilterValues;
  options: MedicalTestFilterOptions;
  disabled?: boolean;

  onApply: (filters: MedicalTestFilterValues) => void;

  onClear: () => void;
};

export default function MedicalTestFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: MedicalTestFiltersProps) {
  const [diseaseId, setDiseaseId] = useState(value.diseaseId ?? "");

  const [visitId, setVisitId] = useState(value.visitId ?? "");

  const [category, setCategory] = useState<TestCategory | "">(
    value.category ?? "",
  );

  const currentFilters: MedicalTestFilterValues = {
    ...(diseaseId ? { diseaseId } : {}),

    ...(visitId ? { visitId } : {}),

    ...(category ? { category } : {}),
  };

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.visitId ?? "") === visitId &&
    (value.category ?? "") === category;

  const hasDraftFilter = Boolean(diseaseId || visitId || category);

  const hasAppliedFilter = Boolean(
    value.diseaseId || value.visitId || value.category,
  );

  function handleClear() {
    setDiseaseId("");
    setVisitId("");
    setCategory("");

    onClear();
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <p className="font-medium">{tr.tests.filtersTitle}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-disease">
            {tr.tests.disease}
          </Label>

          <select
            id="medical-test-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => {
              setDiseaseId(event.target.value);

              setVisitId("");
              setCategory("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.tests.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-visit">{tr.tests.visit}</Label>

          <select
            id="medical-test-filter-visit"
            value={visitId}
            disabled={disabled}
            onChange={(event) => {
              setVisitId(event.target.value);

              setDiseaseId("");
              setCategory("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.tests.allVisits}</option>

            {options.visits.map((visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-category">
            {tr.tests.category}
          </Label>

          <select
            id="medical-test-filter-category"
            value={category}
            disabled={disabled}
            onChange={(event) => {
              setCategory(event.target.value as TestCategory | "");

              setDiseaseId("");
              setVisitId("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.tests.allCategories}</option>

            {testCategories.map((item) => (
              <option key={item} value={item}>
                {testCategoryLabels[item]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          disabled={disabled || !hasDraftFilter || isSameFilter}
          onClick={() => onApply(currentFilters)}
        >
          {tr.tests.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.tests.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
