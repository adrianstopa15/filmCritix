import React, { useRef } from "react";
import movie1 from "../../../assets/movie1.jpg";
import movie2 from "../../../assets/movie2.jpg";
import movie3 from "../../../assets/movie3.jpg";
import movie4 from "../../../assets/movie4.jpg";
import movie5 from "../../../assets/movie5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Top from "./features/mainMenuComponents/Top";
import Mid from "./features/mainMenuComponents/Mid";
import Bottom from "./features/mainMenuComponents/Bottom";
import Footer from "./features/mainMenuComponents/Footer";
export default function MainMenu() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Top />
      <Mid />
      {isLoggedIn && <Bottom />}
      <Footer />
    </>
  );
}
