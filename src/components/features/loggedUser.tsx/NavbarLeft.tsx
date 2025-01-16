import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserPanel.module.css";
import userIcon from "../../../assets/userIcon.png";
import securityIcon from "../../../assets/securityIcon.png";
import statusIcon from "../../../assets/statusIcon.png";
export default function NavbarLeft() {
  return (
    <nav className={styles.navbarLeft}>
      <ul>
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? styles.selected : "")}
        >
          <li className={`mt-32`}>
            <img src={userIcon} className={styles.navbarIcon} />
            Ustawienia konta
          </li>
        </NavLink>
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
