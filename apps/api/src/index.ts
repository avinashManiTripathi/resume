import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "TypeScript backend is running!" });
});

app.listen(4000, () => {
  console.log("API server running on http://localhost:4000");
});