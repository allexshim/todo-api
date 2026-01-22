import express from "express";
import todoRouter from "./router/todo.js";
const app = express();

app.use(express.json());

app.use("/todos", todoRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong." });
});

app.listen(8080);
