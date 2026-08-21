import { useState } from "react";

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
import { deleteHospital } from "@/services/hospitalService";
import type { Hospital } from "@/types/hospital";

type DeleteHospitalDialogProps = {
  hospital: Hospital | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void | Promise<void>;
};

export default function DeleteHospitalDialog({
  hospital,
  open,
  onOpenChange,
  onDeleted,
}: DeleteHospitalDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!hospital) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteHospital(hospital.id);

      await onDeleted();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isDeleting) {
          return;
        }

        if (!nextOpen) {
          setError(null);
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tr.hospitals.deleteTitle}</DialogTitle>

          <DialogDescription>
            {tr.hospitals.deleteDescription}
          </DialogDescription>
        </DialogHeader>

        {hospital && (
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Silinecek kayıt</p>

            <p className="mt-1 font-medium">{hospital.name}</p>

            {hospital.city && (
              <p className="mt-1 text-sm text-muted-foreground">
                {hospital.city}
              </p>
            )}
          </div>
        )}

        <p className="text-sm text-destructive">{tr.hospitals.deleteWarning}</p>

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
            onClick={() => onOpenChange(false)}
          >
            {tr.hospitals.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !hospital}
            onClick={handleDelete}
          >
            {isDeleting ? tr.hospitals.deleting : tr.hospitals.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
