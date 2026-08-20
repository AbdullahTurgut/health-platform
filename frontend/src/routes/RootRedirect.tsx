import { Navigate } from "react-router-dom";

import { useAuth } from "@/auth/useAuth";

export default function RootRedirect() {
  const { isAuthenticated } = useAuth();

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}
