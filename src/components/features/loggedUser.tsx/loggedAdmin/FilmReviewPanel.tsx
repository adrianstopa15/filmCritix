import React, { useState, useEffect } from "react";
import styles from "../UserPanel.module.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { useAuth } from "../../../../store/AuthContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Review = {
  _id: string;
  filmName: string;
  description: string;
  genre: string;
  review: string;
  file?: string;
};

export default function FilmReviewPanel() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { reviews } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [creatorMode, setCreatorMode] = useState<
    "" | "addReview" | "editReview"
  >("");

  const [formData, setFormData] = useState({
    filmName: "",
    description: "",
    genre: "",
    review: "",
  });

  // Kiedy zmienia się selectedReview, ładujemy jego dane do stanu formData
  useEffect(() => {
    if (selectedReview) {
      setFormData({
        filmName: selectedReview.filmName || "",
        genre: selectedReview.genre || "",
        description: selectedReview.description || "",
        review: selectedReview.review || "",
      });
      // Jeśli chcesz resetować plik przy każdej edycji, możesz tu dodać:
      setFile(null);
    }
  }, [selectedReview]);

  // Otwórz modal i ustaw recenzję do edycji
  const openModal = (review: Review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setModalIsOpen(false);
  };

  // Obsługa zmian w inputach tekstowych (zarówno dla dodawania, jak i edycji)
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

  // Dropzone do DODAWANIA recenzji
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

  // Dodawanie nowej recenzji (POST)
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
      await axios.post("http://localhost:5000/api/addReview", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  // Usuwanie recenzji
  const deleteReview = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Czy na pewno chcesz usunąć recenzję?",
        text: "Ta operacja jest nieodwracalna!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Tak, usuń",
        cancelButtonText: "Nie, anuluj",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/deleteReview/${id}`);
        await Swal.fire({
          title: "Usunięto!",
          text: "Recenzja została pomyślnie usunięta.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire({
          title: "Anulowano",
          text: "Recenzja nie została usunięta.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Błąd podczas usuwania recenzji:", error);
      await Swal.fire({
        title: "Błąd",
        text: "Wystąpił problem podczas usuwania recenzji. Spróbuj ponownie.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  //Edycja recenzji
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReview || !selectedReview._id) {
      Swal.fire({
        title: "Błąd",
        text: "Nie wybrano recenzji do edycji.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Brak ID recenzji do edycji.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData]);
    }
    if (file) {
      formDataToSend.append("file", file);
    }

    const editUrl = `http://localhost:5000/api/editReview/${selectedReview._id}`;
    console.log("Wysyłanie żądania PUT na:", editUrl);

    try {
      const response = await axios.put(editUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        position: "top",
        title: "Zaktualizowano recenzję!",
        text: "Pomyślnie zapisano zmiany.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          closeModal();
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Nie udało się zaktualizować recenzji:", error);
      Swal.fire({
        title: "Błąd",
        text: "Nie udało się zaktualizować recenzji. Sprawdź logi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <h1 className={`${styles.header}`}>
        {creatorMode === ""
          ? "Zarządzaj recenzjami"
          : creatorMode === "addReview"
          ? "Kreator recenzji"
          : creatorMode === "editReview"
          ? "Edytor recenzji"
          : ""}
      </h1>

      {creatorMode === "" && (
        <div className="mt-32 flex">
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

      {/* FORMULARZ DODAWANIA */}
      {creatorMode === "addReview" && (
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
            <div className={`${styles.filmEditCard} mt-10`} key={r._id}>
              <p className="ml-2">{r.filmName}</p>
              <div className={styles.filmEditCardButtons}>
                <button
                  className={`${styles.btnMainOrange} mr-2`}
                  onClick={() => openModal(r)}
                >
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.65)",
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
            backgroundColor: "rgba(237, 237, 237, 0.92)",
            color: "black",
          },
        }}
      >
        <h2 className="text-sm md:text-2xl xl:text-3xl text-center md:mb-8 mb-4">
          Edytuj Recenzję
        </h2>

        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-xs lg:text-xl">
              <strong>Tytuł filmu:</strong>
            </label>
            <input
              type="text"
              name="filmName"
              value={formData.filmName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-xs lg:text-xl">
              <strong>Gatunek:</strong>
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="genre"
              onChange={handleChange}
              value={formData.genre}
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

          <div className="mb-4">
            <label className="block mb-2 text-xs lg:text-xl">
              <strong>Opis:</strong>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-xs lg:text-xl">
              <strong>Recenzja:</strong>
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Prosty input do zmiany pliku (zamiast dropzone). 
              Możesz tu użyć dropzone, jeśli wolisz. */}
          <div className="mb-4">
            <label className="block mb-2 text-xs lg:text-xl">
              <strong>Okładka (opcjonalnie zmień):</strong>
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            {selectedReview?.file && (
              <p className="text-xs mt-2">
                Aktualnie ustawiony plik: {selectedReview.file}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-4"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Zapisz zmiany
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
