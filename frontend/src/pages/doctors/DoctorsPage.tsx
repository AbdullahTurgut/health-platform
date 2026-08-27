import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import CreateDoctorDialog from "@/components/doctors/CreateDoctorDialog";
import DeleteDoctorDialog from "@/components/doctors/DeleteDoctorDialog";
import DoctorFilter from "@/components/doctors/DoctorFilter";
import DoctorList from "@/components/doctors/DoctorList";
import EditDoctorDialog from "@/components/doctors/EditDoctorDialog";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import {
  getDoctors,
  getDoctorsBySpecialization,
  updateDoctor,
} from "@/services/doctorService";
import type { Doctor, UpdateDoctorRequest } from "@/types/doctor";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [specializationFilter, setSpecializationFilter] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchDoctors() {
      try {
        const response = specializationFilter
          ? await getDoctorsBySpecialization(specializationFilter)
          : await getDoctors();

        if (!isCancelled) {
          setDoctors(response);
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

    fetchDoctors();

    return () => {
      isCancelled = true;
    };
  }, [specializationFilter]);

  async function refreshDoctors() {
    const response = specializationFilter
      ? await getDoctorsBySpecialization(specializationFilter)
      : await getDoctors();

    setDoctors(response);
  }

  function handleApplyFilter(specialization: string) {
    const normalizedSpecialization = specialization.trim();

    if (normalizedSpecialization === specializationFilter) {
      return;
    }

    setIsLoading(true);
    setSpecializationFilter(normalizedSpecialization);
  }

  function handleClearFilter() {
    if (!specializationFilter) {
      return;
    }

    setIsLoading(true);
    setSpecializationFilter("");
  }

  async function handleCreated() {
    try {
      setIsLoading(true);
      setError(null);

      await refreshDoctors();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdated(doctorId: string, payload: UpdateDoctorRequest) {
    await updateDoctor(doctorId, payload);
    await refreshDoctors();
  }

  function handleEdit(doctor: Doctor) {
    setSelectedDoctor(doctor);
    setIsEditOpen(true);
  }

  function handleEditOpenChange(open: boolean) {
    setIsEditOpen(open);

    if (!open) {
      setSelectedDoctor(null);
    }
  }

  async function handleDeleted() {
    await refreshDoctors();
  }

  function handleDelete(doctor: Doctor) {
    setDoctorToDelete(doctor);
    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);

    if (!open) {
      setDoctorToDelete(null);
    }
  }

  if (isLoading) {
    return <DoctorsLoading />;
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
          {tr.doctors.eyebrow}
        </p>

        <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          {tr.doctors.loadError}
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
            {tr.doctors.eyebrow}
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
            {tr.doctors.title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {tr.doctors.description}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="size-4" />

          {tr.doctors.add}
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
        <DoctorFilter
          value={specializationFilter}
          onApply={handleApplyFilter}
          onClear={handleClearFilter}
          disabled={isLoading}
        />
      </div>

      <DoctorList
        doctors={doctors}
        isFiltered={Boolean(specializationFilter)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateDoctorDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreated={handleCreated}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id ?? "no-doctor"}
        doctor={selectedDoctor}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        onUpdated={handleUpdated}
      />

      <DeleteDoctorDialog
        key={doctorToDelete?.id ?? "no-delete-doctor"}
        doctor={doctorToDelete}
        open={isDeleteOpen}
        onOpenChange={handleDeleteOpenChange}
        onDeleted={handleDeleted}
      />
    </section>
  );
}

function DoctorsLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />

        <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />

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
              h-56
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
