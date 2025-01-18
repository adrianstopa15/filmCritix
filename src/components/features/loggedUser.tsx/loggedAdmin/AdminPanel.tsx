import React, { useEffect, useState } from "react";
import styles from "../UserPanel.module.css";
import axios from "axios";
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [userCreator, setUserCreator] = useState(false);
  const showUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/getUsers");
    setUsers(response.data);
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
    } catch (error: any) {
      if (error.response) {
        console.error(`Server error ${error.response.data}`);
      } else if (error.request) {
        console.error(`No response received ${error.request}`);
      } else {
        console.error("Error setting up request", error.message);
      }
    }
  };

  useEffect(() => {
    showUsers();
  }, []);
  console.log(users);

  return (
    <>
      {userCreator == false ? (
        <>
          <h1 className={`${styles.header}`}>Lista użytkowników </h1>
          <div className={`${styles.usersEditContainer} mt-8`}>
            {users.map((u) => (
              <div className={`${styles.usersEditCard} mt-10`}>
                <p className="text-xs ml-2 xl:text-xl">
                  login: {u.login} email: {u.email}
                </p>
                <div className={styles.usersEditCardButtons}>
                  <button className={`${styles.btnMainRed}`}>usuń</button>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${styles.btnMainGreen} mt-4`}
            onClick={() => setUserCreator(true)}
          >
            Dodaj użytkownika
          </button>
        </>
      ) : (
        <>
          <h1 className={`${styles.header}`}>Kreator użytkowników</h1>
          <form
            className={`${styles.userCreatorForm} flex items-center flex-col`}
            onSubmit={formSubmit}
          >
            <p className="text-2xl mt-8 mb-12">Rejestracja</p>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleRegisterChange}
              className={styles.inputPanel}
              placeholder="E-mail"
            />
            <input
              type="text"
              id="login"
              name="login"
              onChange={handleRegisterChange}
              className={styles.inputPanel}
              placeholder="Login"
            />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleRegisterChange}
              className={styles.inputPanel}
              placeholder="Hasło"
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="name"
              name="name"
              onChange={handleRegisterChange}
              placeholder="Imie"
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="surname"
              onChange={handleRegisterChange}
              name="surname"
              placeholder="Nazwisko"
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="phone"
              name="phone"
              onChange={handleRegisterChange}
              placeholder="Telefon"
            />
            <span>
              Admin <input type="checkbox" id="czyAdmin" name="czyAdmin" />
            </span>
            <button
              className={`${styles.btnMainGreen} px-14 py-2 mb-12 mt-8`}
              type="submit"
            >
              Zarejestruj użytkownika
            </button>
          </form>
        </>
      )}
    </>
  );
}
