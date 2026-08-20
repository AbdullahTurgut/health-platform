import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>

        <Link
          to="/"
          className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
