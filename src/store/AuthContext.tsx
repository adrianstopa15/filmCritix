import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean;
  czyAdmin: boolean;
  login: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  czyAdmin: false,
  login: "",
  email: "",
  name: "",
  surname: "",
  phone: "",
  checkAuthStatus: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [czyAdmin, setCzyAdmin] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  // const []
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });

      setIsLoggedIn(response.data.isLoggedIn);
      setCzyAdmin(response.data.czyAdmin);
      setLogin(response.data.login);
      setEmail(response.data.email);
      setName(response.data.name);
      setSurname(response.data.surname);
      setPhone(response.data.phone);
    } catch (error) {
      setIsLoggedIn(false);
      setCzyAdmin(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        czyAdmin,
        name,
        surname,
        phone,
        login,
        email,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
