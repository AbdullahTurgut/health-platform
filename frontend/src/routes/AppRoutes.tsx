import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/auth/ProtectedRoute";
import PublicOnlyRoute from "@/auth/PublicOnlyRoute";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import DiseasesPage from "@/pages/diseases/DiseasesPage";
import DoctorsPage from "@/pages/doctors/DoctorsPage";
import HospitalsPage from "@/pages/hospitals/HospitalsPage";
import VisitsPage from "@/pages/visits/VisitsPage";
import MedicalTestsPage from "@/pages/medicalTests/MedicalTestsPage";
import ImagingPage from "@/pages/imaging/ImagingPage";
import MedicalDocumentsPage from "@/pages/documents/MedicalDocumentsPage";
import MedicationPage from "@/pages/medications/MedicationPage";
import TimelinePage from "@/pages/timeline/TimelinePage";
import SearchPage from "@/pages/search/SearchPage";
import ProfilePage from "@/pages/profile/ProfilePage";

import NotFoundPage from "@/pages/NotFoundPage";

import RootRedirect from "@/routes/RootRedirect";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/timeline" element={<TimelinePage />} />

          <Route path="/search" element={<SearchPage />} />

          <Route path="/diseases" element={<DiseasesPage />} />

          <Route path="/doctors" element={<DoctorsPage />} />

          <Route path="/hospitals" element={<HospitalsPage />} />

          <Route path="/visits" element={<VisitsPage />} />

          <Route path="/tests" element={<MedicalTestsPage />} />

          <Route path="/imaging" element={<ImagingPage />} />

          <Route path="/documents" element={<MedicalDocumentsPage />} />

          <Route path="/medications" element={<MedicationPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/" element={<RootRedirect />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
