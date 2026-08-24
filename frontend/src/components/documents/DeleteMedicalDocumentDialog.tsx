import { useState } from "react";

import { FileText } from "lucide-react";

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

import { documentTypeLabels } from "@/lib/documentType";

import { deleteMedicalDocument } from "@/services/medicalDocumentService";

import type { MedicalDocument } from "@/types/medicalDocument";

type DeleteMedicalDocumentDialogProps = {
  document: MedicalDocument | null;

  open: boolean;

  onOpenChange: (open: boolean) => void;

  onDeleted: () => Promise<void>;
};

export default function DeleteMedicalDocumentDialog({
  document,
  open,
  onOpenChange,
  onDeleted,
}: DeleteMedicalDocumentDialogProps) {
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
    if (!document || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await deleteMedicalDocument(document.id);

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
          <DialogTitle>{tr.documents.deleteTitle}</DialogTitle>

          <DialogDescription>
            {tr.documents.deleteDescription}
          </DialogDescription>
        </DialogHeader>

        {document && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <FileText className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="break-words font-medium">{document.name}</p>

                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {document.fileName}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {documentTypeLabels[document.documentType]}
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
            {tr.documents.cancel}
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !document}
            onClick={handleDelete}
          >
            {isDeleting ? tr.documents.deleting : tr.documents.deleteConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
