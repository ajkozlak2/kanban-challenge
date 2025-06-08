import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Adjust the path as necessary

interface ProtectedRouteProps {
  element: JSX.Element; // The component to render if authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return Auth.loggedIn() ? element : <Navigate to="/login" />; // Redirect if not logged in
};

export default ProtectedRoute;