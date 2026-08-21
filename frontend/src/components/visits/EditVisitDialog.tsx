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

import type {
  UpdateVisitRequest,
  Visit,
  VisitFormOptions,
} from "@/types/visit";

type EditVisitDialogProps = {
  visit: Visit | null;

  open: boolean;

  onOpenChange: (open: boolean) => void;

  options: VisitFormOptions;

  onUpdated: (visitId: string, payload: UpdateVisitRequest) => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function toDateTimeLocalValue(isoDate: string): string {
  const date = new Date(isoDate);

  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

function getCurrentDateTimeLocal() {
  const date = new Date();

  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function EditVisitDialog({
  visit,
  open,
  onOpenChange,
  options,
  onUpdated,
}: EditVisitDialogProps) {
  const [diseaseId, setDiseaseId] = useState(visit?.diseaseId ?? "");

  const [doctorId, setDoctorId] = useState(visit?.doctorId ?? "");

  const [hospitalId, setHospitalId] = useState(visit?.hospitalId ?? "");

  const [visitDate, setVisitDate] = useState(
    visit ? toDateTimeLocalValue(visit.visitDate) : "",
  );

  const [department, setDepartment] = useState(visit?.department ?? "");

  const [reason, setReason] = useState(visit?.reason ?? "");

  const [diagnosisNote, setDiagnosisNote] = useState(
    visit?.diagnosisNote ?? "",
  );

  const [notes, setNotes] = useState(visit?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!visit || !visitDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateVisitRequest = {
        diseaseId: diseaseId || null,

        doctorId: doctorId || null,

        hospitalId: hospitalId || null,

        visitDate: new Date(visitDate).toISOString(),

        department: emptyToNull(department),

        reason: emptyToNull(reason),

        diagnosisNote: emptyToNull(diagnosisNote),

        notes: emptyToNull(notes),
      };

      await onUpdated(visit.id, payload);

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const maxVisitDate = getCurrentDateTimeLocal();

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.visits.editTitle}</DialogTitle>

          <DialogDescription>{tr.visits.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-visit-date">{tr.visits.visitDateLabel}</Label>

            <Input
              id="edit-visit-date"
              type="datetime-local"
              value={visitDate}
              onChange={(event) => setVisitDate(event.target.value)}
              max={maxVisitDate}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-visit-disease">{tr.visits.disease}</Label>

              <select
                id="edit-visit-disease"
                value={diseaseId}
                onChange={(event) => setDiseaseId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.visits.noDisease}</option>

                {options.diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-visit-doctor">{tr.visits.doctor}</Label>

              <select
                id="edit-visit-doctor"
                value={doctorId}
                onChange={(event) => setDoctorId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.visits.noDoctor}</option>

                {options.doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visit-hospital">{tr.visits.hospital}</Label>

            <select
              id="edit-visit-hospital"
              value={hospitalId}
              onChange={(event) => setHospitalId(event.target.value)}
              disabled={isSubmitting}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">{tr.visits.noHospital}</option>

              {options.hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visit-department">
              {tr.visits.department}
            </Label>

            <Input
              id="edit-visit-department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visit-reason">{tr.visits.reason}</Label>

            <Textarea
              id="edit-visit-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={5000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visit-diagnosis-note">
              {tr.visits.diagnosisNote}
            </Label>

            <Textarea
              id="edit-visit-diagnosis-note"
              value={diagnosisNote}
              onChange={(event) => setDiagnosisNote(event.target.value)}
              maxLength={5000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visit-notes">{tr.visits.notes}</Label>

            <Textarea
              id="edit-visit-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={5000}
              rows={4}
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
              onClick={() => onOpenChange(false)}
            >
              {tr.visits.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting || !visitDate}>
              {isSubmitting ? tr.visits.updating : tr.visits.saveChanges}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
