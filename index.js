const express = require("express");
const bodyParser = require("body-parser");
let db = require("./db");
const app = express();
const port = 3000;

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  //   res.send('Hello World!');
  console.log("-------");
  console.log(db);
  // res.json(db);
  res.json(persRes(db));
});

app.post("/users", (req, res) => {
  db.push(req.body);
  // res.json(resp(db));
  res.json(persRes(db));
});

app.delete("/users/:id", (req, res) => {
  console.log("------------delete------------");
  const found = db.find((element) => element.id === parseInt(req.params.id));
  if (!found) {
    res.status(400).json({ msg: `El id ${req.params.id} no existe en la BD` });
  } else {
    db = db.filter((element) => element.id !== parseInt(req.params.id));
    res.json(persRes(db));
    // res.json(found);
  }
});

app.put("/users/:id", (req, res) => {
  console.log("------------delete------------");
  const found = db.find((element) => element.id === parseInt(req.params.id));
  if (!found) {
    res.status(400).json({ msg: `El id ${req.params.id} no existe en la BD` });
  } else {
    db = db.map((element) => {
      if (element.id === parseInt(req.params.id)) {
        element = req.body;
        element.id = parseInt(req.params.id);
      }
    });
    res.json(persRes(db));
    // res.json(found);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const persRes = (rows) => {
  return {
    total: rows.length,
    rows: rows,
  };
};
