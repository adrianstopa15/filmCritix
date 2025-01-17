import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserPanel.module.css";
import userIcon from "../../../assets/userIcon.png";
import securityIcon from "../../../assets/securityIcon.png";
import statusIcon from "../../../assets/statusIcon.png";
import filmReveiewIcon from "../../../assets/filmReviewIcon.png";
import { useAuth } from "../../../store/AuthContext";
export default function NavbarLeft() {
  const { czyAdmin } = useAuth();
  return (
    <nav className={styles.navbarLeft}>
      <ul>
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? styles.selected : "")}
        >
          <li className={``}>
            <img src={userIcon} className={styles.navbarIcon} />
            Ustawienia konta
          </li>
        </NavLink>
        {!czyAdmin && (
          <NavLink
            to="filmReview"
            className={({ isActive }) => (isActive ? styles.selected : "")}
          >
            <li className={``}>
              <img src={filmReveiewIcon} className={styles.navbarIcon} />
              Panel recenzji
            </li>
          </NavLink>
        )}
        <NavLink
          to="security"
          className={({ isActive }) => (isActive ? styles.selected : "")}
        >
          <li>
            <img src={securityIcon} className={styles.navbarIcon} />
            Zabezpieczenia
          </li>
        </NavLink>
        <NavLink
          to="status"
          className={({ isActive }) => (isActive ? styles.selected : "")}
        >
          <li>
            <img src={statusIcon} className={styles.navbarIcon} />
            Status konta
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
