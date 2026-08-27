import {
  Activity,
  Building2,
  CalendarDays,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Pill,
  ScanLine,
  Search,
  Stethoscope,
  TestTube2,
  UserRound,
} from "lucide-react";

import { tr } from "@/i18n/tr";

export const mainNavigation = [
  {
    label: tr.navigation.dashboard,
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: tr.navigation.timeline,
    to: "/timeline",
    icon: Activity,
  },
  {
    label: tr.navigation.search,
    to: "/search",
    icon: Search,
  },
  {
    label: tr.navigation.profile,
    to: "/profile",
    icon: UserRound,
  },
];

export const healthNavigation = [
  {
    label: tr.navigation.diseases,
    to: "/diseases",
    icon: HeartPulse,
  },
  {
    label: tr.navigation.doctors,
    to: "/doctors",
    icon: Stethoscope,
  },
  {
    label: tr.navigation.hospitals,
    to: "/hospitals",
    icon: Building2,
  },
  {
    label: tr.navigation.visits,
    to: "/visits",
    icon: CalendarDays,
  },
  {
    label: tr.navigation.tests,
    to: "/tests",
    icon: TestTube2,
  },
  {
    label: tr.navigation.imaging,
    to: "/imaging",
    icon: ScanLine,
  },
  {
    label: tr.navigation.documents,
    to: "/documents",
    icon: FileText,
  },
  {
    label: tr.navigation.medications,
    to: "/medications",
    icon: Pill,
  },
];
