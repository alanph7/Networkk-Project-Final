import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userType, setUserType } = useAuth();
  const location = useLocation();
  const storedUserType = localStorage.getItem('userType');
  

  useEffect(() => {
    if (storedUserType && !userType) {
      setUserType(storedUserType);
    }
  }, [setUserType, userType, storedUserType]);

  if (!storedUserType) {
    return <Navigate to="/" state={{from:location}} replace />;
  }

  if (!allowedRoles.includes(storedUserType)) {
    // Redirect based on user type
    switch (storedUserType) {
      case 'admin':
        return <Navigate to="/admin-home" />;
      case 'seller':
        return <Navigate to="/seller-dash" />;
      case 'user':
        return <Navigate to="/user-dash" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return children;
};