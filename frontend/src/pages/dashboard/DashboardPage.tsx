import { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  HeartPulse,
  Pill,
  ScanLine,
  TestTube2,
} from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import { useAuth } from "@/auth/useAuth";
import RecentSection from "@/components/dashboard/RecentSection";
import RecentTimeline from "@/components/dashboard/RecentTimeline";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { tr } from "@/i18n/tr";
import { getDashboardSummary } from "@/services/dashboardService";
import type { DashboardSummaryResponse } from "@/types/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardSummaryResponse | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError(null);

        const response = await getDashboardSummary();

        setDashboard(response);
      } catch (error) {
        setError(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />

          <div className="h-9 w-56 animate-pulse rounded-lg bg-muted" />

          <div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-muted" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="
                h-36
                animate-pulse
                rounded-xl
                border
                border-border
                bg-card
              "
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                h-72
                animate-pulse
                rounded-xl
                border
                border-border
                bg-card
              "
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="
          rounded-xl
          border
          border-destructive/20
          bg-destructive/5
          p-6
        "
      >
        <p className="text-sm font-medium text-destructive">
          {tr.dashboard.title}
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          Dashboard yüklenemedi
        </h1>

        <p
          role="alert"
          className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground"
        >
          {error}
        </p>
      </section>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <section className="space-y-8">
      <header
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div className="max-w-2xl">
          <p
            className="
              text-sm
              font-semibold
              tracking-tight
              text-primary
            "
          >
            {tr.dashboard.eyebrow}
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-semibold
              tracking-tight
              text-foreground
              sm:text-[2rem]
            "
          >
            {tr.dashboard.title}
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            {tr.dashboard.description}
          </p>
        </div>

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            rounded-xl
            border
            border-border
            bg-card
            px-4
            py-3
            shadow-[0_1px_2px_rgba(15,23,42,0.03)]
          "
        >
          <div
            className="
              flex
              size-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary/10
              text-primary
            "
          >
            <HeartPulse className="size-4.5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {tr.auth.signedInAs}
            </p>

            <p className="mt-0.5 max-w-56 truncate text-sm font-medium">
              {user?.email}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label={tr.dashboard.activeDiseases}
          value={dashboard.counts.activeDiseases}
          icon={HeartPulse}
        />

        <SummaryCard
          label={tr.dashboard.activeMedications}
          value={dashboard.counts.activeMedications}
          icon={Pill}
        />

        <SummaryCard
          label={tr.dashboard.visits}
          value={dashboard.counts.totalVisits}
          icon={CalendarDays}
        />

        <SummaryCard
          label={tr.dashboard.medicalTests}
          value={dashboard.counts.totalMedicalTests}
          icon={TestTube2}
        />

        <SummaryCard
          label={tr.dashboard.imaging}
          value={dashboard.counts.totalImaging}
          icon={ScanLine}
        />

        <SummaryCard
          label={tr.dashboard.documents}
          value={dashboard.counts.totalDocuments}
          icon={FileText}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <RecentSection
          title={tr.dashboard.recentVisits}
          items={dashboard.recentVisits}
        />

        <RecentSection
          title={tr.dashboard.recentMedicalTests}
          items={dashboard.recentMedicalTests}
        />

        <RecentSection
          title={tr.dashboard.recentImaging}
          items={dashboard.recentImaging}
        />
      </div>

      <RecentTimeline items={dashboard.recentTimeline} />
    </section>
  );
}
