import React, { useState } from "react";
import Header from "../Header";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { response } from "express";
import Swal from "sweetalert2";
export default function RegisterPanel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
    } catch (error: any) {
      if (error.response) {
        console.error(`Server error ${error.response.data}`);
      } else if (error.request) {
        console.error(`No response received ${error.request}`);
      } else {
        console.error("Error setting up request", error.message);
      }
    }

    Swal.fire({
      title: "Twoje konto zostało zarejestrowane.",
      text: "Życzymy miłego korzystania z aplikacji!",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Przejdź do logowania",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/loginPanel");
      }
    });

    console.log(`User has been register`);
  };

  return (
    <>
      <div className="login-section">
        <Header />
        <div className="login-container flex items-center flex-col">
          <form className="flex items-center flex-col" onSubmit={formSubmit}>
            <p className="text-2xl mt-8 mb-12">Rejestracja</p>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleRegisterChange}
              className="inputMain mb-7"
              placeholder="E-mail"
            />
            <input
              type="text"
              id="login"
              name="login"
              onChange={handleRegisterChange}
              className="inputMain mb-7"
              placeholder="Login"
            />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleRegisterChange}
              className="inputMain mb-7"
              placeholder="Hasło"
            />
            <input
              className="inputMain mb-7"
              type="text"
              id="name"
              name="name"
              onChange={handleRegisterChange}
              placeholder="Imie"
            />
            <input
              className="inputMain mb-7"
              type="text"
              id="surname"
              onChange={handleRegisterChange}
              name="surname"
              placeholder="Nazwisko"
            />
            <input
              className="inputMain mb-7"
              type="text"
              id="phone"
              name="phone"
              onChange={handleRegisterChange}
              placeholder="Telefon"
            />

            <button className="button-red px-14 py-2 mb-12 mt-8" type="submit">
              Zarejestruj się
            </button>
          </form>
          masz już konto w serwisie filmCritix?
          <NavLink to="/loginpanel">
            <p className="italic">Zaloguj się</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
