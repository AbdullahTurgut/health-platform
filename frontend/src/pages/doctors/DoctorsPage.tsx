import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { getApiErrorMessage } from "@/api/apiError";
import DoctorList from "@/components/doctors/DoctorList";
import { Button } from "@/components/ui/button";
import { tr } from "@/i18n/tr";
import type { Doctor, UpdateDoctorRequest } from "@/types/doctor";
import DoctorFilter from "@/components/doctors/DoctorFilter";
import {
  getDoctors,
  getDoctorsBySpecialization,
  updateDoctor,
} from "@/services/doctorService";
import CreateDoctorDialog from "@/components/doctors/CreateDoctorDialog";
import EditDoctorDialog from "@/components/doctors/EditDoctorDialog";
import DeleteDoctorDialog from "@/components/doctors/DeleteDoctorDialog";

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

  function handleApplyFilter(specialization: string) {
    const normalizedSpecialization = specialization.trim();

    if (normalizedSpecialization === specializationFilter) {
      return;
    }

    setIsLoading(true);

    setSpecializationFilter(normalizedSpecialization);
  }

  function handleClearFilter() {
    setIsLoading(true);
    setSpecializationFilter("");
  }
  if (isLoading) {
    return <DoctorsLoading />;
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

  async function refreshDoctors() {
    const response = specializationFilter
      ? await getDoctorsBySpecialization(specializationFilter)
      : await getDoctors();

    setDoctors(response);
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

  if (error) {
    return (
      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h1 className="font-semibold text-destructive">
          {tr.doctors.loadError}
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
            {tr.doctors.eyebrow}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {tr.doctors.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {tr.doctors.description}
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          {tr.doctors.add}
        </Button>
      </div>

      <div className="mt-8">
        <DoctorFilter
          value={specializationFilter}
          onApply={handleApplyFilter}
          onClear={handleClearFilter}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6">
        <DoctorList
          doctors={doctors}
          isFiltered={Boolean(specializationFilter)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
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
