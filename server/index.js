// The main express server file

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/api/greeting", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ message: `Hello Ishan` }));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
