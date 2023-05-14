const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const db = require("./db/db");
const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const cors = require("cors");

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT || PORT}`);
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
