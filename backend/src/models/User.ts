import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level1: [
    {
      type: String,
    },
  ],
  level2: [
    {
      type: String,
    },
  ],
  level3: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
