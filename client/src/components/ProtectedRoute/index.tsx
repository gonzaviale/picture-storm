import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const token = sessionStorage.getItem('token');

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;