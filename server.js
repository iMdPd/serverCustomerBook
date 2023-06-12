const socket = require("socket.io");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");
const workshopsRoutes = require("./routes/workshops.routes");

const app = express();
const PORT = process.env.PORT || 8000;

allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  `http://localhost:${process.env.PORT}`,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow external access...";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);

const NODE_ENV = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  {
    NODE_ENV !== "test" &&
      console.log(`Server is running on port: ${process.env.PORT || PORT}`);
  }
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

let dbURL = "";

if (NODE_ENV === "production") dbURL = "url to remote db";
else if (NODE_ENV === "test") dbURL = "mongodb://localhost:27017/NewWaveDBtest";
else
  dbURL =
    dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DATABASE}.r4eleyk.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURL, connectionParams);
const db = mongoose.connection;

db.once("open", () => {
  NODE_ENV !== "test" && console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error " + err));

app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", workshopsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

module.exports = server;
