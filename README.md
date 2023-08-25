# ts-rest and hono example

I'm using the ts-rest-hono library for this. This is how I summarize the process of creating APIs with ts-rest.

It's built on these concepts:

1. 📜 **Contract**
2. 🤝 **Server**
3. 🔌 **Endpoint Creation**

### 📜 1. Contract (`@ts-rest/core`)

If you used GraphQL before, think of this as your "Schema". This is where you define what **methods**, **paths**, and **responses** your API endpoints use. It's a very small file that only defines what your API does. The magic is that your Server(Backend) and your Client(Frontend) agrees on this.

```ts
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
```

### 🤝 2. Server (`ts-rest-hono`)

This is kind of like your "resolver" (in GraphQL) for the contract. In TS-REST, you need a package that plays well with the server you choose. The officially supported ones are Nest, Next, and Express. For Hono, we use `ts-rest-hono`. The function we use to make the **server** is `initServer`.

**Server** is also called your "router". 💡

```ts
import { initServer } from "ts-rest-hono";
import { contract } from "./contract";
import { nanoid } from "nanoid"; // optional

const s = initServer();

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

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
```

### 🔌 3. Endpoint Creation (`ts-rest-hono`)

In Hono, you need an creation package that plays well with the server you choose. Again, we use `ts-rest-hono`. The function we use for **endpoint creation** is `createHonoEndpoints`.

Endpoint creation hooks up your **contract**, **server(router)**, and **app(the actual backend server framework)**. (very confusing I know, it's hard to be consistent with the terminology here)

```ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createHonoEndpoints } from "ts-rest-hono";
import { contract } from "./contract";
import router from "./honoRouter";

const app = new Hono();

app.get("/", (c) => {
  return c.text("🔥 Hello Hono!");
});

createHonoEndpoints(contract, router, app);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
```

### Conclusions

So TS-REST isn't really "backend agnostic" in the sense that it can work with any backend. It's a yes and no answer:

- "yes" - it can run on any backend. You only need to define a **contract**.
- "no" - BUT you need to have a package to handle the **server (router)** and **endpoint creation** parts. The officially supported ones are Nest, Next, and Express. For Hono, we use `ts-rest-hono`.
