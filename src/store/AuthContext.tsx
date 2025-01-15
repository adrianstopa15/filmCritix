import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean;
  czyAdmin: boolean;

  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  czyAdmin: false,
  checkAuthStatus: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [czyAdmin, setCzyAdmin] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });

      setIsLoggedIn(response.data.isLoggedIn);
      setCzyAdmin(response.data.czyAdmin);
    } catch (error) {
      setIsLoggedIn(false);
      setCzyAdmin(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, czyAdmin, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
