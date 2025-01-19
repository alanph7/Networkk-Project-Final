import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState(null); // 'user' or 'seller'

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const email = localStorage.getItem('userEmail');
    
    if (token) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      setUserEmail(email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated,
      userEmail, 
      setUserEmail,
      userType,
      setUserType
    }}>
      {children}
    </AuthContext.Provider>
  );
};