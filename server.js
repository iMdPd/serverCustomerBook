const socket = require("socket.io");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/NewWaveDB", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error " + err));

app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT || PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
