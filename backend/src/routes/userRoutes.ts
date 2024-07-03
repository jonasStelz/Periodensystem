import { Router } from "express";
import User from "../models/User";
import crypto from "crypto";
import { loadElements, getAllElementSymbols } from "../helperFunctions";
const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const username = req.body.username;

    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Benutzername ist bereits vergeben" });
    }

    const password = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    const initLevel: string[][] = [[], [], []];
    initLevel[0] = await getAllElementSymbols();

    const newUser = new User({
      username: username,
      password: password,
      level: initLevel,
      isAdmin: false,
    });

    //const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/checklogin", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(req.body.username);

  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await User.findOne({
      username: username,
      password: hashedPassword,
    });

    if (user) {
      console.log(user);
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.put("/updateUserData", async (req, res) => {
  try {
    const { user } = req.body;

    //Falls doppelte werte vorkommen, diese herausfiltern
    (user.level as string[][]).forEach((level) => {
      level = [...new Set(level)];
    });

    // Benutzer in der Datenbank finden und aktualisieren
    const updatedUser = await User.findOneAndUpdate(
      { username: user.username },
      { level: user.level },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Benutzerdaten:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

export default router;
