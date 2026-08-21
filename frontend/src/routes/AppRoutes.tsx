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

          <Route
            path="/visits"
            element={
              <PlaceholderPage
                title={tr.visits.title}
                description={tr.visits.description}
              />
            }
          />

          <Route
            path="/tests"
            element={
              <PlaceholderPage
                title={tr.tests.title}
                description={tr.tests.description}
              />
            }
          />

          <Route
            path="/imaging"
            element={
              <PlaceholderPage
                title={tr.imaging.title}
                description={tr.imaging.description}
              />
            }
          />

          <Route
            path="/documents"
            element={
              <PlaceholderPage
                title={tr.documents.title}
                description={tr.documents.description}
              />
            }
          />

          <Route
            path="/medications"
            element={
              <PlaceholderPage
                title={tr.medications.title}
                description={tr.medications.description}
              />
            }
          />
        </Route>
      </Route>

      <Route path="/" element={<RootRedirect />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
