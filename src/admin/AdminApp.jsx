import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import AdminLogin from './pages/Login/AdminLogin';

// Lazy loading des composants pour optimiser les performances
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PropertiesList = lazy(() => import('./pages/Properties/PropertiesList'));
const PurchasedProperties = lazy(() => import('./pages/Properties/PurchasedProperties'));
const SoldProperties = lazy(() => import('./pages/Properties/SoldProperties'));
const ProcessProperties = lazy(() => import('./pages/Properties/ProcessProperties'));
const UsersList = lazy(() => import('./pages/Users/UsersList'));
const ContactsList = lazy(() => import('./pages/Contacts/ContactsList'));
const TransactionsList = lazy(() => import('./pages/Transactions/TransactionsList'));
const StatisticsPage = lazy(() => import('./pages/Statistics/StatisticsPage'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));

import { ADMIN_ROUTES } from './config/adminRoutes';

// Composant de chargement
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

const AdminApp = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="dashboard" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          } />
          
          {/* Properties Routes */}
          <Route path="properties" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PropertiesList />
            </Suspense>
          } />
          <Route path="properties/purchased" element={
            <Suspense fallback={<LoadingSpinner />}>
              <PurchasedProperties />
            </Suspense>
          } />
          <Route path="properties/sold" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SoldProperties />
            </Suspense>
          } />
          <Route path="properties/process" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProcessProperties />
            </Suspense>
          } />
          
          {/* Other Routes */}
          <Route path="users" element={
            <Suspense fallback={<LoadingSpinner />}>
              <UsersList />
            </Suspense>
          } />
          <Route path="contacts" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ContactsList />
            </Suspense>
          } />
          <Route path="transactions" element={
            <Suspense fallback={<LoadingSpinner />}>
              <TransactionsList />
            </Suspense>
          } />
          <Route path="analytics" element={
            <Suspense fallback={<LoadingSpinner />}>
              <StatisticsPage />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SettingsPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminApp;
