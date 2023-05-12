const { testimonials, concerts, seats } = require("./db");

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

app.get("/testimonials", (req, res) => {
  res.json(testimonials);
});

app.get("/testimonials/random", (req, res) => {
  const numbersOfElements = testimonials.length;
  const randomElement = Math.floor(Math.random() * numbersOfElements);

  res.json(testimonials[randomElement]);
});

app.get("/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const getElementById = testimonials.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.send("Given id doesn't exist.");
  }
});

app.post("/testimonials", (req, res) => {
  const { name, text } = req.body;
  const id = Math.max(...testimonials.map((obj) => obj.id)) + 1;

  if (name && text) {
    testimonials.push({ id, name, text });
    res.send("Data has been successfully added!");
    console.log(testimonials);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.put("/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const { name, text } = req.body;
  const getElementById = testimonials.find((obj) => obj.id === +id);

  if (getElementById && name && text) {
    getElementById.name = name;
    getElementById.text = text;
    res.send("Data has been successfully changed!");
    console.log(testimonials);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.delete("/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const removedElement = testimonials.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    testimonials.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
    console.log(testimonials);
  } else {
    res.send("Given id doesn't exist.");
  }
});

/* CONCERTS------------------------------------------------- */

app.get("/concerts", (req, res) => {
  res.json(concerts);
});

app.get("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.send("Given id doesn't exist.");
  }
});

app.post("/concerts", (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.max(...concerts.map((obj) => obj.id)) + 1;

  if (performer && genre && price && day && image) {
    concerts.push({ id, performer, genre, price, day, image });
    res.send("Data has been successfully added!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.put("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById && performer && genre && price && day && image) {
    getElementById.performer = performer;
    getElementById.genre = genre;
    getElementById.price = price;
    getElementById.day = day;
    getElementById.image = image;
    res.send("Data has been successfully changed!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.delete("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const removedElement = concerts.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    concerts.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
    console.log(concerts);
  } else {
    res.send("Given id doesn't exist.");
  }
});

/* CONCERTS------------------------------------------------- */

app.get("/concerts", (req, res) => {
  res.json(concerts);
});

app.get("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.send("Given id doesn't exist.");
  }
});

app.post("/concerts", (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.max(...concerts.map((obj) => obj.id)) + 1;

  if (performer && genre && price && day && image) {
    concerts.push({ id, performer, genre, price, day, image });
    res.send("Data has been successfully added!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.put("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById && performer && genre && price && day && image) {
    getElementById.performer = performer;
    getElementById.genre = genre;
    getElementById.price = price;
    getElementById.day = day;
    getElementById.image = image;
    res.send("Data has been successfully changed!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.delete("/concerts/:id", (req, res) => {
  const { id } = req.params;
  const removedElement = concerts.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    concerts.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
    console.log(concerts);
  } else {
    res.send("Given id doesn't exist.");
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});
