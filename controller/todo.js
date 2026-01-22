import * as todoRepository from "../data/todo.js";

export async function getTodos(req, res) {
  const todos = await todoRepository.findAll();
  res.status(200).json(todos);
}

export async function createTodo(req, res) {
  const { title } = req.body;
  try {
    const todoId = await todoRepository.create(title);
    const newTodo = await todoRepository.findById(todoId);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}

export async function removeTodo(req, res) {
  const { id } = req.params;
  const deletedCount = await todoRepository.remove(id);
  if (deletedCount === 0) {
    // when 0 row affected
    res.status(404).json({ message: "Something went wrong." });
  } else {
    res.sendStatus(204);
  }
}

export async function checkTodo(req, res) {
  const { id } = req.params;
  const checkedCount = await todoRepository.check(id);
  if (checkedCount === 1) {
    const todo = await todoRepository.findById(id);
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Something went wrong." });
  }
}
