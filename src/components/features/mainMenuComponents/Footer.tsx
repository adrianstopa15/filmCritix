import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <section className="top">
      <div className="top-container">
        <section className="navbar">
          <nav className="navbar-container">
            <p className="pNavbar text-2xl lg:text-4xl font-bold">
              Film<span className="text-red-500">Critix</span>
            </p>
            <NavLink to="/loginPanel">
              <button className="button-red font-bold px-4 py-2">
                Zaloguj się
              </button>
            </NavLink>
          </nav>
        </section>
        <header className="header-main">
          <header className="header-container flex justify-center items-center text-center">
            <div className="header-textContainer">
              <h1 className="text-3xl font-extrabold tracking-wider md:leading-relaxed md:text-7xl">
                Propozycje filmowe, recenzje i wiele więcej bez ogarniczeń
              </h1>

              <p className="text-xl mt-12 mb-4 md:text-2xl text-gray-200">
                Zaczynamy przeglądać? Wprowadź adres e‑mail, aby utworzyć konto.
              </p>
              <div className="flex items-center justify-center">
                <input placeholder="Adres e-mail" className="inputMain mr-8" />
                <NavLink to="/registerPanel">
                  <button className="button-red font-bold py-3 px-10 text-2xl">
                    Rozpocznij {">"}
                  </button>
                </NavLink>
              </div>
            </div>
          </header>
        </header>
      </div>
    </section>
  );
}
