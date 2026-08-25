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
import { updateMedication } from "@/services/medicationService";
import type {
  Medication,
  MedicationFormOptions,
  MedicationRoute,
  MedicationStatus,
  UpdateMedicationRequest,
} from "@/types/medication";

type EditMedicationDialogProps = {
  medication: Medication | null;
  open: boolean;
  options: MedicationFormOptions;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => Promise<void>;
};

export default function EditMedicationDialog({
  medication,
  open,
  options,
  onOpenChange,
  onUpdated,
}: EditMedicationDialogProps) {
  const [diseaseId, setDiseaseId] = useState(medication?.diseaseId ?? "");
  const [name, setName] = useState(medication?.name ?? "");
  const [dosage, setDosage] = useState(medication?.dosage ?? "");
  const [frequency, setFrequency] = useState(medication?.frequency ?? "");
  const [route, setRoute] = useState<MedicationRoute | "">(
    medication?.route ?? "",
  );
  const [startDate, setStartDate] = useState(medication?.startDate ?? "");
  const [endDate, setEndDate] = useState(medication?.endDate ?? "");
  const [status, setStatus] = useState<MedicationStatus>(
    medication?.status ?? "ACTIVE",
  );
  const [prescribedBy, setPrescribedBy] = useState(
    medication?.prescribedBy ?? "",
  );
  const [notes, setNotes] = useState(medication?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }

    if (!nextOpen) {
      setError(null);
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!medication || isSubmitting) {
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

    const payload: UpdateMedicationRequest = {
      diseaseId: diseaseId || null,

      name: normalizedName,

      dosage: dosage.trim() || null,

      frequency: frequency.trim() || null,

      route: route || null,

      startDate: startDate || null,

      endDate: endDate || null,

      /*
       * UPDATE contract'ta
       * status zorunlu.
       */
      status,

      prescribedBy: prescribedBy.trim() || null,

      notes: notes.trim() || null,
    };

    try {
      setIsSubmitting(true);
      setError(null);

      await updateMedication(medication.id, payload);

      await onUpdated();

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
          <DialogTitle>{tr.medications.editTitle}</DialogTitle>

          <DialogDescription>
            {tr.medications.editDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-medication-name">
                {tr.medications.name}
              </Label>

              <Input
                id="edit-medication-name"
                value={name}
                required
                maxLength={200}
                disabled={isSubmitting}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medication-disease">
                {tr.medications.disease}
              </Label>

              <select
                id="edit-medication-disease"
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
              <Label htmlFor="edit-medication-dosage">
                {tr.medications.dosage}
              </Label>

              <Input
                id="edit-medication-dosage"
                value={dosage}
                maxLength={100}
                disabled={isSubmitting}
                onChange={(event) => setDosage(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medication-frequency">
                {tr.medications.frequency}
              </Label>

              <Input
                id="edit-medication-frequency"
                value={frequency}
                maxLength={100}
                disabled={isSubmitting}
                onChange={(event) => setFrequency(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medication-route">
                {tr.medications.route}
              </Label>

              <select
                id="edit-medication-route"
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
              <Label htmlFor="edit-medication-status">
                {tr.medications.status}
              </Label>

              <select
                id="edit-medication-status"
                value={status}
                required
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
              <Label htmlFor="edit-medication-start-date">
                {tr.medications.startDate}
              </Label>

              <Input
                id="edit-medication-start-date"
                type="date"
                value={startDate}
                disabled={isSubmitting}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medication-end-date">
                {tr.medications.endDate}
              </Label>

              <Input
                id="edit-medication-end-date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                disabled={isSubmitting}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-medication-prescribed-by">
                {tr.medications.prescribedBy}
              </Label>

              <Input
                id="edit-medication-prescribed-by"
                value={prescribedBy}
                maxLength={200}
                disabled={isSubmitting}
                onChange={(event) => setPrescribedBy(event.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-medication-notes">
                {tr.medications.notes}
              </Label>

              <textarea
                id="edit-medication-notes"
                value={notes}
                maxLength={5000}
                disabled={isSubmitting}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-28 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
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

            <Button
              type="submit"
              disabled={isSubmitting || !medication || !name.trim()}
            >
              {isSubmitting ? tr.medications.updating : tr.medications.update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
