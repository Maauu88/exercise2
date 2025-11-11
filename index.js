import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
import { cors } from "cors";
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.post("/cards", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    //console.log(card);
    res.status(201).json(card).send("Card created succesfully");
  } catch (error) {
    console.error(error);
  }
});
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.find();
    res.status(200).json(card).send("Card created succesfully");
  } catch (error) {
    console.error(error);
  }
});

app.get("/getCards", async (req, res) => {
  try {
    const card = await Card.find();
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
  }
});

//UPDATE CARD
app.put("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

//DELETE CARD
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params; //  se lee el ID de la URL
    const deletedCard = await Card.findByIdAndDelete(id); // se elimina la tarjeta por id

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting card" });
  }
});

app.patch("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params; // Se obtiene el ID de la URL
    const updates = req.body; // Se obtienen los campos a actualizar

    // Validar que haya campos para actualizar
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Buscar y actualizar parcialmente el documento
    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Valida los campos según el modelo
    });

    // Si no se encuentra la tarjeta
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Respuesta exitosa
    res.status(200).json({
      message: "Card updated successfully (partial update)",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card", error });
  }
});

//app representa al servidor,
app.get("/hello", (req, res) => {
  res.status(200).send("si funciona");
});
app.get("/hola", (req, res) => {
  res.status(200).send("creo que si funciona");
});

//const app = express();
app.use(express.json());
app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("Datos recibidos: " + user + "" + email);
  res.status(200).send("Data received succesfully");
  //por default esta es un destructuracion JSON
  //{"user":"UnUsuario"},
  //"email" "un email"
});

app.listen(3000, () => {
  console.log("Servidor Ejecutandose en http://localhost:3000");
});

app.get("/review", (req, res) => {
  const message = `
    Endpoints disponibles:
    - POST /cards → Crear una tarjeta (createCard)
    - GET /getCards → Obtener todas las tarjetas (getCards)
    - GET /getCard/:id → Obtener una tarjeta por ID (getCard)
    - PUT /updateAllcards/:id → Actualizar toda una tarjeta (updateCard)
    - PATCH /updateCard/:id → Actualizar parcialmente una tarjeta (updateCard parcial)
    - DELETE /delateCards/:id → Eliminar una tarjeta (deleteCard)
  `;

  res.status(200).send(message);
});
