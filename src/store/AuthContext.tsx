import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

type Review = {
  _id: string;
  filmName: string;
  description: string;
  genre: string;
  review: string;
  file: string;
};
interface AuthContextType {
  isLoggedIn: boolean;
  czyAdmin: boolean;
  login: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  reviews: Review[];
  isLoadingReviews: boolean;
  isAuthLoading: boolean;
  fetchReviews: () => Promise<void>;
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
  reviews: [],
  isLoadingReviews: true,
  isAuthLoading: true,
  fetchReviews: async () => {},
  checkAuthStatus: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [czyAdmin, setCzyAdmin] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  //recenzje
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const checkAuthStatus = async () => {
    setIsAuthLoading(true);
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
    } finally {
      setIsAuthLoading(false);
    }
  };
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const response = await axios.get("http://localhost:5000/api/showReviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Nie udało się pobrać recenzji", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    fetchReviews();
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
        reviews,
        isLoadingReviews,
        isAuthLoading,
        fetchReviews,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
