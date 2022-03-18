import mongoose from "../database/index.js";

const VaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  nextShot: {
    type: String,
    default: "Esquema completo",
  },
});

const Vaccine = mongoose.model("Vaccine", VaccineSchema);

export default Vaccine;
