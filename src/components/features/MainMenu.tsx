import React, { useRef } from "react";
import movie1 from "../../assets/movie1.jpg";
import movie2 from "../../assets/movie2.jpg";
import movie3 from "../../assets/movie3.jpg";
import movie4 from "../../assets/movie4.jpg";
import movie5 from "../../assets/movie5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
export default function MainMenu() {
  const fakeMovies = [
    { name: "Zielona Mila", genre: "thriller", img: movie1 },
    { name: "Zielona Mila", genre: "thriller", img: movie2 },
    { name: "Zielona Mila", genre: "thriller", img: movie3 },
    { name: "Zielona Mila", genre: "thriller", img: movie4 },
    { name: "Zielona Mila", genre: "thriller", img: movie2 },
    { name: "Zielona Mila", genre: "thriller", img: movie4 },
    { name: "Zielona Mila", genre: "thriller", img: movie1 },
    { name: "Zielona Mila", genre: "thriller", img: movie5 },
    { name: "Zielona Mila", genre: "thriller", img: movie2 },
  ];
  const loggedProfits = [
    {
      text: "Przeglądaj wszystkie recenzje",
      subtext:
        "Jako zalogowany użytkownik masz dostęp do wszystkich recenzji za darmo.",
    },
    {
      text: "Recenzuj recenzje",
      subtext:
        "Poczuj się jak krytyk i oceń, bądź skomentuj recenzje eksperta.",
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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 3000,
    autoplay: true,
    cssEase: "linear",
  };

  return (
    <>
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
                  Zaczynamy przeglądać? Wprowadź adres e‑mail, aby utworzyć
                  konto.
                </p>
                <div className="flex items-center justify-center">
                  <input
                    placeholder="Adres e-mail"
                    className="inputMain mr-8"
                  />
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
      <section className="mid">
        <div className="mid-container">
          <p className="p-medium mb-8 mt-16">Najnowsze Recenzje</p>

          <div className="moviesContainer px-8">
            <Slider {...settings}>
              {fakeMovies.map((m, index) => (
                <div className="movie-card" key={index}>
                  <img src={m.img} className="movie-image" alt={m.name} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
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
      <footer>
        <div className="footer-container flex items-center justify-center">
          <div>
            <p className="mb-4">
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
        </div>
      </footer>
    </>
  );
}
