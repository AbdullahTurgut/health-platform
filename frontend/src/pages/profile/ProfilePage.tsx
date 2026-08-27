import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Pencil,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { Button } from "@/components/ui/button";

import { getApiErrorMessage } from "@/api/apiError";

import { formatProfileDate, formatProfileTimestamp } from "@/lib/profile";

import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "@/services/userService";

import type { ProfileUser, UpdateProfileRequest } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [updateError, setUpdateError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCurrentUserProfile();

        if (!cancelled) {
          setProfile(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(getApiErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleUpdateProfile(payload: UpdateProfileRequest) {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setUpdateError(null);
      setSuccessMessage(null);

      const updatedProfile = await updateCurrentUserProfile(payload);

      setProfile(updatedProfile);

      setIsEditDialogOpen(false);

      setSuccessMessage("Profil bilgileri güncellendi.");
    } catch (error) {
      setUpdateError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="space-y-5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Hesap</p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Profilim
          </h1>
        </div>

        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive"
        >
          {error ?? "Profil bilgileri yüklenemedi."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Hesap</p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Profilim
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Kişisel bilgilerinizi görüntüleyin ve güncelleyin.
          </p>
        </div>

        <Button
          className="gap-2 sm:self-center"
          onClick={() => {
            setUpdateError(null);
            setSuccessMessage(null);
            setIsEditDialogOpen(true);
          }}
        >
          <Pencil className="size-4" />
          Profili Düzenle
        </Button>
      </header>

      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm"
        >
          {successMessage}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Hesabınızla ilişkili temel kişisel bilgiler.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          <ProfileField icon={UserRound} label="Ad" value={profile.firstName} />

          <ProfileField
            icon={UserRound}
            label="Soyad"
            value={profile.lastName}
          />

          <ProfileField
            icon={CalendarDays}
            label="Doğum Tarihi"
            value={formatProfileDate(profile.dateOfBirth)}
          />

          <ProfileField icon={Mail} label="E-posta" value={profile.email} />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">Hesap Bilgileri</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Hesabınızın sistem bilgileri.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          <ProfileField
            icon={CheckCircle2}
            label="Hesap Durumu"
            value={profile.enabled ? "Aktif" : "Pasif"}
          />

          <ProfileField
            icon={CalendarDays}
            label="Hesap Oluşturulma Tarihi"
            value={formatProfileTimestamp(profile.createdAt)}
          />

          <ProfileField
            icon={CalendarDays}
            label="Son Güncelleme"
            value={formatProfileTimestamp(profile.updatedAt)}
          />
        </div>
      </section>

      {isEditDialogOpen && (
        <EditProfileDialog
          key={`${profile.id}-${profile.updatedAt}`}
          open={isEditDialogOpen}
          profile={profile}
          isSubmitting={isSubmitting}
          error={updateError}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdateProfile}
        />
      )}
    </div>
  );
}

type ProfileFieldProps = {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
};

function ProfileField({ icon: Icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex gap-4 border-b p-6 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="mt-1 break-words font-medium">{value}</p>
      </div>
    </div>
  );
}
