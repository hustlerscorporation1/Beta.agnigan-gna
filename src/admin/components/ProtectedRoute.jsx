import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ADMIN_ROUTES } from '../config/adminRoutes';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
