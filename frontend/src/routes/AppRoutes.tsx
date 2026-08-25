import { Route, Routes } from "react-router-dom";
import { tr } from "@/i18n/tr";
import ProtectedRoute from "@/auth/ProtectedRoute";
import PublicOnlyRoute from "@/auth/PublicOnlyRoute";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import RootRedirect from "@/routes/RootRedirect";
import PlaceholderPage from "@/pages/PlaceholderPage";
import DiseasesPage from "@/pages/diseases/DiseasesPage";
import DoctorsPage from "@/pages/doctors/DoctorsPage";
import HospitalsPage from "@/pages/hospitals/HospitalsPage";
import VisitsPage from "@/pages/visits/VisitsPage";
import MedicalTestsPage from "@/pages/medicalTests/MedicalTestsPage";
import ImagingPage from "@/pages/imaging/ImagingPage";
import MedicalDocumentsPage from "@/pages/documents/MedicalDocumentsPage";
import MedicationPage from "@/pages/medications/MedicationPage";

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

          <Route
            path="/timeline"
            element={
              <PlaceholderPage
                title={tr.timeline.title}
                description={tr.timeline.description}
              />
            }
          />

          <Route
            path="/search"
            element={
              <PlaceholderPage
                title={tr.search.title}
                description={tr.search.description}
              />
            }
          />

          <Route path="/diseases" element={<DiseasesPage />} />

          <Route path="/doctors" element={<DoctorsPage />} />

          <Route path="/hospitals" element={<HospitalsPage />} />

          <Route path="/visits" element={<VisitsPage />} />

          <Route
            path="/visits"
            element={
              <PlaceholderPage
                title={tr.visits.title}
                description={tr.visits.description}
              />
            }
          />

          <Route path="/tests" element={<MedicalTestsPage />} />

          <Route path="/imaging" element={<ImagingPage />} />

          <Route path="/documents" element={<MedicalDocumentsPage />} />

          <Route path="/medications" element={<MedicationPage />} />
        </Route>
      </Route>

      <Route path="/" element={<RootRedirect />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
