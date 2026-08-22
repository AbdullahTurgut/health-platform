import { useState } from "react";

import { AlertTriangle } from "lucide-react";

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

import type { MedicalTest } from "@/types/medicalTest";

type DeleteMedicalTestDialogProps = {
  test: MedicalTest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (testId: string) => Promise<void>;
};

export default function DeleteMedicalTestDialog({
  test,
  open,
  onOpenChange,
  onDelete,
}: DeleteMedicalTestDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!test) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await onDelete(test.id);

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return;
        }

        setError(null);
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>

          <DialogTitle>{tr.tests.deleteTitle}</DialogTitle>

          <DialogDescription>{tr.tests.deleteDescription}</DialogDescription>
        </DialogHeader>

        {test && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium">{test.name}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {test.diseaseName ?? tr.tests.diseaseUnknown}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-muted-foreground">
          {tr.tests.deleteWarning}
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
            {tr.tests.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting || !test}
            onClick={handleDelete}
          >
            {isSubmitting ? tr.tests.deleting : tr.tests.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
