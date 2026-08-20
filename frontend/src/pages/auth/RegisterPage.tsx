import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tr } from "@/i18n/tr";
import { getApiErrorMessage } from "@/api/apiError";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  login as loginRequest,
  register as registerRequest,
} from "@/services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError(tr.auth.passwordMismatch);

      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim();

      await registerRequest({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        password,
      });

      const authResponse = await loginRequest({
        email: normalizedEmail,
        password,
      });

      login(authResponse);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Health Platform</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Hesap Oluştur
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Kişisel sağlık kayıtlarınızı düzenlemeye başlayın.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Ad</Label>

            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Soyad</Label>

            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Şifre</Label>

          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Şifre Onayı</Label>

          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={isSubmitting}
            required
            minLength={8}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Zaten bir hesabınız var mı?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Giriş Yap
        </Link>
      </p>
    </section>
  );
}
