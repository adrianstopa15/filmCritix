import React, { useState } from "react";
import Header from "../Header";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";

export default function LoginPanel() {
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
    } catch (error) {
      console.error("There was problem with login user", error);
    }
    checkAuthStatus();
    console.log("User has been logged");
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
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Hasło"
            className="inputMain mb-7"
            onChange={handleLoginChange}
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
