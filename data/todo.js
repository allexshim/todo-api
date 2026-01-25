import { query } from "../db/database.js";

export async function create(title) {
  const result = await query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING id",
    [title],
  );
  return result.rows[0].id;
}

export async function findById(id) {
  const todo = await query("SELECT * FROM todos WHERE id = $1", [id]);
  return todo.rows[0];
}

export async function findAll() {
  const todos = await query("SELECT * FROM todos");
  return todos.rows;
}

export async function remove(id) {
  const result = await query("DELETE FROM todos WHERE id = $1", [id]);
  return result.rowCount; // should be 1
}

export async function check(id) {
  const result = await query(
    "UPDATE todos SET checked = NOT checked WHERE id = $1",
    [id],
  );
  return result.rowCount; // should be 1
}
