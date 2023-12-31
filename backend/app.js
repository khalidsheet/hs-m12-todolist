const express = require("express");
const app = express();
const cors = require("cors");
const Auth = require("./auth");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const TODOLIST = [];

app.post("/api/login", (req, res) => {
  Auth.login(req, res);
});



// Routes
app.get("/api/todos", Auth.verifyToken, (req, res) => {
  res.json(TODOLIST);
});

app.post("/api/todos",Auth.verifyToken, (req, res) => {
  const newTodo = {
    id: TODOLIST.length + 1,
    title: req.body.title,
    completed: false,
  };
  TODOLIST.push(newTodo);
  console.log("added new todo");
  res.json(newTodo);
});

app.put("/api/todos/:id", Auth.verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = TODOLIST.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  res.json(todo);
});

app.delete("/api/todos/:id", Auth.verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = TODOLIST.find((todo) => todo.id === id);
  const index = TODOLIST.indexOf(todo);
  TODOLIST.splice(index, 1);
  res.json(todo);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
