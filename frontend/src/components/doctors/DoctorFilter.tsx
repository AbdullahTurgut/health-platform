import { Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tr } from "@/i18n/tr";

type DoctorFilterProps = {
  value: string;
  onApply: (specialization: string) => void;
  onClear: () => void;
  disabled?: boolean;
};
export default function DoctorFilter({
  value,
  onApply,
  onClear,
  disabled = false,
}: DoctorFilterProps) {
  const [inputValue, setInputValue] = useState(value);

  const normalizedInput = inputValue.trim();

  const isSameFilter = normalizedInput === value;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!normalizedInput || isSameFilter) {
      return;
    }

    onApply(normalizedInput);
  }

  function handleClear() {
    setInputValue("");
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-4">
      <Label htmlFor="specialization-filter">
        {tr.doctors.specializationFilter}
      </Label>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="specialization-filter"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={tr.doctors.specializationPlaceholder}
            className="pl-9"
            maxLength={150}
            disabled={disabled}
          />
        </div>

        <Button
          type="submit"
          disabled={disabled || !normalizedInput || isSameFilter}
        >
          {tr.doctors.applyFilter}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.doctors.clearFilter}
          </Button>
        )}
      </div>
    </form>
  );
}
