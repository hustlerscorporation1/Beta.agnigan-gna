import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import AdminLogin from './pages/Login/AdminLogin';
import Dashboard from './pages/Dashboard';
import PropertiesList from './pages/Properties/PropertiesList';
import UsersList from './pages/Users/UsersList';
import ContactsList from './pages/Contacts/ContactsList';
import TransactionsList from './pages/Transactions/TransactionsList';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import { ADMIN_ROUTES } from './config/adminRoutes';

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
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<PropertiesList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="contacts" element={<ContactsList />} />
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminApp;
