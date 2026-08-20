import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import CreateDiseaseDialog from "@/components/diseases/CreateDiseaseDialog";
import DiseaseFilter, {
  type DiseaseFilterValue,
} from "@/components/diseases/DiseaseFilter";
import DiseaseList from "@/components/diseases/DiseaseList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import EditDiseaseDialog from "@/components/diseases/EditDiseaseDialog";
import {
  getDiseases,
  getDiseasesByStatus,
  updateDisease,
} from "@/services/diseaseService";
import DeleteDiseaseDialog from "@/components/diseases/DeleteDiseaseDialog";
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

      const response =
        filter === "ALL"
          ? await getDiseases()
          : await getDiseasesByStatus(filter);

      setDiseases(response);
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
      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h1 className="font-semibold text-destructive">
          {tr.diseases.loadError}
        </h1>

        <p role="alert" className="mt-2 text-sm text-muted-foreground">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {tr.diseases.eyebrow}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {tr.diseases.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {tr.diseases.description}
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />

          {tr.diseases.add}
        </Button>
      </div>

      <div className="mt-8">
        <DiseaseFilter
          value={filter}
          onChange={handleFilterChange}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6">
        <DiseaseList
          diseases={diseases}
          isFiltered={filter !== "ALL"}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

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
    <section className="space-y-8">
      <div>
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-9 w-48 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl border bg-card"
          />
        ))}
      </div>
    </section>
  );
}
