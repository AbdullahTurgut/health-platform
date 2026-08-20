import { HeartPulse, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { healthNavigation, mainNavigation } from "@/config/navigation";
import { tr } from "@/i18n/tr";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const { user, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background lg:flex lg:flex-col">
        <SidebarContent email={user?.email} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[88vw] max-w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>{tr.common.appName} Navigasyonu</SheetTitle>
          </SheetHeader>

          <SidebarContent
            email={user?.email}
            onLogout={handleLogout}
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Navigasyonu aç"
          >
            <Menu />
          </Button>

          <div className="flex items-center gap-2 lg:hidden">
            <HeartPulse className="size-5 text-primary" />

            <span className="font-semibold">{tr.common.appName}</span>
          </div>

          <div className="ml-auto hidden lg:block">
            <p className="text-xs text-muted-foreground">
              {tr.common.personalHealthRecord}
            </p>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

type SidebarContentProps = {
  email?: string;
  onLogout: () => void;
  onNavigate?: () => void;
};

function SidebarContent({ email, onLogout, onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <HeartPulse className="size-5" />
        </div>

        <div>
          <p className="font-semibold">{tr.common.appName}</p>

          <p className="text-xs text-muted-foreground">
            {tr.common.personalHealthRecord}
          </p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {tr.navigationSections.main}
        </p>

        <div className="space-y-1">
          {mainNavigation.map((item) => (
            <SidebarLink key={item.to} {...item} onNavigate={onNavigate} />
          ))}
        </div>

        <p className="mb-2 mt-7 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {tr.navigationSections.healthRecords}
        </p>

        <div className="space-y-1">
          {healthNavigation.map((item) => (
            <SidebarLink key={item.to} {...item} onNavigate={onNavigate} />
          ))}
        </div>
      </nav>

      <Separator />

      <div className="p-4">
        <div className="rounded-xl bg-muted/50 p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{email}</p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {tr.common.personalAccount}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start"
            onClick={onLogout}
          >
            <LogOut className="size-4" />
            {tr.common.logout}
          </Button>
        </div>
      </div>
    </div>
  );
}

type SidebarLinkProps = {
  label: string;
  to: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  onNavigate?: () => void;
};

function SidebarLink({ label, to, icon: Icon, onNavigate }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </NavLink>
  );
}
