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
import type { Hospital, UpdateHospitalRequest } from "@/types/hospital";

type EditHospitalDialogProps = {
  hospital: Hospital | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (
    hospitalId: string,
    payload: UpdateHospitalRequest,
  ) => Promise<void>;
};

function emptyToNull(value: string): string | null {
  const normalized = value.trim();

  return normalized || null;
}

export default function EditHospitalDialog({
  hospital,
  open,
  onOpenChange,
  onUpdated,
}: EditHospitalDialogProps) {
  const [name, setName] = useState(hospital?.name ?? "");

  const [city, setCity] = useState(hospital?.city ?? "");

  const [address, setAddress] = useState(hospital?.address ?? "");

  const [phone, setPhone] = useState(hospital?.phone ?? "");

  const [notes, setNotes] = useState(hospital?.notes ?? "");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hospital) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: UpdateHospitalRequest = {
        name: name.trim(),
        city: emptyToNull(city),
        address: emptyToNull(address),
        phone: emptyToNull(phone),
        notes: emptyToNull(notes),
      };

      await onUpdated(hospital.id, payload);

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
          <DialogTitle>{tr.hospitals.editTitle}</DialogTitle>

          <DialogDescription>{tr.hospitals.editDescription}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-hospital-name">{tr.hospitals.name}</Label>

            <Input
              id="edit-hospital-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hospital-city">{tr.hospitals.city}</Label>

            <Input
              id="edit-hospital-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hospital-address">
              {tr.hospitals.address}
            </Label>

            <Textarea
              id="edit-hospital-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              maxLength={2000}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hospital-phone">{tr.hospitals.phone}</Label>

            <Input
              id="edit-hospital-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hospital-notes">{tr.hospitals.notes}</Label>

            <Textarea
              id="edit-hospital-notes"
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
              {tr.hospitals.cancel}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.hospitals.updating : tr.hospitals.saveChanges}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
