import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getApiErrorMessage } from "@/api/apiError";
import EditMedicationDialog from "@/components/medications/EditMedicationDialog";
import MedicationFilters from "@/components/medications/MedicationFilters";
import MedicationList from "@/components/medications/MedicationList";
import { Button } from "@/components/ui/button";
import CreateMedicationDialog from "@/components/medications/CreateMedicationDialog";
import { tr } from "@/i18n/tr";

import { getDiseases } from "@/services/diseaseService";
import { getMedications } from "@/services/medicationService";

import type {
  Medication,
  MedicationFilters as MedicationFilterValues,
  MedicationFormOptions,
} from "@/types/medication";

export default function MedicationPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MedicationFilterValues>({});
  const [filterOptions, setFilterOptions] = useState<MedicationFormOptions>({
    diseases: [],
  });
  const isFiltered = Boolean(
    filters.diseaseId || filters.status || filters.name,
  );
  const [formOptions, setFormOptions] = useState<MedicationFormOptions>({
    diseases: [],
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPreparingCreate, setIsPreparingCreate] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreparingEdit, setIsPreparingEdit] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchMedications() {
      try {
        const response = await getMedications(filters);

        if (!isCancelled) {
          setMedications(response);
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

    fetchMedications();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchFilterOptions() {
      try {
        const diseases = await getDiseases();

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
        });
      } catch {
        /*
         * Disease seçenekleri yüklenemese de
         * Medication listesi çalışmaya devam eder.
         */
      }
    }

    fetchFilterOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  function handleApplyFilters(nextFilters: MedicationFilterValues) {
    const activeFilterCount = [
      nextFilters.diseaseId,
      nextFilters.status,
      nextFilters.name?.trim(),
    ].filter(Boolean).length;

    /*
     * Backend aynı anda yalnızca
     * bir Medication filtresi kabul ediyor.
     */
    if (activeFilterCount > 1) {
      return;
    }

    const normalizedName = nextFilters.name?.trim() ?? "";

    const isSame =
      (nextFilters.diseaseId ?? "") === (filters.diseaseId ?? "") &&
      (nextFilters.status ?? "") === (filters.status ?? "") &&
      normalizedName === (filters.name ?? "");

    /*
     * Aynı filter için state değişmeyeceği
     * için loading açmıyoruz.
     *
     * Aksi halde effect tekrar çalışmayabilir
     * ve loading açık kalabilir.
     */
    if (isSame) {
      return;
    }

    setIsLoading(true);

    setFilters({
      ...(nextFilters.diseaseId
        ? {
            diseaseId: nextFilters.diseaseId,
          }
        : {}),

      ...(nextFilters.status
        ? {
            status: nextFilters.status,
          }
        : {}),

      ...(normalizedName
        ? {
            name: normalizedName,
          }
        : {}),
    });
  }

  function handleClearFilters() {
    if (!isFiltered) {
      return;
    }

    setIsLoading(true);
    setFilters({});
  }

  async function loadMedicationFormOptions() {
    const diseases = await getDiseases();

    const options: MedicationFormOptions = {
      diseases: diseases
        .map((disease) => ({
          id: disease.id,
          name: disease.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),
    };

    setFormOptions(options);

    return options;
  }

  async function handleOpenCreate() {
    if (isPreparingCreate) {
      return;
    }

    try {
      setIsPreparingCreate(true);
      setError(null);

      await loadMedicationFormOptions();

      setIsCreateOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingCreate(false);
    }
  }

  async function refreshMedications() {
    const response = await getMedications(filters);

    setMedications(response);
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshMedications();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEdit(medication: Medication) {
    if (isPreparingEdit) {
      return;
    }

    try {
      setIsPreparingEdit(true);
      setError(null);

      await loadMedicationFormOptions();

      setSelectedMedication(medication);

      setIsEditOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingEdit(false);
    }
  }
  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedMedication(null);
    }
  }

  async function handleUpdated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshMedications();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {tr.medications.eyebrow}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {tr.medications.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {tr.medications.description}
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpenCreate}
          disabled={isPreparingCreate}
        >
          <Plus className="size-4" />

          {isPreparingCreate ? tr.medications.preparing : tr.medications.create}
        </Button>
      </div>

      <div className="mt-8">
        <MedicationFilters
          value={filters}
          options={filterOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <MedicationListSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error || tr.medications.loadError}
          </div>
        ) : (
          <MedicationList
            medications={medications}
            isFiltered={isFiltered}
            isPreparingEdit={isPreparingEdit}
            onEdit={handleEdit}
          />
        )}
      </div>

      <CreateMedicationDialog
        open={isCreateOpen}
        options={formOptions}
        onOpenChange={setIsCreateOpen}
        onCreated={handleCreated}
      />

      <EditMedicationDialog
        key={selectedMedication?.id ?? "no-medication"}
        medication={selectedMedication}
        open={isEditOpen}
        options={formOptions}
        onOpenChange={handleEditOpenChange}
        onUpdated={handleUpdated}
      />
    </div>
  );
}

function MedicationListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({
        length: 3,
      }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-2xl border bg-muted/40"
        />
      ))}
    </div>
  );
}
