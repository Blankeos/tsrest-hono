import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const contract = c.router({
  getTodos: {
    method: "GET",
    path: "/todos",
    responses: {
      201: TodoSchema.array(),
    },
    summary: "Create ",
  },
  createTodo: {
    method: "POST",
    path: "/todo",
    responses: {
      201: TodoSchema,
    },
    body: z.object({
      title: z.string(),
      completed: z.boolean(),
    }),
    summary: "Creates a todo.",
  },
});
