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
import { Textarea } from "@/components/ui/textarea";
import { tr } from "@/i18n/tr";
import { testCategories, testCategoryLabels } from "@/lib/testCategory";

import type {
  MedicalTest,
  MedicalTestFormOptions,
  TestCategory,
  UpdateMedicalTestRequest,
} from "@/types/medicalTest";

type EditMedicalTestDialogProps = {
  test: MedicalTest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: MedicalTestFormOptions;
  onUpdated: (
    testId: string,
    payload: UpdateMedicalTestRequest,
  ) => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function toDateTimeLocalValue(isoDate: string): string {
  const date = new Date(isoDate);

  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

function getCurrentDateTimeLocal() {
  const date = new Date();

  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function EditMedicalTestDialog({
  test,
  open,
  onOpenChange,
  options,
  onUpdated,
}: EditMedicalTestDialogProps) {
  const [diseaseId, setDiseaseId] = useState(test?.diseaseId ?? "");

  const [visitId, setVisitId] = useState(test?.visitId ?? "");

  const [name, setName] = useState(test?.name ?? "");

  const [category, setCategory] = useState<TestCategory | "">(
    test?.category ?? "",
  );

  const [testDate, setTestDate] = useState(
    test ? toDateTimeLocalValue(test.testDate) : "",
  );

  const [laboratory, setLaboratory] = useState(test?.laboratory ?? "");

  const [notes, setNotes] = useState(test?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!test || !name.trim() || !category || !testDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateMedicalTestRequest = {
        diseaseId: diseaseId || null,

        visitId: visitId || null,

        name: name.trim(),

        category,

        testDate: new Date(testDate).toISOString(),

        laboratory: emptyToNull(laboratory),

        notes: emptyToNull(notes),
      };

      await onUpdated(test.id, payload);

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const maxTestDate = getCurrentDateTimeLocal();

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.tests.editTitle}</DialogTitle>

          <DialogDescription>{tr.tests.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-medical-test-name">{tr.tests.name}</Label>

            <Input
              id="edit-medical-test-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-medical-test-disease">
                {tr.tests.disease}
              </Label>

              <select
                id="edit-medical-test-disease"
                value={diseaseId}
                onChange={(event) => setDiseaseId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.tests.noDisease}</option>

                {options.diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medical-test-visit">{tr.tests.visit}</Label>

              <select
                id="edit-medical-test-visit"
                value={visitId}
                onChange={(event) => setVisitId(event.target.value)}
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.tests.noVisit}</option>

                {options.visits.map((visit) => (
                  <option key={visit.id} value={visit.id}>
                    {visit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-medical-test-category">
                {tr.tests.category}
              </Label>

              <select
                id="edit-medical-test-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as TestCategory | "")
                }
                required
                disabled={isSubmitting}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{tr.tests.selectCategory}</option>

                {testCategories.map((item) => (
                  <option key={item} value={item}>
                    {testCategoryLabels[item]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-medical-test-date">
                {tr.tests.testDateLabel}
              </Label>

              <Input
                id="edit-medical-test-date"
                type="datetime-local"
                value={testDate}
                onChange={(event) => setTestDate(event.target.value)}
                max={maxTestDate}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-medical-test-laboratory">
              {tr.tests.laboratory}
            </Label>

            <Input
              id="edit-medical-test-laboratory"
              value={laboratory}
              onChange={(event) => setLaboratory(event.target.value)}
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-medical-test-notes">{tr.tests.notes}</Label>

            <Textarea
              id="edit-medical-test-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
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
              {tr.tests.cancel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !category || !testDate}
            >
              {isSubmitting ? tr.tests.updating : tr.tests.saveChanges}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
