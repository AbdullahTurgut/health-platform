import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { DiseaseStatus } from "@/types/disease";

export type DiseaseFilterValue = "ALL" | DiseaseStatus;

type DiseaseFilterProps = {
  value: DiseaseFilterValue;
  onChange: (value: DiseaseFilterValue) => void;
  disabled?: boolean;
};

const filters: {
  value: DiseaseFilterValue;
  label: string;
}[] = [
  {
    value: "ALL",
    label: tr.diseases.filterAll,
  },
  {
    value: "ACTIVE",
    label: tr.diseaseStatus.ACTIVE,
  },
  {
    value: "CHRONIC",
    label: tr.diseaseStatus.CHRONIC,
  },
  {
    value: "RESOLVED",
    label: tr.diseaseStatus.RESOLVED,
  },
];

export default function DiseaseFilter({
  value,
  onChange,
  disabled = false,
}: DiseaseFilterProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {tr.diseases.filterLabel}
      </p>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            type="button"
            size="sm"
            variant={value === filter.value ? "default" : "outline"}
            disabled={disabled}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
