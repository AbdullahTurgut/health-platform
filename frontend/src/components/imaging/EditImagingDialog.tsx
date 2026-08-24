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
import { imagingTypeLabels, imagingTypes } from "@/lib/imagingType";
import { instantToDateTimeLocal } from "@/lib/dateTime";
import { updateImaging } from "@/services/imagingService";
import type {
  Imaging,
  ImagingFormOptions,
  ImagingType,
  UpdateImagingRequest,
} from "@/types/imaging";

type EditImagingDialogProps = {
  imaging: Imaging | null;
  open: boolean;
  options: ImagingFormOptions;

  onOpenChange: (open: boolean) => void;

  onUpdated: () => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function getInitialImagingDate(imaging: Imaging | null) {
  if (!imaging) {
    return "";
  }

  return instantToDateTimeLocal(imaging.imagingDate);
}

function toDateTimeLocalValue(date: Date): string {
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function EditImagingDialog({
  imaging,
  open,
  options,
  onOpenChange,
  onUpdated,
}: EditImagingDialogProps) {
  const [diseaseId, setDiseaseId] = useState(imaging?.diseaseId ?? "");

  const [visitId, setVisitId] = useState(imaging?.visitId ?? "");

  const [doctorId, setDoctorId] = useState(imaging?.doctorId ?? "");

  const [hospitalId, setHospitalId] = useState(imaging?.hospitalId ?? "");

  const [type, setType] = useState<ImagingType | "">(imaging?.type ?? "");

  const [bodyPart, setBodyPart] = useState(imaging?.bodyPart ?? "");

  const [imagingDate, setImagingDate] = useState(
    getInitialImagingDate(imaging),
  );

  const [report, setReport] = useState(imaging?.report ?? "");

  const [notes, setNotes] = useState(imaging?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!imaging || !type || !imagingDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateImagingRequest = {
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

      await updateImaging(imaging.id, payload);

      await onUpdated();

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
          <DialogTitle>{tr.imaging.editTitle}</DialogTitle>

          <DialogDescription>{tr.imaging.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-imaging-disease">{tr.imaging.disease}</Label>

              <select
                id="edit-imaging-disease"
                value={diseaseId}
                disabled={isSubmitting}
                onChange={(event) => setDiseaseId(event.target.value)}
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
              <Label htmlFor="edit-imaging-visit">{tr.imaging.visit}</Label>

              <select
                id="edit-imaging-visit"
                value={visitId}
                disabled={isSubmitting}
                onChange={(event) => setVisitId(event.target.value)}
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
              <Label htmlFor="edit-imaging-doctor">{tr.imaging.doctor}</Label>

              <select
                id="edit-imaging-doctor"
                value={doctorId}
                disabled={isSubmitting}
                onChange={(event) => setDoctorId(event.target.value)}
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
              <Label htmlFor="edit-imaging-hospital">
                {tr.imaging.hospital}
              </Label>

              <select
                id="edit-imaging-hospital"
                value={hospitalId}
                disabled={isSubmitting}
                onChange={(event) => setHospitalId(event.target.value)}
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
              <Label htmlFor="edit-imaging-type">{tr.imaging.type}</Label>

              <select
                id="edit-imaging-type"
                value={type}
                required
                disabled={isSubmitting}
                onChange={(event) =>
                  setType(event.target.value as ImagingType | "")
                }
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
              <Label htmlFor="edit-imaging-body-part">
                {tr.imaging.bodyPart}
              </Label>

              <Input
                id="edit-imaging-body-part"
                value={bodyPart}
                disabled={isSubmitting}
                maxLength={150}
                placeholder={tr.imaging.bodyPartPlaceholder}
                onChange={(event) => setBodyPart(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-imaging-date">
              {tr.imaging.imagingDateLabel}
            </Label>

            <Input
              id="edit-imaging-date"
              type="datetime-local"
              value={imagingDate}
              required
              max={maxImagingDate}
              disabled={isSubmitting}
              onChange={(event) => setImagingDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-imaging-report">{tr.imaging.report}</Label>

            <Textarea
              id="edit-imaging-report"
              value={report}
              rows={7}
              maxLength={10000}
              disabled={isSubmitting}
              placeholder={tr.imaging.reportPlaceholder}
              onChange={(event) => setReport(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-imaging-notes">{tr.imaging.notes}</Label>

            <Textarea
              id="edit-imaging-notes"
              value={notes}
              rows={4}
              maxLength={5000}
              disabled={isSubmitting}
              placeholder={tr.imaging.notesPlaceholder}
              onChange={(event) => setNotes(event.target.value)}
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
              disabled={isSubmitting || !imaging || !type || !imagingDate}
            >
              {isSubmitting ? tr.imaging.updating : tr.imaging.update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
