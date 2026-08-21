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
import { deleteVisit } from "@/services/visitService";
import type { Visit } from "@/types/visit";

type DeleteVisitDialogProps = {
  visit: Visit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void | Promise<void>;
};

function formatVisitDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function DeleteVisitDialog({
  visit,
  open,
  onOpenChange,
  onDeleted,
}: DeleteVisitDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!visit) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteVisit(visit.id);

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
          <DialogTitle>{tr.visits.deleteTitle}</DialogTitle>

          <DialogDescription>{tr.visits.deleteDescription}</DialogDescription>
        </DialogHeader>

        {visit && (
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Silinecek ziyaret</p>

            <p className="mt-1 font-medium">
              {formatVisitDate(visit.visitDate)}
            </p>

            {visit.department && (
              <p className="mt-1 text-sm text-muted-foreground">
                {visit.department}
              </p>
            )}

            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              {visit.diseaseName && <p>Hastalık: {visit.diseaseName}</p>}

              {visit.doctorName && <p>Doktor: {visit.doctorName}</p>}

              {visit.hospitalName && <p>Hastane: {visit.hospitalName}</p>}
            </div>
          </div>
        )}

        <p className="text-sm text-destructive">{tr.visits.deleteWarning}</p>

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
            {tr.visits.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !visit}
            onClick={handleDelete}
          >
            {isDeleting ? tr.visits.deleting : tr.visits.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
