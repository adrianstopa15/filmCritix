import React, { useState } from "react";
import styles from "./UserPanel.module.css";
import Header from "../../Header";
import HeaderPanel from "./HeaderPanel";
import profileAvatar from "../../../assets/profileAvatar.jpg";
export default function UserPanel() {
  const [profileSection, setProfileSection] = useState("ustawienia");
  return (
    <>
      <div className={styles.userPanelContainer}>
        <HeaderPanel />
        <div className={styles.userPanelContent}>
          <nav className={styles.navbarLeft}>
            <ul>
              <li className="mt-12">Ustawienia konta</li>
              <li>Zabezpieczenia</li>
              <li>Status konta</li>
            </ul>
          </nav>
          <div className={styles.heroContainer}>
            <div className={styles.heroContainerBox}>
              <div className={styles.heroContainerContent}>
                <h1 className={styles.header}>Twój profil</h1>
                <img
                  src={profileAvatar}
                  className={`${styles.avatarPicture} mt-20 mb-4`}
                />
                <p className={styles.userP}>Użytkownik</p>

                <p>adri4nS</p>
                <p>Adrian Stopa</p>
                <p>mojemail@o2.pl</p>
                <p>534 367 653</p>

                <button className={`${styles.btnMainBlue} mt-6`}>
                  Edytuj Profil
                </button>
                <div className={`${styles.profileGrid} mt-20`}>
                  <div className={styles.gridCard1}>
                    <h2>36</h2>
                    <p>przeczytanych recenzji</p>
                  </div>
                  <div className={styles.gridCard2}>
                    <h2>36</h2>
                    <p>ulubionych recenzji</p>
                  </div>
                  <div className={styles.gridCard3}>
                    <h2>0</h2>
                    <p>dodanych komentarzy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
