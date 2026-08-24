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
import { imagingTypeLabels } from "@/lib/imagingType";
import { deleteImaging } from "@/services/imagingService";

import type { Imaging } from "@/types/imaging";

type DeleteImagingDialogProps = {
  imaging: Imaging | null;
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onDeleted: () => Promise<void>;
};

export default function DeleteImagingDialog({
  imaging,
  open,
  onOpenChange,
  onDeleted,
}: DeleteImagingDialogProps) {
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
    if (!imaging || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteImaging(imaging.id);

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
          <DialogTitle>{tr.imaging.deleteTitle}</DialogTitle>

          <DialogDescription>{tr.imaging.deleteDescription}</DialogDescription>
        </DialogHeader>

        {imaging && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium">
              {imagingTypeLabels[imaging.type]}
              {imaging.bodyPart ? ` — ${imaging.bodyPart}` : ""}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {new Intl.DateTimeFormat("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(imaging.imagingDate))}
            </p>
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
            {tr.imaging.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !imaging}
            onClick={handleDelete}
          >
            {isDeleting ? tr.imaging.deleting : tr.imaging.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
