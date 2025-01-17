import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
  filmName: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  review: { type: String, required: true },
  file: { type: String, required: true },
});

const Film = mongoose.model("Film", filmSchema);
export default Film;
