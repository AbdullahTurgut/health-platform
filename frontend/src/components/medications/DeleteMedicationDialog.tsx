import { useState } from "react";

import { Pill } from "lucide-react";

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

import { tr } from "@/i18n/tr";

import { medicationStatusLabels } from "@/lib/medication";

import { deleteMedication } from "@/services/medicationService";

import type { Medication } from "@/types/medication";

type DeleteMedicationDialogProps = {
  medication: Medication | null;

  open: boolean;

  onOpenChange: (open: boolean) => void;

  onDeleted: () => Promise<void>;
};

export default function DeleteMedicationDialog({
  medication,
  open,
  onOpenChange,
  onDeleted,
}: DeleteMedicationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean) {
    if (isDeleting) {
      return;
    }

    if (!nextOpen) {
      setError(null);
    }

    onOpenChange(nextOpen);
  }

  async function handleDelete() {
    if (!medication || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteMedication(medication.id);

      await onDeleted();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tr.medications.deleteTitle}</DialogTitle>

          <DialogDescription>
            {tr.medications.deleteDescription}
          </DialogDescription>
        </DialogHeader>

        {medication && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <Pill className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="break-words font-medium">{medication.name}</p>

                {medication.dosage && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {medication.dosage}
                  </p>
                )}

                <p className="mt-2 text-xs text-muted-foreground">
                  {medicationStatusLabels[medication.status]}
                </p>
              </div>
            </div>
          </div>
        )}

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
            disabled={isDeleting}
            onClick={() => handleOpenChange(false)}
          >
            {tr.medications.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !medication}
            onClick={handleDelete}
          >
            {isDeleting
              ? tr.medications.deleting
              : tr.medications.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
