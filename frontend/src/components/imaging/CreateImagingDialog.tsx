import { useState, type FormEvent } from "react";

import { getApiErrorMessage } from "@/api/apiError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { tr } from "@/i18n/tr";
import { imagingTypes, imagingTypeLabels } from "@/lib/imagingType";
import { createImaging } from "@/services/imagingService";

import type {
  CreateImagingRequest,
  ImagingFormOptions,
  ImagingType,
} from "@/types/imaging";

type CreateImagingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: ImagingFormOptions;
  onCreated: () => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function toDateTimeLocalValue(date: Date): string {
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function CreateImagingDialog({
  open,
  onOpenChange,
  options,
  onCreated,
}: CreateImagingDialogProps) {
  const [diseaseId, setDiseaseId] = useState("");

  const [visitId, setVisitId] = useState("");

  const [doctorId, setDoctorId] = useState("");

  const [hospitalId, setHospitalId] = useState("");

  const [type, setType] = useState<ImagingType | "">("");

  const [bodyPart, setBodyPart] = useState("");

  const [imagingDate, setImagingDate] = useState("");

  const [report, setReport] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setDiseaseId("");
    setVisitId("");
    setDoctorId("");
    setHospitalId("");
    setType("");
    setBodyPart("");
    setImagingDate("");
    setReport("");
    setNotes("");
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }

    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!type || !imagingDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateImagingRequest = {
        diseaseId: diseaseId || null,

        visitId: visitId || null,

        doctorId: doctorId || null,

        hospitalId: hospitalId || null,

        type,

        bodyPart: emptyToNull(bodyPart),

        imagingDate: new Date(imagingDate).toISOString(),

        report: emptyToNull(report),

        notes: emptyToNull(notes),
      };

      await createImaging(payload);

      await onCreated();

      resetForm();
      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const maxImagingDate = toDateTimeLocalValue(new Date());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{tr.imaging.createTitle}</DialogTitle>

          <DialogDescription>{tr.imaging.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imaging-disease">{tr.imaging.disease}</Label>

              <select
                id="imaging-disease"
                value={diseaseId}
                onChange={(event) => setDiseaseId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.imaging.noDisease}</option>

                {options.diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imaging-visit">{tr.imaging.visit}</Label>

              <select
                id="imaging-visit"
                value={visitId}
                onChange={(event) => setVisitId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.imaging.noVisit}</option>

                {options.visits.map((visit) => (
                  <option key={visit.id} value={visit.id}>
                    {visit.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imaging-doctor">{tr.imaging.doctor}</Label>

              <select
                id="imaging-doctor"
                value={doctorId}
                onChange={(event) => setDoctorId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.imaging.noDoctor}</option>

                {options.doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imaging-hospital">{tr.imaging.hospital}</Label>

              <select
                id="imaging-hospital"
                value={hospitalId}
                onChange={(event) => setHospitalId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.imaging.noHospital}</option>

                {options.hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imaging-type">{tr.imaging.type}</Label>

              <select
                id="imaging-type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as ImagingType | "")
                }
                required
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.imaging.selectType}</option>

                {imagingTypes.map((item) => (
                  <option key={item} value={item}>
                    {imagingTypeLabels[item]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imaging-body-part">{tr.imaging.bodyPart}</Label>

              <Input
                id="imaging-body-part"
                value={bodyPart}
                onChange={(event) => setBodyPart(event.target.value)}
                maxLength={150}
                placeholder={tr.imaging.bodyPartPlaceholder}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imaging-date">{tr.imaging.imagingDateLabel}</Label>

            <Input
              id="imaging-date"
              type="datetime-local"
              value={imagingDate}
              onChange={(event) => setImagingDate(event.target.value)}
              max={maxImagingDate}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imaging-report">{tr.imaging.report}</Label>

            <Textarea
              id="imaging-report"
              value={report}
              onChange={(event) => setReport(event.target.value)}
              maxLength={10000}
              rows={7}
              placeholder={tr.imaging.reportPlaceholder}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imaging-notes">{tr.imaging.notes}</Label>

            <Textarea
              id="imaging-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={5000}
              rows={4}
              placeholder={tr.imaging.notesPlaceholder}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
            >
              {tr.imaging.cancel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !type || !imagingDate}
            >
              {isSubmitting ? tr.imaging.saving : tr.imaging.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
