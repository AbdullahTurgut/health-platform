import { useState, type FormEvent } from "react";

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

import {
  buildUpdateProfilePayload,
  getTodayLocalDateValue,
  isFutureDate,
  isValidProfileName,
  PROFILE_NAME_MAX_LENGTH,
} from "@/lib/profile";

import type {
  ProfileFormValues,
  ProfileUser,
  UpdateProfileRequest,
} from "@/types/user";

type Props = {
  open: boolean;
  profile: ProfileUser;
  isSubmitting: boolean;
  error: string | null;

  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: UpdateProfileRequest) => Promise<void>;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

export default function EditProfileDialog({
  open,
  profile,
  isSubmitting,
  error,
  onOpenChange,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    dateOfBirth: profile.dateOfBirth ?? "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!isValidProfileName(values.firstName)) {
      nextErrors.firstName =
        values.firstName.trim().length === 0
          ? "Ad zorunludur."
          : "Ad en fazla 100 karakter olabilir.";
    }

    if (!isValidProfileName(values.lastName)) {
      nextErrors.lastName =
        values.lastName.trim().length === 0
          ? "Soyad zorunludur."
          : "Soyad en fazla 100 karakter olabilir.";
    }

    if (values.dateOfBirth && isFutureDate(values.dateOfBirth)) {
      nextErrors.dateOfBirth = "Doğum tarihi gelecekte olamaz.";
    }

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!validate()) {
      return;
    }

    const payload = buildUpdateProfilePayload(values);

    await onSubmit(payload);
  };

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
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Profili Düzenle</DialogTitle>

            <DialogDescription>
              Kişisel bilgilerinizi güncelleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="profile-first-name">Ad</Label>

              <Input
                id="profile-first-name"
                value={values.firstName}
                maxLength={PROFILE_NAME_MAX_LENGTH}
                disabled={isSubmitting}
                autoComplete="given-name"
                onChange={(event) => {
                  setValues((current) => ({
                    ...current,
                    firstName: event.target.value,
                  }));

                  if (formErrors.firstName) {
                    setFormErrors((current) => ({
                      ...current,
                      firstName: undefined,
                    }));
                  }
                }}
              />

              {formErrors.firstName && (
                <p role="alert" className="text-sm text-destructive">
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-last-name">Soyad</Label>

              <Input
                id="profile-last-name"
                value={values.lastName}
                maxLength={PROFILE_NAME_MAX_LENGTH}
                disabled={isSubmitting}
                autoComplete="family-name"
                onChange={(event) => {
                  setValues((current) => ({
                    ...current,
                    lastName: event.target.value,
                  }));

                  if (formErrors.lastName) {
                    setFormErrors((current) => ({
                      ...current,
                      lastName: undefined,
                    }));
                  }
                }}
              />

              {formErrors.lastName && (
                <p role="alert" className="text-sm text-destructive">
                  {formErrors.lastName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-date-of-birth">Doğum Tarihi</Label>

              <Input
                id="profile-date-of-birth"
                type="date"
                value={values.dateOfBirth}
                max={getTodayLocalDateValue()}
                disabled={isSubmitting}
                onChange={(event) => {
                  setValues((current) => ({
                    ...current,
                    dateOfBirth: event.target.value,
                  }));

                  if (formErrors.dateOfBirth) {
                    setFormErrors((current) => ({
                      ...current,
                      dateOfBirth: undefined,
                    }));
                  }
                }}
              />

              {formErrors.dateOfBirth && (
                <p role="alert" className="text-sm text-destructive">
                  {formErrors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">E-posta</Label>

              <Input
                id="profile-email"
                type="email"
                value={profile.email}
                disabled
                readOnly
              />

              <p className="text-xs text-muted-foreground">
                E-posta adresi bu ekrandan değiştirilemez.
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
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
              İptal
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
