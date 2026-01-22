import { db } from "../db/database.js";

export async function create(title) {
  const [result] = await db.execute("INSERT INTO todos (title) VALUES (?)", [
    title,
  ]);

  return result.insertId;
}

export async function findById(id) {
  const [todo] = await db.execute("SELECT * FROM todos WHERE id = ?", [id]);
  return todo;
}

export async function findAll() {
  const [todos] = await db.execute("SELECT * FROM todos");
  return todos;
}

export async function remove(id) {
  const [result] = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  return result.affectedRows; // should be 1
}

export async function check(id) {
  const [result] = await db.execute(
    "UPDATE todos SET checked = NOT checked WHERE id = ?",
    [id],
  );
  return result.affectedRows; // should be 1
}
