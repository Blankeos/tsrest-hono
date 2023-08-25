import { initServer } from "ts-rest-hono";
import { contract } from "./contract";
import { nanoid } from "nanoid";
const s = initServer();

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

// Database
const todos: Todo[] = [];

const router = s.router(contract, {
  getTodos: async () => {
    return {
      status: 201,
      body: todos,
    };
  },
  createTodo: async ({ body: { completed, title } }) => {
    const newTodo = {
      id: nanoid(),
      title,
      completed,
    };

    todos.push(newTodo);

    return {
      status: 201,
      body: newTodo,
    };
  },
});

export default router;
