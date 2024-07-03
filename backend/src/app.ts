import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import path from "path";
import User from "./models/User";
import { loadElements, getAllElementSymbols } from "./helperFunctions";
import crypto from "crypto";
import Element from "./models/Element";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

const mongoURI = "mongodb://localhost:27017/mydatabase";

mongoose;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() => {
    console.log("Connected to MongoDB");
    //Alle Elemente neu in die Datenbank laden
    loadElements();
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Statische Dateien (z.B. index.html) bereitstellen
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));

// Indexroute für die Anwendung
app.get("/", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

app.post("/api/addusers", async (req, res) => {
  try {
    console.log(req.body);
    console.log("§Lklsdlkfalflasldflösdföjlaölsdfjöl");

    const username = req.body.username;

    const password = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    console.log(username);
    console.log(password);

    console.log(await getAllElementSymbols());

    const newUser = new User({
      username: username,
      password: password,
      level1: await getAllElementSymbols(),
    });

    //const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default app;
