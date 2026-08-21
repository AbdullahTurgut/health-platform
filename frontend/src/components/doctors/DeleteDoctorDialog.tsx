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
import { deleteDoctor } from "@/services/doctorService";
import type { Doctor } from "@/types/doctor";

type DeleteDoctorDialogProps = {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void | Promise<void>;
};

export default function DeleteDoctorDialog({
  doctor,
  open,
  onOpenChange,
  onDeleted,
}: DeleteDoctorDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!doctor) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteDoctor(doctor.id);

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
          <DialogTitle>{tr.doctors.deleteTitle}</DialogTitle>

          <DialogDescription>{tr.doctors.deleteDescription}</DialogDescription>
        </DialogHeader>

        {doctor && (
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Silinecek kayıt</p>

            <p className="mt-1 font-medium">
              {doctor.firstName} {doctor.lastName}
            </p>

            {doctor.specialization && (
              <p className="mt-1 text-sm text-muted-foreground">
                {doctor.specialization}
              </p>
            )}
          </div>
        )}

        <p className="text-sm text-destructive">{tr.doctors.deleteWarning}</p>

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
            {tr.doctors.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !doctor}
            onClick={handleDelete}
          >
            {isDeleting ? tr.doctors.deleting : tr.doctors.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
