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
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <section className="space-y-6">
        <ProfileHeader />

        <div
          role="alert"
          className="
            rounded-xl
            border
            border-destructive/20
            bg-destructive/5
            p-5
          "
        >
          <p className="text-sm font-medium text-destructive">
            Profil bilgileri yüklenemedi.
          </p>

          {error && (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {error}
            </p>
          )}
        </div>
      </section>
    );
  }

  const fullName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <ProfileHeader />

        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => {
            setUpdateError(null);
            setSuccessMessage(null);
            setIsEditDialogOpen(true);
          }}
        >
          <Pencil className="size-4" />
          Profili Düzenle
        </Button>
      </div>

      {successMessage && (
        <div
          role="status"
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-primary/20
            bg-primary/5
            px-4
            py-3.5
          "
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

          <p className="text-sm leading-5 text-foreground">{successMessage}</p>
        </div>
      )}

      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-card
          shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-border
            bg-muted/20
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:px-6
          "
        >
          <div
            className="
              flex
              size-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >
            <UserRound className="size-6" />
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-lg font-semibold tracking-tight text-foreground">
              {fullName || "Kullanıcı"}
            </h2>

            <p className="mt-1 break-all text-sm text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Kişisel Bilgiler
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Hesabınızla ilişkili temel kişisel bilgiler.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProfileField
              icon={UserRound}
              label="Ad"
              value={profile.firstName}
            />

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

            <ProfileField
              icon={Mail}
              label="E-posta"
              value={profile.email}
              secondary="E-posta adresi profil ekranından değiştirilemez."
            />
          </div>
        </div>
      </section>

      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-card
          shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        "
      >
        <div className="border-b border-border px-5 py-5 sm:px-6">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Hesap Bilgileri
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Hesabınızın sistem ve kayıt bilgileri.
          </p>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
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
    </section>
  );
}

function ProfileHeader() {
  return (
    <header className="max-w-2xl">
      <p className="text-sm font-semibold tracking-tight text-primary">Hesap</p>

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
        Profilim
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Kişisel bilgilerinizi görüntüleyin ve güncelleyin.
      </p>
    </header>
  );
}

type ProfileFieldProps = {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
  secondary?: string;
};

function ProfileField({
  icon: Icon,
  label,
  value,
  secondary,
}: ProfileFieldProps) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-3
        rounded-xl
        border
        border-border/70
        bg-muted/30
        p-4
      "
    >
      <div
        className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-card
          text-primary
          shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        "
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-foreground">
          {value}
        </p>

        {secondary && (
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {secondary}
          </p>
        )}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />

        <div className="h-8 w-44 animate-pulse rounded-md bg-muted" />

        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-card
        "
      >
        <div className="flex items-center gap-4 border-b border-border bg-muted/20 p-5 sm:p-6">
          <div className="size-12 animate-pulse rounded-xl bg-muted" />

          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />

            <div className="h-4 w-52 animate-pulse rounded-md bg-muted" />
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>

      <div
        className="
          rounded-xl
          border
          border-border
          bg-card
          p-5
          sm:p-6
        "
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
