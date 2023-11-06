const express = require("express");
const app = express(); // actual api
const PORT = 8080;

app.use(express.json()); // middleware to parse json

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

// endpoint
app.get("/end", (req, res) => {
  res.status(200).send({
    name: "khal",
    age: 19,
  });
});

app.post("/end/:id", (req, res) => {
  // const { id } = req.paramas;
  const { age } = req.body;

  if (!age) {
    res.status(400).send({ mssg: "Pls give age" });
  }

  res.send({
    fututre: `your age in 3000 is ${age + 97} `,
  });
});
