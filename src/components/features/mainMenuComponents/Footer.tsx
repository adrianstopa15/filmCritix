import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";

export default function Footer() {
  const { isLoggedIn } = useAuth();
  return (
    <footer>
      <div className="footer-container flex items-center justify-center">
        {!isLoggedIn ? (
          <div className="max-w-80 md:max-w-none">
            <p className="text-sm lg:text-xl xl:text-2xl mb-4">
              Zaczynamy przeglądać? Wprowadź adres e‑mail, aby utworzyć konto.
            </p>
            <div className="flex items-center justify-center">
              <input placeholder="Adres e-mail" className="inputMain mr-8" />
              <NavLink to="/registerPanel">
                <button className="text-xs xl:text-2xl button-red font-bold py-3 px-2 lg:px-10">
                  Rozpocznij {">"}
                </button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              aliquam, mollitia illum adipisci cumque explicabo maiores eos illo
              blanditiis harum veritatis natus libero dolores doloremque ex,
              rem, repellat autem! Nihil? adipisci cumque explicabo maiores eos
              illo blanditiis harum veritatis. adipisicing elit. Minima aliquam,
              mollitia illum adipisci
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
