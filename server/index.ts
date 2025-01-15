import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb")
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.error("MongoDB connection error", error));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

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

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
