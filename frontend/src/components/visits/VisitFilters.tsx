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

  const hasDraftFilter = Boolean(diseaseId || doctorId || hospitalId);

  const hasAppliedFilter = Boolean(
    value.diseaseId || value.doctorId || value.hospitalId,
  );

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.doctorId ?? "") === doctorId &&
    (value.hospitalId ?? "") === hospitalId;

  function clearOtherFilters(keep: "disease" | "doctor" | "hospital") {
    if (keep !== "disease") {
      setDiseaseId("");
    }

    if (keep !== "doctor") {
      setDoctorId("");
    }

    if (keep !== "hospital") {
      setHospitalId("");
    }
  }

  function handleDiseaseChange(nextValue: string | null) {
    const normalizedValue = nextValue ?? "";

    clearOtherFilters("disease");
    setDiseaseId(normalizedValue);
  }

  function handleDoctorChange(nextValue: string | null) {
    const normalizedValue = nextValue ?? "";

    clearOtherFilters("doctor");
    setDoctorId(normalizedValue);
  }

  function handleHospitalChange(nextValue: string | null) {
    const normalizedValue = nextValue ?? "";

    clearOtherFilters("hospital");
    setHospitalId(normalizedValue);
  }

  function handleClear() {
    setDiseaseId("");
    setDoctorId("");
    setHospitalId("");

    onClear();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.visits.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.imaging.filterHint}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="visit-filter-disease">{tr.visits.disease}</Label>

          <Select
            value={diseaseId || null}
            onValueChange={handleDiseaseChange}
            disabled={disabled}
          >
            <SelectTrigger id="visit-filter-disease" className="w-full">
              <SelectValue>
                {diseaseId
                  ? options.diseases.find((disease) => disease.id === diseaseId)
                      ?.name
                  : tr.visits.allDiseases}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.visits.allDiseases}</SelectItem>

              {options.diseases.map((disease) => (
                <SelectItem key={disease.id} value={disease.id}>
                  {disease.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-filter-doctor">{tr.visits.doctor}</Label>

          <Select
            value={doctorId || null}
            onValueChange={handleDoctorChange}
            disabled={disabled}
          >
            <SelectTrigger id="visit-filter-doctor" className="w-full">
              <SelectValue>
                {doctorId
                  ? options.doctors.find((doctor) => doctor.id === doctorId)
                      ?.name
                  : tr.visits.allDoctors}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.visits.allDoctors}</SelectItem>

              {options.doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visit-filter-hospital">{tr.visits.hospital}</Label>

          <Select
            value={hospitalId || null}
            onValueChange={handleHospitalChange}
            disabled={disabled}
          >
            <SelectTrigger id="visit-filter-hospital" className="w-full">
              <SelectValue>
                {hospitalId
                  ? options.hospitals.find(
                      (hospital) => hospital.id === hospitalId,
                    )?.name
                  : tr.visits.allHospitals}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">{tr.visits.allHospitals}</SelectItem>

              {options.hospitals.map((hospital) => (
                <SelectItem key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasDraftFilter && (
        <p className="text-xs text-muted-foreground">
          {tr.visits.singleFilterHint}
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
          {tr.visits.applyFilters}
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

            {tr.visits.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
