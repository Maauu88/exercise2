import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app = express();
connectDB();

app.use(express.json());

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
