import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserPanel.module.css";
import avatarIcon from "../../../assets/profileAvatar.jpg";
import { useAuth } from "../../../store/AuthContext";
export default function HeaderPanel() {
  const { login } = useAuth();
  return (
    <section className="navbar">
      <nav className={`${styles.navbarPanel}`}>
        <NavLink to="/">
          <p className="pNavbar text-2xl lg:text-4xl font-bold text-blue-600">
            Film<span className="text-red-500">Critix</span>
          </p>
        </NavLink>
      </nav>
    </section>
  );
}
