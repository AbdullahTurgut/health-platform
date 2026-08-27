import { useEffect, useState } from "react";
import type {
  Imaging,
  ImagingFilterOptions,
  ImagingFilters as ImagingFilterValues,
  ImagingFormOptions,
} from "@/types/imaging";
import { Plus } from "lucide-react";
import ImagingFilters from "@/components/imaging/ImagingFilters";

import { getDiseases } from "@/services/diseaseService";
import { getDoctors } from "@/services/doctorService";
import { getHospitals } from "@/services/hospitalService";
import { getVisits } from "@/services/visitService";
import { getApiErrorMessage } from "@/api/apiError";
import ImagingList from "@/components/imaging/ImagingList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import { getImagingRecords } from "@/services/imagingService";
import CreateImagingDialog from "@/components/imaging/CreateImagingDialog";
import EditImagingDialog from "@/components/imaging/EditImagingDialog";
import DeleteImagingDialog from "@/components/imaging/DeleteImagingDialog";

export default function ImagingPage() {
  const [records, setRecords] = useState<Imaging[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ImagingFilterValues>({});

  const [filterOptions, setFilterOptions] = useState<ImagingFilterOptions>({
    diseases: [],
    visits: [],
    doctors: [],
    hospitals: [],
  });

  const isFiltered = Boolean(
    filters.diseaseId ||
    filters.visitId ||
    filters.doctorId ||
    filters.hospitalId ||
    filters.type ||
    filters.bodyPart,
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isPreparingCreate, setIsPreparingCreate] = useState(false);

  const [formOptions, setFormOptions] = useState<ImagingFormOptions>({
    diseases: [],
    visits: [],
    doctors: [],
    hospitals: [],
  });

  const [selectedImaging, setSelectedImaging] = useState<Imaging | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isPreparingEdit, setIsPreparingEdit] = useState(false);

  const [imagingToDelete, setImagingToDelete] = useState<Imaging | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchFilterOptions() {
      try {
        const [diseases, visits, doctors, hospitals] = await Promise.all([
          getDiseases(),
          getVisits(),
          getDoctors(),
          getHospitals(),
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

            doctors: doctors
              .map((doctor) => ({
                id: doctor.id,
                name: `${doctor.firstName} ${doctor.lastName}`.trim(),
              }))
              .sort((a, b) => a.name.localeCompare(b.name, "tr")),

            hospitals: hospitals
              .map((hospital) => ({
                id: hospital.id,
                name: hospital.name,
              }))
              .sort((a, b) => a.name.localeCompare(b.name, "tr")),
          });
        }
      } catch {
        // Imaging listesi yine çalışabilir.
        // Filter options ayrı concern.
      }
    }

    fetchFilterOptions();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function fetchImaging() {
      try {
        const response = await getImagingRecords(filters);

        if (!isCancelled) {
          setRecords(response);
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

    fetchImaging();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  async function loadImagingFormOptions() {
    const [diseases, visits, doctors, hospitals] = await Promise.all([
      getDiseases(),
      getVisits(),
      getDoctors(),
      getHospitals(),
    ]);

    const options: ImagingFormOptions = {
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

      doctors: doctors
        .map((doctor) => ({
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`.trim(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),

      hospitals: hospitals
        .map((hospital) => ({
          id: hospital.id,
          name: hospital.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "tr")),
    };

    setFormOptions(options);

    return options;
  }

  async function handleOpenCreate() {
    try {
      setIsPreparingCreate(true);
      setError(null);

      await loadImagingFormOptions();

      setIsCreateOpen(true);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsPreparingCreate(false);
    }
  }

  async function refreshImaging() {
    const response = await getImagingRecords(filters);

    setRecords(response);
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshImaging();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleApplyFilters(nextFilters: ImagingFilterValues) {
    const activeFilterCount = [
      nextFilters.diseaseId,
      nextFilters.visitId,
      nextFilters.doctorId,
      nextFilters.hospitalId,
      nextFilters.type,
      nextFilters.bodyPart?.trim(),
    ].filter(Boolean).length;

    if (activeFilterCount > 1) {
      return;
    }

    const isSame =
      (nextFilters.diseaseId ?? "") === (filters.diseaseId ?? "") &&
      (nextFilters.visitId ?? "") === (filters.visitId ?? "") &&
      (nextFilters.doctorId ?? "") === (filters.doctorId ?? "") &&
      (nextFilters.hospitalId ?? "") === (filters.hospitalId ?? "") &&
      (nextFilters.type ?? "") === (filters.type ?? "") &&
      (nextFilters.bodyPart?.trim() ?? "") === (filters.bodyPart ?? "");

    if (isSame) {
      return;
    }

    setIsLoading(true);

    setFilters({
      ...nextFilters,

      ...(nextFilters.bodyPart
        ? {
            bodyPart: nextFilters.bodyPart.trim(),
          }
        : {}),
    });
  }

  function handleClearFilters() {
    const hasFilter = Boolean(
      filters.diseaseId ||
      filters.visitId ||
      filters.doctorId ||
      filters.hospitalId ||
      filters.type ||
      filters.bodyPart,
    );

    if (!hasFilter) {
      return;
    }

    setIsLoading(true);
    setFilters({});
  }

  async function handleEdit(imaging: Imaging) {
    if (isPreparingEdit) {
      return;
    }

    try {
      setIsPreparingEdit(true);
      setError(null);

      await loadImagingFormOptions();

      setSelectedImaging(imaging);
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
      setSelectedImaging(null);
    }
  }

  async function handleUpdated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshImaging();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(imaging: Imaging) {
    setImagingToDelete(imaging);

    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setImagingToDelete(null);
    }
  }

  async function handleDeleted() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshImaging();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
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
            {tr.imaging.eyebrow}
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
            {tr.imaging.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.imaging.description}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={handleOpenCreate}
          disabled={isPreparingCreate}
        >
          <Plus className="size-4" />

          {isPreparingCreate ? tr.imaging.preparing : tr.imaging.add}
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
        <ImagingFilters
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
            {tr.imaging.loadError}
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      ) : isLoading ? (
        <ImagingLoading />
      ) : (
        <ImagingList
          records={records}
          isFiltered={isFiltered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isPreparingEdit={isPreparingEdit}
        />
      )}

      <CreateImagingDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        options={formOptions}
        onCreated={handleCreated}
      />

      <EditImagingDialog
        key={selectedImaging?.id ?? "no-imaging"}
        imaging={selectedImaging}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        options={formOptions}
        onUpdated={handleUpdated}
      />

      <DeleteImagingDialog
        key={imagingToDelete?.id ?? "no-delete-imaging"}
        imaging={imagingToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </section>
  );
}

function ImagingLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="
            h-80
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

function formatVisitOption(visitDate: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(visitDate));
}
