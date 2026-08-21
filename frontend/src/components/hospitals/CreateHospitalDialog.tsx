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
import { createHospital } from "@/services/hospitalService";
import type { CreateHospitalRequest } from "@/types/hospital";

type CreateHospitalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

export default function CreateHospitalDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateHospitalDialogProps) {
  const [name, setName] = useState("");

  const [city, setCity] = useState("");

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setCity("");
    setAddress("");
    setPhone("");
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

      const payload: CreateHospitalRequest = {
        name: name.trim(),

        city: emptyToNull(city),

        address: emptyToNull(address),

        phone: emptyToNull(phone),

        notes: emptyToNull(notes),
      };

      await createHospital(payload);

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
          <DialogTitle>{tr.hospitals.createTitle}</DialogTitle>

          <DialogDescription>
            {tr.hospitals.createDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="hospital-name">{tr.hospitals.name}</Label>

            <Input
              id="hospital-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={tr.hospitals.namePlaceholder}
              required
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-city">{tr.hospitals.city}</Label>

            <Input
              id="hospital-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={tr.hospitals.cityPlaceholder}
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-address">{tr.hospitals.address}</Label>

            <Textarea
              id="hospital-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder={tr.hospitals.addressPlaceholder}
              maxLength={2000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-phone">{tr.hospitals.phone}</Label>

            <Input
              id="hospital-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={tr.hospitals.phonePlaceholder}
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital-notes">{tr.hospitals.notes}</Label>

            <Textarea
              id="hospital-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={tr.hospitals.notesPlaceholder}
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
              {tr.hospitals.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.hospitals.saving : tr.hospitals.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
