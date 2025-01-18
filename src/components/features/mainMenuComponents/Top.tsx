import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";
import avatarIcon from "../../../assets/profileAvatar.jpg";
export default function Top() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="top">
      <div className="top-container">
        <section className="navbar">
          <nav className="navbar-container">
            <p className="pNavbar text-xl md:text-2xl lg:text-4xl font-bold">
              Film<span className="text-red-500">Critix</span>
            </p>
            {!isLoggedIn ? (
              <NavLink to="/loginPanel">
                <button className="button-red font-bold px-4 py-2">
                  Zaloguj się
                </button>
              </NavLink>
            ) : (
              <NavLink to="/userPanel">
                <img src={avatarIcon} className="avatarIcon mr-4" />
              </NavLink>
            )}
          </nav>
        </section>
        <header className="header-main">
          <div
            className={`${
              !isLoggedIn ? "header-container" : "header-container--mini"
            } flex justify-center items-center text-center`}
          >
            {!isLoggedIn ? (
              <div className="header-textContainer">
                <h1 className="text-sm lg:text-2xl xl:text-5xl    font-extrabold tracking-wider md:leading-relaxed">
                  Propozycje filmowe, recenzje i wiele więcej bez ogarniczeń
                </h1>

                <p className="text-sm lg:text-xl mt-12 mb-4 xl:text-2xl text-gray-200">
                  Zaczynamy przeglądać? Wprowadź adres e‑mail, aby utworzyć
                  konto.
                </p>
                <div className="flex items-center justify-center">
                  <input
                    placeholder="Adres e-mail"
                    className="inputMain mr-8"
                  />
                  <NavLink to="/registerPanel">
                    <button className="button-red text-sm lg:text-2xl font-bold py-3 md:px-10">
                      Rozpocznij {">"}
                    </button>
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="header-textContainer"></div>
            )}
          </div>
        </header>
      </div>
    </section>
  );
}
