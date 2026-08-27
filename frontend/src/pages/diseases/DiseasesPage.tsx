import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import CreateDiseaseDialog from "@/components/diseases/CreateDiseaseDialog";
import DeleteDiseaseDialog from "@/components/diseases/DeleteDiseaseDialog";
import DiseaseFilter, {
  type DiseaseFilterValue,
} from "@/components/diseases/DiseaseFilter";
import DiseaseList from "@/components/diseases/DiseaseList";
import EditDiseaseDialog from "@/components/diseases/EditDiseaseDialog";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import {
  getDiseases,
  getDiseasesByStatus,
  updateDisease,
} from "@/services/diseaseService";
import type { Disease, UpdateDiseaseRequest } from "@/types/disease";

export default function DiseasesPage() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<DiseaseFilterValue>("ALL");

  const [diseaseToDelete, setDiseaseToDelete] = useState<Disease | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchDiseases() {
      try {
        const response =
          filter === "ALL"
            ? await getDiseases()
            : await getDiseasesByStatus(filter);

        if (!isCancelled) {
          setDiseases(response);
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

    fetchDiseases();

    return () => {
      isCancelled = true;
    };
  }, [filter]);

  async function refreshDiseases() {
    const response =
      filter === "ALL"
        ? await getDiseases()
        : await getDiseasesByStatus(filter);

    setDiseases(response);
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshDiseases();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdated(
    diseaseId: string,
    payload: UpdateDiseaseRequest,
  ) {
    await updateDisease(diseaseId, payload);

    await refreshDiseases();
  }

  async function handleDeleted() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshDiseases();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(disease: Disease) {
    setDiseaseToDelete(disease);
    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setDiseaseToDelete(null);
    }
  }

  function handleFilterChange(nextFilter: DiseaseFilterValue) {
    setIsLoading(true);
    setFilter(nextFilter);
  }

  function handleEdit(disease: Disease) {
    setSelectedDisease(disease);
    setIsEditOpen(true);
  }

  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedDisease(null);
    }
  }

  if (isLoading) {
    return <DiseasesLoading />;
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
          {tr.diseases.eyebrow}
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          {tr.diseases.loadError}
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
            {tr.diseases.eyebrow}
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
            {tr.diseases.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.diseases.description}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="size-4" />

          {tr.diseases.add}
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
        <DiseaseFilter
          value={filter}
          onChange={handleFilterChange}
          disabled={isLoading}
        />
      </div>

      <DiseaseList
        diseases={diseases}
        isFiltered={filter !== "ALL"}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateDiseaseDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreated={handleCreated}
      />

      <EditDiseaseDialog
        key={selectedDisease?.id ?? "no-disease"}
        disease={selectedDisease}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        onUpdated={handleUpdated}
      />

      <DeleteDiseaseDialog
        key={diseaseToDelete?.id ?? "no-delete-disease"}
        disease={diseaseToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </section>
  );
}

function DiseasesLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />

        <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />

        <div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-muted" />
      </div>

      <div
        className="
          h-20
          animate-pulse
          rounded-xl
          border
          border-border
          bg-card
        "
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              h-44
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
