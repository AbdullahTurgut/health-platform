import type { DiseaseStatus } from "@/types/disease";
import { tr } from "@/i18n/tr";
import { cn } from "@/lib/utils";

type DiseaseStatusBadgeProps = {
  status: DiseaseStatus;
};

export default function DiseaseStatusBadge({
  status,
}: DiseaseStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        status === "ACTIVE" &&
          "bg-blue-500/10 text-blue-700 dark:text-blue-400",
        status === "RESOLVED" &&
          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        status === "CHRONIC" &&
          "bg-amber-500/10 text-amber-700 dark:text-amber-400",
      )}
    >
      {tr.diseaseStatus[status]}
    </span>
  );
}
