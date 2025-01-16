import React from "react";
import HeaderPanel from "./HeaderPanel";
import styles from "./UserPanel.module.css";
import { useAuth } from "../../../store/AuthContext";
export default function UserPanelSecurity() {
  const { login, email, phone } = useAuth();
  return (
    <>
      <h1 className={styles.header}>Zabezpieczenia</h1>
      <h2 className="lg:text-2xl mt-24 mb-8">Twoje dane wrażliwe</h2>
      <div className={styles.userDetailsContainer}>
        <p>Login: {login}</p>
        <p>email: {email}</p>
        <p>numer telefonu: {phone}</p>
        <p>hasło: ***** </p>
      </div>

      <button className={`${styles.btnMainBlue} mt-4`}>Edytuj Dane</button>
    </>
  );
}
