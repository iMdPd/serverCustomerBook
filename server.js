const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const db = require("./db/db");
const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on port: ${PORT}`);
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json(db);
});
app.use("/", testimonialsRoutes);
app.use("/", concertsRoutes);
app.use("/", seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});
