import * as express from "express";
import "dotenv/config";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", {})
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.error("MongoDB connection error", error));

//test:
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
