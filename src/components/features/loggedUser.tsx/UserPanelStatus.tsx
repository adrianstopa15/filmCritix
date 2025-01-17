import React from "react";
import styles from "./UserPanel.module.css";
import { useAuth } from "../../../store/AuthContext";
export default function userPanelStatus() {
  const { czyAdmin } = useAuth();
  return (
    <>
      <h1 className={styles.header}>Ranga konta</h1>

      <h2 className="lg:text-2xl mt-24">Twój obecny status konta to:</h2>
      {!czyAdmin ? (
        <p className={`${styles.userP} lg:text-2xl mt-8 mb-32`}>Użytkownik</p>
      ) : (
        <p className={`${styles.adminP} lg:text-2xl mt-8 mb-32`}>
          Administrator
        </p>
      )}
      {!czyAdmin && (
        <p>
          Do możliwości złożenia wniosku o status super użytkownika brakuje Ci
          <strong> 12 przeczytanych recenzji</strong>
        </p>
      )}
      <button className={`${styles.btnMainDisabled} mt-6`}>Złóż Wniosek</button>
    </>
  );
}
