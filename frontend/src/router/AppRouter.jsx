import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppShell from "../components/AppShell";
import SkeletonLoader from "../components/SkeletonLoader";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const FeedPage = lazy(() => import("../pages/FeedPage"));
const PetsPage = lazy(() => import("../pages/PetsPage"));
const LostPage = lazy(() => import("../pages/LostPage"));
const LostCasePage = lazy(() => import("../pages/LostCasePage"));
const AlertsPage = lazy(() => import("../pages/AlertsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

function PageLoading() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "640px", margin: "0 auto" }}>
      <SkeletonLoader count={2} height="140px" />
    </div>
  );
}

function AppRouter() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/lost" element={<LostPage />} />
          <Route path="/lost/:id" element={<LostCasePage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;