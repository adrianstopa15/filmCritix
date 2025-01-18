import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { request } from "http";
import Film from "./models/Film";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb")
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.error("MongoDB connection error", error));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

//multer:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});
const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Nieobsługiwany typ pliku. Dozwolone są tylko obrazy."));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export default upload;

app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, login, password, name, surname, phone } = req.body;

    const existingUser = await User.findOne({ email, login });
    if (existingUser) {
      console.error(`Użytkownik o tym emailu, lub/oraz loginie już istnieje`);
      return res.status(400).json({
        error: "Użytkownik o tym emailu, lub/oraz loginie już istnieje",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      login,
      name,
      surname,
      phone,
      password: hashedPassword,
      czyAdmin: false,
    });

    await newUser.save();
    console.log(newUser);
    return res
      .status(201)
      .json({ message: "Użytkownik został pomyślnie zarejestrowany" });
  } catch (error) {
    console.error("Nie udało się zarejestrować użytkownika", error);
    return res
      .status(500)
      .json({ error: "Wystąpił błąd podczas rejestracji użytkownika" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Nie znaleziono użytkownika o podanym mailu" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Podane hasło jest nieprawidłowe" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Pomyślnie zalogowano użytkownika", user });
  } catch (error) {
    console.error("Problem z zalogowaniem użytkownika", error);
    return res
      .status(400)
      .json({ error: "Nie udało się zalogować użytkownika" });
  }
});
app.post("/api/logout", async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Użytkownik został wylogowany." });
  } catch (error) {
    console.error("Nie udało się wylogować użytkownika", error);
    return res
      .status(500)
      .json({ error: "Wystąpił problem z wylogowaniem użytkownika" });
  }
});

app.get("/api/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        isLoggedIn: false,
        czyAdmin: false,
        message: "Brak tokenu w ciasteczku, użytkownik niezalogowany",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded as { userId: string };

    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        isLoggedIn: false,
        czyAdmin: false,
        message: "nie znaleziono użytkownika w bazie",
      });
    }
    return res.json({
      isLoggedIn: true,
      czyAdmin: user.czyAdmin,
      login: user.login,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Wystąpił błąd", error);
    return res
      .status(500)
      .json({ error: "Wystąpił problem z odczytywaniem danych użytkownika" });
  }
});

app.get("/api/getUsers", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      console.error("nie znaleziono użytkowników");
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Nie udało się wyświetlić użytkowników" });
  }
});

app.post(
  "/api/addReview",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { filmName, description, genre, review } = req.body;
      if (!filmName || !description || !genre || !review) {
        return res.status(400).json({ error: "Wszystkie pola są wymagane" });
      }

      const filePath = req.file ? req.file.path : null;
      const newFilm = new Film({
        filmName,
        description,
        genre,
        review,
        file: filePath,
      });
      await newFilm.save();
      console.log("Dodano recenzje", newFilm);
      return res.status(201).json({ message: "Recenzja została dodana." });
    } catch (error) {
      console.error("Wystąpił problem przy dodawaniu recenzji", error);
      res.status(500).json({ error: "Nie udało się dodać recenzji" });
    }
  }
);
app.get("/api/showReviews", async (req: Request, res: Response) => {
  try {
    const reviews = await Film.find();
    if (!reviews || reviews.length === 0) {
      return res.status(400).json({ error: "Nie znaleziono recenzji." });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Nie udało się pobrać recenzji", error);
    return res
      .status(500)
      .json({ error: "Pobieranie recenzji zakończone niepowodzeniem." });
  }
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
