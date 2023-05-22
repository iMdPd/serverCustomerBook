const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");
const socket = require("socket.io");

const db = require("./db/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const cors = require("cors");

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT || PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json(db);
});
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
});
