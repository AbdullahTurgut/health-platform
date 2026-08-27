import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  function handleDiseaseChange(nextValue: string | null) {
    setDiseaseId(nextValue ?? "");
    setVisitId("");
    setCategory("");
  }

  function handleVisitChange(nextValue: string | null) {
    setVisitId(nextValue ?? "");
    setDiseaseId("");
    setCategory("");
  }

  function handleCategoryChange(nextValue: string | null) {
    setCategory((nextValue ?? "") as TestCategory | "");
    setDiseaseId("");
    setVisitId("");
  }

  function handleClear() {
    setDiseaseId("");
    setVisitId("");
    setCategory("");

    onClear();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.tests.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.tests.filterHint}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-disease">
            {tr.tests.disease}
          </Label>

          <Select
            value={diseaseId || null}
            onValueChange={handleDiseaseChange}
            disabled={disabled}
          >
            <SelectTrigger id="medical-test-filter-disease" className="w-full">
              <SelectValue>
                {diseaseId
                  ? options.diseases.find((disease) => disease.id === diseaseId)
                      ?.name
                  : tr.tests.allDiseases}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.tests.allDiseases}</SelectItem>

              {options.diseases.map((disease) => (
                <SelectItem key={disease.id} value={disease.id}>
                  {disease.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-visit">{tr.tests.visit}</Label>

          <Select
            value={visitId || null}
            onValueChange={handleVisitChange}
            disabled={disabled}
          >
            <SelectTrigger id="medical-test-filter-visit" className="w-full">
              <SelectValue>
                {visitId
                  ? options.visits.find((visit) => visit.id === visitId)?.label
                  : tr.tests.allVisits}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.tests.allVisits}</SelectItem>

              {options.visits.map((visit) => (
                <SelectItem key={visit.id} value={visit.id}>
                  {visit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical-test-filter-category">
            {tr.tests.category}
          </Label>

          <Select
            value={category || null}
            onValueChange={handleCategoryChange}
            disabled={disabled}
          >
            <SelectTrigger id="medical-test-filter-category" className="w-full">
              <SelectValue>
                {category
                  ? testCategoryLabels[category]
                  : tr.tests.allCategories}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.tests.allCategories}</SelectItem>

              {testCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {testCategoryLabels[item]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasDraftFilter && (
        <p className="text-xs text-muted-foreground">
          {tr.tests.singleFilterHint}
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
          {tr.tests.applyFilters}
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

            {tr.tests.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
