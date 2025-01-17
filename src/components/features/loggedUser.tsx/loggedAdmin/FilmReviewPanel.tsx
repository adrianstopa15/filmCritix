import React, { useState } from "react";
import styles from "../UserPanel.module.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
export default function FilmReviewPanel() {
  const [file, setFile] = useState<File | null>(null);
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
      console.log("Recenzja dodana", response.data);
    } catch (error) {
      console.error("Nie udało się dodać recenzji", error);
    }
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  };

  return (
    <>
      <h1 className={styles.header}>Kreator recenzji</h1>

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
            />
          </div>
          <div className={styles.formGroup}>
            <label>gatunek</label>
            <select
              className={styles.inputPanel}
              name="genre"
              onChange={handleChange}
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
    </>
  );
}
