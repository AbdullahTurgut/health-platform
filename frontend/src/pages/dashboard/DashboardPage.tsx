import { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  HeartPulse,
  Pill,
  ScanLine,
  TestTube2,
} from "lucide-react";
import { tr } from "@/i18n/tr";
import { getApiErrorMessage } from "@/api/apiError";
import { useAuth } from "@/auth/useAuth";
import RecentSection from "@/components/dashboard/RecentSection";
import RecentTimeline from "@/components/dashboard/RecentTimeline";
import SummaryCard from "@/components/dashboard/SummaryCard";
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
        <div>
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-9 w-52 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl border bg-card"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h1 className="font-semibold text-destructive">
          Unable to load dashboard
        </h1>

        <p role="alert" className="mt-2 text-sm text-muted-foreground">
          {error}
        </p>
      </section>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {tr.dashboard.eyebrow}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {tr.dashboard.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {tr.dashboard.description}
          </p>
        </div>

        <div className="rounded-xl border bg-card px-4 py-3 text-sm shadow-sm">
          <p className="text-xs text-muted-foreground">{tr.auth.signedInAs}</p>

          <p className="mt-0.5 max-w-64 truncate font-medium">{user?.email}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
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

      <div className="mt-8">
        <RecentTimeline items={dashboard.recentTimeline} />
      </div>
    </section>
  );
}
