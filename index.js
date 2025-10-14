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
//app representa al servidor,
app.get("/hello", (req, res) => {
  res.status(200).send("vamos moviendo su co lita");
});
app.get("/hola", (req, res) => {
  res.status(200).send("vamos moviendo su colitaaa");
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
