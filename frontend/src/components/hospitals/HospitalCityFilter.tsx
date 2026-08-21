import { Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tr } from "@/i18n/tr";

type HospitalCityFilterProps = {
  value: string;
  onApply: (city: string) => void;
  onClear: () => void;
  disabled?: boolean;
};

export default function HospitalCityFilter({
  value,
  onApply,
  onClear,
  disabled = false,
}: HospitalCityFilterProps) {
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
      <Label htmlFor="hospital-city-filter">{tr.hospitals.cityFilter}</Label>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="hospital-city-filter"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={tr.hospitals.cityPlaceholder}
            className="pl-9"
            maxLength={100}
            disabled={disabled}
          />
        </div>

        <Button
          type="submit"
          disabled={disabled || !normalizedInput || isSameFilter}
        >
          {tr.hospitals.applyFilter}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
          >
            <X className="size-4" />

            {tr.hospitals.clearFilter}
          </Button>
        )}
      </div>
    </form>
  );
}
