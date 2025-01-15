import React from "react";
import Header from "../Header";
import { NavLink } from "react-router-dom";

export default function LoginPanel() {
  return (
    <div className="login-section">
      <Header />
      <div className="login-container flex items-center flex-col">
        <p className="text-2xl mt-8 mb-12">Zaloguj się</p>
        <input type="text" placeholder="E-mail" className="inputMain mb-8" />
        <input type="text" placeholder="Hasło" className="inputMain mb-7" />
        <button className="button-red px-14 py-2 mb-12 mt-8">
          Zaloguj się
        </button>
        Nie masz jeszcze konta w serwisie filmCritix?
        <NavLink to="/registerPanel">
          {" "}
          <p className="italic">Zarejestruj się</p>
        </NavLink>
      </div>
    </div>
  );
}
