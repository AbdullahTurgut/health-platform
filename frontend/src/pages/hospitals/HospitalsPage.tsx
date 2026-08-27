import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import CreateHospitalDialog from "@/components/hospitals/CreateHospitalDialog";
import DeleteHospitalDialog from "@/components/hospitals/DeleteHospitalDialog";
import EditHospitalDialog from "@/components/hospitals/EditHospitalDialog";
import HospitalCityFilter from "@/components/hospitals/HospitalCityFilter";
import HospitalList from "@/components/hospitals/HospitalList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import {
  getHospitals,
  getHospitalsByCity,
  updateHospital,
} from "@/services/hospitalService";
import type { Hospital, UpdateHospitalRequest } from "@/types/hospital";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cityFilter, setCityFilter] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedHospital, setSelectedHospital] =
    useState<Hospital | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [hospitalToDelete, setHospitalToDelete] =
    useState<Hospital | null>(null);

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

  async function refreshHospitals() {
    const response = cityFilter
      ? await getHospitalsByCity(cityFilter)
      : await getHospitals();

    setHospitals(response);
  }

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

  if (isLoading) {
    return <HospitalsLoading />;
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
          {tr.hospitals.eyebrow}
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          {tr.hospitals.loadError}
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
            {tr.hospitals.eyebrow}
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
            {tr.hospitals.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.hospitals.description}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="size-4" />

          {tr.hospitals.add}
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
        <HospitalCityFilter
          value={cityFilter}
          onApply={handleApplyCityFilter}
          onClear={handleClearCityFilter}
          disabled={isLoading}
        />
      </div>

      <HospitalList
        hospitals={hospitals}
        isFiltered={Boolean(cityFilter)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
    </section>
  );
}

function HospitalsLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />

        <div className="h-9 w-52 animate-pulse rounded-lg bg-muted" />

        <div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-muted" />
      </div>

      <div
        className="
          h-24
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
              h-64
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