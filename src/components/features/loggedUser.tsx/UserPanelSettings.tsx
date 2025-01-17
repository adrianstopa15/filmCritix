import React from "react";
import profileAvatar from "../../../assets/profileAvatar.jpg";
import styles from "./UserPanel.module.css";
import { useAuth } from "../../../store/AuthContext";
import { stringify } from "querystring";
export default function UserPanelSettings() {
  const { name, surname, czyAdmin } = useAuth();

  return (
    <>
      <h1 className={styles.header}>Twój profil</h1>
      <img
        src={profileAvatar}
        className={`${styles.avatarPicture} mt-20 mb-4`}
      />
      <p className="lg:text-2xl mb-2">
        {name} {surname}
      </p>
      {!czyAdmin ? (
        <p className={`${styles.userP} lg:text-xl`}>Użytkownik</p>
      ) : (
        <p className={`${styles.adminP} lg:text-xl`}>Admin</p>
      )}

      <button className={`${styles.btnMainBlue} mt-12`}>Edytuj Profil</button>
      <div className={`${styles.profileGrid} mt-20`}>
        <div className={styles.gridCard1}>
          <h2>36</h2>
          <p>przeczytanych recenzji</p>
        </div>
        <div className={styles.gridCard2}>
          <h2>8</h2>
          <p>ulubionych recenzji</p>
        </div>
        <div className={styles.gridCard3}>
          <h2>0</h2>
          <p>dodanych komentarzy</p>
        </div>
      </div>
    </>
  );
}
