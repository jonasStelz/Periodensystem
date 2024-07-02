import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import path from "path";

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
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Statische Dateien (z.B. index.html) bereitstellen
const publicPath = path.resolve(__dirname, "dist_frontend");
app.use(express.static(publicPath));

// Indexroute für die Anwendung
app.get("/", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

export default app;
