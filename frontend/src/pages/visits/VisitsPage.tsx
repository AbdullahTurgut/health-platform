import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import { Button } from "@/components/ui/button";
import VisitList from "@/components/visits/VisitList";
import { tr } from "@/i18n/tr";
import { getVisits, updateVisit } from "@/services/visitService";
import type {
  UpdateVisitRequest,
  Visit,
  VisitFilters as VisitFilterValues,
  VisitFormOptions,
} from "@/types/visit";
import { getDiseases } from "@/services/diseaseService";
import { getDoctors } from "@/services/doctorService";
import { getHospitals } from "@/services/hospitalService";
import CreateVisitDialog from "@/components/visits/CreateVisitDialog";
import EditVisitDialog from "@/components/visits/EditVisitDialog";
import VisitFilters from "@/components/visits/VisitFilters";
import DeleteVisitDialog from "@/components/visits/DeleteVisitDialog";

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [visitFormOptions, setVisitFormOptions] = useState<VisitFormOptions>({
    diseases: [],
    doctors: [],
    hospitals: [],
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isPreparingCreate, setIsPreparingCreate] = useState(false);

  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [visitFilters, setVisitFilters] = useState<VisitFilterValues>({});

  const [visitToDelete, setVisitToDelete] = useState<Visit | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchVisits() {
      try {
        const response = await getVisits(visitFilters);

        if (!isCancelled) {
          setVisits(response);
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

    fetchVisits();

    return () => {
      isCancelled = true;
    };
  }, [visitFilters]);

  function handleApplyFilters(filters: VisitFilterValues) {
    const isSame =
      (filters.diseaseId ?? "") === (visitFilters.diseaseId ?? "") &&
      (filters.doctorId ?? "") === (visitFilters.doctorId ?? "") &&
      (filters.hospitalId ?? "") === (visitFilters.hospitalId ?? "");

    if (isSame) {
      return;
    }

    setIsLoading(true);
    setVisitFilters(filters);
  }

  function handleClearFilters() {
    const hasFilter = Boolean(
      visitFilters.diseaseId ||
      visitFilters.doctorId ||
      visitFilters.hospitalId,
    );

    if (!hasFilter) {
      return;
    }

    setIsLoading(true);
    setVisitFilters({});
  }

  async function handleUpdated(visitId: string, payload: UpdateVisitRequest) {
    await updateVisit(visitId, payload);

    await refreshVisits();
  }

  async function handleOpenCreate() {
    try {
      setIsPreparingCreate(true);
      setError(null);

      await loadVisitFormOptions();

      setIsCreateOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingCreate(false);
    }
  }

  async function refreshVisits() {
    const response = await getVisits(visitFilters);

    setVisits(response);
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshVisits();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function loadVisitFormOptions() {
    const [diseases, doctors, hospitals] = await Promise.all([
      getDiseases(),
      getDoctors(),
      getHospitals(),
    ]);

    const options: VisitFormOptions = {
      diseases: diseases
        .map((disease) => ({
          id: disease.id,
          name: disease.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      doctors: doctors
        .map((doctor) => ({
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      hospitals: hospitals
        .map((hospital) => ({
          id: hospital.id,
          name: hospital.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),
    };

    setVisitFormOptions(options);

    return options;
  }

  async function handleEdit(visit: Visit) {
    try {
      setError(null);

      await loadVisitFormOptions();

      setSelectedVisit(visit);
      setIsEditOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedVisit(null);
    }
  }

  async function handleDeleted() {
    await refreshVisits();
  }

  function handleDelete(visit: Visit) {
    setVisitToDelete(visit);
    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setVisitToDelete(null);
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {tr.visits.eyebrow}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {tr.visits.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {tr.visits.description}
          </p>
        </div>

        <Button onClick={handleOpenCreate} disabled={isPreparingCreate}>
          <Plus className="size-4" />

          {isPreparingCreate ? tr.visits.preparing : tr.visits.add}
        </Button>
      </div>
      <div className="mt-8">
        <VisitFilters
          value={visitFilters}
          options={visitFormOptions}
          disabled={isLoading}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>
      <div className="mt-8">
        {isLoading ? (
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
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error || tr.visits.loadError}
          </div>
        ) : (
          <VisitList
            visits={visits}
            isFiltered={Boolean(
              visitFilters.diseaseId ||
              visitFilters.doctorId ||
              visitFilters.hospitalId,
            )}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <CreateVisitDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        options={visitFormOptions}
        onCreated={handleCreated}
      />

      <EditVisitDialog
        key={selectedVisit?.id ?? "no-visit"}
        visit={selectedVisit}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        options={visitFormOptions}
        onUpdated={handleUpdated}
      />

      <DeleteVisitDialog
        key={visitToDelete?.id ?? "no-delete-visit"}
        visit={visitToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
