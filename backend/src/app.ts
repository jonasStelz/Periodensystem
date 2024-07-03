import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import elementRoutes from "./routes/elementRoutes";
import path from "path";
import User from "./models/User";
import { loadElements, getAllElementSymbols } from "./helperFunctions";
import crypto from "crypto";
import Element from "./models/Element";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", elementRoutes);

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

// Überprüfen, ob der Benutzer existiert

export default app;
