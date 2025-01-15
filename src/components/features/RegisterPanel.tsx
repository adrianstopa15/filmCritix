import React from "react";
import Header from "../Header";
import { NavLink } from "react-router-dom";

export default function RegisterPanel() {
  return (
    <>
      <div className="login-section">
        <Header />
        <div className="login-container flex items-center flex-col">
          <p className="text-2xl mt-8 mb-12">Rejestracja</p>
          <input type="text" placeholder="E-mail" className="inputMain mb-8" />
          <input type="text" placeholder="Hasło" className="inputMain mb-8" />
          <input
            type="text"
            placeholder="Powtórz hasło"
            className="inputMain mb-7"
          />
          <button className="button-red px-14 py-2 mb-12 mt-8">
            Zarejestruj się
          </button>
          masz już konto w serwisie filmCritix?
          <NavLink to="/loginpanel">
            <p className="italic">Zaloguj się</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
