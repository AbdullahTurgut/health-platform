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
import { createMedicalTest } from "@/services/medicalTestService";

import type {
  CreateMedicalTestRequest,
  MedicalTestFormOptions,
  TestCategory,
} from "@/types/medicalTest";

type CreateMedicalTestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: MedicalTestFormOptions;
  onCreated: () => void | Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

function toDateTimeLocalValue(date: Date): string {
  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

export default function CreateMedicalTestDialog({
  open,
  onOpenChange,
  options,
  onCreated,
}: CreateMedicalTestDialogProps) {
  const [diseaseId, setDiseaseId] = useState("");

  const [visitId, setVisitId] = useState("");

  const [name, setName] = useState("");

  const [category, setCategory] = useState<TestCategory | "">("");

  const [testDate, setTestDate] = useState("");

  const [laboratory, setLaboratory] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setDiseaseId("");
    setVisitId("");
    setName("");
    setCategory("");
    setTestDate("");
    setLaboratory("");
    setNotes("");
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

    if (!name.trim() || !category || !testDate) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateMedicalTestRequest = {
        diseaseId: diseaseId || null,

        visitId: visitId || null,

        name: name.trim(),

        category,

        testDate: new Date(testDate).toISOString(),

        laboratory: emptyToNull(laboratory),

        notes: emptyToNull(notes),
      };

      await createMedicalTest(payload);

      await onCreated();

      resetForm();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const maxTestDate = toDateTimeLocalValue(new Date());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.tests.createTitle}</DialogTitle>

          <DialogDescription>{tr.tests.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="medical-test-name">{tr.tests.name}</Label>

            <Input
              id="medical-test-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={tr.tests.namePlaceholder}
              required
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="medical-test-disease">{tr.tests.disease}</Label>

              <select
                id="medical-test-disease"
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
              <Label htmlFor="medical-test-visit">{tr.tests.visit}</Label>

              <select
                id="medical-test-visit"
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
              <Label htmlFor="medical-test-category">{tr.tests.category}</Label>

              <select
                id="medical-test-category"
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
              <Label htmlFor="medical-test-date">
                {tr.tests.testDateLabel}
              </Label>

              <Input
                id="medical-test-date"
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
            <Label htmlFor="medical-test-laboratory">
              {tr.tests.laboratory}
            </Label>

            <Input
              id="medical-test-laboratory"
              value={laboratory}
              onChange={(event) => setLaboratory(event.target.value)}
              placeholder={tr.tests.laboratoryPlaceholder}
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical-test-notes">{tr.tests.notes}</Label>

            <Textarea
              id="medical-test-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={tr.tests.notesPlaceholder}
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
              {tr.tests.cancel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !category || !testDate}
            >
              {isSubmitting ? tr.tests.saving : tr.tests.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
