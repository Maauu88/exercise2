import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
connectDB();

// =========================
// CORS (con tu frontend + Render)
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://exercise2-1.onrender.com", // <-- TU LINK AQUÍ
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Para recibir JSON
app.use(express.json());

// =========================
//  MODELO PERSONA
// =========================
const personaSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Edad: { type: Number, required: true },
});

const Persona = mongoose.model("Persona", personaSchema);

// =========================
//  ENDPOINTS CARDS
// =========================

// CREATE
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating card");
  }
});

// GET ALL
app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cards");
  }
});

// GET BY ID
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching card");
  }
});

// PUT (update total)
app.put("/updateCard/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      overwrite: true,
    });
    if (!card) return res.status(404).send("Card not found");
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating card");
  }
});

// PATCH (update parcial)
app.patch("/updateCard/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("Card not found");
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error partially updating card");
  }
});

// DELETE
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json("Card not found");
    res.status(200).json("Card deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error deleting card");
  }
});

// =========================
//  ENDPOINTS PERSONAS
// =========================

// CREATE
app.post("/personas", async (req, res) => {
  try {
    const persona = await Persona.create(req.body);
    res.status(201).json(persona);
  } catch (error) {
    res.status(500).json({ message: "Error al crear persona", error });
  }
});

// GET ALL
app.get("/personas", async (req, res) => {
  try {
    const personas = await Persona.find();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener personas", error });
  }
});

// GET BY ID
app.get("/personas/:id", async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).send("Persona no encontrada");
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar persona", error });
  }
});

// UPDATE
app.put("/personas/:id", async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar persona", error });
  }
});

// DELETE
app.delete("/personas/:id", async (req, res) => {
  try {
    await Persona.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar persona", error });
  }
});

// =========================
// OTROS
// =========================

app.get("/hello", (req, res) => {
  res.status(200).send("si funciona");
});

app.get("/hola", (req, res) => {
  res.status(200).send("creo que si funciona");
});

// Recibir datos simple
app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("Datos recibidos:", user, email);
  res.status(200).send("Data received successfully");
});

// =========================
// ENDPOINT LIST (CON TU LINK)
// =========================

app.get("/review", (req, res) => {
  const message = `
    Endpoints disponibles:

    Cards:
    - POST ${`https://exercise2-1.onrender.com/createCard`}  
    - GET  ${`https://exercise2-1.onrender.com/getAllCards`}
    - GET  ${`https://exercise2-1.onrender.com/getCard/:id`}
    - PUT  ${`https://exercise2-1.onrender.com/updateCard/:id`}
    - PATCH ${`https://exercise2-1.onrender.com/updateCard/:id`}
    - DELETE ${`https://exercise2-1.onrender.com/deleteCard/:id`}

    Personas:
    - POST ${`https://exercise2-1.onrender.com/personas`}
    - GET  ${`https://exercise2-1.onrender.com/personas`}
    - GET  ${`https://exercise2-1.onrender.com/personas/:id`}
    - PUT  ${`https://exercise2-1.onrender.com/personas/:id`}
    - DELETE ${`https://exercise2-1.onrender.com/personas/:id`}
  `;
  res.status(200).send(message);
});

// =========================
// SERVER
// =========================
app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
