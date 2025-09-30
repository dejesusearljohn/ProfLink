import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, isStudent, isFaculty } = useAuth();

    // Check if user is authenticated
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Check role-based access if requiredRole is specified
    if (requiredRole) {
        if (requiredRole === 'student' && !isStudent()) {
            return <Navigate to="/login" replace />;
        }
        if (requiredRole === 'faculty' && !isFaculty()) {
            return <Navigate to="/login" replace />;
        }
    }

    // User is authenticated and has proper role, render the protected component
    return children;
};

export default ProtectedRoute;