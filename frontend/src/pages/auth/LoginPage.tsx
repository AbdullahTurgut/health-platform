import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tr } from "@/i18n/tr";
import { getApiErrorMessage } from "@/api/apiError";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login as loginRequest } from "@/services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await loginRequest({
        email: email.trim(),
        password,
      });

      login(response);

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
        <p className="text-sm font-medium text-primary">{tr.common.appName}</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Hoş geldiniz
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sağlık kayıtlarınıza erişmek için giriş yapın.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            required
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
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hesabınız yok mu?{" "}
        <Link
          to="/register"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Kayıt Ol
        </Link>
      </p>
    </section>
  );
}
