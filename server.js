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

const db = [
  {
    id: 1,
    name: "Arden Gould",
    company: "Lobortis Quam Ltd",
    email: "ardengould6783@outlook.com",
    text: "ut erat. Sed nunc est, mollis non, cursus non, egestas",
  },
  {
    id: 2,
    name: "Laurel Prince",
    company: "Auctor Odio A LLC",
    email: "laurelprince2789@icloud.net",
    text: "in faucibus orci luctus et ultrices posuere cubilia Curae Donec",
  },
  {
    id: 3,
    name: "Ferris Richardson",
    company: "Phasellus Nulla Ltd",
    email: "ferrisrichardson8659@icloud.net",
    text: "augue, eu tempor erat neque non quam. Pellentesque habitant morbi",
  },
  {
    id: 4,
    name: "Levi Cohen",
    company: "Nisi Dictum Institute",
    email: "levicohen5336@protonmail.net",
    text: "nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem",
  },
  {
    id: 5,
    name: "Odysseus Ferrell",
    company: "Commodo Institute",
    email: "odysseusferrell@icloud.org",
    text: "non magna. Nam ligula elit, pretium et, rutrum non, hendrerit",
  },
  {
    id: 6,
    name: "Britanni Hull",
    company: "Aenean Eget Magna Foundation",
    email: "britannihull6724@google.com",
    text: "amet ornare lectus justo eu arcu. Morbi sit amet massa.",
  },
  {
    id: 7,
    name: "Nayda Hopper",
    company: "Luctus Ltd",
    email: "naydahopper@aol.com",
    text: "libero lacus, varius et, euismod et, commodo at, libero. Morbi",
  },
  {
    id: 8,
    name: "Beau Payne",
    company: "Nulla Vulputate Ltd",
    email: "beaupayne8105@outlook.net",
    text: "purus gravida sagittis. Duis gravida. Praesent eu nulla at sem",
  },
  {
    id: 9,
    name: "Zelenia Browning",
    company: "Nisi Magna Sed Company",
    email: "zeleniabrowning@yahoo.edu",
    text: "placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante,",
  },
  {
    id: 10,
    name: "Orlando Fuller",
    company: "Augue Malesuada Malesuada LLC",
    email: "orlandofuller9386@protonmail.org",
    text: "urna justo faucibus lectus, a sollicitudin orci sem eget massa.",
  },
];

app.get("/testimonials", (req, res) => {
  res.json(db);
});

app.get("/testimonials/random", (req, res) => {
  const numbersOfElements = db.length;
  const randomElement = Math.floor(Math.random() * numbersOfElements);

  res.json(db[randomElement]);
});

app.get("/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const getElementById = db.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.status(404).json({ message: "Given id doesn't exist." });
  }
});

app.post("/testimonials", (req, res) => {
  const { name, company, email, text } = req.body;
  const id = Math.max(...db.map((obj) => obj.id)) + 1;

  if (name && company && email && text) {
    db.push({ id, name, company, email, text });
    res.send("Data has been successfully added!");
    console.log(db);
  } else {
    res.render(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

app.delete("/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const removedElement = db.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    db.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
  } else {
    res.status(404).json({ message: "Given id doesn't exist." });
  }
});
