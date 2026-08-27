import { HeartPulse, LogOut, Menu } from "lucide-react";
import { useState, type ComponentType } from "react";
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
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="
          fixed
          top-3
          left-3
          z-[100]
          -translate-y-20
          rounded-lg
          bg-primary
          px-4
          py-2
          text-sm
          font-medium
          text-primary-foreground
          shadow-lg
          transition-transform
          duration-150
          focus:translate-y-0
        "
      >
        Ana içeriğe geç
      </a>

      {/* Desktop Sidebar */}
      <aside
        aria-label="Ana navigasyon"
        className="
          fixed
          inset-y-0
          left-0
          z-30
          hidden
          w-64
          border-r
          border-sidebar-border
          bg-sidebar
          lg:flex
          lg:flex-col
        "
      >
        <SidebarContent email={user?.email} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="left"
          className="
            w-[88vw]
            max-w-72
            border-r
            border-sidebar-border
            bg-sidebar
            p-0
          "
        >
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

      <div className="min-w-0 lg:pl-64">
        <header
          className="
            sticky
            top-0
            z-20
            flex
            h-16
            min-w-0
            items-center
            border-b
            border-border/80
            bg-background/85
            px-4
            backdrop-blur-md
            supports-[backdrop-filter]:bg-background/75
            sm:px-6
            lg:px-8
          "
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              mr-3
              size-10
              shrink-0
              rounded-lg
              text-muted-foreground
              hover:bg-accent
              hover:text-accent-foreground
              lg:hidden
            "
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Navigasyonu aç"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>

          <div className="flex min-w-0 items-center gap-2.5 lg:hidden">
            <div
              className="
                flex
                size-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-primary/10
                text-primary
              "
              aria-hidden="true"
            >
              <HeartPulse className="size-4.5" />
            </div>

            <span className="truncate text-sm font-semibold tracking-tight">
              {tr.common.appName}
            </span>
          </div>

          <div className="ml-auto hidden items-center lg:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {tr.common.appName}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {tr.common.personalHealthRecord}
              </p>
            </div>
          </div>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="
            mx-auto
            w-full
            min-w-0
            max-w-[1600px]
            px-4
            py-6
            sm:px-6
            lg:px-8
            lg:py-8
          "
        >
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
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div
        className="
          flex
          h-20
          shrink-0
          items-center
          gap-3
          px-5
        "
      >
        <div
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary
            text-primary-foreground
            shadow-sm
          "
          aria-hidden="true"
        >
          <HeartPulse className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
            {tr.common.appName}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {tr.common.personalHealthRecord}
          </p>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav
        aria-label="Uygulama menüsü"
        className="
          flex-1
          overflow-y-auto
          overscroll-contain
          px-3
          py-5
        "
      >
        <NavigationSection
          label={tr.navigationSections.main}
          items={mainNavigation}
          onNavigate={onNavigate}
        />

        <NavigationSection
          label={tr.navigationSections.healthRecords}
          items={healthNavigation}
          onNavigate={onNavigate}
          className="mt-7"
        />
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="shrink-0 p-3">
        <div
          className="
            rounded-xl
            border
            border-sidebar-border
            bg-card/70
            p-3
          "
        >
          <div className="min-w-0 px-1">
            <p
              className="
                truncate
                text-sm
                font-medium
                text-foreground
              "
              title={email}
            >
              {email ?? "—"}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {tr.common.personalAccount}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="
              mt-3
              min-h-10
              w-full
              justify-start
              rounded-lg
              text-muted-foreground
              hover:bg-destructive/10
              hover:text-destructive
            "
            onClick={onLogout}
          >
            <LogOut className="size-4" aria-hidden="true" />

            {tr.common.logout}
          </Button>
        </div>
      </div>
    </div>
  );
}

type NavigationItem = {
  label: string;
  to: string;
  icon: ComponentType<{
    className?: string;
  }>;
};

type NavigationSectionProps = {
  label: string;
  items: NavigationItem[];
  onNavigate?: () => void;
  className?: string;
};

function NavigationSection({
  label,
  items,
  onNavigate,
  className,
}: NavigationSectionProps) {
  return (
    <div className={className}>
      <p
        className="
          mb-2
          px-3
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-muted-foreground/80
        "
      >
        {label}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <SidebarLink key={item.to} {...item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

type SidebarLinkProps = {
  label: string;
  to: string;
  icon: ComponentType<{
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
          `
            group
            flex
            min-h-10
            items-center
            gap-3
            rounded-lg
            px-3
            py-2.5
            text-sm
            font-medium
            transition-[color,background-color]
            duration-150
            focus-visible:outline-none
            focus-visible:ring-3
            focus-visible:ring-sidebar-ring/20
          `,
          isActive
            ? `
                bg-sidebar-accent
                text-sidebar-accent-foreground
              `
            : `
                text-muted-foreground
                hover:bg-sidebar-accent/60
                hover:text-sidebar-foreground
              `,
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 transition-colors duration-150",
              isActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-sidebar-foreground",
            )}
          />

          <span className="truncate">{label}</span>

          {isActive && <span className="sr-only">, mevcut sayfa</span>}
        </>
      )}
    </NavLink>
  );
}
