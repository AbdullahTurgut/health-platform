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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="specialization-filter">
          {tr.doctors.specializationFilter}
        </Label>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {tr.doctors.specializationFilterDescription}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            className="
              pointer-events-none
              absolute
              top-1/2
              left-3
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
            aria-hidden="true"
          />

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
          className="w-full sm:w-auto"
          disabled={disabled || !normalizedInput || isSameFilter}
        >
          <Search className="size-4" />

          {tr.doctors.applyFilter}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.doctors.clearFilter}
          </Button>
        )}
      </div>

      {value && (
        <p className="text-xs text-muted-foreground">
          {tr.doctors.activeSpecializationFilter}:{" "}
          <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </form>
  );
}
