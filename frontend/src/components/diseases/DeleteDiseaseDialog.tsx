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
import { deleteDisease } from "@/services/diseaseService";
import type { Disease } from "@/types/disease";

type DeleteDiseaseDialogProps = {
  disease: Disease | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void | Promise<void>;
};

export default function DeleteDiseaseDialog({
  disease,
  open,
  onOpenChange,
  onDeleted,
}: DeleteDiseaseDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!disease) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteDisease(disease.id);

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
          <DialogTitle>{tr.diseases.deleteTitle}</DialogTitle>

          <DialogDescription>{tr.diseases.deleteDescription}</DialogDescription>
        </DialogHeader>

        {disease && (
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Silinecek kayıt</p>

            <p className="mt-1 font-medium">{disease.name}</p>
          </div>
        )}

        <p className="text-sm text-destructive">{tr.diseases.deleteWarning}</p>

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
            {tr.diseases.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !disease}
            onClick={handleDelete}
          >
            {isDeleting ? tr.diseases.deleting : tr.diseases.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
