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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tr } from "@/i18n/tr";
import type {
  Disease,
  DiseaseStatus,
  UpdateDiseaseRequest,
} from "@/types/disease";
import { getTodayLocalDate } from "@/utils/date";

type EditDiseaseDialogProps = {
  disease: Disease | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (
    diseaseId: string,
    payload: UpdateDiseaseRequest,
  ) => Promise<void>;
};

export default function EditDiseaseDialog({
  disease,
  open,
  onOpenChange,
  onUpdated,
}: EditDiseaseDialogProps) {
  const [name, setName] = useState(disease?.name ?? "");

  const [diagnosisDate, setDiagnosisDate] = useState(
    disease?.diagnosisDate ?? "",
  );

  const [status, setStatus] = useState<DiseaseStatus>(
    disease?.status ?? "ACTIVE",
  );

  const [description, setDescription] = useState(disease?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!disease) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateDiseaseRequest = {
        name: name.trim(),
        diagnosisDate: diagnosisDate || null,
        status,
        description: description.trim() || null,
      };

      await onUpdated(disease.id, payload);

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Hastalık Kaydını Düzenle</DialogTitle>

          <DialogDescription>
            Hastalık bilgilerini ve durumunu güncelleyin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-disease-name">{tr.diseases.name}</Label>

            <Input
              id="edit-disease-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={255}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-diagnosis-date">
              {tr.diseases.diagnosisDate}
            </Label>

            <Input
              id="edit-diagnosis-date"
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
                <SelectValue />
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
            <Label htmlFor="edit-disease-description">
              {tr.diseases.descriptionLabel}
            </Label>

            <Textarea
              id="edit-disease-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
              onClick={() => onOpenChange(false)}
            >
              {tr.diseases.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.diseases.saving : "Değişiklikleri Kaydet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
