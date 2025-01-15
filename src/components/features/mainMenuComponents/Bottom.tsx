import React from "react";
import { useAuth } from "../../../store/AuthContext";
const loggedProfits = [
  {
    text: "Przeglądaj wszystkie recenzje",
    subtext:
      "Jako zalogowany użytkownik masz dostęp do wszystkich recenzji za darmo.",
  },
  {
    text: "Recenzuj recenzje",
    subtext: "Poczuj się jak krytyk i oceń, bądź skomentuj recenzje eksperta.",
  },
  {
    text: "Polecane recenzje",
    subtext:
      "W menu głównym wyświetlane będą najlepsze recenzje specjalnie dla Ciebie.",
  },
  {
    text: "Odkryte recenzje",
    subtext:
      "Pozwól nam informować Cię, które recenzję już zostały przez Ciebie odkryte.",
  },
];

export default function Bottom() {
  return (
    <section className="bottom">
      <div className="bottom-container">
        <p className="p-medium mb-8">Dlaczego warto dołączyć</p>
        <div className="bottom-grid">
          {loggedProfits.map((p) => (
            <div className="grid-card py-8 px-12 pb-32">
              <h3 className="text-xl mb-6 font-bold">{p.text}</h3>
              <p className="text-gray-300">{p.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
