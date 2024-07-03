import Element from "./models/Element";
import elementsData from "./elementData";
// Array mit Informationen zu den 118 Elementen des Periodensystems

// Funktion zum Laden der Elemente in die Datenbank
export const loadElements = async () => {
  try {
    // Verbindung zur Datenbank herstellen

    //Alle Elemente löschen
    await Element.deleteMany({});

    // Elemente nacheinander in die Datenbank einfügen
    for (let elementData of elementsData) {
      const newElement = new Element(elementData);
      await newElement.save();
      console.log(`Element ${newElement.symbol} saved.`);
    }

    console.log("All elements have been saved.");
  } catch (error) {
    console.error("Error loading elements:", error);
    process.exit(1);
  }
};

// Funktion zum Laden aller Elemente aus der Datenbank
export const getAllElementSymbols = async () => {
  try {
    const elements = await Element.find({});
    return elements.map((element) => element.symbol);
  } catch (error) {
    console.error("Error loading elements:", error);
    throw error;
  }
};

// Skript ausführen
