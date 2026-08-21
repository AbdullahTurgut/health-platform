import { useState, type FormEvent } from "react";

import { getApiErrorMessage } from "@/api/apiError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { tr } from "@/i18n/tr";
import type { Doctor, UpdateDoctorRequest } from "@/types/doctor";

type EditDoctorDialogProps = {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (doctorId: string, payload: UpdateDoctorRequest) => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

export default function EditDoctorDialog({
  doctor,
  open,
  onOpenChange,
  onUpdated,
}: EditDoctorDialogProps) {
  const [firstName, setFirstName] = useState(doctor?.firstName ?? "");

  const [lastName, setLastName] = useState(doctor?.lastName ?? "");

  const [specialization, setSpecialization] = useState(
    doctor?.specialization ?? "",
  );

  const [phone, setPhone] = useState(doctor?.phone ?? "");

  const [email, setEmail] = useState(doctor?.email ?? "");

  const [notes, setNotes] = useState(doctor?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!doctor) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateDoctorRequest = {
        firstName: firstName.trim(),

        lastName: lastName.trim(),

        specialization: emptyToNull(specialization),

        phone: emptyToNull(phone),

        email: emptyToNull(email),

        notes: emptyToNull(notes),
      };

      await onUpdated(doctor.id, payload);

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tr.doctors.editTitle}</DialogTitle>

          <DialogDescription>{tr.doctors.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-doctor-first-name">
                {tr.doctors.firstName}
              </Label>

              <Input
                id="edit-doctor-first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                maxLength={100}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-doctor-last-name">
                {tr.doctors.lastName}
              </Label>

              <Input
                id="edit-doctor-last-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                maxLength={100}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-specialization">
              {tr.doctors.specialization}
            </Label>

            <Input
              id="edit-doctor-specialization"
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-phone">{tr.doctors.phone}</Label>

            <Input
              id="edit-doctor-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-email">{tr.doctors.email}</Label>

            <Input
              id="edit-doctor-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={255}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-notes">{tr.doctors.notes}</Label>

            <Textarea
              id="edit-doctor-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={5000}
              rows={5}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              {tr.doctors.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.doctors.updating : tr.doctors.saveChanges}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
