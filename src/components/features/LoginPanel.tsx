import React, { useState } from "react";
import Header from "../Header";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import Swal from "sweetalert2";

export default function LoginPanel() {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  const [formData, setFormData] = useState({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );

      checkAuthStatus();
      navigate("/");
    } catch (error: any) {
      console.error("There was a problem with login", error);

      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Nieprawidłowe dane",
          text: "Adres e-mail lub hasło są niepoprawne. Spróbuj ponownie.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Błąd serwera",
          text: "Wystąpił problem podczas logowania. Spróbuj ponownie później.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return (
    <div className="login-section">
      <Header />
      <div className="login-container flex items-center flex-col">
        <form className="flex items-center flex-col" onSubmit={handleLogin}>
          <p className="text-2xl mt-8 mb-12">Zaloguj się</p>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            className="inputMain mb-8"
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Hasło"
            className="inputMain mb-7"
            onChange={handleLoginChange}
            required
          />
          <button className="button-red px-14 py-2 mb-12 mt-8" type="submit">
            Zaloguj się
          </button>
        </form>
        Nie masz jeszcze konta w serwisie filmCritix?
        <NavLink to="/registerPanel">
          <p className="italic">Zarejestruj się</p>
        </NavLink>
      </div>
    </div>
  );
}
