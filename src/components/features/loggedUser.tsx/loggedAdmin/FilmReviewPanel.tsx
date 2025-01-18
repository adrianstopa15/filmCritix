import React, { useState } from "react";
import styles from "../UserPanel.module.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../store/AuthContext";
export default function FilmReviewPanel() {
  const { reviews, isLoadingReviews } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [creatorMode, setCreatorMode] = useState("");
  const [formData, setFormData] = useState({
    filmName: "",
    description: "",
    genre: "",
    review: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //dropzone config:
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData]);
    }
    if (file) {
      formDataToSend.append("file", file);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addReview",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        position: "top",
        title: "Recenzja została dodana!",
        text: "Dziękujemy za dodaną recenzję.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      Swal.fire({
        title: "Błąd",
        text: "Nie udało się dodać recenzji. Spróbuj ponownie.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Nie udało się dodać recenzji", error);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteReview/${id}`
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
      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas usuwania recenzji:", error);
    }
  };
  return (
    <>
      <h1 className={`${styles.header}`}>
        {creatorMode === ""
          ? "Zarządzaj recenzjami"
          : creatorMode === "addReview"
          ? "Kreator recenzji"
          : creatorMode == "editReview"
          ? "Edytor recenzji"
          : ""}
      </h1>

      {creatorMode === "" && (
        <div className="mt-32">
          <button
            className={`${styles.btnMainGreen} mr-4`}
            onClick={() => setCreatorMode("addReview")}
          >
            Dodaj Recenzje
          </button>
          <button
            className={`${styles.btnMainBlue} ml-4`}
            onClick={() => setCreatorMode("editReview")}
          >
            Edytuj Recenzje
          </button>
        </div>
      )}

      {creatorMode == "addReview" && (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={formSubmit}
        >
          <div className="flex flex-col mt-12 justify-center">
            <div className={styles.formGroup}>
              <label>Nazwa Filmu</label>
              <input
                type="text"
                className={styles.inputPanel}
                name="filmName"
                id="filmName"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Krótki opis</label>
              <input
                type="text"
                className={styles.inputPanel}
                name="description"
                id="description"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>gatunek</label>
              <select
                className={styles.inputPanel}
                name="genre"
                onChange={handleChange}
                required
              >
                <option value="">wybierz gatunek</option>
                <option value="komedia">komedia</option>
                <option value="dramat">dramat</option>
                <option value="thriller">thriller</option>
                <option value="fantasy">przygodowy</option>
                <option value="animacja">animacja</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Okładka</label>
              <div
                {...getRootProps()}
                className={`${styles.dropzone} border-dashed border-2 p-4 cursor-pointer w-32 lg:w-64 lg:min-h-24`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Upuść plik tutaj...</p>
                ) : (
                  <p>
                    Przeciągnij i upuść plik tutaj lub kliknij, aby go wybrać.
                  </p>
                )}
                {file && <p>wybrano plik: {file.name}</p>}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="review">Recenzja</label>
              <textarea
                id="review"
                name="review"
                className={styles.textArea}
                placeholder="Wpisz swoją recenzję..."
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className={`${styles.btnMainGreen}`} type="submit">
            Dodaj Recenzje
          </button>
        </form>
      )}
      {creatorMode === "editReview" && (
        <div className={`${styles.filmEditContainer} mt-8`}>
          {reviews.map((r) => (
            <div className={`${styles.filmEditCard} mt-10`}>
              <p className="ml-2">{r.filmName}</p>
              <div className={styles.filmEditCardButtons}>
                <button className={`${styles.btnMainOrange} mr-2`}>
                  edytuj
                </button>
                <button
                  className={`${styles.btnMainRed}`}
                  onClick={() => deleteReview(r._id)}
                >
                  usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
