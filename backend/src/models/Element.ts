import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  atomic_number: {
    type: Number,
    required: true,
  },
  atomic_weight: {
    type: Number,
    required: true,
  },
  // Weitere Eigenschaften des Elements können hier hinzugefügt werden
});

const Element = mongoose.model("Element", elementSchema);

export default Element;
