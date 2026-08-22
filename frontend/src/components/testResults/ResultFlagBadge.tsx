import { resultFlagLabels, resultFlagTones } from "@/lib/resultFlag";

import type { ResultFlag } from "@/types/testResult";

type ResultFlagBadgeProps = {
  flag: ResultFlag;
};

export default function ResultFlagBadge({ flag }: ResultFlagBadgeProps) {
  const tone = resultFlagTones[flag];

  const className = {
    neutral: "bg-muted text-muted-foreground",

    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",

    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400",

    danger: "bg-destructive/10 text-destructive",

    info: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  }[tone];

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {resultFlagLabels[flag]}
    </span>
  );
}
