import { afterEach, jest } from "@jest/globals";

const mockTodoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  check: jest.fn(),
};

await jest.unstable_mockModule("../data/todo.js", () => mockTodoRepository);

const todoRepository = await import("../data/todo.js");
const { getTodos, createTodo, removeTodo, checkTodo } =
  await import("./todo.js");

const todos = [
  { id: 1, title: "first todo", createdAt: "2026-01-20", checked: true },
  { id: 2, title: "second todo", createdAt: "2026-01-20", checked: true },
];

describe("todo controller test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTodos test", () => {
    test("returns todos with status 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.findAll.mockResolvedValue(todos);

      await getTodos(req, res);

      expect(todoRepository.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(todos);
    });
  });

  describe("createTodo test", () => {
    test("returns new todo with status 201", async () => {
      const title = "new todo";
      const req = { body: { title } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.create.mockResolvedValue({ id: 1 });
      todoRepository.findById.mockResolvedValue(todos[0]);

      await createTodo(req, res);

      expect(todoRepository.create).toHaveBeenCalled();
      expect(todoRepository.findById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(todos[0]);
    });

    test("returns 500 with error message when repository throws", async () => {
      const title = "new todo";
      const req = { body: { title } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.create.mockRejectedValue(new Error("DB error"));

      await createTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong.",
      });
    });
  });

  describe("removeTodo test", () => {
    test("returns 204 when todo is deleted", async () => {
      const req = { params: { id: 1 } };
      const res = {
        sendStatus: jest.fn(),
      };

      todoRepository.remove.mockResolvedValue(1);

      await removeTodo(req, res);

      expect(todoRepository.remove).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    test("returns 404 when todo does not exist", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.remove.mockResolvedValue(0);

      await removeTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong.",
      });
    });
  });

  describe("checkTodo test", () => {
    test("returns todo with status 200", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.check.mockResolvedValue(1);
      todoRepository.findById.mockResolvedValue(todos[0]);

      await checkTodo(req, res);

      expect(todoRepository.check).toHaveBeenCalled();
      expect(todoRepository.findById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(todos[0]);
    });

    test("returns 404 when todo does not exist", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      todoRepository.check.mockResolvedValue(0);

      await checkTodo(req, res);
      expect(todoRepository.check).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong.",
      });
    });
  });
});
