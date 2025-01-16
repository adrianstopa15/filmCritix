import React, { useState } from "react";
import styles from "./UserPanel.module.css";
import Header from "../../Header";
import HeaderPanel from "./HeaderPanel";
import profileAvatar from "../../../assets/profileAvatar.jpg";
import UserPanelSettings from "./UserPanelSettings";
import securityIcon from "../../../assets/securityIcon.png";
import userIcon from "../../../assets/userIcon.png";
import statusIcon from "../../../assets/statusIcon.png";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavbarLeft from "./NavbarLeft";
export default function UserPanel() {
  const [profileSection, setProfileSection] = useState("ustawienia");
  return (
    <>
      <div className={styles.userPanelContent}>
        <HeaderPanel />
        <NavbarLeft />
        <div className={styles.heroContainerBox}>
          <div className={styles.heroContainerContent}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
