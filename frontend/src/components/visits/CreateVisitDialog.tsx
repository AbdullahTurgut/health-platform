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
import { createVisit } from "@/services/visitService";

import type { CreateVisitRequest, VisitFormOptions } from "@/types/visit";

type CreateVisitDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  options: VisitFormOptions;

  onCreated: () => void | Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function toDateTimeLocalValue(date: Date): string {
  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

export default function CreateVisitDialog({
  open,
  onOpenChange,
  options,
  onCreated,
}: CreateVisitDialogProps) {
  const [diseaseId, setDiseaseId] = useState("");

  const [doctorId, setDoctorId] = useState("");

  const [hospitalId, setHospitalId] = useState("");

  const [visitDate, setVisitDate] = useState("");

  const [department, setDepartment] = useState("");

  const [reason, setReason] = useState("");

  const [diagnosisNote, setDiagnosisNote] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setDiseaseId("");
    setDoctorId("");
    setHospitalId("");
    setVisitDate("");
    setDepartment("");
    setReason("");
    setDiagnosisNote("");
    setNotes("");
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isSubmitting) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateVisitRequest = {
        diseaseId: diseaseId || null,

        doctorId: doctorId || null,

        hospitalId: hospitalId || null,

        visitDate: new Date(visitDate).toISOString(),

        department: emptyToNull(department),

        reason: emptyToNull(reason),

        diagnosisNote: emptyToNull(diagnosisNote),

        notes: emptyToNull(notes),
      };

      await createVisit(payload);

      await onCreated();

      resetForm();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const maxVisitDate = toDateTimeLocalValue(new Date());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.visits.createTitle}</DialogTitle>

          <DialogDescription>{tr.visits.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="visit-date">{tr.visits.visitDateLabel}</Label>

            <Input
              id="visit-date"
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
              <Label htmlFor="visit-disease">{tr.visits.disease}</Label>

              <select
                id="visit-disease"
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
              <Label htmlFor="visit-doctor">{tr.visits.doctor}</Label>

              <select
                id="visit-doctor"
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
            <Label htmlFor="visit-hospital">{tr.visits.hospital}</Label>

            <select
              id="visit-hospital"
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
            <Label htmlFor="visit-department">{tr.visits.department}</Label>

            <Input
              id="visit-department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              placeholder={tr.visits.departmentPlaceholder}
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit-reason">{tr.visits.reason}</Label>

            <Textarea
              id="visit-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={tr.visits.reasonPlaceholder}
              maxLength={5000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit-diagnosis-note">
              {tr.visits.diagnosisNote}
            </Label>

            <Textarea
              id="visit-diagnosis-note"
              value={diagnosisNote}
              onChange={(event) => setDiagnosisNote(event.target.value)}
              placeholder={tr.visits.diagnosisNotePlaceholder}
              maxLength={5000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visit-notes">{tr.visits.notes}</Label>

            <Textarea
              id="visit-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={tr.visits.notesPlaceholder}
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
              onClick={() => handleOpenChange(false)}
            >
              {tr.visits.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting || !visitDate}>
              {isSubmitting ? tr.visits.saving : tr.visits.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
