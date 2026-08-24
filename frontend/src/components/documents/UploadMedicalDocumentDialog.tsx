import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { FileUp } from "lucide-react";

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
import { documentTypeLabels, documentTypes } from "@/lib/documentType";
import {
  formatFileSize,
  isAllowedMedicalDocumentFile,
  MAX_MEDICAL_DOCUMENT_SIZE,
} from "@/lib/file";
import { uploadMedicalDocument } from "@/services/medicalDocumentService";

import type {
  DocumentType,
  MedicalDocumentFormOptions,
  UploadMedicalDocumentRequest,
} from "@/types/medicalDocument";

type UploadMedicalDocumentDialogProps = {
  open: boolean;
  options: MedicalDocumentFormOptions;

  onOpenChange: (open: boolean) => void;

  onUploaded: () => Promise<void>;
};

export default function UploadMedicalDocumentDialog({
  open,
  options,
  onOpenChange,
  onUploaded,
}: UploadMedicalDocumentDialogProps) {
  const [file, setFile] = useState<File | null>(null);

  const [name, setName] = useState("");

  const [documentType, setDocumentType] = useState<DocumentType | "">("");

  const [diseaseId, setDiseaseId] = useState("");

  const [visitId, setVisitId] = useState("");

  const [medicalTestId, setMedicalTestId] = useState("");

  const [imagingId, setImagingId] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function resetForm() {
    setFile(null);
    setName("");
    setDocumentType("");
    setDiseaseId("");
    setVisitId("");
    setMedicalTestId("");
    setImagingId("");
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }

    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!isAllowedMedicalDocumentFile(selectedFile)) {
      setFile(null);

      event.target.value = "";

      setError(tr.documents.invalidFileType);

      return;
    }

    if (selectedFile.size > MAX_MEDICAL_DOCUMENT_SIZE) {
      setFile(null);

      event.target.value = "";

      setError(tr.documents.fileTooLarge);

      return;
    }

    setFile(selectedFile);

    /*
     * Name boşsa filename'den
     * kullanıcı dostu başlangıç
     * değeri üret.
     */
    if (!name.trim()) {
      const withoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");

      setName(withoutExtension.slice(0, 255));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!file) {
      setError(tr.documents.fileRequired);
      return;
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      return;
    }

    if (!documentType) {
      return;
    }

    /*
     * File selection'da kontrol
     * ediyoruz ama submit'te
     * defensive validation da
     * yapıyoruz.
     */
    if (!isAllowedMedicalDocumentFile(file)) {
      setError(tr.documents.invalidFileType);

      return;
    }

    if (file.size > MAX_MEDICAL_DOCUMENT_SIZE) {
      setError(tr.documents.fileTooLarge);

      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UploadMedicalDocumentRequest = {
        file,

        name: normalizedName,

        documentType,

        diseaseId: diseaseId || null,

        visitId: visitId || null,

        medicalTestId: medicalTestId || null,

        imagingId: imagingId || null,
      };

      await uploadMedicalDocument(payload);

      await onUploaded();

      resetForm();
      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{tr.documents.uploadTitle}</DialogTitle>

          <DialogDescription>
            {tr.documents.uploadDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="document-file">{tr.documents.file}</Label>

            <Input
              ref={fileInputRef}
              id="document-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              disabled={isSubmitting}
              onChange={handleFileChange}
            />

            <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
              <span>{tr.documents.supportedFiles}</span>

              <span>{tr.documents.maxFileSize}</span>
            </div>

            {file && (
              <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileUp className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="document-name">{tr.documents.name}</Label>

              <Input
                id="document-name"
                value={name}
                maxLength={255}
                required
                disabled={isSubmitting}
                placeholder={tr.documents.namePlaceholder}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-type">{tr.documents.documentType}</Label>

              <select
                id="document-type"
                value={documentType}
                required
                disabled={isSubmitting}
                onChange={(event) =>
                  setDocumentType(event.target.value as DocumentType | "")
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.documents.selectType}</option>

                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {documentTypeLabels[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="document-disease">{tr.documents.disease}</Label>

              <select
                id="document-disease"
                value={diseaseId}
                disabled={isSubmitting}
                onChange={(event) => setDiseaseId(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.documents.noDisease}</option>

                {options.diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-visit">{tr.documents.visit}</Label>

              <select
                id="document-visit"
                value={visitId}
                disabled={isSubmitting}
                onChange={(event) => setVisitId(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.documents.noVisit}</option>

                {options.visits.map((visit) => (
                  <option key={visit.id} value={visit.id}>
                    {visit.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-medical-test">
                {tr.documents.medicalTest}
              </Label>

              <select
                id="document-medical-test"
                value={medicalTestId}
                disabled={isSubmitting}
                onChange={(event) => setMedicalTestId(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.documents.noMedicalTest}</option>

                {options.medicalTests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-imaging">{tr.documents.imaging}</Label>

              <select
                id="document-imaging"
                value={imagingId}
                disabled={isSubmitting}
                onChange={(event) => setImagingId(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.documents.noImaging}</option>

                {options.imaging.map((record) => (
                  <option key={record.id} value={record.id}>
                    {record.label}
                  </option>
                ))}
              </select>
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
              {tr.documents.cancel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !file || !name.trim() || !documentType}
            >
              {isSubmitting ? tr.documents.uploading : tr.documents.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
