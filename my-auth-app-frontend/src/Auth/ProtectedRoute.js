import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../Config/axiosInstance';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axiosInstance.get('auth/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setIsValid(true);
        }
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
