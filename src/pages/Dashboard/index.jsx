import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import PropertiesManagement from './pages/PropertiesManagement';
import UsersManagement from './pages/UsersManagement';
import NotificationsManagement from './pages/NotificationsManagement';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/properties" element={<PropertiesManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/notifications" element={<NotificationsManagement />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
