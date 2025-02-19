import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState(null); // 'user' or 'seller'
  const [sellerName, setSellerName] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const email = localStorage.getItem('userEmail');
    
    if (token) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      setUserEmail(email);
      
      // Fetch seller details if user is a seller
      if (storedUserType === 'seller') {
        const fetchSellerDetails = async () => {
          try {
            console.log('Fetching seller details for email:', email);
            const response = await fetch(`http://localhost:3002/serviceProviders/email/${email}`);


            const data = await response.json();
            console.log('Seller details response:', data);
            if (data.success) {
              console.log('Setting seller name:', data.seller.name);
              setSellerName(data.seller.name);
            } else {
              console.error('Failed to fetch seller details:', data);
            }

          } catch (error) {
            console.error('Error fetching seller details:', error);
          }
        };
        fetchSellerDetails();
      }
    }

  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated,
      userEmail, 
      setUserEmail,
      userType,
      setUserType,
      sellerName,
      setSellerName

    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>  useContext(AuthContext) ;
