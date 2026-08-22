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
import { resultFlags, resultFlagLabels } from "@/lib/resultFlag";
import {
  TEST_RESULT_NUMERIC_MAX,
  TEST_RESULT_NUMERIC_MIN,
  parseOptionalNumericValue,
} from "@/lib/testResultValue";

import type {
  ResultFlag,
  TestResult,
  UpdateTestResultRequest,
} from "@/types/testResult";

type EditTestResultDialogProps = {
  result: TestResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (
    resultId: string,
    payload: UpdateTestResultRequest,
  ) => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

export default function EditTestResultDialog({
  result,
  open,
  onOpenChange,
  onUpdated,
}: EditTestResultDialogProps) {
  const [parameterName, setParameterName] = useState(
    result?.parameterName ?? "",
  );

  const [valueText, setValueText] = useState(result?.valueText ?? "");

  const [numericValue, setNumericValue] = useState(
    result?.numericValue !== null && result?.numericValue !== undefined
      ? String(result.numericValue)
      : "",
  );

  const [unit, setUnit] = useState(result?.unit ?? "");

  const [referenceRange, setReferenceRange] = useState(
    result?.referenceRange ?? "",
  );

  const [flag, setFlag] = useState<ResultFlag | "">(result?.flag ?? "");

  const [notes, setNotes] = useState(result?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!result || !parameterName.trim() || !valueText.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const parsedNumericValue = parseOptionalNumericValue(numericValue);

      const payload: UpdateTestResultRequest = {
        parameterName: parameterName.trim(),
        valueText: valueText.trim(),
        numericValue: parsedNumericValue,
        unit: emptyToNull(unit),
        referenceRange: emptyToNull(referenceRange),
        flag: flag || null,
        notes: emptyToNull(notes),
      };

      await onUpdated(result.id, payload);

      onOpenChange(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : getApiErrorMessage(error),
      );
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

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tr.testResults.editTitle}</DialogTitle>

          <DialogDescription>
            {tr.testResults.editDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-test-result-parameter">
              {tr.testResults.parameterName}
            </Label>

            <Input
              id="edit-test-result-parameter"
              value={parameterName}
              onChange={(event) => setParameterName(event.target.value)}
              required
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-test-result-value">
                {tr.testResults.value}
              </Label>

              <Input
                id="edit-test-result-value"
                value={valueText}
                onChange={(event) => setValueText(event.target.value)}
                required
                maxLength={100}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-test-result-numeric">
                {tr.testResults.numericValue}
              </Label>

              <Input
                id="edit-test-result-numeric"
                type="number"
                step="any"
                min={TEST_RESULT_NUMERIC_MIN}
                max={TEST_RESULT_NUMERIC_MAX}
                value={numericValue}
                onChange={(event) => setNumericValue(event.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-test-result-unit">
                {tr.testResults.unit}
              </Label>

              <Input
                id="edit-test-result-unit"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                maxLength={50}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-test-result-reference">
                {tr.testResults.referenceRange}
              </Label>

              <Input
                id="edit-test-result-reference"
                value={referenceRange}
                onChange={(event) => setReferenceRange(event.target.value)}
                maxLength={100}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-test-result-flag">{tr.testResults.flag}</Label>

            <select
              id="edit-test-result-flag"
              value={flag}
              onChange={(event) =>
                setFlag(event.target.value as ResultFlag | "")
              }
              disabled={isSubmitting}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">{tr.testResults.noFlag}</option>

              {resultFlags.map((item) => (
                <option key={item} value={item}>
                  {resultFlagLabels[item]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-test-result-notes">
              {tr.testResults.notes}
            </Label>

            <Textarea
              id="edit-test-result-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              maxLength={5000}
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
              {tr.testResults.cancel}
            </Button>

            <Button
              type="submit"
              disabled={
                isSubmitting || !parameterName.trim() || !valueText.trim()
              }
            >
              {isSubmitting
                ? tr.testResults.updating
                : tr.testResults.saveChanges}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
