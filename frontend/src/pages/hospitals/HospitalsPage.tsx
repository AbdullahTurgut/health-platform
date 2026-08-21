import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getApiErrorMessage } from "@/api/apiError";
import HospitalList from "@/components/hospitals/HospitalList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import {
  getHospitals,
  getHospitalsByCity,
  updateHospital,
} from "@/services/hospitalService";
import type { Hospital, UpdateHospitalRequest } from "@/types/hospital";
import HospitalCityFilter from "@/components/hospitals/HospitalCityFilter";
import CreateHospitalDialog from "@/components/hospitals/CreateHospitalDialog";
import EditHospitalDialog from "@/components/hospitals/EditHospitalDialog";
import DeleteHospitalDialog from "@/components/hospitals/DeleteHospitalDialog";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [cityFilter, setCityFilter] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [hospitalToDelete, setHospitalToDelete] = useState<Hospital | null>(
    null,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchHospitals() {
      try {
        const response = cityFilter
          ? await getHospitalsByCity(cityFilter)
          : await getHospitals();

        if (!isCancelled) {
          setHospitals(response);
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

    fetchHospitals();

    return () => {
      isCancelled = true;
    };
  }, [cityFilter]);

  function handleApplyCityFilter(city: string) {
    const normalizedCity = city.trim();

    if (normalizedCity === cityFilter) {
      return;
    }

    setIsLoading(true);
    setCityFilter(normalizedCity);
  }

  function handleClearCityFilter() {
    if (!cityFilter) {
      return;
    }

    setIsLoading(true);
    setCityFilter("");
  }

  async function refreshHospitals() {
    const response = cityFilter
      ? await getHospitalsByCity(cityFilter)
      : await getHospitals();

    setHospitals(response);
  }
  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshHospitals();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdated(
    hospitalId: string,
    payload: UpdateHospitalRequest,
  ) {
    await updateHospital(hospitalId, payload);

    await refreshHospitals();
  }

  function handleEdit(hospital: Hospital) {
    setSelectedHospital(hospital);

    setIsEditOpen(true);
  }

  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedHospital(null);
    }
  }

  async function handleDeleted() {
    await refreshHospitals();
  }

  function handleDelete(hospital: Hospital) {
    setHospitalToDelete(hospital);

    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setHospitalToDelete(null);
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {tr.hospitals.eyebrow}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {tr.hospitals.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {tr.hospitals.description}
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          {tr.hospitals.add}
        </Button>
      </div>

      <div className="mt-8">
        <HospitalCityFilter
          value={cityFilter}
          onApply={handleApplyCityFilter}
          onClear={handleClearCityFilter}
          disabled={isLoading}
        />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl border bg-muted/40"
              />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive"
          >
            {error || tr.hospitals.loadError}
          </div>
        ) : (
          <HospitalList
            hospitals={hospitals}
            isFiltered={Boolean(cityFilter)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <CreateHospitalDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreated={handleCreated}
      />
      <EditHospitalDialog
        key={selectedHospital?.id ?? "no-hospital"}
        hospital={selectedHospital}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        onUpdated={handleUpdated}
      />
      <DeleteHospitalDialog
        key={hospitalToDelete?.id ?? "no-delete-hospital"}
        hospital={hospitalToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
