import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { tr } from "@/i18n/tr";
import type {
  VisitFilters as VisitFilterValues,
  VisitFormOptions,
} from "@/types/visit";

type VisitFiltersProps = {
  value: VisitFilterValues;
  options: VisitFormOptions;
  disabled?: boolean;
  onApply: (filters: VisitFilterValues) => void;
  onClear: () => void;
};

export default function VisitFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: VisitFiltersProps) {
  const [diseaseId, setDiseaseId] = useState(value.diseaseId ?? "");

  const [doctorId, setDoctorId] = useState(value.doctorId ?? "");

  const [hospitalId, setHospitalId] = useState(value.hospitalId ?? "");

  const currentFilters: VisitFilterValues = {
    ...(diseaseId ? { diseaseId } : {}),
    ...(doctorId ? { doctorId } : {}),
    ...(hospitalId ? { hospitalId } : {}),
  };

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.doctorId ?? "") === doctorId &&
    (value.hospitalId ?? "") === hospitalId;

  const hasDraftFilter = Boolean(diseaseId || doctorId || hospitalId);

  const hasAppliedFilter = Boolean(
    value.diseaseId || value.doctorId || value.hospitalId,
  );

  function handleClear() {
    setDiseaseId("");
    setDoctorId("");
    setHospitalId("");

    onClear();
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <p className="font-medium">{tr.visits.filtersTitle}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="visit-filter-disease">{tr.visits.disease}</Label>

          <select
            id="visit-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => setDiseaseId(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.visits.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-filter-doctor">{tr.visits.doctor}</Label>

          <select
            id="visit-filter-doctor"
            value={doctorId}
            disabled={disabled}
            onChange={(event) => setDoctorId(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.visits.allDoctors}</option>

            {options.doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-filter-hospital">{tr.visits.hospital}</Label>

          <select
            id="visit-filter-hospital"
            value={hospitalId}
            disabled={disabled}
            onChange={(event) => setHospitalId(event.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{tr.visits.allHospitals}</option>

            {options.hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name}
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
          {tr.visits.applyFilters}
        </Button>

        {hasAppliedFilter && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />
            {tr.visits.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
