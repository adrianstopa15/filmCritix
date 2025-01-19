import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../../store/AuthContext";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const settingsGlobal = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

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
const settings4 = {
  dots: true,
  infinite: false,
  slidesToShow: 2,
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const openModal = (review: Review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedReview(null);
    setModalIsOpen(false);
  };

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
              <Slider {...settingsGlobal}>
                {reviews.map((r, index) => (
                  <div
                    className="movie-card"
                    key={index}
                    onClick={() => openModal(r)}
                  >
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
              <Slider {...settingsGlobal}>
                {reviews.map((r, index) => (
                  <div
                    className="movie-card"
                    key={index}
                    onClick={() => openModal(r)}
                  >
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
              <Slider {...settingsGlobal}>
                {reviews.map((r, index) => (
                  <div
                    className="movie-card"
                    key={index}
                    onClick={() => openModal(r)}
                  >
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
              <Slider {...settingsGlobal}>
                {reviews.map((r, index) => (
                  <div
                    className="movie-card"
                    key={index}
                    onClick={() => openModal(r)}
                  >
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.65)",
            },
            content: {
              maxWidth: "600px",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              backgroundColor: "rgba(0,0,0,0.9)",
            },
          }}
        >
          {selectedReview && (
            <div>
              <h2 className="text-sm md:text-2xl xl:text-3xl text-center md:mb-8 mb-4">
                {selectedReview.filmName}
              </h2>
              <p className="mb-4 text-xs lg:text-xl">
                <strong>Gatunek: </strong>
                {selectedReview.genre}
              </p>
              <p className="mb-4 text-xs lg:text-xl">
                <strong>Opis: </strong>
                {selectedReview.description}
              </p>
              <p className="text-xs lg:text-xl">
                <strong>Recenzja: </strong>
                {selectedReview.review}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
