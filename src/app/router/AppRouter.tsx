import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from '@app/router/AuthGuard';
import { MainLayout } from '@app/layout/MainLayout';
import { useAuth } from '@auth/AuthContext';

const Dashboard = lazy(() => import('@modules/analytics/components/Dashboard'));
const BookingsPage = lazy(() => import('@modules/bookings/components/BookingsPage'));
const TablesPage = lazy(() => import('@modules/tables/components/TablesPage'));
const CustomersPage = lazy(() => import('@modules/customers/components/CustomersPage'));
const SettingsPage = lazy(() => import('@modules/settings/components/SettingsPage'));
const UnauthorizedPage = lazy(() => import('@shared/components/UnauthorizedPage'));
const SwitchBranchPage = lazy(() => import('@shared/components/SwitchBranchPage'));

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard allowedRoles={['super_admin', 'branch_admin', 'staff']} requireBranch>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/bookings"
              element={
                <AuthGuard allowedRoles={['super_admin', 'branch_admin', 'staff']} requireBranch>
                  <BookingsPage />
                </AuthGuard>
              }
            />
            <Route
              path="/tables"
              element={
                <AuthGuard allowedRoles={['super_admin', 'branch_admin']} requireBranch>
                  <TablesPage />
                </AuthGuard>
              }
            />
            <Route
              path="/customers"
              element={
                <AuthGuard allowedRoles={['super_admin', 'branch_admin', 'staff']} requireBranch>
                  <CustomersPage />
                </AuthGuard>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AuthGuard allowedRoles={['super_admin', 'branch_admin']} requireBranch>
                  <SettingsPage />
                </AuthGuard>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/switch-branch"
              element={
                user?.role === 'super_admin' ? <SwitchBranchPage /> : <Navigate to="/" replace />
              }
            />
          </Route>
          <Route path="*" element={<div className="p-6">Page not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
