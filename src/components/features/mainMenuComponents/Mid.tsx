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

type Review = {
  filmName: string;
  description: string;
  genre: string;
  review: string;
  file: string;
};

export default function Mid() {
  const [reviews, setReviews] = useState<Review[]>([]);
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
              <p className="text-sm lg:text-2xl xl:text-3xl mb-8 mt-16">
                Najnowsze Recenzje
              </p>
              <Slider {...settings}>
                {reviews.map((r, index) => (
                  <div className="movie-card" key={index}>
                    <img
                      src={`http://localhost:5000/${r.file}`}
                      className="movie-image"
                      alt={r.filmName}
                    />
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <>
              <p className="text-sm lg:text-2xl xl:text-3xl  mb-8 mt-16">
                Najlepsze recenzje
              </p>
              <Slider {...settings}>
                {reviews.map((r, index) => (
                  <div className="movie-card" key={index}>
                    <img
                      src={`http://localhost:5000/${r.file}`}
                      className="movie-image"
                      alt={r.filmName}
                    />
                  </div>
                ))}
              </Slider>
              <p className="text-sm lg:text-2xl xl:text-3xl  mb-8 mt-16">
                Najnowsze recenzje
              </p>
              <Slider {...settings2}>
                {reviews.map((r, index) => (
                  <div className="movie-card" key={index}>
                    <img
                      src={`http://localhost:5000/${r.file}`}
                      className="movie-image"
                      alt={r.filmName}
                    />
                  </div>
                ))}
              </Slider>
              <p className="text-sm lg:text-2xl xl:text-3xl  mb-8 mt-16">
                Przeczytaj ponownie
              </p>
              <Slider {...settings3}>
                {reviews.map((r, index) => (
                  <div className="movie-card" key={index}>
                    <img
                      src={`http://localhost:5000/${r.file}`}
                      className="movie-image"
                      alt={r.filmName}
                    />
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
