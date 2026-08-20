import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/30 px-4 py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  );
}
