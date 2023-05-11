const express = require("express");
const app = express();
const port = 8000;

const path = require("path");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded());
app.use(express.json());
