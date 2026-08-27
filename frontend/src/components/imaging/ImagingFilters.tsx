import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tr } from "@/i18n/tr";
import { imagingTypes, imagingTypeLabels } from "@/lib/imagingType";

import type {
  ImagingFilterOptions,
  ImagingFilters as ImagingFilterValues,
  ImagingType,
} from "@/types/imaging";

type ImagingFiltersProps = {
  value: ImagingFilterValues;
  options: ImagingFilterOptions;
  disabled?: boolean;
  onApply: (filters: ImagingFilterValues) => void;
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

export default function ImagingFilters({
  value,
  options,
  disabled = false,
  onApply,
  onClear,
}: ImagingFiltersProps) {
  const [diseaseId, setDiseaseId] = useState(value.diseaseId ?? "");

  const [visitId, setVisitId] = useState(value.visitId ?? "");

  const [doctorId, setDoctorId] = useState(value.doctorId ?? "");

  const [hospitalId, setHospitalId] = useState(value.hospitalId ?? "");

  const [type, setType] = useState<ImagingType | "">(value.type ?? "");

  const [bodyPart, setBodyPart] = useState(value.bodyPart ?? "");

  const normalizedBodyPart = bodyPart.trim();

  const currentFilters: ImagingFilterValues = {
    ...(diseaseId ? { diseaseId } : {}),
    ...(visitId ? { visitId } : {}),
    ...(doctorId ? { doctorId } : {}),
    ...(hospitalId ? { hospitalId } : {}),
    ...(type ? { type } : {}),
    ...(normalizedBodyPart ? { bodyPart: normalizedBodyPart } : {}),
  };

  const isSameFilter =
    (value.diseaseId ?? "") === diseaseId &&
    (value.visitId ?? "") === visitId &&
    (value.doctorId ?? "") === doctorId &&
    (value.hospitalId ?? "") === hospitalId &&
    (value.type ?? "") === type &&
    (value.bodyPart ?? "") === normalizedBodyPart;

  const hasDraftFilter = Boolean(
    diseaseId ||
    visitId ||
    doctorId ||
    hospitalId ||
    type ||
    normalizedBodyPart,
  );

  const hasAppliedFilter = Boolean(
    value.diseaseId ||
    value.visitId ||
    value.doctorId ||
    value.hospitalId ||
    value.type ||
    value.bodyPart,
  );

  function clearOtherFilters(
    keep: "disease" | "visit" | "doctor" | "hospital" | "type" | "bodyPart",
  ) {
    if (keep !== "disease") {
      setDiseaseId("");
    }

    if (keep !== "visit") {
      setVisitId("");
    }

    if (keep !== "doctor") {
      setDoctorId("");
    }

    if (keep !== "hospital") {
      setHospitalId("");
    }

    if (keep !== "type") {
      setType("");
    }

    if (keep !== "bodyPart") {
      setBodyPart("");
    }
  }

  function handleClear() {
    setDiseaseId("");
    setVisitId("");
    setDoctorId("");
    setHospitalId("");
    setType("");
    setBodyPart("");

    onClear();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {tr.imaging.filtersTitle}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.imaging.filterHint}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="imaging-filter-disease">{tr.imaging.disease}</Label>

          <select
            id="imaging-filter-disease"
            value={diseaseId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("disease");
              setDiseaseId(event.target.value);
            }}
            className={selectClassName}
          >
            <option value="">{tr.imaging.allDiseases}</option>

            {options.diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imaging-filter-visit">{tr.imaging.visit}</Label>

          <select
            id="imaging-filter-visit"
            value={visitId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("visit");
              setVisitId(event.target.value);
            }}
            className={selectClassName}
          >
            <option value="">{tr.imaging.allVisits}</option>

            {options.visits.map((visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imaging-filter-doctor">{tr.imaging.doctor}</Label>

          <select
            id="imaging-filter-doctor"
            value={doctorId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("doctor");
              setDoctorId(event.target.value);
            }}
            className={selectClassName}
          >
            <option value="">{tr.imaging.allDoctors}</option>

            {options.doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imaging-filter-hospital">{tr.imaging.hospital}</Label>

          <select
            id="imaging-filter-hospital"
            value={hospitalId}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("hospital");
              setHospitalId(event.target.value);
            }}
            className={selectClassName}
          >
            <option value="">{tr.imaging.allHospitals}</option>

            {options.hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imaging-filter-type">{tr.imaging.type}</Label>

          <select
            id="imaging-filter-type"
            value={type}
            disabled={disabled}
            onChange={(event) => {
              clearOtherFilters("type");

              setType(event.target.value as ImagingType | "");
            }}
            className={selectClassName}
          >
            <option value="">{tr.imaging.allTypes}</option>

            {imagingTypes.map((item) => (
              <option key={item} value={item}>
                {imagingTypeLabels[item]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imaging-filter-body-part">
            {tr.imaging.bodyPart}
          </Label>

          <Input
            id="imaging-filter-body-part"
            value={bodyPart}
            maxLength={150}
            disabled={disabled}
            placeholder={tr.imaging.bodyPartPlaceholder}
            onChange={(event) => {
              clearOtherFilters("bodyPart");
              setBodyPart(event.target.value);
            }}
          />
        </div>
      </div>

      {hasDraftFilter && (
        <p className="text-xs text-muted-foreground">
          {tr.imaging.singleFilterHint}
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
          {tr.imaging.applyFilters}
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

            {tr.imaging.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
