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
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-foreground">
          {tr.diseases.filterLabel}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Kayıtları durumlarına göre görüntüleyin.
        </p>
      </div>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {filters.map((filter) => {
          const isActive = value === filter.value;

          return (
            <Button
              key={filter.value}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              disabled={disabled}
              aria-pressed={isActive}
              onClick={() => onChange(filter.value)}
              className="
                min-w-fit
                rounded-lg
              "
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
