import { Router } from "express";
import Element from "../models/Element";
import { loadElements, getAllElementSymbols } from "../helperFunctions";
const erouter = Router();

erouter.post("/getElementData", async (req, res) => {
  const stringReceived = req.body.element;

  const element = await Element.findOne({ symbol: stringReceived });
  console.log(stringReceived);

  // Hier könntest du die empfangenen Daten verarbeiten (z.B. Datenbankabfrage, etc.)
  // Beispiel: Einfach die empfangenen Daten zurücksenden
  res.json({
    element,
  });
});

export default erouter;
