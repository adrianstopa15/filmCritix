import React, { useEffect, useState } from "react";
import styles from "../UserPanel.module.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [userCreator, setUserCreator] = useState(false);
  const showUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/getUsers");
    setUsers(response.data);
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      Swal.fire({
        title: "Sukces!",
        text: "Użytkownik pomyślnie zarejestrowany.",
        icon: "success",
        confirmButtonText: "OK",
        position: "top",
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
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

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteUser/${id}`,
        { withCredentials: true }
      );
      Swal.fire({
        title: "Sukces!",
        text: "Użytkownik został pomyślnie usunięty.",
        icon: "success",
        confirmButtonText: "OK",
        position: "top",
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          title: "Błąd!",
          text: "Nie możesz usunąć swojego konta.",
          icon: "warning",
          confirmButtonText: "OK",
          position: "top",
        });
      } else {
        Swal.fire({
          title: "Błąd!",
          text: "Nie udało się usunąć użytkownika. Spróbuj ponownie.",
          icon: "error",
          confirmButtonText: "OK",
        });
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
              <div
                className={`${
                  u.czyAdmin ? styles.usersEditCardAdmin : styles.usersEditCard
                } mt-10`}
              >
                <p className="text-xs ml-2 xl:text-xl">
                  login: {u.login} email: {u.email}
                </p>
                <div className={styles.usersEditCardButtons}>
                  <button
                    className={`${styles.btnMainRed}`}
                    onClick={() => deleteUser(u._id)}
                  >
                    usuń
                  </button>
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
              required
            />
            <input
              type="text"
              id="login"
              name="login"
              onChange={handleRegisterChange}
              className={styles.inputPanel}
              placeholder="Login"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleRegisterChange}
              className={styles.inputPanel}
              placeholder="Hasło"
              required
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="name"
              name="name"
              onChange={handleRegisterChange}
              placeholder="Imie"
              required
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="surname"
              onChange={handleRegisterChange}
              name="surname"
              placeholder="Nazwisko"
              required
            />
            <input
              className={styles.inputPanel}
              type="text"
              id="phone"
              name="phone"
              onChange={handleRegisterChange}
              placeholder="Telefon"
              required
            />
            <span>
              Admin{" "}
              <input
                type="checkbox"
                id="czyAdmin"
                name="czyAdmin"
                onChange={handleRegisterChange}
                required
              />
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
