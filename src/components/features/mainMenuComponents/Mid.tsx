import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import movie1 from "../../../assets/movie1.jpg";
import movie2 from "../../../assets/movie2.jpg";
import movie3 from "../../../assets/movie3.jpg";
import movie4 from "../../../assets/movie4.jpg";
import movie5 from "../../../assets/movie5.jpg";
import { useAuth } from "../../../store/AuthContext";
import axios from "axios";
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
const settings2 = {
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 1000,
  autoplay: false,
  cssEase: "linear",
};
const settings3 = {
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 1000,
  autoplay: false,
  cssEase: "linear",
};
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

export default function Mid() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showReviews");
      setReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Nie udało się pobrać recenzji", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const { isLoggedIn } = useAuth();
  return (
    <section className="mid">
      <div className="mid-container">
        <div className="moviesContainer px-8">
          {!isLoggedIn ? (
            <>
              <p className="p-medium mb-8 mt-16">Najnowsze Recenzje</p>
              <Slider {...settings}>
                {fakeMovies.map((m, index) => (
                  <div className="movie-card" key={index}>
                    <img src={m.img} className="movie-image" alt={m.name} />
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <>
              <p className="p-medium mb-8 mt-16">Najlepsze recenzje</p>
              <Slider {...settings}>
                {fakeMovies.map((m, index) => (
                  <div className="movie-card" key={index}>
                    <img src={m.img} className="movie-image" alt={m.name} />
                  </div>
                ))}
              </Slider>
              <p className="p-medium mb-8 mt-16">Najnowsze recenzje</p>
              <Slider {...settings2}>
                {fakeMovies.map((m, index) => (
                  <div className="movie-card" key={index}>
                    <img src={m.img} className="movie-image" alt={m.name} />
                  </div>
                ))}
              </Slider>
              <p className="p-medium mb-8 mt-16">Przeczytaj ponownie</p>
              <Slider {...settings3}>
                {fakeMovies.map((m, index) => (
                  <div className="movie-card" key={index}>
                    <img src={m.img} className="movie-image" alt={m.name} />
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
