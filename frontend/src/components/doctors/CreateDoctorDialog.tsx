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
import { createDoctor } from "@/services/doctorService";
import type { CreateDoctorRequest } from "@/types/doctor";

type CreateDoctorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

export default function CreateDoctorDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateDoctorDialogProps) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [specialization, setSpecialization] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setSpecialization("");
    setPhone("");
    setEmail("");
    setNotes("");
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isSubmitting) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CreateDoctorRequest = {
        firstName: firstName.trim(),

        lastName: lastName.trim(),

        specialization: emptyToNull(specialization),

        phone: emptyToNull(phone),

        email: emptyToNull(email),

        notes: emptyToNull(notes),
      };

      await createDoctor(payload);

      await onCreated();

      resetForm();

      onOpenChange(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tr.doctors.createTitle}</DialogTitle>

          <DialogDescription>{tr.doctors.createDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="doctor-first-name">{tr.doctors.firstName}</Label>

              <Input
                id="doctor-first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder={tr.doctors.firstNamePlaceholder}
                required
                maxLength={100}
                autoComplete="given-name"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor-last-name">{tr.doctors.lastName}</Label>

              <Input
                id="doctor-last-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder={tr.doctors.lastNamePlaceholder}
                required
                maxLength={100}
                autoComplete="family-name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-specialization">
              {tr.doctors.specialization}
            </Label>

            <Input
              id="doctor-specialization"
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
              placeholder={tr.doctors.specializationPlaceholder}
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-phone">{tr.doctors.phone}</Label>

            <Input
              id="doctor-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={tr.doctors.phonePlaceholder}
              maxLength={50}
              autoComplete="tel"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-email">{tr.doctors.email}</Label>

            <Input
              id="doctor-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={tr.doctors.emailPlaceholder}
              maxLength={255}
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-notes">{tr.doctors.notes}</Label>

            <Textarea
              id="doctor-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={tr.doctors.notesPlaceholder}
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
              onClick={() => handleOpenChange(false)}
            >
              {tr.doctors.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.doctors.saving : tr.doctors.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
