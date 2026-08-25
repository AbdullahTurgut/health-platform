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

import { tr } from "@/i18n/tr";

import {
  medicationRouteLabels,
  medicationRoutes,
  medicationStatusLabels,
  medicationStatuses,
} from "@/lib/medication";

import { createMedication } from "@/services/medicationService";

import type {
  CreateMedicationRequest,
  MedicationFormOptions,
  MedicationRoute,
  MedicationStatus,
} from "@/types/medication";

type CreateMedicationDialogProps = {
  open: boolean;

  options: MedicationFormOptions;

  onOpenChange: (open: boolean) => void;

  onCreated: () => Promise<void>;
};

export default function CreateMedicationDialog({
  open,
  options,
  onOpenChange,
  onCreated,
}: CreateMedicationDialogProps) {
  const [diseaseId, setDiseaseId] = useState("");

  const [name, setName] = useState("");

  const [dosage, setDosage] = useState("");

  const [frequency, setFrequency] = useState("");

  const [route, setRoute] = useState<MedicationRoute | "">("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [status, setStatus] = useState<MedicationStatus>("ACTIVE");

  const [prescribedBy, setPrescribedBy] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setDiseaseId("");
    setName("");
    setDosage("");
    setFrequency("");
    setRoute("");
    setStartDate("");
    setEndDate("");
    setStatus("ACTIVE");
    setPrescribedBy("");
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

    if (isSubmitting) {
      return;
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setError(tr.medications.dateRangeError);

      return;
    }

    const payload: CreateMedicationRequest = {
      diseaseId: diseaseId || null,

      name: normalizedName,

      dosage: dosage.trim() || null,

      frequency: frequency.trim() || null,

      route: route || null,

      startDate: startDate || null,

      endDate: endDate || null,

      /*
       * Backend create tarafında
       * null gelirse ACTIVE yapıyor.
       *
       * UI'da kullanıcıya explicit
       * status gösterdiğimiz için
       * burada ACTIVE gönderiyoruz.
       */
      status,

      prescribedBy: prescribedBy.trim() || null,

      notes: notes.trim() || null,
    };

    try {
      setIsSubmitting(true);
      setError(null);

      await createMedication(payload);

      await onCreated();

      resetForm();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.medications.createTitle}</DialogTitle>

          <DialogDescription>
            {tr.medications.createDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="medication-name">{tr.medications.name}</Label>

              <Input
                id="medication-name"
                value={name}
                required
                maxLength={200}
                disabled={isSubmitting}
                placeholder={tr.medications.namePlaceholder}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-disease">
                {tr.medications.disease}
              </Label>

              <select
                id="medication-disease"
                value={diseaseId}
                disabled={isSubmitting}
                onChange={(event) => setDiseaseId(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.medications.noDisease}</option>

                {options.diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-dosage">{tr.medications.dosage}</Label>

              <Input
                id="medication-dosage"
                value={dosage}
                maxLength={100}
                disabled={isSubmitting}
                placeholder={tr.medications.dosagePlaceholder}
                onChange={(event) => setDosage(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-frequency">
                {tr.medications.frequency}
              </Label>

              <Input
                id="medication-frequency"
                value={frequency}
                maxLength={100}
                disabled={isSubmitting}
                placeholder={tr.medications.frequencyPlaceholder}
                onChange={(event) => setFrequency(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-route">{tr.medications.route}</Label>

              <select
                id="medication-route"
                value={route}
                disabled={isSubmitting}
                onChange={(event) =>
                  setRoute(event.target.value as MedicationRoute | "")
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.medications.selectRoute}</option>

                {medicationRoutes.map((routeValue) => (
                  <option key={routeValue} value={routeValue}>
                    {medicationRouteLabels[routeValue]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-status">{tr.medications.status}</Label>

              <select
                id="medication-status"
                value={status}
                disabled={isSubmitting}
                onChange={(event) =>
                  setStatus(event.target.value as MedicationStatus)
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {medicationStatuses.map((statusValue) => (
                  <option key={statusValue} value={statusValue}>
                    {medicationStatusLabels[statusValue]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-start-date">
                {tr.medications.startDate}
              </Label>

              <Input
                id="medication-start-date"
                type="date"
                value={startDate}
                disabled={isSubmitting}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication-end-date">
                {tr.medications.endDate}
              </Label>

              <Input
                id="medication-end-date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                disabled={isSubmitting}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="medication-prescribed-by">
                {tr.medications.prescribedBy}
              </Label>

              <Input
                id="medication-prescribed-by"
                value={prescribedBy}
                maxLength={200}
                disabled={isSubmitting}
                placeholder={tr.medications.prescribedByPlaceholder}
                onChange={(event) => setPrescribedBy(event.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="medication-notes">{tr.medications.notes}</Label>

              <textarea
                id="medication-notes"
                value={notes}
                maxLength={5000}
                disabled={isSubmitting}
                placeholder={tr.medications.notesPlaceholder}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-28 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
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
              {tr.medications.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? tr.medications.saving : tr.medications.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
