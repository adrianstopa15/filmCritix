import React, { useRef } from "react";
import movie1 from "../assets/movie1.jpg";
import movie2 from "../assets/movie2.jpg";
import movie3 from "../assets/movie3.jpg";
import movie4 from "../assets/movie4.jpg";
import movie5 from "../assets/movie5.jpg";
import arrow from "../assets/arrow.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <header className="header-container">
        <nav className="navbar-menu">
          <p className="pNavbar">FilmCritix</p>
          <button className="button-red">Sign In</button>
        </nav>
      </header>
      <div className="mid flex items-center justify-center">
        <div className="mid-container ">
          <p className="p-medium mb-8 mt-16">Najnowsze Recenzje:</p>

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
      </div>
    </div>
  );
}
