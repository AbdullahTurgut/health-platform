import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";

import CreateMedicalTestDialog from "@/components/medicalTests/CreateMedicalTestDialog";
import DeleteMedicalTestDialog from "@/components/medicalTests/DeleteMedicalTestDialog";
import EditMedicalTestDialog from "@/components/medicalTests/EditMedicalTestDialog";
import MedicalTestFilters from "@/components/medicalTests/MedicalTestFilters";
import MedicalTestList from "@/components/medicalTests/MedicalTestList";

import CreateTestResultDialog from "@/components/testResults/CreateTestResultDialog";
import DeleteTestResultDialog from "@/components/testResults/DeleteTestResultDialog";
import EditTestResultDialog from "@/components/testResults/EditTestResultDialog";
import TestResultHistoryDialog from "@/components/testResults/TestResultHistoryDialog";
import TestResultsDialog from "@/components/testResults/TestResultsDialog";

import { Button } from "@/components/ui/button";

import { tr } from "@/i18n/tr";

import { getDiseases } from "@/services/diseaseService";
import {
  deleteMedicalTest,
  getMedicalTests,
  updateMedicalTest,
} from "@/services/medicalTestService";
import {
  deleteTestResult,
  getTestResultHistory,
  getTestResults,
  updateTestResult,
} from "@/services/testResultService";
import { getVisits } from "@/services/visitService";

import type {
  MedicalTest,
  MedicalTestFilterOptions,
  MedicalTestFilters as MedicalTestFilterValues,
  MedicalTestFormOptions,
  UpdateMedicalTestRequest,
} from "@/types/medicalTest";
import type { TestResult, UpdateTestResultRequest } from "@/types/testResult";

function formatVisitOption(visitDate: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(visitDate));
}

export default function MedicalTestsPage() {
  const [tests, setTests] = useState<MedicalTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<MedicalTestFilterValues>({});

  const [filterOptions, setFilterOptions] = useState<MedicalTestFilterOptions>({
    diseases: [],
    visits: [],
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPreparingCreate, setIsPreparingCreate] = useState(false);

  const [formOptions, setFormOptions] = useState<MedicalTestFormOptions>({
    diseases: [],
    visits: [],
  });

  const [selectedMedicalTest, setSelectedMedicalTest] =
    useState<MedicalTest | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedDeleteTest, setSelectedDeleteTest] =
    useState<MedicalTest | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedResultsTest, setSelectedResultsTest] =
    useState<MedicalTest | null>(null);

  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [resultsError, setResultsError] = useState<string | null>(null);

  const [isCreateResultOpen, setIsCreateResultOpen] = useState(false);

  const [selectedEditResult, setSelectedEditResult] =
    useState<TestResult | null>(null);

  const [isEditResultOpen, setIsEditResultOpen] = useState(false);

  const [selectedDeleteResult, setSelectedDeleteResult] =
    useState<TestResult | null>(null);

  const [isDeleteResultOpen, setIsDeleteResultOpen] = useState(false);

  const [historyParameter, setHistoryParameter] = useState<string | null>(null);

  const [historyResults, setHistoryResults] = useState<TestResult[]>([]);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchTests() {
      try {
        const response = await getMedicalTests(filters);

        if (!isCancelled) {
          setTests(response);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(getApiErrorMessage(error));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchTests();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchFilterOptions() {
      try {
        const [diseases, visits] = await Promise.all([
          getDiseases(),
          getVisits(),
        ]);

        if (isCancelled) {
          return;
        }

        setFilterOptions({
          diseases: diseases
            .map((disease) => ({
              id: disease.id,
              name: disease.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "tr")),

          visits: visits
            .map((visit) => ({
              id: visit.id,
              label: formatVisitOption(visit.visitDate),
            }))
            .sort((a, b) => a.label.localeCompare(b.label, "tr")),
        });
      } catch {
        // Test listesi çalışmaya devam edebilir.
        // Filter option'ları ayrı concern.
      }
    }

    fetchFilterOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  async function loadMedicalTestFormOptions() {
    const [diseases, visits] = await Promise.all([getDiseases(), getVisits()]);

    const options: MedicalTestFormOptions = {
      diseases: diseases
        .map((disease) => ({
          id: disease.id,
          name: disease.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      visits: visits
        .map((visit) => ({
          id: visit.id,
          label: formatVisitOption(visit.visitDate),
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "tr")),
    };

    setFormOptions(options);

    return options;
  }

  async function refreshMedicalTests() {
    const response = await getMedicalTests(filters);

    setTests(response);
  }

  async function handleOpenCreate() {
    try {
      setIsPreparingCreate(true);
      setError(null);

      await loadMedicalTestFormOptions();

      setIsCreateOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingCreate(false);
    }
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshMedicalTests();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleApplyFilters(nextFilters: MedicalTestFilterValues) {
    const activeFilterCount = [
      nextFilters.diseaseId,
      nextFilters.visitId,
      nextFilters.category,
    ].filter(Boolean).length;

    if (activeFilterCount > 1) {
      return;
    }

    const isSame =
      (nextFilters.diseaseId ?? "") === (filters.diseaseId ?? "") &&
      (nextFilters.visitId ?? "") === (filters.visitId ?? "") &&
      (nextFilters.category ?? "") === (filters.category ?? "");

    if (isSame) {
      return;
    }

    setIsLoading(true);
    setFilters(nextFilters);
  }

  function handleClearFilters() {
    const hasFilter = Boolean(
      filters.diseaseId || filters.visitId || filters.category,
    );

    if (!hasFilter) {
      return;
    }

    setIsLoading(true);
    setFilters({});
  }

  const isFiltered = Boolean(
    filters.diseaseId || filters.visitId || filters.category,
  );

  async function handleEdit(test: MedicalTest) {
    try {
      setError(null);

      await loadMedicalTestFormOptions();

      setSelectedMedicalTest(test);
      setIsEditOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedMedicalTest(null);
    }
  }

  async function handleUpdated(
    testId: string,
    payload: UpdateMedicalTestRequest,
  ) {
    await updateMedicalTest(testId, payload);

    await refreshMedicalTests();
  }

  function handleDeleteRequest(test: MedicalTest) {
    setSelectedDeleteTest(test);
    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setSelectedDeleteTest(null);
    }
  }

  async function handleDelete(testId: string) {
    await deleteMedicalTest(testId);

    await refreshMedicalTests();
  }

  async function handleShowResults(test: MedicalTest) {
    try {
      setSelectedResultsTest(test);
      setIsResultsOpen(true);
      setIsResultsLoading(true);
      setResultsError(null);

      const response = await getTestResults(test.id);

      setTestResults(response);
    } catch (error) {
      setResultsError(getApiErrorMessage(error));
    } finally {
      setIsResultsLoading(false);
    }
  }

  async function loadTestResults(medicalTestId: string) {
    const response = await getTestResults(medicalTestId);

    setTestResults(response);
  }

  async function handleResultCreated() {
    if (!selectedResultsTest) {
      return;
    }

    await loadTestResults(selectedResultsTest.id);
  }

  function handleResultsOpenChange(open: boolean) {
    setIsResultsOpen(open);

    if (!open) {
      setSelectedResultsTest(null);
      setTestResults([]);
      setResultsError(null);
      setIsCreateResultOpen(false);
    }
  }

  async function handleResultUpdated(
    resultId: string,
    payload: UpdateTestResultRequest,
  ) {
    await updateTestResult(resultId, payload);

    if (!selectedResultsTest) {
      return;
    }

    await loadTestResults(selectedResultsTest.id);
  }

  function handleEditResultRequest(result: TestResult) {
    setSelectedEditResult(result);
    setIsEditResultOpen(true);
  }

  function handleEditResultOpenChange(open: boolean) {
    setIsEditResultOpen(open);

    if (!open) {
      setSelectedEditResult(null);
    }
  }

  async function handleResultDelete(resultId: string) {
    await deleteTestResult(resultId);

    if (!selectedResultsTest) {
      return;
    }

    await loadTestResults(selectedResultsTest.id);
  }

  function handleDeleteResultRequest(result: TestResult) {
    setSelectedDeleteResult(result);
    setIsDeleteResultOpen(true);
  }

  function handleDeleteResultOpenChange(open: boolean) {
    setIsDeleteResultOpen(open);

    if (!open) {
      setSelectedDeleteResult(null);
    }
  }

  async function handleResultHistory(result: TestResult) {
    try {
      setHistoryParameter(result.parameterName);
      setHistoryResults([]);
      setHistoryError(null);
      setIsHistoryOpen(true);
      setIsHistoryLoading(true);

      const response = await getTestResultHistory(result.parameterName);

      setHistoryResults(response);
    } catch (error) {
      setHistoryError(getApiErrorMessage(error));
    } finally {
      setIsHistoryLoading(false);
    }
  }

  function handleHistoryOpenChange(open: boolean) {
    setIsHistoryOpen(open);

    if (!open) {
      setHistoryParameter(null);
      setHistoryResults([]);
      setHistoryError(null);
    }
  }

  return (
    <section className="space-y-6">
      <header
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-tight text-primary">
            {tr.tests.eyebrow}
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
            {tr.tests.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.tests.description}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={handleOpenCreate}
          disabled={isPreparingCreate}
        >
          <Plus className="size-4" />

          {isPreparingCreate ? tr.tests.preparing : tr.tests.add}
        </Button>
      </header>

      <div
        className="
          rounded-xl
          border
          border-border
          bg-card
          p-4
          shadow-[0_1px_2px_rgba(15,23,42,0.03)]
          sm:p-5
        "
      >
        <MedicalTestFilters
          value={filters}
          options={filterOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      {error ? (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-destructive/20
            bg-destructive/5
            p-5
          "
        >
          <p className="text-sm font-medium text-destructive">
            {tr.tests.loadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      ) : isLoading ? (
        <MedicalTestsLoading />
      ) : (
        <MedicalTestList
          tests={tests}
          isFiltered={isFiltered}
          onShowResults={handleShowResults}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      )}

      <CreateMedicalTestDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        options={formOptions}
        onCreated={handleCreated}
      />

      <EditMedicalTestDialog
        key={selectedMedicalTest?.id ?? "no-medical-test"}
        test={selectedMedicalTest}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        options={formOptions}
        onUpdated={handleUpdated}
      />

      <DeleteMedicalTestDialog
        key={selectedDeleteTest?.id ?? "no-delete-medical-test"}
        test={selectedDeleteTest}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDelete={handleDelete}
      />

      <TestResultsDialog
        test={selectedResultsTest}
        results={testResults}
        open={isResultsOpen}
        onHistory={handleResultHistory}
        isLoading={isResultsLoading}
        error={resultsError}
        onOpenChange={handleResultsOpenChange}
        onCreate={() => setIsCreateResultOpen(true)}
        onEdit={handleEditResultRequest}
        onDelete={handleDeleteResultRequest}
      />

      <CreateTestResultDialog
        key={selectedResultsTest?.id ?? "no-medical-test-result"}
        medicalTestId={selectedResultsTest?.id ?? null}
        open={isCreateResultOpen}
        onOpenChange={setIsCreateResultOpen}
        onCreated={handleResultCreated}
      />

      <EditTestResultDialog
        key={selectedEditResult?.id ?? "no-edit-test-result"}
        result={selectedEditResult}
        open={isEditResultOpen}
        onOpenChange={handleEditResultOpenChange}
        onUpdated={handleResultUpdated}
      />

      <DeleteTestResultDialog
        key={selectedDeleteResult?.id ?? "no-delete-test-result"}
        result={selectedDeleteResult}
        open={isDeleteResultOpen}
        onOpenChange={handleDeleteResultOpenChange}
        onDelete={handleResultDelete}
      />

      <TestResultHistoryDialog
        parameterName={historyParameter}
        results={historyResults}
        open={isHistoryOpen}
        isLoading={isHistoryLoading}
        error={historyError}
        onOpenChange={handleHistoryOpenChange}
      />
    </section>
  );
}

function MedicalTestsLoading() {
  return (
    <div className="space-y-4">
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
  );
}
