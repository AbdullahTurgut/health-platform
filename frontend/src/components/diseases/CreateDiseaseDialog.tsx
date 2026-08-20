import { useState, type FormEvent } from "react";

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
import { getTodayLocalDate } from "@/utils/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tr } from "@/i18n/tr";
import { createDisease } from "@/services/diseaseService";
import type { CreateDiseaseRequest, DiseaseStatus } from "@/types/disease";

type CreateDiseaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
};

export default function CreateDiseaseDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateDiseaseDialogProps) {
  const [name, setName] = useState("");

  const [diagnosisDate, setDiagnosisDate] = useState("");

  const [status, setStatus] = useState<DiseaseStatus | "">("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setDiagnosisDate("");
    setStatus("");
    setDescription("");
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isSubmitting) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateDiseaseRequest = {
        name: name.trim(),
        diagnosisDate: diagnosisDate || null,
        status: status || null,
        description: description.trim() || null,
      };

      await createDisease(payload);

      await onCreated();

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tr.diseases.createTitle}</DialogTitle>

          <DialogDescription>{tr.diseases.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="disease-name">{tr.diseases.name}</Label>

            <Input
              id="disease-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={tr.diseases.namePlaceholder}
              required
              maxLength={255}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis-date">{tr.diseases.diagnosisDate}</Label>

            <Input
              id="diagnosis-date"
              type="date"
              value={diagnosisDate}
              onChange={(event) => setDiagnosisDate(event.target.value)}
              max={getTodayLocalDate()}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>{tr.diseases.status}</Label>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value as DiseaseStatus)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={tr.diseases.statusPlaceholder} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ACTIVE">
                  {tr.diseaseStatus.ACTIVE}
                </SelectItem>

                <SelectItem value="CHRONIC">
                  {tr.diseaseStatus.CHRONIC}
                </SelectItem>

                <SelectItem value="RESOLVED">
                  {tr.diseaseStatus.RESOLVED}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disease-description">
              {tr.diseases.descriptionLabel}
            </Label>

            <Textarea
              id="disease-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={tr.diseases.descriptionPlaceholder}
              maxLength={5000}
              rows={5}
              disabled={isSubmitting}
            />
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
              {tr.diseases.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.diseases.saving : tr.diseases.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
