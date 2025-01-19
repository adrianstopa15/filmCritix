import React from "react";
import { useAuth } from "./store/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isLoggedIn, isAuthLoading, czyAdmin } = useAuth();
  if (isAuthLoading) {
    return <></>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (requireAdmin && !czyAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
