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

import type { TestResult } from "@/types/testResult";

type DeleteTestResultDialogProps = {
  result: TestResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (resultId: string) => Promise<void>;
};

export default function DeleteTestResultDialog({
  result,
  open,
  onOpenChange,
  onDelete,
}: DeleteTestResultDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!result) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await onDelete(result.id);

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

          <DialogTitle>{tr.testResults.deleteTitle}</DialogTitle>

          <DialogDescription>
            {tr.testResults.deleteDescription}
          </DialogDescription>
        </DialogHeader>

        {result && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium">{result.parameterName}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {result.valueText}
              {result.unit ? ` ${result.unit}` : ""}
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
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
          >
            {tr.testResults.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting || !result}
            onClick={handleDelete}
          >
            {isSubmitting
              ? tr.testResults.deleting
              : tr.testResults.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
