import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import MedicalTestFilters from "@/components/medicalTests/MedicalTestFilters";
import MedicalTestList from "@/components/medicalTests/MedicalTestList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { getDiseases } from "@/services/diseaseService";
import {
  deleteMedicalTest,
  getMedicalTests,
  updateMedicalTest,
} from "@/services/medicalTestService";
import { getVisits } from "@/services/visitService";
import CreateMedicalTestDialog from "@/components/medicalTests/CreateMedicalTestDialog";
import EditMedicalTestDialog from "@/components/medicalTests/EditMedicalTestDialog";
import DeleteMedicalTestDialog from "@/components/medicalTests/DeleteMedicalTestDialog";

import type {
  MedicalTest,
  MedicalTestFilterOptions,
  MedicalTestFilters as MedicalTestFilterValues,
  MedicalTestFormOptions,
  UpdateMedicalTestRequest,
} from "@/types/medicalTest";

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

        if (!isCancelled) {
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
        }
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

  async function refreshMedicalTests() {
    const response = await getMedicalTests(filters);

    setTests(response);
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

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">{tr.tests.eyebrow}</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {tr.tests.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {tr.tests.description}
          </p>
        </div>

        <Button onClick={handleOpenCreate} disabled={isPreparingCreate}>
          <Plus className="size-4" />

          {isPreparingCreate ? tr.tests.preparing : tr.tests.add}
        </Button>
      </div>

      <div className="mt-8">
        <MedicalTestFilters
          value={filters}
          options={filterOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl border bg-muted/40"
              />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error ?? tr.tests.loadError}
          </div>
        ) : (
          <MedicalTestList
            tests={tests}
            isFiltered={isFiltered}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </div>
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
    </div>
  );
}
